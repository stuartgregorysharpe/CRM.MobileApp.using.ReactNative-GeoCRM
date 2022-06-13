import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import CLinearChart from '../../../../components/common/charts/CLinearChart';
import {Colors, Values} from '../../../../constants';
import CardView from '../../../../components/common/CardView';
const LegendItem = props => {
  const {color, title} = props;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        props.style,
      ]}>
      <Text
        style={{
          marginRight: 40,
          fontSize: 12,
          lineHeight: 14,
          color: Colors.disabledColor,
        }}>
        {title}
      </Text>
      <View style={{width: 10, height: 10, backgroundColor: color}} />
    </View>
  );
};
const TrendChartView = props => {
  const {data} = props;
  if (!data) return <ActivityIndicator />;
  const colors = [Colors.primaryColor, Colors.yellowColor];
  const getColorForIndex = index => {
    let colorIndex = index;
    if (colorIndex > 1) return colors[0];
    return colors[colorIndex];
  };
  const getDataSet = trendData => {
    const dataset = trendData.data.map((item, index) => {
      return {
        data: item.overall_score,
        color: () => {
          return getColorForIndex(index);
        },
      };
    });
    dataset.push(
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
    );
    return dataset;
  };
  const datasets = getDataSet(data);
  const renderLegends = () => {
    return data.data.map((item, index) => {
      return (
        <LegendItem
          key={index + 'legend'}
          title={item.name}
          color={getColorForIndex(index)}
          style={{marginBottom: 4, width: 200}}
        />
      );
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      <CardView style={{paddingRight: 16, paddingTop: 16, paddingBottom: 16}}>
        <CLinearChart
          segments={10}
          data={{
            labels: data.months,
            datasets: datasets,
          }}
          width={Values.deviceWidth - 50} // from react-native
          height={412}
          yAxisSuffix=" %"
          formatYLabel={value => {
            if (value !== undefined) {
              return Number(value).toFixed(0);
            }
            return value;
          }}
          yAxisInterval={1} // optional, defaults to 1
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View
          style={{alignSelf: 'stretch', alignItems: 'center', marginTop: -48}}>
          {renderLegends()}
        </View>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
  },
});

export default TrendChartView;
