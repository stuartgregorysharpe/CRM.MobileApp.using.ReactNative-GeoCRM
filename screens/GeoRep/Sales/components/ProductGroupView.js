import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ProductGroupItem from './items/ProductGroupItem';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import ProductItem from './items/ProductItem';

const ProductGroupView = props => {
  const {products, settings, isUpdatingProductPrice} = props;

  const renderItem = (_item, index) => {
    let item = _item;
    if (props.getItemData) {
      item = props.getItemData(_item);
    }
    if (item.count == undefined) {
      return (
        <ProductItem
          key={index}
          isLoading={isUpdatingProductPrice}
          settings={settings}
          geProductPrice={(product_id, qty) => {
            if (props.geProductPrice) {
              props.geProductPrice(product_id, qty);
            }
          }}
          openProductDetail={item => {
            if (props.openProductDetail) {
              props.openProductDetail(item);
            }
          }}
          item={item}
        />
      );
    }
  };

  const onSave = () => {
    if (props.onSaveProduct) {
      props.onSaveProduct();
    }
  };

  return (
    <View
      style={{
        marginBottom: 50,
      }}>
      <FlatList
        data={products}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={false}
      />

      <SubmitButton title="Save" onSubmit={onSave} />
    </View>
  );
};

export default ProductGroupView;

const styles = StyleSheet.create({});
