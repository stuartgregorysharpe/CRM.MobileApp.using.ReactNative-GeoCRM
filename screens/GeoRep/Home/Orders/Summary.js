import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import SummaryList from './components/SummaryList';
import dummyData from './dummyData.json';
import OrderDetailModal from './modals/OrderDetailModal';
const Summary = props => {
  const [item, setItem] = useState(null);
  const orderDetailRef = useRef(null);
  const onItemAction = _item => {
    setItem(_item);
    orderDetailRef.current.showModal();
  };
  return (
    <View style={[styles.container, props.style]}>
      <SummaryList items={dummyData.orders} onItemAction={onItemAction} />
      <OrderDetailModal item={item} ref={orderDetailRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default Summary;
