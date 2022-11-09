import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import PointOfSaleFormView from '../components/PointOfSaleFormView';

const PointOfSaleFormContainer = props => {
  const [formData, setFormData] = useState(null);
  const {product} = props;

  useEffect(() => {
    constructPOSFormData(product);
  }, [product]);
  if (!product) return null;
  const constructPOSFormData = product => {
    if (!product) return;
    const posFormData = {
      touchpoint: '',
      placement_type: '',
      area: '',
      product_id: product.product_id,
      qty: '',
      image_index: '',
      product_name: product.product_name,
    };
    setFormData(posFormData);
  };
  return (
    <View style={[styles.container, props.style]}>
      <PointOfSaleFormView formData={formData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default PointOfSaleFormContainer;
