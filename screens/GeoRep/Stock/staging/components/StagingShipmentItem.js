import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Values, Fonts, Colors} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const StagingShipmentItem = props => {
  const {item} = props;
  if (!item) return null;

  return (
    <View style={[styles.container, styles.bottomBorder, props.style]}>
      <Text style={styles.text}>{item.network}</Text>
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
    height: 40,
  },
  bottomBorder: {
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
    flex: 1,
  },
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    textAlign: 'center',
    minHeight: 24,
    padding: 0,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: whiteLabel().inputText,
    width: 70,
  },
});

export default StagingShipmentItem;
