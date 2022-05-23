import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Constants} from '../../../../../constants';
import addActionDummyData from '../add_action_items_dummyData.json';
import ActionForm from '../forms/ActionForm';
import {getAddActionItemPostValue} from '../helper';
const AddActionFormContainer = props => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const load = () => {
    const formBaseData = addActionDummyData;
    if (formBaseData && formBaseData.user_field) {
      const {users, selected_user_id} = formBaseData.user_field;
      setUsers(users);
      setFormData({...formData, selected_user_id: selected_user_id});
    }
  };
  useEffect(() => {
    load();
  }, []);
  const onSubmit = () => {
    const submitValueData = getAddActionItemPostValue(formData);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <ActionForm
        users={users}
        formData={formData}
        updateFormData={formData => {
          setFormData(formData);
        }}
      />
      <SubmitButton
        onSubmit={() => {
          onSubmit();
        }}
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
