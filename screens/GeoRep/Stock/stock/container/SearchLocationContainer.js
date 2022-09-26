import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getApiRequest} from '../../../../../actions/api.action';
import SearchLocationView from '../components/SearchLocationView';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../../actions/notification.action';
import {Constants, Strings} from '../../../../../constants';
import {Notification} from '../../../../../components/modal/Notification';

export default function SearchLocationContainer(props) {
  const {stockType, isSkipLocationIdCheck} = props;
  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const [originLists, setOriginLists] = useState([]);
  const [locationId, setLocationId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  var searchKey = '';
  var changedSearchKey = '';

  useEffect(() => {
    callSearch('');
  }, []);

  useEffect(() => {
    if (changedSearchKey != searchKey) {
      onSearch(changedSearchKey);
    }
  }, [lists]);

  const onItemPressed = item => {
    if (
      stockType == Constants.stockDeviceType.SELL_TO_TRADER ||
      isSkipLocationIdCheck
    ) {
      props.onSubmit(stockType, item.location_id);
    } else {
      setLocationId(item.location_id);
      let param = {
        location_id: item.location_id,
      };
      getApiRequest('locations/location-devices', param)
        .then(res => {
          if (res.devices.length > 0) {
            props.onSubmit(stockType, item.location_id);
          } else {
          }
        })
        .catch(e => {
          console.log('error', e);
          dispatch(
            showNotification({
              type: Strings.Success,
              message: Strings.Stock.No_Device_Found,
              buttonText: 'Ok',
            }),
          );
        });
    }
  };

  const onSubmitLocation = () => {
    if (locationId != 0) {
      props.onSubmit(stockType, locationId);
    }
  };

  const onSearch = key => {
    changedSearchKey = key;

    if (key == '') {
      setLists(originLists);
    } else if (key.length > 1 && !isLoading) {
      searchKey = key;
      callSearch(key);
    }
  };

  const callSearch = key => {
    setIsLoading(true);
    let param = {
      search_text: key,
    };
    getApiRequest('locations/customer-search', param)
      .then(res => {
        setLists(res.items);
        if (key == '') {
          setOriginLists(res.items);
        }
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{alignSelf: 'stretch'}}>
      <SearchLocationView
        lists={lists}
        onItemPressed={onItemPressed}
        onSubmitLocation={onSubmitLocation}
        onSearch={onSearch}
        {...props}
      />
      <Notification />
    </View>
  );
}
