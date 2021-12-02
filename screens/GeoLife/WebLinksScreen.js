import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function WebLinksScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Web Links"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>WebLinksScreen</Text>
      </View>
    </SafeAreaView>
  )
}