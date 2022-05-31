//starter-code
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {whiteLabel} from '../../../constants/Colors';
const CCircularProgress = props => {
  return (
    <CircularProgress
      progressValueStyle={{fontSize: 14}}
      activeStrokeWidth={12}
      progressValueColor={whiteLabel().graphs.primary}
      activeStrokeColor={whiteLabel().graphs.primary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CCircularProgress;
