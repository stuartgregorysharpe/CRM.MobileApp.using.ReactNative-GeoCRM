import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider(props) {
  return (
    <View style={[styles.layoutBarContent, props.style]}>
      <View style={styles.layoutBar}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  layoutBarContent: {
    alignItems: 'center',
  },
  layoutBar: {
    width: 140,
    height: 4,
    backgroundColor: '#D8D8D8',
    borderRadius: 2
  },
})