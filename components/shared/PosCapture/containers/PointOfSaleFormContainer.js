import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import {Strings} from '../../../../constants';
import {SubmitButton} from '../../SubmitButton';
import PointOfSaleFormView from '../components/PointOfSaleFormView';
import {getPlacementAreas, getPlacementTypes, getTouchpoints} from '../helper';

const PointOfSaleFormContainer = props => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const {product, item} = props;
  const placementTypeList = useMemo(() => getPlacementTypes(item), [item]);
  const areaList = useMemo(
    () => getPlacementAreas(item, formData?.placement_type),
    [item, formData?.placement_type],
  );
  const touchpointList = useMemo(() => getTouchpoints(item), [item]);
  useEffect(() => {
    constructPOSFormData(product);
  }, [product]);
  if (!product) return null;
  const constructPOSFormData = product => {
    if (!product) return;
    const posFormData = {
      ...product,
      touchpoint: '',
      placement_type: '',
      area: '',
      product_id: product.product_id,
      qty: '',
      image_index: '',
      image: null,
    };
    setFormData(posFormData);
  };
  const validateForm = formData => {
    const errorMessage = Strings.Complete_Compulsory_Fields;
    if (!formData) return errorMessage;
    if (
      !formData.touchpoint ||
      formData.touchpoint == '' ||
      !formData.placement_type ||
      formData.placement_type == '' ||
      !formData.area ||
      formData.area == '' ||
      !formData.qty ||
      formData.qty == ''
    )
      return errorMessage;
    return false;
  };
  const onRecord = data => {
    const errorMessage = validateForm(data);
    if (errorMessage) {
      dispatch(
        showNotification({
          type: 'success',
          message: errorMessage,
          buttonText: 'Ok',
          buttonAction: () => {
            dispatch(clearNotification());
          },
        }),
      );
      return;
    }
    if (props.onRecord) {
      props.onRecord(data);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <PointOfSaleFormView
        formData={formData}
        product={product}
        placementTypeList={placementTypeList}
        areaList={areaList}
        touchpointList={touchpointList}
        onUpdateFormData={data => {
          console.log('onUpdateformData', data);
          if (data) {
            setFormData({...formData, ...data});
          }
        }}
      />
      <SubmitButton
        title={'Record'}
        style={{marginVertical: 16}}
        onSubmit={() => {
          onRecord(formData);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default PointOfSaleFormContainer;
