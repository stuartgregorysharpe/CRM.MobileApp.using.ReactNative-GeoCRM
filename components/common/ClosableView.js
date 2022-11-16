import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, Fonts, Values} from '../../constants';

const ClosableView = props => {
  const {closeText, isVisible} = props;
  if (!isVisible) return null;
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}>
        <Text style={styles.closeText}>{closeText || 'Close'}</Text>
      </TouchableOpacity>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 32,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 8,
  },
  closeText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },
});

export default ClosableView;
