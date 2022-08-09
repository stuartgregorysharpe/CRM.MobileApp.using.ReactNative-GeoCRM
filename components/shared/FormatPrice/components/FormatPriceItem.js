import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Constants, Fonts, Values} from '../../../../constants';

const FormatPriceItem = props => {
  const {item} = props;
  if (!item) return null;
  const {label} = item;
  return (
    <View style={[styles.container, styles.bottomBorder, props.style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBorder: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
  },
});

export default FormatPriceItem;
