import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';

const YesNoFeedbackView = props => {
  const {data} = props;
  if (!data) return null;
  const isNo = data.answer == 'no';
  const title = isNo ? 'No' : 'Yes';
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.buttonStyle}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: whiteLabel().actionFullButtonBackground,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 24,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.primaryMedium,
    color: whiteLabel().actionFullButtonText,
  },
  container: {
    alignSelf: 'stretch',
  },
});

export default YesNoFeedbackView;
