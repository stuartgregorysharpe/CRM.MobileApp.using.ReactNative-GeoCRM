import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const ShipmentScanResultView = props => {
  return <View style={[styles.container, props.style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default ShipmentScanResultView;
