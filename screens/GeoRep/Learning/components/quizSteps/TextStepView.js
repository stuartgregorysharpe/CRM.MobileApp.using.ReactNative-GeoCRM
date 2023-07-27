import React from "react";
import { Text, View, Platform, TextInput, StyleSheet } from "react-native";

const StepView = ({ label }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{label}</Text>
    <Text style={{color: "red", textAlign: "right", marginRight: 2}}>(required)</Text>
    <TextInput 
      multiline 
      numberOfLines={7} 
      style={styles.input} 
    />
  </View>
);

export default StepView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // set flexDirection to 'column'
    marginVertical: 5,
  },
  text: {
    marginTop: 5,
    fontWeight: "bold",
    marginHorizontal: 2,
    fontSize: 15,
    color: 'black',
    fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    borderRadius: 10,
    textAlignVertical: 'top',  // Add this line
  },
});
