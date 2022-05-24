import React, {useState, useEffect, useReducer, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getApiRequest, postApiRequest} from '../../../../../actions/api.action';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';
import {notifyMsg} from '../../../../../constants/Helper';
import ActionForm from '../forms/ActionForm';
import {getAddActionItemPostValue} from '../helper';
const AddActionFormContainer = props => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    selected_user_id: null,
    due_date: null,
  });
  const dispatch = useDispatch();
  const {locationId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const actionFormRef = useRef(null);
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const load = () => {
    setIsLoading(true);
    getApiRequest('actionsitems/action-item-details', {
      action_item_type: 'action',
    })
      .then(data => {
        const formBaseData = data;
        if (formBaseData && formBaseData.user_field) {
          const {users, selected_user_id} = formBaseData.user_field;
          setUsers(users);
          setFormData({...formData, selected_user_id: selected_user_id});
        }
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
    const submitValueData = getAddActionItemPostValue(
      formData,
      locationId,
      currentLocation,
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
        console.log('error', e);
        setIsLoading(false);
      });
  };
  return (
    <View style={[styles.container, props.style]}>
      <ActionForm
        users={users}
        ref={actionFormRef}
        formData={formData}
        updateFormData={formData => {
          setFormData(formData);
        }}
      />
      <SubmitButton
        onSubmit={() => {
          onSubmit();
        }}
        isLoading={isLoading}
        title={'Add Action Item'}
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

export default AddActionFormContainer;
