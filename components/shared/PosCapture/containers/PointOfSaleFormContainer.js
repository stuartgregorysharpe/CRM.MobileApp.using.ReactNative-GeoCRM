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
  const [errors, setErrors] = useState({
    placement_type: false,
    area: false,
    qty: false,
    touchpoint: false,
  });
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
    const _touchpointList = getTouchpoints(item);
    const posFormData = {
      ...product,
      touchpoint: _touchpointList.length > 0 ? _touchpointList[0] : '',
      placement_type: '',
      area: '',
      product_id: product.product_id,
      qty: '',
      image_index: '',
      image: null,
    };
    
    setFormData(posFormData);
    setErrors({
      placement_type: false,
      area: false,
      qty: false,
      touchpoint: false,
    });
  };
  const validateForm = (_formData, isPartialValidate = false) => {
    const errorMessage = Strings.Complete_Required_Fields;
    if (!_formData) return errorMessage;
    const _errors = {};
    let result = false;
    if (!isPartialValidate || _formData.touchpoint !== undefined) {
      if (!_formData.touchpoint || _formData.touchpoint == '') {
        _errors['touchpoint'] = true;
        result = errorMessage;
      } else {
        _errors['touchpoint'] = false;
      }
    }
    if (!isPartialValidate || _formData.placement_type !== undefined) {
      if (!_formData.placement_type || _formData.placement_type == '') {
        _errors['placement_type'] = true;
        result = errorMessage;
      } else {
        _errors['placement_type'] = false;
      }
    }
    if (!isPartialValidate || _formData.area !== undefined) {
      if (!_formData.area || _formData.area == '') {
        _errors['area'] = true;
        result = errorMessage;
      } else {
        _errors['area'] = false;
      }
    }
    if (!isPartialValidate || _formData.qty !== undefined) {
      if (!_formData.qty || _formData.qty == '' || _formData.qty == 0) {
        _errors['qty'] = true;
        result = errorMessage;
      } else {
        _errors['qty'] = false;
      }
    }
    setErrors({...errors, ..._errors});
    return result;
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
        isOptimize={item.optimize}
        image_timestamp={item.image_timestamp}
        formData={formData}
        product={product}
        placementTypeList={placementTypeList}
        areaList={areaList}
        errors={errors}
        touchpointList={touchpointList}
        onUpdateFormData={data => {
          console.log('onUpdateformData', data);
          if (data) {
            validateForm(data, true);
            const newFormData = {...formData, ...data};
            setFormData(newFormData);
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
