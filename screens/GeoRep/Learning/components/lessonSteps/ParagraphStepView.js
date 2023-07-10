import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";

const ParagraphStepView = ({ value }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{value}</Text>
  </View>
);

export default ParagraphStepView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 2,
    flex: 1,
    fontWeight: '100',
    fontSize: 15,
    color: 'black',
    fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
  }
});
