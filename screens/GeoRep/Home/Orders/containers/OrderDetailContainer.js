import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../../actions/api.action';
import OrderDetailView from '../components/OrderDetailView';

const OrderDetailContainer = props => {
  const [items, setItems] = useState([]);
  const {item} = props;
  useEffect(() => {
    if (item) {
      loadOrderDetails();
    }
  }, [item]);
  const loadOrderDetails = () => {
    const params = {
      order_id: item.order_id,
    };
    getApiRequest('dashorders/order-details', params).then(async res => {
      setItems(res.products);
    });
  };

  return <OrderDetailView items={items} />;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default OrderDetailContainer;
