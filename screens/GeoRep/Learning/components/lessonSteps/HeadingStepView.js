import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";

const StepView = ({ value }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{value}</Text>
  </View>
);

export default StepView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 2,
    flex: 1,
    fontWeight: '900',
    fontSize: 25,
    color: 'black',
    fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
  }
});
