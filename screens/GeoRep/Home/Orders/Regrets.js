import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getApiRequest} from '../../../../actions/api.action';
import {setRegret, setSalesSearchText} from '../../../../actions/sales.action';
import {storeJsonData, storeLocalValue} from '../../../../constants/Storage';
import RegretsList from './components/RegretsList';
import regretDummyData from './regretDummyData.json';
const PAGE_SIZE = 20;

const Regrets = props => {
  const {navigation} = props;

  const [regrets, setRegrets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPageSize, setLastPageSize] = useState(0);
  const dispatch = useDispatch();

  const onLoadRegrets = _page => {
    if (isLoading) return false;
    setIsLoading(true);
    const params = {
      page_nr: _page,
    };
    console.log('dashorders/regrets', params);
    getApiRequest('dashorders/regrets', params)
      .then(async res => {
        console.log('res', res);
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
  const onItemAction = async item => {

    setIsLoading(true);
    dispatch(setRegret(item));
    
    await storeJsonData('@regret' , item);
    await storeLocalValue('@regret_sales_initialize', '1');

    if(item?.regret_id != undefined && item?.location_name != undefined){
      navigation.navigate('More', {
        screen: 'ProductSales',
        params: {screen: 'Root', params: {regret_item: item}},
      });
    }
    setIsLoading(false);
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
