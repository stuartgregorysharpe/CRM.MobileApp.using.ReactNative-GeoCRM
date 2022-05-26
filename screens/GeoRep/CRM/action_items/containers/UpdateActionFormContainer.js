import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getApiRequest,
  postApiRequest,
  postApiRequestMultipart,
} from '../../../../../actions/api.action';
import DynamicButtons from '../../../../../components/common/DynamicButtons';
import DynamicForm from '../../../../../components/common/DynamicForm';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';
import {
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
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();
  const {locationId, actionItemId, actionItemType} = props;
  const [isLoading, setIsLoading] = useState(false);
  const actionFormRef = useRef(null);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const load = () => {
    setIsLoading(true);
    getApiRequest('actionsitems/action-item-details', {
      action_item_id: actionItemId,
    })
      .then(data => {
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
      });
  };
  useEffect(() => {
    load();
  }, []);
  const onSubmit = () => {
    if (!actionFormRef.current.validateForm()) return;
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
        if (res.status === 'success') {
          notifyMsg(dispatch, 'Success');
        }
        setIsLoading(false);
        if (props.onButtonAction) {
          props.onButtonAction({
            type: Constants.actionType.ACTION_FORM_SUBMIT,
            value: submitValueData,
          });
        }
      })
      .catch(e => {
        setIsLoading(false);
      });
  };
  return (
    <View style={[styles.container, props.style]}>
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
        onButtonAction={({type, item}) => {
          if (type == Constants.buttonType.BUTTON_TYPE_SUMBIT) {
            onSubmit();
          } else {
            props.onButtonAction({
              type: type,
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
