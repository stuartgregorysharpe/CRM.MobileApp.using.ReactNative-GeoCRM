import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import StagingView from './StagingView';
import dummyData from './dummyData.json';
import {getItemsFromShipments} from './helper';
const StockStagingContainer = props => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    onLoad();
  }, []);
  const onLoad = () => {
    const _items = getItemsFromShipments(dummyData.shipments);
    setItems(_items);
  };
  return <StagingView items={items} />;
};

export default StockStagingContainer;
