import React, {useState, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../actions/notification.action';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {whiteLabel} from '../../../constants/Colors';
import {style} from '../../../constants/Styles';
import ClosableView from '../../common/ClosableView';
import QRScanModal from '../../common/QRScanModal';
import CSingleSelectInput from '../../common/SelectInput/CSingleSelectInput';
import {Notification} from '../../modal/Notification';
import SearchBar from '../../SearchBar';
import {SubmitButton} from '../SubmitButton';
import ProductList from './components/ProductList';
import PointOfSaleFormContainer from './containers/PointOfSaleFormContainer';
import {
  constructFormData,
  filterProducts,
  getBrands,
  getTypes,
  getValueFromFormData,
} from './helper';
import PosRecordListModal from './modals/PosRecordListModal';

const PosCaptureForm = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;

  const [formData, setFormData] = useState({posItems: []});
  const [keyword, setKeyword] = useState('');
  const captureModalRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isShowPosDetailView, setIsShowPosDetailView] = useState(false);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('');
  const [selectedProductItem, setSelectedProductItem] = useState(null);
  const products = useMemo(
    () => filterProducts(item.products, keyword, type, brand),
    [item, keyword, type, brand],
  );
  const brandList = useMemo(() => getBrands(item), [item]);
  const typeList = useMemo(() => getTypes(item), [item]);
  const posRecordListModalRef = useRef(null);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const validateForm = () => {};

  const onSubmit = () => {
    console.log('formData', JSON.stringify(formData));
    if (formData.posItems.length == 0) {
      if (props.onButtonAction) {
        props.onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });
      }
      return;
    }
    const submitValueData = getValueFromFormData(formData, item, formIndex);
    console.log('submitValueData', JSON.stringify(submitValueData));
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }
  };
  useEffect(() => {
    const formData = constructFormData(item);
    setFormData(formData);
  }, [item]);
  const onSearch = keyword => {
    setKeyword(keyword);
  };
  const onCapture = () => {
    if (captureModalRef && captureModalRef.current) {
      captureModalRef.current.showModal();
    }
  };
  const onRecordItemAction = data => {
    const {type, item} = data;
    if (type == Constants.actionType.ACTION_REMOVE) {
      const items = formData?.posItems.filter(x => x.id != item.id);
      const newFormData = {...formData, posItems: items};
      setFormData(newFormData);
    }
  };
  const showErrorMessage = errorMessage => {
    console.log('errorMessage', errorMessage);
    dispatch(
      showNotification({
        type: 'error',
        message: errorMessage,
        buttonText: Strings.Ok,
      }),
    );
  };
  const onPressPointOfSales = () => {
    if (posRecordListModalRef) {
      posRecordListModalRef.current.showModal();
    }
  };
  const onRecordPos = data => {
    const posItems = [...formData.posItems];
    let index = 1;
    if (posItems.length > 0) {
      index = posItems[posItems.length - 1].id + 1;
    }
    const newPostItem = {
      ...data,
      id: index,
    };
    console.log('onRecordPos', newPostItem);
    posItems.push(newPostItem);
    const newFormData = {...formData, posItems};
    setFormData(newFormData);
    setIsShowPosDetailView(false);
  };
  const onItemAction = data => {
    const {type, item} = data;
    setSelectedProductItem(item);
    setIsShowPosDetailView(true);
  };

  const onCaptureAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      const foundProduct = item.products.find(x => x.barcode == value);
      if (foundProduct) {
        setSelectedProductItem(foundProduct);
        setIsShowPosDetailView(true);
      }
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      <SearchBar
        isFilter
        onSearch={onSearch}
        suffixButtonIcon="Scan_Icon"
        onSuffixButtonPress={onCapture}
        style={{paddingHorizontal: 0}}
      />
      <View style={{flexDirection: 'row', marginHorizontal: 0}}>
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Type'}
          placeholder={'Type'}
          mode="single"
          checkedValue={type}
          items={typeList}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setType(item?.label || '');
          }}
          onClear={() => setType('')}
          containerStyle={{marginTop: 0, marginRight: 5, flex: 1}}
        />
        <CSingleSelectInput
          bgType="card"
          bgStyle={[style.card, {borderWidth: 0}]}
          placeholderStyle={{color: whiteLabel().mainText, fontWeight: '700'}}
          description={'Brand'}
          placeholder={'Brand'}
          mode="single"
          checkedValue={brand}
          items={brandList}
          hasError={false}
          disabled={false}
          onSelectItem={item => {
            setBrand(item?.label || '');
          }}
          onClear={() => setBrand('')}
          containerStyle={{marginTop: 0, flex: 1}}
        />
      </View>
      <SubmitButton
        title={'View Point of Sales'}
        style={{marginTop: 4, marginBottom: 8}}
        svgIcon={'Check_List'}
        onSubmit={() => {
          onPressPointOfSales();
        }}
      />
      {!isShowPosDetailView && (
        <ProductList
          style={{
            maxHeight: isKeyboardVisible
              ? Values.deviceHeight * 0.2
              : Values.deviceHeight * 0.4,
            alignSelf: 'stretch',
          }}
          items={products}
          onItemAction={onItemAction}
        />
      )}

      <ClosableView
        isVisible={isShowPosDetailView}
        onClose={() => {
          setIsShowPosDetailView(false);
        }}>
        <PointOfSaleFormContainer
          product={selectedProductItem}
          item={item}
          onRecord={onRecordPos}
        />
      </ClosableView>

      <QRScanModal
        ref={captureModalRef}
        onClose={() => {
          captureModalRef.current.hideModal();
        }}
        showClose={true}
        onButtonAction={onCaptureAction}
      />
      <PosRecordListModal
        ref={posRecordListModalRef}
        items={formData?.posItems}
        onItemAction={onRecordItemAction}
      />
      <Notification />
      {!isShowPosDetailView && (
        <SubmitButton
          title={'Save'}
          style={{marginVertical: 16}}
          onSubmit={() => {
            onSubmit();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.textColor,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});

export default PosCaptureForm;
