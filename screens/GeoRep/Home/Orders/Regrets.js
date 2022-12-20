import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import RegretsList from './components/RegretsList';
import regretDummyData from './regretDummyData.json';

const Regrets = props => {
  const {navigation} = props;
  const [regrets, setRegrets] = useState([]);
  const onLoadRegrets = _page => {
    const params = {
      page_nr: _page,
    };
    getApiRequest('dashorders/regrets', params).then(async res => {
      if (_page == 0) {
        setRegrets(res.regrets);
      } else {
        setRegrets([...regrets, ...res.regrets]);
      }
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
  return (
    <View style={[styles.container, props.style]}>
      <RegretsList
        items={regrets}
        onItemAction={onItemAction}
        loadMoreData={() => {
          onLoadRegrets(page);
          setPage(page + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default Regrets;
