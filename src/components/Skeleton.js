import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Skeleton() {
  return (
    <View style={styles.skeleton}></View>
  )
}

const styles = StyleSheet.create({
  skeleton: {
    width: '80%',
    height: 16,
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  }
})