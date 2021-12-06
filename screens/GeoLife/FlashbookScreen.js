import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function FlashbookScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "FlashBook"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>FlashbookScreen</Text>
      </View>
    </SafeAreaView>
  )
}