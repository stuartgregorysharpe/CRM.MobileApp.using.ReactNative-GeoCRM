import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Values} from '../../constants';
import {whiteLabel} from '../../constants/Colors';

const CSwitchButton = props => {
  const {onTitle, offTitle, value} = props;
  const onTitleText = onTitle || 'On';
  const offTitleText = offTitle || 'Off';
  const onPress = nextValue => {
    if (props.onPress) {
      props.onPress(nextValue);
    }
  };
  if (value) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(false);
        }}
        style={[
          styles.container,
          {backgroundColor: whiteLabel().actionFullButtonBackground},
          props.style,
        ]}>
        <View
          style={[styles.handle, {backgroundColor: Colors.whiteColor}]}></View>
        <Text style={[styles.titleStyle, {color: Colors.whiteColor}]}>
          {onTitleText}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(true);
      }}
      style={[
        styles.container,
        {backgroundColor: Colors.whiteColor},
        props.style,
      ]}>
      <Text
        style={[
          styles.titleStyle,
          {color: whiteLabel().actionFullButtonBackground},
        ]}>
        {offTitleText}
      </Text>
      <View
        style={[
          styles.handle,
          {backgroundColor: whiteLabel().actionFullButtonBackground},
        ]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: whiteLabel().actionFullButtonBackground,
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onButtonStyle: {
    backgroundColor: whiteLabel().actionFullButtonBackground,
  },
  titleStyle: {
    fontFamily: Fonts.primaryRegular,
    flex: 1,
    fontSize: Values.fontSize.xSmall,
    textAlign: 'center',
  },
  handle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginHorizontal: 1,
  },
});

export default CSwitchButton;
