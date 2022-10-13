import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import HistoryList from '../components/HistoryList';
import {getHistoryListItems} from '../helper';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../constants/Helper';
const PAGE_SIZE = 50;

const HistoryContainer = props => {

  const [items, setItems] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedCount, setLastFetchedCount] = useState(0);
  const {locationId} = props;
  const dispatch = useDispatch()


  useEffect(() => {
    onLoad();
  }, []);
  const onItemAction = ({type, item}) => {
    if (props.onItemAction) {
      props.onItemAction({type, item});
    }
  };

  const onLoad = (pageIndex = 1, pageSize = PAGE_SIZE) => {
    const params = {
      location_id: locationId,
      page_nr: pageIndex,
    };
    setIsLoading(true);
    getApiRequest('touchpoints/location-history', params)
      .then(data => {
        const fetchedItems = getHistoryListItems(data);
        setLastFetchedCount(fetchedItems.length);
        setPageIndex(pageIndex);
        setIsLoading(false);
        if (pageIndex == 1) {
          setItems(fetchedItems);
        } else {
          setItems([...items, ...fetchedItems]);
        }
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch , e);
      });
  };

  const onLoadMore = (pageSize = PAGE_SIZE) => {
    if (lastFetchedCount == pageSize && !isLoading) {
      onLoad(pageIndex + 1);
    }
  };
  
  return (
    <View style={[styles.container, props.style]}>
      <HistoryList
        items={items}
        onItemAction={onItemAction}
        refreshing={isLoading}
        onRefresh={onLoad}
        onEndReached={() => {
          onLoadMore();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryContainer;
