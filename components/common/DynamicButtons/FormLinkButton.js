import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SubmitButton} from '../../shared/SubmitButton';

const FormLinkButton = props => {
  const navigation = useNavigation();
  const {formId, locationId, title} = props;
  if (!formId) return null;
  return (
    <SubmitButton
      title={title}
      onSubmit={() => {
        if (props.onPress) {
          props.onPress();
        }
        navigation.navigate('DeeplinkFormQuestionsScreen', {
          data: {form_id: formId},
          location_id: locationId,
        });
      }}
      style={props.style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default FormLinkButton;
