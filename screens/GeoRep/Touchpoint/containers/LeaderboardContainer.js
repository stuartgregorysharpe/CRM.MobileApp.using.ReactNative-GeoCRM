import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import LeaderboardList from '../components/LeaderboadList';
import {getLeaderboardItems} from '../helper';

const LeaderboardContainer = props => {
  const [keyword, setKeyword] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  useEffect(() => {
    onLocalFilter();
  }, [keyword]);
  const onSearch = text => {
    setKeyword(text);
  };
  const onFilterPress = () => {};
  const onItemAction = ({type, item}) => {};

  const onLoad = () => {
    const params = {};
    setIsLoading(true);
    getApiRequest('touchpoints/leaderboard', params)
      .then(data => {
        const fetchedItems = getLeaderboardItems(data);
        setIsLoading(false);
        setItems(fetchedItems);
        setAllItems(fetchedItems);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  const onLocalFilter = () => {
    if (!keyword || keyword == '') {
      setItems(allItems);
      return;
    }
    const filteredItems = allItems.filter(x => {
      if (!x.username) return false;
      return x.username.toLowerCase().includes(keyword.toLowerCase());
    });
    setItems(filteredItems);
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar
        onSearch={onSearch}
        initVal={keyword}
        isFilter={false}
        onSuffixButtonPress={onFilterPress}
      />
      <LeaderboardList
        items={items}
        onItemAction={onItemAction}
        refreshing={isLoading}
        onRefresh={onLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LeaderboardContainer;
