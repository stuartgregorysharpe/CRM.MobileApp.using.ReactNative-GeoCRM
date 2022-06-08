import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {dummyApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import HistoryList from '../components/HistoryList';
import dummyData from '../dummyData.json';
const PAGE_SIZE = 50;

const HistoryContainer = props => {
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchedCount, setLastFetchedCount] = useState(0);
  useEffect(() => {
    onLoad();
  }, []);
  const onSearch = text => {};
  const onFilterPress = () => {};
  const onItemAction = ({type, item}) => {
    if (props.onItemAction) {
      props.onItemAction({type, item});
    }
  };
  const onLoad = (pageIndex = 0, pageSize = PAGE_SIZE) => {
    const params = {
      page: pageIndex,
      keyword: keyword,
    };
    setIsLoading(true);
    dummyApiRequest('touchpoints/history', params, dummyData.historyList)
      .then(fetchedItems => {
        setLastFetchedCount(fetchedItems.length);
        setPageIndex(pageIndex);
        setIsLoading(false);
        if (pageIndex == 0) {
          setItems(fetchedItems);
        } else {
          setItems([...items, ...fetchedItems]);
        }
      })
      .catch(error => {
        setIsLoading(false);
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
