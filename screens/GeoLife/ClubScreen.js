import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function ClubScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Club"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>ClubScreen</Text>
      </View>
    </SafeAreaView>
  )
}