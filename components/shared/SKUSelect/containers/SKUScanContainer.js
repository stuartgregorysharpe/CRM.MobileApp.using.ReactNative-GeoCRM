import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import SKUScanView from '../components/SKUScanView';

const SKUScanContainer = props => {
  return (
    <View style={[styles.container, props.style]}>
      <SKUScanView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SKUScanContainer;
