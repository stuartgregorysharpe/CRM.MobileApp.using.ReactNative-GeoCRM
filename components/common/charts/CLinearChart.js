import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../../constants';
const CLinearChart = props => {
  return (
    <LineChart
      withVerticalLines={true}
      withShadow={false}
      fromZero={true}
      chartConfig={{
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        backgroundGradientFromOpacity: 1,
        backgroundGradientToOpacity: 1,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => Colors.blackColor,
        labelColor: (opacity = 1) => Colors.blackColor,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '4',
        },
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default CLinearChart;
