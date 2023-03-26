import {View} from 'react-native';
import React, {useEffect, useState , useRef } from 'react';
import SearchLocationView from '../components/SearchLocationView';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../../actions/notification.action';
import {Constants, Strings} from '../../../../../constants';
import {Notification} from '../../../../../components/modal/Notification';
import {expireToken, getErrorMessage} from '../../../../../constants/Helper';
import { GetRequestCustomerSearchDAO, GetRequestLocationDevicesDAO } from '../../../../../DAO';
import LoadingProgressBar from '../../../../../components/modal/LoadingProgressBar';
import AlertModal from '../../../../../components/modal/AlertModal';

const SearchLocationContainer = props => {

  const { type, stockType, isSkipLocationIdCheck} = props;
  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const [originLists, setOriginLists] = useState([]);
  const [locationId, setLocationId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const alertModalRef = useRef();

  var searchKey = '';
  var changedSearchKey = '';  

  useEffect(() => {
    if(type != 'setup')
      callSearch('');
  }, []);

  useEffect(() => {
    if (changedSearchKey != searchKey) {
      onSearch(changedSearchKey);
    }
    if(props.onStartSearch && lists.length > 0){
      props.onStartSearch(true);
    }
  }, [lists]);

  const onItemPressed = item => {
    if (
      stockType == Constants.stockDeviceType.SELL_TO_TRADER ||
      isSkipLocationIdCheck
    ) {
      if(type === "setup"){
        if(props.onSubmit){
          props.onSubmit(item, item.location_id);
          setLists([]);          
        }                
      }else{
        props.onSubmit(stockType, item.location_id);
      }
      
    } else {

      setLocationId(item.location_id);      
      let param = {
        location_id: item.location_id,
      };
      
      GetRequestLocationDevicesDAO.find(param).then((res) => {
        if (res.devices.length > 0) {
          props.onSubmit(stockType, item.location_id);
        } else {
        }
      }).catch((e) => {
          if (e === 'expired') {
            showErrorModal(e);
          } else {
            dispatch(
              showNotification({
                type: Strings.Success,
                message: Strings.Stock.No_Device_Found,
                buttonText: 'Ok',
              }),
            );
          }
      })            
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

    if(props.onStartSearch && key === '' ){
      props.onStartSearch(false);
    }

  };

  const callSearch = key => {
    setIsLoading(true);
    let param = {
      search_text: key,
    };

    GetRequestCustomerSearchDAO.find(param).then((res) => {      
      console.log("response item length => ", res.items.length);
      setLists(res.items);
      if(props.onStartSearch && res.items.length == 0  ){
        props.onStartSearch(false);
      }
      if (key == '') {
        setOriginLists(res.items);
      }
      setIsLoading(false);
    }).catch((e) => {
      setIsLoading(false);     
      showErrorModal(e);
    })
     
  };

  const showErrorModal = (e) => {
    if(alertModalRef.current){
      alertModalRef.current.alert( getErrorMessage(e) , '' ,  e === 'expired' ? true : false );
    }
  }

  return (
    <View style={[props.style ? props.style : {} , {alignSelf: 'stretch' }]}>
      <SearchLocationView
        lists={lists}
        onItemPressed={onItemPressed}
        onSubmitLocation={onSubmitLocation}
        onSearch={onSearch}
        {...props}
      />
      <Notification />
      <LoadingProgressBar />
      <AlertModal 
        ref={alertModalRef} />

    </View>
  );
};

export default SearchLocationContainer;
