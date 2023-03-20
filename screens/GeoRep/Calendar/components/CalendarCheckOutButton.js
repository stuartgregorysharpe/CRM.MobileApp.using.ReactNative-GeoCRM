import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../../constants';
import SvgIcon from '../../../../components/SvgIcon';

const CalendarCheckOutButton = props => {
  return (
    <TouchableOpacity
      style={[styles.itemButton, {backgroundColor: Colors.selectedRedColor}]}
      onPress={() => {
        if (props._callCheckOut) {
          props._callCheckOut();
        }
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.itemButtonText}> {'Check Out'} </Text>
      </View>

      <SvgIcon
        style={styles.itemButtonIcon}
        icon="Angle_Left"
        width="14px"
        height="14px"
      />
    </TouchableOpacity>
  );
};

export default CalendarCheckOutButton;

const styles = StyleSheet.create({
  itemButton: {
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
  itemButtonText: {
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
    textAlign: 'center',
    color: '#fff',
  },
  itemButtonIcon: {},
});
