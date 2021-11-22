import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider() {
  return (
    <View style={styles.layoutBarContent}>
      <View style={styles.layoutBar}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  layoutBarContent: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  layoutBar: {
    width: 140,
    height: 4,
    backgroundColor: '#D8D8D8',
    borderRadius: 2
  },
})