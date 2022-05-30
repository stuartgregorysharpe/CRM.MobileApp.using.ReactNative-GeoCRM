import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';

export default function UITestScreen({screenProps}) {
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: 'UITest',
      });
    }
  });
  return <SafeAreaView style={{flex: 1}}></SafeAreaView>;
}
