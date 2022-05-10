import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Fonts, Values} from '../../../../constants';

const NumberCounter = props => {
  const {count} = props;
  const onCount = isPlus => {
    if (props.onCount) {
      if (isPlus) {
        props.onCount(count + 1);
      } else {
        const nextCount = count - 1;
        if (nextCount < 0) {
          props.onCount(0);
        } else {
          props.onCount(nextCount);
        }
      }
    }
  };
  const onChangeCount = count => {
    if (props.onCount) {
      if (count && Number(count) >= 0) {
        props.onCount(Number(count));
      } else {
        props.onCount(0);
      }
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
        <TextInput
          style={styles.textInput}
          value={count + ''}
          onChangeText={text => {
            onChangeCount(text);
          }}
          keyboardType={'number-pad'}
        />
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
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    padding: 0,
    textAlign: 'center',
    marginHorizontal: 8,
    marginVertical: 0,
    minHeight: 24,
  },
  buttonText: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.small,
    color: Colors.primaryColor,
  },
  buttonStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
});

export default NumberCounter;
