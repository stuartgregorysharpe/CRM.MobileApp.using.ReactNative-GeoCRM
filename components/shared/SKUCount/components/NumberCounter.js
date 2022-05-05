import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Values} from '../../../../constants';

const NumberCounter = props => {
  const {count} = props;
  const onCount = isPlus => {
    if (props.onCount) {
      props.onCount(isPlus);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => onCount(false)}>
        <Text style={styles.buttonText}>{'-'}</Text>
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        <Text style={styles.text}>{count}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => onCount(true)}>
        <Text style={styles.buttonText}>{'+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
  },
  buttonText: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.small,
    color: Colors.primaryColor,
  },
  buttonStyle: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    width: 24,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NumberCounter;
