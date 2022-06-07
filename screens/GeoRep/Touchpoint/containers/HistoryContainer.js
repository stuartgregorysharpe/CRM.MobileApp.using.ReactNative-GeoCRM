import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const HistoryContainer = props => {
  return <View style={[styles.container, props.style]}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryContainer;
