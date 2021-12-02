import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

export default function LoyaltyCardsScreen(props) {
  useEffect(() => {
    props.screenProps.setOptions({
      title: "Loyalty Cards"
    })
  });
  return (
    <SafeAreaView>
      <View>
        <Text>LoyaltyCardsScreen</Text>
      </View>
    </SafeAreaView>
  )
}