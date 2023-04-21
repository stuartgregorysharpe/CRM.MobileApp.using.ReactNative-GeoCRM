import {View, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
import {SubmitButton} from '../../SubmitButton';
import ProductListsModal from '../modals/ProductListsModal';
import SvgIcon from '../../../SvgIcon';
import {Constants} from '../../../../constants';
import ProductReturnFormView from '../components/ProductReturnFormView';

let isMount = true;

const ProductReturnFormContainer = React.forwardRef((props, ref) => {
  const {questionType, item} = props;
  const [brandLists, setBrandLists] = useState([]);
  const [typeLists, setTypeLists] = useState([]);
  const [productReturns, setProductReturns] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const productListsModalRef = useRef(null);
  const productSelectionFormRef = useRef(null);

  useEffect(() => {
    if (item != undefined && item.brands != undefined) {
      var brandTmp = [];
      item.brands.forEach(item => {
        brandTmp.push({label: item, value: item});
      });
      setBrandLists(brandTmp);
      var typeTmp = [];
      item.product_types.forEach(item => {
        typeTmp.push({label: item, value: item});
      });
      setTypeLists(typeTmp);
    }

    // product issue initialize
    if (item != undefined && item.return_reasons != undefined) {
      const tmp = [];
      item.return_reasons.forEach(element => {
        tmp.push({label: element, value: element});
      });
      setProductReturns(tmp);
    }

    if (item.value != null && item.value != undefined && item.value != '') {
      setSelectedLists(item.value);
      var ids = [];
      item.value.forEach(element => {
        ids.push(element.product_id);
      });
      productSelectionFormRef.current.initSelectedLists(ids);
    }
    return () => {
      isMount = false;
    };
  }, [item]);

  useImperativeHandle(
    ref,
    () => ({
      openViewLists() {
        productListsModalRef.current.showModal();
      },
    }),
    [],
  );

  const onButtonAction = value => {
    console.log('add data', value);
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };
  const changedSelectedProducts = (item, type) => {
    if (type === 'add') {
      var check = selectedLists.find(
        element =>
          element.product_id === item.product_id &&
          element.productReturn === item.productReturn,
      );
      if (check != undefined) {
        var tmp = selectedLists.filter(
          element =>
            !(
              element.product_id === item.product_id &&
              element.productReturn === item.productReturn
            ),
        );
        setSelectedLists([...tmp, item]);
      } else {
        setSelectedLists([...selectedLists, item]);
      }
    } else if (type === 'remove') {
      var tmp = selectedLists.filter(
        element =>
          !(
            element.product_id === item.product_id &&
            element.productReturn === item.productReturn
          ),
      );
      setSelectedLists(tmp);
    } else if (type === 'remove_all') {
      var tmp = selectedLists.filter(element => element.productReturn != item);
      setSelectedLists(tmp);
    }
  };

  const closeModal = () => {
    productListsModalRef.current.hideModal();
  };

  const renderCloseIcon = () => {
    return (
      <TouchableOpacity onPress={closeModal}>
        <SvgIcon icon="Close" width="22" height="22" style={{marginLeft: 10}} />
      </TouchableOpacity>
    );
  };

  const onProductListModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_REMOVE) {
      changedSelectedProducts(value, 'remove');
      productSelectionFormRef.current.updatedSelectedLists(value);
    }
  };

  const onSave = () => {
    props.onSave({
      type: Constants.actionType.ACTION_FORM_SUBMIT,
      value: selectedLists,
    });
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
        marginBottom: Platform.OS == 'android' ? 0 : 30,
      }}>
        
      <ProductReturnFormView
        ref={productSelectionFormRef}
        {...props}
        style={{marginTop: 14}}
        typeLists={typeLists}
        brandLists={brandLists}
        productReturns={productReturns}
        selectedLists={selectedLists}
        changedSelectedProducts={changedSelectedProducts}
        onButtonAction={onButtonAction}
      />

      <ProductListsModal
        title={
          questionType === Constants.questionType.FORM_TYPE_PRODUCT_RETURN
            ? 'Product Return List'
            : 'Product List'
        }
        hideClear={true}
        ref={productListsModalRef}
        lists={selectedLists}
        groups={productReturns}
        questionType={questionType}
        customRightHeaderView={renderCloseIcon()}
        onButtonAction={onProductListModalClosed}
      />

      <SubmitButton
        title="Record"
        style={{marginTop: 10, marginHorizontal: 10}}
        onSubmit={onSave}
      />
    </View>
  );
});
export default ProductReturnFormContainer;
