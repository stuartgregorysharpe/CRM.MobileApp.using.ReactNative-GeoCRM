import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../../constants';
import {whiteLabel} from '../../../../../constants/Colors';
import ProductItem from './ProductItem';

const OrderDetailView = props => {
  const {items} = props;
  const renderItem = (item, index) => {
    const isLast = index == items.length - 1;
    return (
      <ProductItem
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
    marginHorizontal: 8,
    marginBottom: 16,
    maxHeight: Values.deviceHeight * 0.8,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
});

export default OrderDetailView;
