import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Bubble = props => {
  const {title = '', isLoading} = props;
  const text = isLoading ? 'Loading ....' : title || '';
  return (
    <View style={[styles.container, props.style]}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

export default Bubble;
