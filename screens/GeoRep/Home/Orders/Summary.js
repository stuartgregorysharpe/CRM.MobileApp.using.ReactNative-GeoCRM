import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import SummaryList from './components/SummaryList';
import dummyData from './dummyData.json';
import OrderDetailModal from './modals/OrderDetailModal';
const Summary = props => {
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const orderDetailRef = useRef(null);
  const onItemAction = _item => {
    setItem(_item);
    orderDetailRef.current.showModal();
  };
  useEffect(() => {
    onLoadSummary(0);
  }, []);

  const onLoadSummary = _page => {
    const params = {
      page_nr: _page,
    };
    getApiRequest('dashorders/summary', params).then(async res => {
      if (_page == 0) {
        setOrders(res.orders);
      } else {
        setOrders([...orders, ...res.orders]);
      }
    });
  };
  return (
    <View style={[styles.container, props.style]}>
      <SummaryList
        items={orders}
        onItemAction={onItemAction}
        loadMoreData={() => {
          onLoadSummary(page);
          setPage(page + 1);
        }}
      />
      <OrderDetailModal item={item} ref={orderDetailRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default Summary;
