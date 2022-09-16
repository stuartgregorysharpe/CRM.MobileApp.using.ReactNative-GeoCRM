import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {getApiRequest} from '../../../../actions/api.action';
import TieredMuliSelectView from '../../../../components/common/TieredMultiSelect/TieredMultiSelectView';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {Constants} from '../../../../constants';
import ProductSelectItem from '../components/ProductSelectItem';

const ProductChannelTieredContainer = props => {
  const {opportunityName, selectedChannel, locationId, onButtonAction} = props;
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dropdownLabels = ['Channel', 'Sub-Channel', 'Type', 'Products'];
  const [selectedProductIds, setSelectedProductIds] = useState(
    props.selectedProductIds,
  );

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
      .catch(error => {
        setIsLoading(false);
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
      <TieredMuliSelectView
        options={item}
        dropdownLabels={dropdownLabels}
        checkedValueList={selectedProductIds}
        onLeafItemSelected={item => {
          let _selectedProductIds = [...selectedProductIds];
          if (_selectedProductIds.length > 0) {
            const foundId = _selectedProductIds.find(x => x == item.product_id);
            if (foundId) {
              _selectedProductIds = _selectedProductIds.filter(
                x => x != item.product_id,
              );
            } else {
              _selectedProductIds.push(item.product_id);
            }
          } else {
            _selectedProductIds.push(item.product_id);
          }
          setSelectedProductIds(_selectedProductIds);
        }}
        renderLeafOption={renderLeafOption}
        idFieldName="product_id"
      />
      <SubmitButton
        title={'Save'}
        onSubmit={() => {
          onButtonAction({
            type: Constants.actionType.ACTION_FORM_SUBMIT,
            selectedProductIds: selectedProductIds,
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
