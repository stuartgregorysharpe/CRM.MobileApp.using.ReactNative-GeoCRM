import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getApiRequest,  
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
import { clearLoadingBar, showLoadingBar } from '../../../../../actions/notification.action';
import DynamicButtons from '../../../../../components/common/DynamicButtons';
import DynamicForm from '../../../../../components/common/DynamicForm';
import AlertModal from '../../../../../components/modal/AlertModal';
import {Constants, Strings} from '../../../../../constants';
import {
  expireToken,
  getFileFormat,
  notifyMsg,
  objectToFormData,
} from '../../../../../constants/Helper';
import {getUserType} from '../../../../../constants/Storage';
import {
  constructUpdateActionFormStructure,
  getUpdateActionItemPostValue,
} from '../helper';

const UpdateActionFormContainer = props => {
  
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();
  const {locationId, actionItemId, actionItemType} = props;
  const [isLoading, setIsLoading] = useState(false);
  const actionFormRef = useRef(null);
  const alertModalRef = useRef();
  const currentLocation = useSelector(state => state.rep.currentLocation);

  const load = () => {
    setIsLoading(true);
    getApiRequest('actionsitems/action-item-details', {
      action_item_id: actionItemId,
    })
      .then(data => {
        console.log("respnose => ", data)
        if (props.updateModalInfo) {
          props.updateModalInfo({createdBy: data.created_by});
        }
        getUserType().then(userType => {
          const {formData, formStructure} = constructUpdateActionFormStructure(
            data,
            userType,
            actionItemType,
          );
          setFormData(formData);
          setFormStructure(formStructure);
          setButtons(data.buttons);
          setIsLoading(false);
        });
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch, e);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = () => {
    if (!actionFormRef.current.validateForm()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    
    const submitValueData = getUpdateActionItemPostValue(
      formData,
      locationId,
      currentLocation,
      {action_item_id: actionItemId},
    );
    const action_image = submitValueData.action_image;

    const submitFormData = objectToFormData(submitValueData, '', [
      'action_image',
    ]);
    if (action_image && submitFormData) {
      action_image.forEach((path, index) => {
        const file = getFileFormat(path);
        submitFormData.append(`action_image[${index}]`, file);
      });
    }
    dispatch(showLoadingBar({'type' : 'loading'}));
    postApiRequestMultipart('actionsitems/action-item-details', submitFormData)
      .then(res => {
        if (res.status === Strings.Success) {
          notifyMsg(dispatch, 'Action Item Updated Successfully');
        }
        setIsLoading(false);
        dispatch(clearLoadingBar());
        if (props.onButtonAction) {
          props.onButtonAction({
            type: Constants.actionType.ACTION_FORM_SUBMIT,
            value: submitValueData,
          });
        }
      })
      .catch(e => {
        setIsLoading(false);
        dispatch(clearLoadingBar());
        expireToken(dispatch, e);
      });
  };

  const showConfirmModal = (message) => {
    if(alertModalRef.current){
      alertModalRef.current.alert(message);
    }
  }
  

  return (
    <View style={[styles.container, props.style]}>

      <AlertModal  
        ref={alertModalRef}
        onModalClose={() => {
          props.onButtonAction({
            type: Constants.actionType.ACTION_CLOSE            
          });
          navigation.navigate('DeeplinkLocationSpecificInfoScreen', {              
            page: 'checkin',
          });  
        }}
      />

      <DynamicForm
        ref={actionFormRef}
        formData={formData}
        formStructureData={formStructure}
        updateFormData={_formData => {
          setFormData(_formData);
        }}
      />
      
      <DynamicButtons
        buttons={buttons}
        showConfirmModal={showConfirmModal}
        onButtonAction={({type, item}) => {
          if (type == Constants.buttonType.BUTTON_TYPE_SUMBIT) {
            onSubmit();
          } else {
            props.onButtonAction({
              type: type,
              value: item
            });
          }
        }}
        style={{marginHorizontal: 10, marginBottom: 16, marginTop: 18}}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default UpdateActionFormContainer;
