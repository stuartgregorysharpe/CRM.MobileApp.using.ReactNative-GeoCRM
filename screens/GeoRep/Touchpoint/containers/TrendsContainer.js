import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import TrendChartView from '../components/TrendChartView';
import {getTrendsData} from '../helper';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../constants/Helper';

const TrendsContainer = props => {

  const [trends, setTrends] = useState(null);
  const {locationId} = props;
  const dispatch = useDispatch()

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    const params = {
      location_id: locationId,
    };
    getApiRequest('touchpoints/location-trend', params)
      .then(data => {
        const trends = getTrendsData(data);
        setTrends(trends);
      })
      .catch(e => {
          expireToken(dispatch ,e)
      });
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
