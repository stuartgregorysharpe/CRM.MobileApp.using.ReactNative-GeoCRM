import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CLinearChart from '../../../../components/common/charts/CLinearChart';
import {Values} from '../../../../constants';

const TrendChartView = props => {
  const colors = ['red', 'blue'];
  return (
    <View style={[styles.container, props.style]}>
      <CLinearChart
        segments={10}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          decimalPlaces: 0,
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => {
                return 'red';
              },
            },
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => {
                return 'blue';
              },
            },
            {
              data: [0], // min
              color: () => {
                return 'white';
              },
            },
            {
              data: [100], // max
              color: () => {
                return 'white';
              },
            },
          ],
        }}
        width={Values.deviceWidth - 32} // from react-native
        height={412}
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default TrendChartView;
