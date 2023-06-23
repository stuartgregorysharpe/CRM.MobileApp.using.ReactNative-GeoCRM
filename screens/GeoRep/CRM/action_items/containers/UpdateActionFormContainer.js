import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getApiRequest,  
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
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
import LoadingBar from '../../../../../components/LoadingView/loading_bar';

const UpdateActionFormContainer = props => {
  
  const { actionName } = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();
  const {locationId, actionItemId, actionItemType} = props;
  const [isLoading, setIsLoading] = useState(false);
  const actionFormRef = useRef(null);
  const alertModalRef = useRef();
  const loadingBarRef = useRef();
  const currentLocation = useSelector(state => state.rep.currentLocation);

  const load = () => {
    setIsLoading(true);
    console.log("actionItemId",actionItemId)
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
        console.log("update action form details error => ", e);
        setIsLoading(false);
        expireToken(dispatch, e , alertModalRef);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = () => {
    if (!actionFormRef.current.validateForm()) return;
    if (isLoading) return;
    showLoadingBar();
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
    postApiRequestMultipart('actionsitems/action-item-details', submitFormData)
      .then(res => {
        if (res.status === Strings.Success) {
          notifyMsg(dispatch, 'Action Item Updated Successfully');
        }
        setIsLoading(false);
        hideLoadingBar()        
        if (props.onButtonAction) {
          props.onButtonAction({
            type: Constants.actionType.ACTION_FORM_SUBMIT,
            value: submitValueData,
          });
        }
      })
      .catch(e => {
        setIsLoading(false);
        hideLoadingBar()
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const showConfirmModal = (message) => {
    if(alertModalRef.current){
      alertModalRef.current.alert(message);
    }
  }
  
  const showLoadingBar = () =>{ 
    if(loadingBarRef.current)
      loadingBarRef.current.showModal();
  }
  const hideLoadingBar = () => {
    if(loadingBarRef.current)
      loadingBarRef.current.hideModal();
  }

  const onReloadLocationData = () => {
    console.log("load data again");
    load();
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

      <LoadingBar ref={loadingBarRef} />

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
        showLoadingBar={showLoadingBar}
        hideLoadingBar={hideLoadingBar}
        onReloadLocationData={onReloadLocationData}
        onButtonAction={({type, item}) => {
          if (type == Constants.buttonType.BUTTON_TYPE_SUMBIT) {
            onSubmit();
          } else {
            props.onButtonAction({
              type: type,
              value: {item : item , actionName : actionName}
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
