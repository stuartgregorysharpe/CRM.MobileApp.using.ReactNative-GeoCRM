import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import CTextInput from '../../../../../components/common/CTextInput';

const ActionForm = props => {
  const {users, formData} = props;
  const descriptionRef = useRef(null);
  const updateFormData = (fieldName, value) => {};
  const checkFormFieldValid = fieldName => {
    return true;
  };
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default ActionForm;
