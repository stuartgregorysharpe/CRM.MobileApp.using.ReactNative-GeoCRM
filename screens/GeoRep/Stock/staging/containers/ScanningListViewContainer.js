import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const ScanningListViewContainer = props => {
  return <View style={[styles.container, props.style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 300,
  },
});

export default ScanningListViewContainer;
