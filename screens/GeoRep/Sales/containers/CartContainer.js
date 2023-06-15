import React, {useState, useEffect, useRef} from 'react';
import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Constants, Strings} from '../../../../constants';
import {
  getJsonData,
  removeLocalData,
  storeJsonData,
} from '../../../../constants/Storage';
import {GetRequestProductPriceDAO} from '../../../../DAO';
import CartView from '../components/CartView';
import {
  calculateCartStatistics,
  filterProducts,
  getConfigFromRegret,
  getProductItemDataForRender,
  getTotalCartProductList,
  getWarehouseGroups,
  onCheckProductSetupChanged,
} from '../helpers';
import ProductGroupModal from '../modal/ProductGroupModal';
import SetupFieldModal from '../modal/SetupFieldModal';
import TransactionSubmitModal from '../modal/TransactionSubmitModal';
import {useDispatch} from 'react-redux';
import {setProductPriceLists, setSalesSearchText} from '../../../../actions/sales.action';
import ProductDetailsModal from '../modal/ProductDetailsModal';
import {useCallback} from 'react';
import AddProductModal from '../modal/AddProductModal';
import {
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,
  SLIDE_STATUS,
} from '../../../../actions/actionTypes';

const CartContainer = props => {
  const navigation = props.navigation;
  const transactionSubmitModalRef = useRef(null);
  const dispatch = useDispatch();

  const regret_item = useSelector(state => state.sales.regret);
  const productPriceList = useSelector(state => state.sales.productPriceLists);
  const settings = useSelector(state => state.sales.salesSetting);
  const [addProductList, setAddProductList] = useState([]);
  const [defineSetup, setDefineSetup] = useState(null);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [productListTitle, setProductListTitle] = useState('');
  const [outSideTouch, setOutSideTouch] = useState(false);
  const [selectedAddProduct, setSelectedAddProduct] = useState(null);
  const addProductModalRef = useRef(null);
  const setupFieldModalRef = useRef(null);
  const productGroupModalRef = useRef(null);
  const productDetailsModalRef = useRef(null);
  const currency = defineSetup?.currency_id;
  const taxRate = currency?.tax_rate;
  const totalProductList = useMemo(
    () => getTotalCartProductList(productPriceList, addProductList, currency),
    [productPriceList, addProductList, currency],
  );
  const cartStatistics = useMemo(
    () => calculateCartStatistics(totalProductList, taxRate),
    [totalProductList, taxRate],
  );
  const wareHouseGroups = useMemo(
    () => getWarehouseGroups(totalProductList),
    [totalProductList],
  );
  const warehouseProductList = useMemo(
    () => filterProducts(totalProductList, {warehouse_id: selectedWarehouseId}),
    [selectedWarehouseId, totalProductList],
  );
  const [productDetailTitle, setProductDetailTitle] = useState('');
  const [product, setProduct] = useState();
  const [isUpdatingProductPrice, setIsUpdatingProductPrice] = useState(false);
  const visibleMore = useSelector(state => state.rep.visibleMore);
  let isMout = true;

  useEffect(() => {
    loadAddProductLists();
    loadDefinedConfig();
    return () => {
      isMout = false;
    };
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshList();
    });
    return unsubscribe;
  }, [navigation]);



  const refreshList = async () => {
    var defineSetup = await getJsonData('@setup');
    console.log('defineSetup', defineSetup);
    if (defineSetup == null) {
      openSetup();
    }
  };

  const loadAddProductLists = async () => {
    const addProductList = await getJsonData('@add_product');
    if (addProductList != null && addProductList != undefined) {
      setAddProductList(addProductList);
    } else {
      setAddProductList([]);
    }
  };

  const clearAddProductList = async () => {
    await removeLocalData('@add_product');
  };

  const loadDefinedConfig = async () => {
    const defineData = await getJsonData('@setup');
    if (defineData) {
      setDefineSetup(defineData);
    }
  };

  const onSetupFieldModalClosed = async ({type, value}) => {
    setOutSideTouch(false);
    console.log('onSetupFieldModalClosed', type, value);
    if (type === Constants.actionType.ACTION_CLOSE) {
      if (value != null) {
        onCheckProductSetupChanged(value, async type => {
          if(value?.location?.location_id != undefined){
            storeJsonData('@setup', value);
          }          
          if (type.includes('changed')) {
            //dispatch(setSalesSearchText(''));
            await storeJsonData('@product_price', []);
            await removeLocalData('@add_product');
            dispatch(setProductPriceLists([]));
            setAddProductList([]);
            if (navigation.canGoBack()) {
              navigation.popToTop();
            }
          } else {
            loadDefinedConfig();
          }
        });
      }
      setupFieldModalRef.current.hideModal();
    } else if (type == Constants.actionType.ACTION_DONE) {
      setupFieldModalRef.current.hideModal();
      if (value.name === 'More') {
        dispatch({type: SLIDE_STATUS, payload: false});
        if (visibleMore != '') {
          dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
        } else {
          dispatch({type: CHANGE_MORE_STATUS, payload: 0});
        }
      } else {
        navigation.navigate(value.name);
      }
    }
  };

  const openSetup = () => {
    setOutSideTouch(false);
    setupFieldModalRef.current.showModal();
  };
  const onProductGroupModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      productGroupModalRef.current.hideModal();
    }
  };

  const onTransactionSubmitModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_DONE) {
      clearCart();
      setOutSideTouch(false);
      transactionSubmitModalRef.current.hideModal();
      openSetup();
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
    } else if (type == Constants.actionType.ACTION_FORM_CLEAR) {
      transactionSubmitModalRef.current.hideModal();
    }
  };

  const clearCart = async () => {
    setAddProductList([]);
    clearAddProductList();

    dispatch(setProductPriceLists([]));

    await storeJsonData('@product_price', []);
    await storeJsonData('@add_product', []);

    await storeJsonData('@setup', null);
    setDefineSetup(null);
  };

  const onWarehouseItemPress = item => {
    setProductListTitle(item.title);
    setSelectedWarehouseId(item.warehouse_id);
    productGroupModalRef.current.showModal();
  };
  const onTotalProductPress = () => {
    setProductListTitle('All');
    setSelectedWarehouseId(null);
    productGroupModalRef.current.showModal();
  };
  
  const updateCapturedProductPrice = async (product, qty) => {
    var defineSetup = await getJsonData('@setup');
    if (defineSetup != null) {
      setIsUpdatingProductPrice(true);
      const param = {
        product_id: product.product_id,
        qty: qty,
        location_id: defineSetup.location.location_id,
        warehouse_id : product.warehouse_id
      };      

      GetRequestProductPriceDAO.find(param)
        .then(res => {
          if (res.status === Strings.Success) {
            const price = res.price;
            const special = res.special;
            var check = productPriceList.find(
              element => element.product_id == product.product_id,
            );
            var finalPrice = 0;
            if (
              check != undefined &&
              check.finalPrice != '' &&
              check.finalPrice.final_price != ''
            ) {
              finalPrice = check.finalPrice.final_price;
            }
            var updatedProduct = {
              ...product,
              price: price,
              special: special,
              finalPrice: finalPrice,
            };
            updateProductPriceLists(
              product.product_id,
              product.warehouse_id,
              price,
              qty,
              special,
              '',
              updatedProduct,
            );
          }
          setIsUpdatingProductPrice(false);
        })
        .catch(e => {
          expireToken(dispatch, e);
          setIsUpdatingProductPrice(false);
        });
    }
  };

  const updateProductPrice = (product, qty) => {
    if (product?.isAddProduct) {
      updateAddProductPrice(product, qty);
    } else {
      updateCapturedProductPrice(product, qty);
    }
  };
  const deleteAddProduct = product_id => {
    const newAddProductList = addProductList.filter(
      x => x.add_product_id != product_id,
    );
    storeJsonData('@add_product', newAddProductList);
    setAddProductList(newAddProductList);
  };
  const updateAddProductPrice = (product, qty) => {
    if (parseInt(qty) == 0) {
      deleteAddProduct(product.product_id);
      return;
    }
    const newAddProductList = [...addProductList];
    const productIndex = newAddProductList.findIndex(
      x => x.add_product_id == product.product_id,
    );
    if (productIndex >= 0) {
      newAddProductList[productIndex].quantity = qty;
    }
    setAddProductList(newAddProductList);
    storeJsonData('@add_product', newAddProductList);
  };

  const updateProductPriceLists = useCallback(
    async (product_id, warehouse_id, price, qty, special, finalPrice, product) => {
      const lists = [...productPriceList];

      var tmpList = lists.filter(item => !(parseInt(item.product_id) == parseInt(product_id) && parseInt(item.warehouse_id) == parseInt(warehouse_id)) );
      var check = lists.find( item => parseInt(item.product_id) == parseInt(product_id) && parseInt(item.warehouse_id) == parseInt(warehouse_id)  );

      if (parseInt(qty) > 0) {
        if (check != undefined) {
          var tmpFinalPrice =
            finalPrice != '' && finalPrice != 'clear'
              ? finalPrice
              : check.finalPrice;
          tmpList.push({
            product_id: product_id,
            warehouse_id : warehouse_id,
            price: price,
            qty: qty,
            special: special,
            finalPrice: finalPrice === 'clear' ? '' : tmpFinalPrice,
            product: product,
          });
        } else {
          tmpList.push({
            product_id: product_id,
            warehouse_id : warehouse_id,
            price: price,
            qty: qty,
            special: special,
            finalPrice: finalPrice,
            product: product,
          });
        }
      }

      dispatch(setProductPriceLists(tmpList));
      storeJsonData('@product_price', tmpList);
    },
    [productPriceList],
  );

  const openCapturedProductDetail = item => {
    setProductDetailTitle(item.product_name);
    setProduct(item);
    if (productDetailsModalRef.current)
      productDetailsModalRef.current.showModal();
  };
  const openAddedProductDetail = item => {
    const foundProduct = addProductList.find(
      x => x.add_product_id == item.product_id,
    );
    const newProduct = {...foundProduct};
    setSelectedAddProduct(newProduct);
    addProductModalRef.current.showModal();
  };
  const onAddProductModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_DONE) {
      addProductModalRef.current.hideModal();
      saveAddProduct(value);
    }
  };
  const saveAddProduct = value => {
    if (parseInt(value.quantity) == 0) {
      deleteAddProduct(value.add_product_id);

      return;
    }
    const newAddProductList = [...addProductList];
    const productIndex = newAddProductList.findIndex(
      x => x.add_product_id == value.add_product_id,
    );
    console.log('productIndex', productIndex);
    console.log(
      'newAddProductList[productIndex]',
      newAddProductList[productIndex],
    );
    if (productIndex >= 0) {
      newAddProductList[productIndex] = {...value};
    }
    setAddProductList(newAddProductList);
    storeJsonData('@add_product', newAddProductList);
  };

  const openProductDetail = item => {
    if (item.isAddProduct) {
      openAddedProductDetail(item);
    } else {
      openCapturedProductDetail(item);
    }
  };
  const onProductDetailsModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_DONE) {
      saveFinalPrice(value, 'done');
      if (productDetailsModalRef.current)
        productDetailsModalRef.current.hideModal();
    }
    if (type === Constants.actionType.ACTION_FORM_CLEAR) {
      saveFinalPrice(value, 'clear');
    }
  };
  const saveFinalPrice = async (value, type) => {
    var newProduct = {
      ...value.product,
    };
    if (
      type == 'done' &&
      value.finalPrice != undefined &&
      value.finalPrice != '' &&
      value.finalPrice.final_price != undefined
    ) {
      newProduct = {
        ...value.product,
        finalPrice: value.finalPrice.final_price,
      };
    } else if (type != 'done') {
      newProduct = {
        ...value.product,
        finalPrice: 0,
      };
    }
    updateProductPriceLists(
      value.product_id,
      value.warehouse_id,
      value.price,
      value.qty,
      value.special,
      type === 'done' ? value.finalPrice : 'clear',
      newProduct,
    );
  };
  const onClearProduct = () => {
    if (!selectedWarehouseId) {
      //if opened all products
      setAddProductList([]);
      clearAddProductList();
    }
    productGroupModalRef.current.hideModal();
  };

  const updateOutSideTouchStatus = async flag => {
    var setup = await getJsonData('@setup');
    if (setup == null) {
      setOutSideTouch(false);
    } else {
      setOutSideTouch(flag);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      
      <CartView
        defineSetup={defineSetup}
        cartStatistics={cartStatistics}
        wareHouseGroups={wareHouseGroups}
        onPressSettings={openSetup}
        onNext={() => {
          if (transactionSubmitModalRef.current)
            transactionSubmitModalRef.current.showModal();
        }}
        onWarehouseItemPress={onWarehouseItemPress}
        onTotalProductPress={onTotalProductPress}
      />

      <SetupFieldModal
        title="Define Setup"
        hideClear
        backButtonDisabled={!outSideTouch}
        closableWithOutsideTouch={outSideTouch}
        ref={setupFieldModalRef}
        hideDivider={true}
        modalType={Constants.modalType.MODAL_TYPE_FULL_WITH_BOTTOM}
        onButtonAction={onSetupFieldModalClosed}
        updateOutSideTouchStatus={updateOutSideTouchStatus}
      />

      <ProductGroupModal
        title={productListTitle}
        products={warehouseProductList}
        settings={settings}
        getItemData={getProductItemDataForRender}
        geProductPrice={updateProductPrice}
        openProductDetail={openProductDetail}
        isUpdatingProductPrice={isUpdatingProductPrice}
        //backButtonDisabled={true}
        closableWithOutsideTouch={true}
        ref={productGroupModalRef}
        onClearData={onClearProduct}
        onButtonAction={onProductGroupModalClosed}
      />
      <ProductDetailsModal
        title={productDetailTitle}
        product={product}
        settings={settings}
        onButtonAction={onProductDetailsModalClosed}
        ref={productDetailsModalRef}
      />
      <TransactionSubmitModal
        hideClear
        ref={transactionSubmitModalRef}
        cartStatistics={cartStatistics}
        productPriceList={productPriceList}
        addProductList={addProductList}
        onButtonAction={onTransactionSubmitModalClosed}
      />
      <AddProductModal
        onButtonAction={onAddProductModalClosed}
        ref={addProductModalRef}
        value={selectedAddProduct}
        isEdit={true}
        buttonTitle="Update"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default CartContainer;
