import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {dummyApiRequest} from '../../../../actions/api.action';
import TrendChartView from '../components/TrendChartView';
import dummyData from '../dummyData.json';
const TrendsContainer = props => {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    const params = {};
    dummyApiRequest('touchpoints/trends', params, dummyData.trends)
      .then(trends => {
        setTrends(trends);
      })
      .catch(error => {});
  };
  return (
    <View style={[styles.container, props.style]}>
      <TrendChartView data={trends} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TrendsContainer;
