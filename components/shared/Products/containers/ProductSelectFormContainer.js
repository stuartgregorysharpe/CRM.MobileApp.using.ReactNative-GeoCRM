import {View, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
import ProductSelectFormView from '../components/ProductSelectFormView';
import {SubmitButton} from '../../SubmitButton';
import ProductListsModal from '../modals/ProductListsModal';
import SvgIcon from '../../../SvgIcon';
import {Constants} from '../../../../constants';

const ProductSelectFormContainer = React.forwardRef((props, ref) => {
  const {questionType, item} = props;
  const [brandLists, setBrandLists] = useState([]);
  const [typeLists, setTypeLists] = useState([]);
  const [productIssues, setProductIssues] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const productListsModalRef = useRef(null);
  const productSelectionFormRef = useRef(null);

  useEffect(() => {
    if (item != undefined && item.brands != undefined && item.brands != '') {
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
    if (
      item != undefined &&
      item.product_issues != undefined &&
      item.product_issues != ''
    ) {
      var tmp = [];
      item.product_issues.forEach(element => {
        tmp.push({label: element, value: element});
      });
      setProductIssues(tmp);
    }

    if (item.value != null && item.value != '' && item.value != undefined) {
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
    props.onButtonAction({
      type: Constants.actionType.ACTION_CAPTURE,
      value: value,
    });
  };
  const changedSelectedProducts = (item, type) => {
    if (type == 'add') {
      setSelectedLists([...selectedLists, item]);
    } else {
      var tmp = selectedLists.filter(
        element => element.product_id != item.product_id,
      );
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
      <ProductSelectFormView
        ref={productSelectionFormRef}
        {...props}
        style={{marginTop: 14}}
        typeLists={typeLists}
        brandLists={brandLists}
        productIssues={productIssues}
        selectedLists={selectedLists}
        changedSelectedProducts={changedSelectedProducts}
        onButtonAction={onButtonAction}
      />

      <ProductListsModal
        title="Product List"
        hideClear={true}
        ref={productListsModalRef}
        lists={selectedLists}
        questionType={questionType}
        customRightHeaderView={renderCloseIcon()}
        onButtonAction={onProductListModalClosed}
      />

      <SubmitButton
        title="Save"
        style={{marginTop: 10, marginHorizontal: 10}}
        onSubmit={onSave}
      />
    </View>
  );
});
export default ProductSelectFormContainer;
