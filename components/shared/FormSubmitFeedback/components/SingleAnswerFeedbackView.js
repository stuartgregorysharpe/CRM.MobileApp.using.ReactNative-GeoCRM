import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {whiteLabel} from '../../../../constants/Colors';
import Colors from '../../../../constants/Colors';

const SingleAnswerFeedbackView = props => {
  const {data} = props;
  if (!data) return null;
  const answer = data.answer;
  if (!answer) return null;

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.blackColor,
  },
});

export default SingleAnswerFeedbackView;
