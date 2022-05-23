import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import CTextInput from '../../../../../components/common/CTextInput';
import CDateTimePickerInput from '../../../../../components/common/SelectInput/CDateTimePickerInput';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';

const ActionForm = props => {
  const {users, formData} = props;
  const descriptionRef = useRef(null);
  const updateFormData = (fieldName, value) => {
    if (props.updateFormData) {
      const _formData = {...formData};
      _formData[fieldName] = value;
      props.updateFormData(_formData);
    }
  };
  const checkFormFieldValid = fieldName => {
    return true;
  };
  const userList = useMemo(() => {
    return users.map(user => {
      return {
        ...user,
        label: user.user_name,
        value: user.user_id,
      };
    });
  });
  return (
    <View style={[styles.container, props.style]}>
      <CTextInput
        ref={descriptionRef}
        label="Details"
        value={formData.description}
        onChangeText={text => {
          updateFormData('description', text);
        }}
      />
      <CSingleSelectInput
        placeholder="Select User"
        checkedValue={formData.selected_user_id}
        items={userList}
        onSelectItem={item => {
          updateFormData('selected_user_id', item.value);
        }}
        containerStyle={{marginTop: 10}}
      />
      <CDateTimePickerInput
        placeholder="Select Due Date"
        value={formData.due_date}
        onSelectDate={date => {
          updateFormData('due_date', date);
        }}
        containerStyle={{marginTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default ActionForm;
