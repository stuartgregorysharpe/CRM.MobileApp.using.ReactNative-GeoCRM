import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Constants, Fonts, Values} from '../../../../constants';
import Colors, {whiteLabel} from '../../../../constants/Colors';
import {
  integerFieldValidator,
  numberFieldValidator,
} from '../../../../constants/Helper';
import {boxShadow, style} from '../../../../constants/Styles';
import CSingleSelectInput from '../../../common/SelectInput/CSingleSelectInput';
import ImagePickerButton from '../../../ImagePickerButton';
import SvgIcon from '../../../SvgIcon';
import {Button} from '../../Button';

const TouchpointItem = props => {
  const {isSelected, value} = props;


  return (
    <Button
      style={styles.buttonStyle}
      selectedButtonStyle={styles.selectedButtonStyle}
      textStyle={styles.buttonTextStyle}
      title={value}
      onTaped={isSelected}
      onClick={() => {
        if (props.onPressItem) {
          props.onPressItem(value);
        }
      }}></Button>
  );
};
const TouchpointFlowList = props => {
  const {items, selectedItem, onPressItem} = props;
  
  if (!items) return null;
  return items.map((item, index) => (
    <TouchpointItem
      key={index + 'touchpoint'}
      value={item}
      isSelected={item == selectedItem}
      onPressItem={onPressItem}
    />
  ));
};

const POSItemView = props => {
  const { isOptimize , image_timestamp, formData, errors} = props;
  if (!formData) return null;
  const {product_type, touchpoint, area, qty, product_name} = formData;

  const fixed = props.fixed || 0;
  const onChangeQuantity = (_qtyText, _isConvertToNumber) => {
    let isConvertToNumber = _isConvertToNumber;
    let qtyText = _qtyText;
    if (typeof qtyText === 'string' || qtyText instanceof String) {
      while (!integerFieldValidator(qtyText) && qtyText != '') {
        qtyText = qtyText.substring(0, qtyText.length - 1);
      }
    }

    let nextQty = isConvertToNumber ? Number(qtyText).toFixed(fixed) : qtyText;
    if ((nextQty == 0 || nextQty == 'NaN') && isConvertToNumber) {
      nextQty = '';
    }
    onUpdateFormData({
      qty: nextQty,
    });
  };
  const onUpdateFormData = data => {
    if (props.onUpdateFormData) {
      props.onUpdateFormData(data);
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {flex: 4}]}>Type</Text>
        <Text style={[styles.title, {flex: 4}]}>POS</Text>
        <Text style={[styles.title, {flex: 3}]}>Qty</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          marginHorizontal: 8,
        }}>
        <Text style={styles.text}>{product_type}</Text>
        <Text style={styles.text}>{product_name}</Text>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={[
              styles.textInput,
              errors?.qty && {
                borderColor: Colors.selectedRedColor,
              },
            ]}
            value={qty + ''}
            onChangeText={text => {
              onChangeQuantity(text);
            }}
            onBlur={() => {
              onChangeQuantity(qty, true);
            }}
            onEndEditing={() => {
              onChangeQuantity(qty, true);
            }}
            keyboardType={'number-pad'}
          />
          <ImagePickerButton
            isOptimize={isOptimize}
            image_timestamp={image_timestamp}
            onPickImage={asset => {
              if (asset?.uri) {
                onUpdateFormData({image: asset?.uri});
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const TouchpointView = props => {
  const {formData, touchpointList} = props;
  console.log("formData" ,formData ,touchpointList)
  if (!formData) return null;
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Please Assign to a Touchpoint</Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignSelf: 'stretch',
          paddingHorizontal: 8,
        }}>
        <TouchpointFlowList
          items={touchpointList}
          onPressItem={value => {
            if (props.onUpdateFormData) {
              props.onUpdateFormData({
                touchpoint: value,
              });
            }
          }}
          selectedItem={formData.touchpoint}
        />
      </View>
    </View>
  );
};
const PlacementView = props => {
  const {formData, placementTypeList, areaList, errors} = props;

  if (!formData) return null;
  const {placement_type, area} = formData;
  const onUpdateFormData = data => {
    if (props.onUpdateFormData) {
      props.onUpdateFormData(data);
    }
  };
  if (!formData) return null;
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, {flex: 1}]}>Placement Type</Text>
        <Text style={[styles.title, {flex: 1}]}>Area</Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 8}}>
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: errors?.placement_type ? 1 : 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Type'}
          placeholder={'Type'}
          mode="single"
          checkedValue={placement_type}
          items={placementTypeList}
          hasError={errors?.placement_type}
          disabled={false}
          onSelectItem={item => {
            onUpdateFormData({
              placement_type: item?.label || '',
              area: '',
            });
          }}
          onClear={() =>
            onUpdateFormData({
              placement_type: '',
            })
          }
          containerStyle={{marginTop: 0, marginRight: 5, flex: 1}}
        />
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: errors?.area ? 1 : 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Brand'}
          placeholder={'Brand'}
          mode="single"
          checkedValue={area}
          items={areaList}
          hasError={errors?.area}
          disabled={false}
          onSelectItem={item => {
            onUpdateFormData({area: item?.label || ''});
          }}
          onClear={() => onUpdateFormData({area: ''})}
          containerStyle={{marginTop: 0, flex: 1}}
        />
      </View>
    </View>
  );
};
const PointOfSaleFormView = props => {
  const { isOptimize , image_timestamp,  formData, areaList, placementTypeList, touchpointList, errors} = props;
  const onUpdateFormData = data => {
    if (props.onUpdateFormData) {
      props.onUpdateFormData(data);
    }
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: 'white', borderRadius: 4},
        boxShadow,
        props.style,
      ]}>
      <POSItemView
        isOptimize={isOptimize}
        image_timestamp={image_timestamp}
        formData={formData}
        onUpdateFormData={onUpdateFormData}
        errors={errors}
      />
      <TouchpointView
        formData={formData}
        touchpointList={touchpointList}
        onUpdateFormData={onUpdateFormData}
      />
      <PlacementView
        formData={formData}
        areaList={areaList}
        errors={errors}
        placementTypeList={placementTypeList}
        onUpdateFormData={onUpdateFormData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomColor: whiteLabel().actionFullButtonBackground,
    borderBottomWidth: 2,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.primaryBold,
    color: whiteLabel().mainText,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: whiteLabel().inputText,
    flex: 4,
  },
  textInput: {
    fontSize: Values.fontSize.xSmall,
    color: Colors.primaryColor,
    lineHeight: 12,
    textAlign: 'center',
    minHeight: 24,
    padding: 0,
    borderRadius: 4,
    marginRight: 12,

    borderWidth: 1,
    borderColor: whiteLabel().inputText,
    width: 40,
  },
  buttonStyle: {
    borderRadius: 7,
    paddingRight: 13,
    paddingLeft: 13,
    marginRight: 7,
  },

  selectedButtonStyle: {
    borderRadius: 7,
    paddingRight: 13,
    paddingLeft: 13,
    marginRight: 7,
  },

  buttonTextStyle: {
    fontSize: 12,
  },
});

export default PointOfSaleFormView;
