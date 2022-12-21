import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import SummaryList from './components/SummaryList';
import dummyData from './dummyData.json';
import OrderDetailModal from './modals/OrderDetailModal';
const PAGE_SIZE = 20;
const Summary = props => {
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPageSize, setLastPageSize] = useState(0);
  const orderDetailRef = useRef(null);
  const onItemAction = _item => {
    setItem(_item);
    orderDetailRef.current.showModal();
  };
  useEffect(() => {
    onLoadSummary(0);
  }, []);
  console.log('isLoading', isLoading);
  console.log('lastPageSize', lastPageSize);

  const onLoadSummary = _page => {
    if (isLoading) return false;
    setIsLoading(true);
    const params = {
      page_nr: _page,
    };
    getApiRequest('dashorders/summary', params)
      .then(async res => {
        if (_page == 0) {
          setOrders(res.orders);
        } else {
          setOrders([...orders, ...res.orders]);
        }
        setIsLoading(false);
        setLastPageSize(res.orders.length);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  const onLoadMore = () => {
    if (lastPageSize == PAGE_SIZE && !isLoading) {
      const newPage = page + 1;
      setPage(newPage);
      onLoadSummary(newPage);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <SummaryList
        items={orders}
        onItemAction={onItemAction}
        loadMoreData={onLoadMore}
        isLoading={isLoading}
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
