import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import StagingView from './StagingView';
import dummyData from './dummyData.json';
const StockStagingContainer = props => {
  const [shipments, setShipments] = useState([]);
  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    setShipments(dummyData.shipments);
  };
  return <StagingView shipments={shipments} />;
};

export default StockStagingContainer;
