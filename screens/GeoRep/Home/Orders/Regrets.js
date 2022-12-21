import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import RegretsList from './components/RegretsList';
import regretDummyData from './regretDummyData.json';
const PAGE_SIZE = 20;
const Regrets = props => {
  const {navigation} = props;
  const [regrets, setRegrets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPageSize, setLastPageSize] = useState(0);

  const onLoadRegrets = _page => {
    if (isLoading) return false;
    setIsLoading(true);
    const params = {
      page_nr: _page,
    };
    console.log('dashorders/regrets', params);
    getApiRequest('dashorders/regrets', params)
      .then(async res => {
        if (_page == 0) {
          setRegrets(res.regrets);
        } else {
          setRegrets([...regrets, ...res.regrets]);
        }
        setLastPageSize(res.regrets.length);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  const onItemAction = item => {
    navigation.navigate('Home', {
      screen: 'ProductSales',
      params: {regret_item: item},
    });
  };
  useEffect(() => {
    onLoadRegrets(0);
  }, []);
  const onLoadMore = () => {
    if (lastPageSize == PAGE_SIZE && !isLoading) {
      const newPage = page + 1;
      setPage(newPage);
      onLoadRegrets(newPage);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <RegretsList
        items={regrets}
        onItemAction={onItemAction}
        loadMoreData={onLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default Regrets;
