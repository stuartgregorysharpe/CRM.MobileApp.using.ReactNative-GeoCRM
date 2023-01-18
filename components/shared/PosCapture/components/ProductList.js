import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Fonts, Values} from '../../../../constants';
import {whiteLabel} from '../../../../constants/Colors';
import {boxShadow, style} from '../../../../constants/Styles';
import ProductItem from './ProductItem';

const ProductList = props => {
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
      <View
        style={[
          boxShadow,
          {alignSelf: 'stretch', backgroundColor: 'white', borderRadius: 4},
        ]}>
        <FlatList
          data={items}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 40,
                marginHorizontal: 8,
                marginBottom: 8,
              }}>
              <Text style={[styles.title, {flex: 1}]}>Category</Text>
              <Text style={[styles.title, {flex: 1}]}>Product</Text>
              <Text style={[styles.title, {flex: 1}]}>Brand</Text>
            </View>
          )}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
});

export default ProductList;
