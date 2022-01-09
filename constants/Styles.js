import { StyleSheet } from "react-native";
import { BG_COLOR } from "./Colors";

export const boxShadow = StyleSheet.create({
  shadowColor: '#808080',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 1,
  elevation: 1,
});

export const grayBackground = StyleSheet.create({
  backgroundColor: '#27272778',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 1,
  elevation: 1
});