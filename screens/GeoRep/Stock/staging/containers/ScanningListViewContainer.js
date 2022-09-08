import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../../../../../components/SearchBar';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Values} from '../../../../../constants';

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
  const onAccept = () => {
    if (props.onAccept) {
      props.onAccept(items);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar onSearch={onSearch} />
      <ShipmentViewList
        items={networkGroups}
        style={{flex: 1}}
        onItemAction={props.onItemAction}
      />
      <SubmitButton
        title={'Accept'}
        onSubmit={onAccept}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: Values.deviceHeight * 0.7,
  },
  submitButton: {
    margin: 8,
  },
});

export default ScanningListViewContainer;
