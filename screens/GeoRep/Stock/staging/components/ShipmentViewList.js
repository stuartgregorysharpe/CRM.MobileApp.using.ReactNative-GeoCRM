import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values, Constants} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';

import ShipmentViewListItem from './ShipmentViewListItem';

const ShipmentViewList = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <ShipmentViewListItem
        item={item}
        key={index + 'item'}
        onItemAction={props.onItemAction}
        isLast={isLast}
      />
    );
  };
  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={items}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryRegular,
    color: whiteLabel().mainText,
  },
});

export default ShipmentViewList;
