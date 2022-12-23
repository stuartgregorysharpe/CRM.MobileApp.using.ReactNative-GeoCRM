import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

const SummaryItem = props => {
  const {status, status_color, order_number, location_name} = props.item;
  const onPressSummary = () => {
    if (props.onItemAction) {
      props.onItemAction(props.item);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPressSummary}
      style={[styles.container, props.style]}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title}>{`# ${order_number}`}</Text>
        <Text style={styles.description}>{location_name}</Text>
      </View>
      <View style={[styles.buttonContainer, {backgroundColor: status_color}]}>
        <Text style={styles.buttonTitle}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomColor: whiteLabel().lineSeperator,
    borderBottomWidth: 1,
  },
  buttonTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Colors.whiteColor,
  },
  buttonContainer: {
    height: 32,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 'bold',
    color: whiteLabel().mainText,
    fontFamily: Fonts.primaryBold,
  },
  description: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 13,
    fontWeight: '500',
    color: whiteLabel().helpText,
    fontFamily: Fonts.primaryMedium,
  },
});

export default SummaryItem;
