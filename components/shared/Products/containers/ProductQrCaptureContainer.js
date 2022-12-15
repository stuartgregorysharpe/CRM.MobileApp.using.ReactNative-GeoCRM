import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {getProductForId} from '../../SKUSelect/helper';
import ProductQrCaptureView from '../components/ProductQrCaptureView';
//import {getProductForId} from '../helper';

const ProductQrCaptureContainer = props => {
  const {formData, item} = props;
  const totalItemCount = formData ? formData.selectedProductIds.length : 0;
  const getLastProduct = () => {
    if (!formData) return false;
    if (formData.selectedProductIds.length > 0) {
      const lastProductId =
        formData.selectedProductIds[formData.selectedProductIds.length - 1];

      return getProductForId(item.products, lastProductId);
      //return getProductForId(item.products, lastProductId);
    }
    return false;
  };
  const lastProduct = getLastProduct();
  const lastScanedQrCode = lastProduct ? lastProduct.barcode : null;

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <ProductQrCaptureView
        onButtonAction={onButtonAction}
        totalItemCount={totalItemCount}
        lastScanedQrCode={lastScanedQrCode}
        products={props.products}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default ProductQrCaptureContainer;
