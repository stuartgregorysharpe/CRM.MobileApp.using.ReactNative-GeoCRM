import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Constants} from '../../../../constants';
import SKUScanView from '../components/SKUScanView';
import {getProductForId} from '../helper';

const SKUScanContainer = props => {
  const {formData, item} = props;
  const totalItemCount = formData ? formData.selectedProductIds.length : 0;
  const getLastProduct = () => {
    if (!formData) return false;
    if (formData.selectedProductIds.length > 0) {
      const lastProductId =
        formData.selectedProductIds[formData.selectedProductIds.length - 1];
      return getProductForId(item.products, lastProductId);
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
      <SKUScanView
        onButtonAction={onButtonAction}
        totalItemCount={totalItemCount}
        lastScanedQrCode={lastScanedQrCode}
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

export default SKUScanContainer;
