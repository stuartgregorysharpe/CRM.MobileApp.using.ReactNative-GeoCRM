import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from '../../constants';
const CCheckBox = props => {
  return (
    <CheckBox
      tintColors={Colors.tickBoxColor}
      onCheckColor={Colors.tickBoxColor}
      onTintColor={Colors.tickBoxColor}
      {...props}
    />
  );
};

export default CCheckBox;
