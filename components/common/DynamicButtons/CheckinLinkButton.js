import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SubmitButton} from '../../shared/SubmitButton';

const CheckinLinkButton = props => {
  const navigation = useNavigation();
  const {locationId, title} = props;
  if (!locationId) return null;
  return (
    <SubmitButton
      title={title}
      onSubmit={() => {
        if (props.onPress) {
          props.onPress();
        }
        navigation.navigate('DeeplinkLocationSpecificInfoScreen', {
          locationId: locationId,
          pageType: 'checkin',
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

export default CheckinLinkButton;
