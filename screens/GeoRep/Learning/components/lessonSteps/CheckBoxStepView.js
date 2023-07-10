import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value }) => {
  const [checkedStates, setCheckedStates] = useState(Array(value.length).fill(false));

  const handlePress = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  return (
    <View style={styles.container}>
      {value?.map((tp, idx) => (
        <TouchableOpacity onPress={() => handlePress(idx)} key={idx}>
          <View style={styles.item}>
            <Text style={styles.text}>{tp}</Text>
            <SvgIcon
              icon={checkedStates[idx] ? "CheckBox" : "CheckSelectedBox"}
              width={checkedStates[idx] ? "25" : "20"}
              height={checkedStates[idx] ? "25" : "20"}
              style={styles.icon}
            />
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: "black",
    fontFamily: Platform.OS === "ios" ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
  },
  icon: {},
});
