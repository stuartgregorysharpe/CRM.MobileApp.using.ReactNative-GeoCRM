import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value }) => {
  const [checkedStates, setCheckedStates] = useState(Array(value.length).fill(false));


  return (
    <View style={styles.container}>
      {value?.map((tp, idx) => (
        <TouchableOpacity onPress={() => handlePress(idx)} key={idx}>
          <View style={styles.item}>
            <Text style={styles.text}>{tp}</Text>

          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StepView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 5,
  },

  text: {
    flex: 1,
    fontSize: 15,
    color: "black",
    fontFamily: Platform.OS === "ios" ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
  },
  icon: {},
});
