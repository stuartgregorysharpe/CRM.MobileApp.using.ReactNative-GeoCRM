import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import TrendChartView from '../components/TrendChartView';

const TrendsContainer = props => {
  return (
    <View style={[styles.container, props.style]}>
      <TrendChartView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TrendsContainer;
