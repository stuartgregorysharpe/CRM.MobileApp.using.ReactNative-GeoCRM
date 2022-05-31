import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {whiteLabel} from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';

export const GroupTitle = ({title, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.groupTitleStyle}>{title}</Text>
      <View style={styles.divider}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  groupTitleStyle: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
  },
  divider: {
    height: 1,
    marginTop: 5,
    backgroundColor: whiteLabel().mainText,
  },
});
