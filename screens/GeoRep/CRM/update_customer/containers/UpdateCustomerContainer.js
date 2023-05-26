import { Platform, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Constants } from '../../../../../constants';
import UpdateCustomerView from '../components/UpdateCustomerView';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { expireToken, getPostParameter } from '../../../../../constants/Helper';
import { GetRequestLocationInfoUpdateDAO, PostRequestDAO } from '../../../../../DAO';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../../components/modal/AlertModal';

export default function UpdateCustomerContainer(props) {

  const {locationId} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [leadForms, setLeadForms] = useState([]);
  const [accuracyUnit, setAccuracyUnit] = useState('m');  
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [customMasterFields, setCustomMasterFields] = useState({});
  const [originCustomMasterFields, setOriginCustomMasterFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectDeviceModalRef = useRef(null);
  const alertModalRef = useRef()
  const loadingBarRef =  useRef()

  const dispatch = useDispatch();

  var location_name_updated = '0';
  var address_updated = '0';
  var isMount = true;
  
  useEffect(() => {
    isMount = true;
    getCustomMasterFields();
    return () => {
      isMount = false;
    };
  }, []);

  const getCustomMasterFields = () => {
    var postData = {
      location_id : locationId
    }    
    GetRequestLocationInfoUpdateDAO.find(postData).then((res) => {
      if (isMount) { 
        console.log("res.custom_master_fields",res.custom_master_fields)       
        setLeadForms(res.custom_master_fields);
        setOriginCustomMasterFields(res.custom_master_fields);
        setAccuracyUnit(res.accuracy_distance_measure);
      }
    }).catch((e) => {      
      expireToken(dispatch, e);
    });
  };

  const onAdd = () => {
    if (isLoading) {
      return false;
    }
    setIsLoading(true);
    showLoadingBar();
    checkChangedStatus();
    var userParam = getPostParameter(currentLocation);
    var custom_master_post_data = [];
    for (let key of Object.keys(customMasterFields)) {
      var item = originCustomMasterFields.find(
        item => item.custom_master_field_id === key,
      );
      var value = customMasterFields[key];
      if (item) {
        var tmp = {
          core_field_name: item.core_field_name,
          custom_master_field_id: key,
          field_name: item.field_name,
          field_type: item.field_type,
        };
        if (item.field_type === 'dropdown_input') {          
          custom_master_post_data.push({
            ...tmp,
            dropdown_value: value.value == null ? '' : value.value,
            value: value.secondValue == null ? '' : value.secondValue,
          });
        } else {
          custom_master_post_data.push({...tmp, value: value});
        }
      }
    }

    let postData = {
      location_id: locationId,
      coordinates: {
        latitude:
          currentLocation.latitude != undefined ? currentLocation.latitude : 0,
        longitude:
          currentLocation.longitude != undefined
            ? currentLocation.longitude
            : 0,
      },
      use_current_geo_location: isCurrentLocation,
      location_name_updated: location_name_updated,
      address_updated: address_updated,
      custom_master_fields: custom_master_post_data,
      user_local_data: userParam.user_local_data,
    };
        
    PostRequestDAO.find(locationId, postData , 'location_address_update' , 'locations-info/location-info-update' , 'location_address_update' , '').then((res) => {
      console.log('locations-info/location-info-update: success', res);
      setIsLoading(false);
      hideLoadingBar();
      showMessage(res.message);
    }).catch((e) => {
      setIsLoading(false);
      hideLoadingBar();
      expireToken(dispatch, e , alertModalRef);
    })
  };

  const checkChangedStatus = () => {
    for (let key of Object.keys(customMasterFields)) {
      var item = originCustomMasterFields.find(
        item => item.custom_master_field_id === key,
      );
      if (
        item != null &&
        item.value != customMasterFields[key] &&
        item.core_field_name === 'location_name'
      ) {
        location_name_updated = '1';
      }
      if (
        item != null &&
        item.value != customMasterFields[key] &&
        item.core_field_name != 'location_name'
      ) {
        address_updated = '1';
      }
    }
  };

  const onButtonAction = value => {
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };

  const showAllocateModal = () => {
    if (selectDeviceModalRef.current) selectDeviceModalRef.current.showModal();
  };

  const useGeoLocation = () => {
    setIsCurrentLocation('1');
  };
  const onChangedCustomMasterFields = value => {    
    setCustomMasterFields(value);
  };

  const showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }

  const hideLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }

  const showMessage = (message ) => {
    var delay = 0;
    if(Platform.OS == 'ios'){
      delay = 500;
    }
    setTimeout(() => {
      if(alertModalRef.current){
        alertModalRef.current.alert(message , 'OK');
      }
    }, delay);
  }

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>
      
      <LoadingBar ref={loadingBarRef}/>
      <AlertModal 
        onModalClose={(res) => {
          props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
        }}
        ref={alertModalRef}/>

      <UpdateCustomerView
        onButtonAction={onButtonAction}
        leadForms={leadForms}
        accuracyUnit={accuracyUnit}
        useGeoLocation={useGeoLocation}
        onChangedCustomMasterFields={onChangedCustomMasterFields}
        showAllocateModal={showAllocateModal}
        {...props}
      />

      <SubmitButton
        style={{
          marginHorizontal: 10,
          marginTop: 5,
          marginBottom: Platform.OS == 'android' ? 10 : 30,
        }}
        title={'Update'}
        onSubmit={onAdd}        
      />

    </View>
  );
}
