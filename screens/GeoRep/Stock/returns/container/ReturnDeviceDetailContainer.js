import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getApiRequest,
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
import * as RNLocalize from 'react-native-localize';
import {useSelector} from 'react-redux';
import ReturnDeviceDetailView from '../components/ReturnDeviceDetailView';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {Constants} from '../../../../../constants';
import {getFileFormat} from '../../../../../constants/Helper';

export default function ReturnDeviceDetailContainer(props) {
  const {locationId} = props;
  const [lists, setLists] = useState([]);

  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);

  useEffect(() => {
    let isMount = true;
    let param = {
      location_id: locationId,
    };
    getApiRequest('locations/location-devices', param)
      .then(res => {
        if (isMount) {
          setLists(res.devices);
        }
      })
      .catch(e => {
        console.log('e', e);
      });
    return () => {
      isMount = false;
    };
  }, []);

  const onReturnStock = data => {
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

    postApiRequestMultipart('stockmodule/return-device', postData)
      .then(res => {
        if (res.status == 'success') {
          dispatch(
            showNotification({
              type: 'success',
              message: res.message,
              buttonText: 'Ok',
              buttonAction: async () => {
                props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
                dispatch(clearNotification());
              },
            }),
          );
        }
      })
      .catch(e => {});
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
