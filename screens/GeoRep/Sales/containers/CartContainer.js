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
  configProductSetUp,
  filterProducts,
  getProductItemDataForRender,
  getTotalCartProductList,
  getWarehouseGroups,
} from '../helpers';
import ProductGroupModal from '../modal/ProductGroupModal';
import SetupFieldModal from '../modal/SetupFieldModal';
import TransactionSubmitModal from '../modal/TransactionSubmitModal';
import {useDispatch} from 'react-redux';
import {setProductPriceLists} from '../../../../actions/sales.action';
import ProductDetailsModal from '../modal/ProductDetailsModal';
import {useCallback} from 'react';

const CartContainer = props => {

  const navigation = props.navigation;
  const transactionSubmitModalRef = useRef(null);
  const dispatch = useDispatch();

  const productPriceList = useSelector(state => state.sales.productPriceLists);
  const settings = useSelector(state => state.sales.salesSetting);
  const [addProductList, setAddProductList] = useState([]);
  const [defineSetup, setDefineSetup] = useState(null);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [productListTitle, setProductListTitle] = useState('');
  const [outSideTouch, setOutSideTouch] = useState(false);

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

  console.log('totalProductList', totalProductList);
  useEffect(() => {
    loadAddProductLists();
    loadDefinedConfig();
  }, []);

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
      console.log('defineData', defineData);
    }
  };
  const onSetupFieldModalClosed = async ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      configProductSetUp(value, async type => {
        storeJsonData('@setup', value);
        if (type === 'changed') {
          dispatch(setProductPriceLists([]));
          setAddProductList([]);
          await storeJsonData('@product_price', []);
          await removeLocalData('@add_product');

          if (navigation.canGoBack()) {
            navigation.popToTop();
          }
          
        } else {
          loadDefinedConfig();
        }
      });
      setupFieldModalRef.current.hideModal();
    }
  };
  const openSetup = () => {
    setupFieldModalRef.current.showModal();
  };
  const onProductGroupModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      productGroupModalRef.current.hideModal();
    }
  };

  const onTransactionSubmitModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_DONE) {
      transactionSubmitModalRef.current.hideModal();
    }
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
  const updateCapturedProductPrice = (product, qty) => {
    setIsUpdatingProductPrice(true);
    const param = {
      product_id: product.product_id,
      qty: qty,
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
  };

  const updateProductPrice = (product, qty) => {
    if (product?.isAddProduct) {
      updateAddProductPrice(product, qty);
    } else {
      updateCapturedProductPrice(product, qty);
    }
  };
  const updateAddProductPrice = (product, qty) => {};
  const updateProductPriceLists = useCallback(
    async (product_id, price, qty, special, finalPrice, product) => {
      const lists = [...productPriceList];
      var tmpList = lists.filter(
        item => parseInt(item.product_id) != parseInt(product_id),
      );

      var check = lists.find(
        item => parseInt(item.product_id) == parseInt(product_id),
      );
      if (check != undefined) {
        var tmpFinalPrice =
          finalPrice != '' && finalPrice != 'clear'
            ? finalPrice
            : check.finalPrice;
        tmpList.push({
          product_id: product_id,
          price: price,
          qty: qty,
          special: special,
          finalPrice: finalPrice === 'clear' ? '' : tmpFinalPrice,
          product: product,
        });
      } else {
        tmpList.push({
          product_id: product_id,
          price: price,
          qty: qty,
          special: special,
          finalPrice: finalPrice,
          product: product,
        });
      }

      dispatch(setProductPriceLists(tmpList));
      storeJsonData('@product_price', tmpList);
    },
    [productPriceList],
  );

  const openCapturedProductDetail = item => {
    setProductDetailTitle(item.product_name);
    setProduct(item);
    console.log('set product item', item);
    if (productDetailsModalRef.current)
      productDetailsModalRef.current.showModal();
  };
  const openAddedProductDetail = item => {};
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
    console.log('save data', value);
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

  const updateOutSideTouchStatus = async(flag) => {    
      var setup = await getJsonData("@setup");
      console.log("setup", setup)
      if(setup == null){
        setOutSideTouch(false);
      }else{
        setOutSideTouch(flag);
      }    
  }


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
        //hideClear
        backButtonDisabled={true}
        closableWithOutsideTouch={outSideTouch}
        ref={setupFieldModalRef}
        hideDivider={true}
        modalType={Constants.modalType.MODAL_TYPE_CENTER}
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
        backButtonDisabled={true}
        closableWithOutsideTouch={false}
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
