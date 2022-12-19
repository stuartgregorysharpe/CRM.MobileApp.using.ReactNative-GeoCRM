import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import OrderDetailView from '../components/OrderDetailView';
import detailDummyData from '../detailDummyData.json';
const OrderDetailContainer = props => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(detailDummyData.products);
  }, []);
  return <OrderDetailView items={items} />;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default OrderDetailContainer;
