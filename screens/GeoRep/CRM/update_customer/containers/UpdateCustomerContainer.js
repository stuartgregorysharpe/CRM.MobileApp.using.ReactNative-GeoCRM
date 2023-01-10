import {Platform, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Constants} from '../../../../../constants';
import UpdateCustomerView from '../components/UpdateCustomerView';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../../actions/notification.action';
import {expireToken, getPostParameter} from '../../../../../constants/Helper';
import {Notification} from '../../../../../components/modal/Notification';

export default function UpdateCustomerContainer(props) {
  const {locationId} = props;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [leadForms, setLeadForms] = useState([]);
  const [accuracyUnit, setAccuracyUnit] = useState('m');
  const selectDeviceModalRef = useRef(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState('0');
  const [customMasterFields, setCustomMasterFields] = useState({});
  const dispatch = useDispatch();
  var location_name_updated = '0';
  var address_updated = '0';
  const [originCustomMasterFields, setOriginCustomMasterFields] = useState([]);

  var isMount = true;
  useEffect(() => {
    getCustomMasterFields();
    return () => {
      isMount = false;
    };
  }, []);

  const getCustomMasterFields = () => {
    getApiRequest('locations/location_info_update_fields_v2', {
      location_id: locationId,
    })
      .then(res => {
        if (isMount) {
          setLeadForms(res.custom_master_fields);
          setOriginCustomMasterFields(res.custom_master_fields);
          setAccuracyUnit(res.accuracy_distance_measure);
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const onAdd = () => {
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
            dropdown_value: value.value,
            value: value.secondValue,
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

    console.log('post data', JSON.stringify(postData));
    postApiRequest('locations-info/location-info-update', postData)
      .then(res => {
        console.log('locations-info/location-info-update: success', res);
        dispatch(
          showNotification({
            type: 'success',
            message: res.message,
            buttonText: 'Ok',
            buttonAction: () => {
              dispatch(clearNotification());
              props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
            },
          }),
        );
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
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
    console.log('onChangedCustomMasterFields--', value);
    setCustomMasterFields(value);
  };

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>
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
      <Notification />
    </View>
  );
}
