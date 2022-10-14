import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import TieredSingleSelectView from '../../../../components/common/TieredMultiSelect/TieredSingleSelectView';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {Constants} from '../../../../constants';
import ProductSelectItem from '../components/ProductSelectItem';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../constants/Helper';

const ProductChannelTieredContainer = props => {

  const {opportunityName, selectedProduct, locationId, onButtonAction} = props;
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dropdownLabels = ['Channel', 'Sub-Channel', 'Type', 'Products'];
  const [selectedProductItem, setSelectedProductItem] =
    useState(selectedProduct);
  const [selectedDropdownValues, setSelectedDropdownValues] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedProduct) {
      const _dropdownValues = [
        {label: selectedProduct.channel},
        {label: selectedProduct.sub_channel},
        {label: selectedProduct.product_type},
      ];
      setSelectedDropdownValues(_dropdownValues);
    } else {
      setSelectedDropdownValues([]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    onLoad();
  }, [opportunityName, locationId]);

  const onLoad = () => {
    setIsLoading(true);
    const param = {};
    if (opportunityName && opportunityName != '') {
      param.product = opportunityName;
    }
    if (locationId && locationId != '') {
      param.location_id = locationId;
    }    
    getApiRequest('pipeline/product-channel-fields', param)
      .then(data => {
        setIsLoading(false);        
        setItem(data.product_channel);
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch , e);
      });
  };

  const renderLeafOption = (item, index, isLast, isChecked, onItemAction) => {
    return (
      <ProductSelectItem
        isChecked={isChecked}
        item={item}
        key={index + 'item'}
        isLast={isLast}
        onItemAction={onItemAction}
      />
    );
  };

  return (
    <View style={[styles.container, props.style]}>
      <TieredSingleSelectView
        options={item}
        dropdownLabels={dropdownLabels}
        selectedDropdownValues={selectedDropdownValues}
        checkedValue={selectedProductItem?.product_id}
        onLeafItemSelected={(item, selectedDropdownValues) => {
          setSelectedProductItem(item);
          setSelectedDropdownValues(selectedDropdownValues);
        }}
        renderLeafOption={renderLeafOption}
        idFieldName="product_id"
        labelFieldName="product"
      />
      <SubmitButton
        title={'Save'}
        onSubmit={() => {
          onButtonAction({
            type: Constants.actionType.ACTION_FORM_SUBMIT,
            selectedProductItem: selectedProductItem,
            selectedDropdownValues,
          });
        }}
        style={{marginTop: 12, marginHorizontal: 8}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default ProductChannelTieredContainer;
