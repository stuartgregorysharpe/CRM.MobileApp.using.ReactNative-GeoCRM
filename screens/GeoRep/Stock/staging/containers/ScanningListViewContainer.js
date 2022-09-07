import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-screens';
import ShipmentViewList from '../components/ShipmentViewList';
import {filterItems, groupByNetworkFromItems} from '../helper';

const ScanningListViewContainer = props => {
  const items = useMemo(
    () => filterItems(props.items, keyword),
    [props.items, keyword],
  );
  const networkGroups = useMemo(() => groupByNetworkFromItems(items), [items]);
  const [keyword, setKeyword] = useState('');
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar onSearch={onSearch} />
      <ShipmentViewList items={networkGroups} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 300,
  },
});

export default ScanningListViewContainer;
