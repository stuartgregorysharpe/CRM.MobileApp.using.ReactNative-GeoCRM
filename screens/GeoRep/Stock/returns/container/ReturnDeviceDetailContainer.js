import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
import * as RNLocalize from 'react-native-localize';
import {useSelector} from 'react-redux';
import ReturnDeviceDetailView from '../components/ReturnDeviceDetailView';
import {useDispatch} from 'react-redux';
import {
  clearLoadingBar,
  clearNotification,
  showLoadingBar,
  showNotification,
} from '../../../../../actions/notification.action';
import {Constants, Strings} from '../../../../../constants';
import {expireToken, getFileFormat} from '../../../../../constants/Helper';
import { GetRequestLocationDevicesDAO } from '../../../../../DAO';

export default function ReturnDeviceDetailContainer(props) {

  const { locationId } = props;

  const [lists, setLists] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMount = true;
    let param = {
      location_id: locationId,
    };  
    GetRequestLocationDevicesDAO.find(param).then((res) => {
        if(isMount){                             
            setLists(res.devices);
        }
    }).catch((e) => {
        console.log("location device api error: " , e);
        expireToken(dispatch , e);
    });
    return () => {
      isMount = false;
    };
  }, []);

  const onReturnStock = data => {
    
    if(isLoading) return;

    const {device, reason, photos} = data;
    var postData = new FormData();
    postData.append('stock_type', 'Device');
    postData.append('location_id', props.locationId);
    postData.append(
      'return_device[location_device_id]',
      device?.location_device_id,
    );
    postData.append('return_device[return_reason]', reason);
    photos.map((path, index) => {
      var fileFormats = getFileFormat(path);
      var key = `return_image[${index}]`;
      postData.append(key, fileFormats);
    });

    var time_zone = RNLocalize.getTimeZone();
    postData.append('user_local_data[time_zone]', time_zone);
    postData.append(
      'user_local_data[latitude]',
      currentLocation && currentLocation.latitude != null
        ? currentLocation.latitude
        : '0',
    );
    postData.append(
      'user_local_data[longitude]',
      currentLocation && currentLocation.longitude != null
        ? currentLocation.longitude
        : '0',
    );

    setIsLoading(true);
    dispatch(showLoadingBar({'type' : 'loading'}));

    postApiRequestMultipart('stockmodule/return-device', postData)
      .then(res => {
        setIsLoading(false);
        dispatch(clearLoadingBar());
        if (res.status == 'success') {
          dispatch(
            showNotification({
              type: Strings.Success,
              message: res.message,
              buttonText: Strings.Ok,
              buttonAction: async () => {
                props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
                dispatch(clearNotification());
              },
            }),
          );
        }
      })
      .catch(e => {        
        setIsLoading(false);
        dispatch(clearLoadingBar());
        expireToken(dispatch, e);
      });
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <ReturnDeviceDetailView
        onReturnStock={onReturnStock}
        lists={lists}
        {...props}
      />
    </View>
  );
}
