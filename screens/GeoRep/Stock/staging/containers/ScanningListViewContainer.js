import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../../../../../components/SearchBar';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {Values} from '../../../../../constants';

import ShipmentViewList from '../components/ShipmentViewList';
import {filterItems, groupByNetworkFromItems} from '../helper';

const ScanningListViewContainer = props => {
  const [keyword, setKeyword] = useState('');
  const items = useMemo(
    () => filterItems(props.items, keyword),
    [props.items, keyword],
  );
  const networkGroups = useMemo(() => groupByNetworkFromItems(items), [items]);
  const onSearch = keyword => {
    setKeyword(keyword);
  };

  const renderButtonActions = () => {
    const buttons = [];
    if (props.onSellToTrader) {
      buttons.push(
        <SubmitButton
          key="sellToTrader"
          title={'Sell To Trader'}
          onSubmit={props.onSellToTrader}
          style={styles.submitButton}
        />,
      );
    }
    
    // if (props.onTransfer) {
    //   buttons.push(
    //     <SubmitButton
    //       key="transfer"
    //       title={'Transfer'}
    //       onSubmit={props.onTransfer}
    //       style={styles.submitButton}
    //     />,
    //   );
    // }

    if (props.onAccept) {
      buttons.push(
        <SubmitButton
          key="accept"
          title={'Accept'}
          onSubmit={() => {
            props.onAccept(props.items);
          }}
          style={styles.submitButton}
        />,
      );
    }
    return buttons;
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar onSearch={onSearch} />
      <ShipmentViewList
        items={networkGroups}
        style={{flex: 1, marginBottom: 8}}
        onItemAction={props.onItemAction}
      />
      {renderButtonActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: Values.deviceHeight * 0.7,
  },
  submitButton: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
});

export default ScanningListViewContainer;
