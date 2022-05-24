import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import DynamicForm from '../../../../../components/common/DynamicForm';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';
import {notifyMsg} from '../../../../../constants/Helper';
import {
  constructUpdateActionFormStructure,
  getUpdateActionItemPostValue,
} from '../helper';
const UpdateActionFormContainer = props => {
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const dispatch = useDispatch();
  const {locationId, actionItemId} = props;
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
        const {formData, formStructure} =
          constructUpdateActionFormStructure(data);
        setFormData(formData);
        setFormStructure(formStructure);
        setIsLoading(false);
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
    postApiRequest('actionsitems/action-item-details', submitValueData)
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
        updateFormData={formData => {
          setFormData(formData);
        }}
      />
      <SubmitButton
        onSubmit={() => {
          onSubmit();
        }}
        isLoading={isLoading}
        title={'Submit'}
        style={{marginTop: 16, marginHorizontal: 10, marginBottom: 16}}
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
