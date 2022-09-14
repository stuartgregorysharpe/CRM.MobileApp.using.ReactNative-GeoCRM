import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import SvgIcon from '../../../../../components/SvgIcon';
import {Colors, Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const AcceptButton = props => {
  const title = props.title || 'Accept';
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <Text style={styles.title}>{title}</Text>
      <SvgIcon icon="Arrow_Right" width="25px" height="30px" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteLabel().actionFullButtonBackground,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: -10,
  },
  title: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.small,
    color: whiteLabel().actionFullButtonText,
  },
});

export default AcceptButton;
