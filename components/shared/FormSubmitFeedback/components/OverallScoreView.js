import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../../../constants';
import CCircularProgress from '../../../common/CCircularProgress';

const OverallScoreView = props => {
  const {overallScore} = props;
  const percentage = Number(overallScore);
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title}>{'Overall Score'}</Text>
      <CCircularProgress
        radius={28}
        activeStrokeWidth={8}
        value={percentage}
        valueSuffix="%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.secondaryBold,
    color: Colors.blackColor,
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default OverallScoreView;
