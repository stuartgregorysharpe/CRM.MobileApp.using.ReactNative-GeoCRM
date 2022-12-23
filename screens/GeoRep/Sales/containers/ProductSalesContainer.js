import {View, BackHandler} from 'react-native';
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import ProductSalesView from '../components/ProductSalesView';
import SetupFieldModal from '../modal/SetupFieldModal';
import ProductGroupModal from '../modal/ProductGroupModal';
import {Constants, Strings} from '../../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {GetRequestProductPriceDAO} from '../../../../DAO';
import {expireToken} from '../../../../constants/Helper';
import ProductFilterModal from '../modal/ProductFilterModal';
import {
  getJsonData,
  removeLocalData,
  storeJsonData,
} from '../../../../constants/Storage';
import ProductDetailsModal from '../modal/ProductDetailsModal';
import AddProductModal from '../modal/AddProductModal';
import {setProductPriceLists} from '../../../../actions/sales.action';
import {showNotification} from '../../../../actions/notification.action';
import {configProductSetUp, getConfigFromRegret} from '../helpers';
import {
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,
  SLIDE_STATUS,
} from '../../../../actions/actionTypes';

const ProductSalesContainer = props => {
  const navigation = props.navigation;
  const productPriceLists = useSelector(state => state.sales.productPriceLists);
  const visibleMore = useSelector(state => state.rep.visibleMore);

  const {items, settings} = props;

  const [selectedGroupTitle, setSelectedGroupTitle] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [products, setProducts] = useState([]);
  const setupFieldModalRef = useRef(null);
  const productGroupModalRef = useRef(null);
  const productFilterModalRef = useRef(null);
  const productDetailsModalRef = useRef(null);
  const addProductModalRef = useRef(null);
  const [productDetailTitle, setProductDetailTitle] = useState('');
  const [product, setProduct] = useState();
  const [cartCount, setCartCount] = useState(0);
  const [outsideTouch, setOutsideTouch] = useState(false);
  const [isUpdatingProductPrice, setIsUpdatingProductPrice] = useState(false);
  const dispatch = useDispatch();

  const getProducts = useCallback(
    products => {
      //const getProducts = (products ) => {
      var list = [];
      if (products != undefined) {
        products.forEach(element => {
          const product = productPriceLists.find(
            item =>
              item != undefined &&
              parseInt(item.product_id) == parseInt(element.product_id),
          );

          var newElement = {
            ...element,
          };
          var price = element.price;
          if (product != undefined) {
            var finalPrice = 0;
            if (
              product.finalPrice != undefined &&
              product.finalPrice != '' &&
              product.finalPrice.final_price != undefined
            ) {
              finalPrice = product.finalPrice.final_price;
            }
            if (
              product.price != undefined &&
              product.price != '' &&
              product.price != 0
            ) {
              price = product.price;
            }

            list.push({
              ...newElement,
              price: price,
              finalPrice: finalPrice,
              special: product.special,
              qty: product.qty,
            });
          } else {
            list.push({
              ...newElement,
              finalPrice: 0,
              qty: 0,
            });
          }
        });
      }
      return list;
    },
    [productPriceLists],
  );

  const lists = useMemo(() => {
    if (
      items != undefined &&
      productPriceLists != undefined &&
      items.length > 0
    ) {
      var newList = [];
      const tmp = [...items];
      tmp.forEach(item => {
        const newItem = {...item};
        const originProducts = [...newItem.products];
        const products = getProducts(originProducts);
        newItem.products = [...products];
        newList.push(newItem);
      });

      return newList;
    }
    return [];
  }, [items, productPriceLists]);

  const groupList = useMemo(() => {
    if (products != undefined && products.length > 0) {
      const tpLists = [...products];
      const newProducts = getProducts(tpLists);

      return newProducts;
    }
    return [];
  }, [products, productPriceLists]);

  //    ------------------------    DEFINE SETUP MOMDAL   ----------------------------
  useEffect(() => {
    if (!props.regret_item) {
      setupFieldModalRef.current.showModal();
    }
    initializeProductLists();
  }, []);

  useEffect(() => {
    if (props.regret_item) {
      setupDefineSetupFromRegret();
    }
  }, [props.regret_item]);
  useEffect(() => {
    if (productPriceLists != null) {
      configAddProductCount();
    }
  }, [productPriceLists]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshList();
      //configAddProductCount();
    });
    return unsubscribe;
  }, [navigation]);

  const refreshList = async () => {
    var storedProductPriceList = await getJsonData('@product_price');
    var storedAddProductList = await getJsonData('@add_product');
    if (
      (storedProductPriceList == null || storedProductPriceList.length == 0) &&
      (storedAddProductList == null || storedAddProductList.length == 0)
    ) {
      props.getProductLists();
    }

    var defineSetup = await getJsonData('@setup');
    if (defineSetup == null && !props.regret_item) {
      setupFieldModalRef.current.showModal();
    }
  };

  const initializeProductLists = async () => {
    const storedProductPriceList = await getJsonData('@product_price');
    if (storedProductPriceList != null) {
      dispatch(setProductPriceLists(storedProductPriceList));
      setOutsideTouch(true);
      props.getProductLists();
    }
    configAddProductCount();
  };

  const configAddProductCount = useCallback(async () => {
    const addProductList = await getJsonData('@add_product');
    var count = 0;
    if (addProductList != null && addProductList != undefined) {
      count = addProductList.length;
    }
    if (
      productPriceLists != undefined &&
      productPriceLists != null &&
      productPriceLists.length > 0
    ) {
      const tmpLists = productPriceLists.filter(item => parseInt(item.qty) > 0);
      count += tmpLists.length;
    }
    setCartCount(count);
  }, [productPriceLists]);
  const setupDefineSetupFromRegret = async () => {
    console.log('setupDefineSetupFromRegret');
    if (props.regret_item) {
      console.log('setupDefineSetupFromRegret: regret_item', props.regret_item);
      const config = getConfigFromRegret(props.regret_item);

      await storeJsonData('@product_price', []);
      await removeLocalData('@add_product');
      dispatch(setProductPriceLists([]));
      await storeJsonData('@setup', config);
      setupFromConfig(config, props.regret_item?.search_text);
    }
  };
  const setupFromConfig = (config, searchText) => {
    console.log('setupFromConfig: config', config);
    if (props.getProductLists) {
      console.log('setupFromConfig: setSelectedLocation', config.location.name);
      setSelectedLocation(config.location.name);
      configProductSetUp(config, type => {
        if (type === 'changed') {
          storeJsonData('@product_price', []);
          removeLocalData('@add_product');
          dispatch(setProductPriceLists([]));
        }
      });
      configAddProductCount();
      props.getProductLists(config, searchText);
      if (config != undefined) {
        setOutsideTouch(true);
      }
    }
  };
  const onSetupFieldModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      setupFieldModalRef.current.hideModal();
      setupFromConfig(value);
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

  const onProductGroupModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      productGroupModalRef.current.hideModal();
    }
  };

  const onProductFilterModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      productFilterModalRef.current.hideModal();
    }
    if (type === Constants.actionType.ACTION_DONE) {
      productFilterModalRef.current.hideModal();
      if (props.getProductListsByFilter) {
        props.getProductListsByFilter(value);
      }
    }
    if (type === Constants.actionType.ACTION_FORM_CLEAR) {
      clearFilter();
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

  const onAddProductModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_DONE) {
      addProductModalRef.current.hideModal();
      saveProducts(value);
    }
  };

  const clearFilter = async () => {
    var param = await getJsonData('@sale_product_parameter');
    param['filters'] = '';
    await storeJsonData('@sale_product_parameter', param);
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
      value.price,
      value.qty,
      value.special,
      type === 'done' ? value.finalPrice : 'clear',
      newProduct,
    );
  };

  const saveProducts = async value => {
    var lists = await getJsonData('@add_product');
    var products = [];
    if (lists != null && lists != undefined) {
      products = lists.filter(
        item => item.add_product_id != value.add_product_id,
      );
    }
    products.push(value);
    storeJsonData('@add_product', products);
    configAddProductCount();
  };

  const onGroupItemClicked = item => {
    setSelectedGroupTitle(item.product_group);
    const products = getProducts(item.products);
    setProducts(products);
    productGroupModalRef.current.showModal();
  };

  const geProductPrice = (product, qty) => {
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
          var check = productPriceLists.find(
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
            finalPrice == 0 ? special : '0',
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

  const updateProductPriceLists = useCallback(
    async (product_id, price, qty, special, finalPrice, product) => {
      const lists = [...productPriceLists];
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
    [productPriceLists],
  );

  const openProductDetail = item => {
    setProductDetailTitle(item.product_name);
    setProduct(item);
    if (productDetailsModalRef.current)
      productDetailsModalRef.current.showModal();
  };

  const openAddProductModal = () => {
    addProductModalRef.current.showModal();
  };

  const openSetup = () => {
    setupFieldModalRef.current.showModal();
  };

  const openReorder = () => {
    dispatch(
      showNotification({
        type: Strings.Success,
        message: 'Feature not available yet',
        buttonText: Strings.Ok,
      }),
    );
  };

  const openCart = () => {
    navigation.navigate('CartScreen');
  };

  const updateOutSideTouchStatus = async flag => {
    var setup = await getJsonData('@setup');
    if (setup == null) {
      setOutsideTouch(false);
    } else {
      setOutsideTouch(flag);
    }
  };

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
      }}>
      <SetupFieldModal
        title="Define Setup"
        hideClear
        backButtonDisabled={true}
        closableWithOutsideTouch={outsideTouch}
        ref={setupFieldModalRef}
        hideDivider={true}
        modalType={Constants.modalType.MODAL_TYPE_FULL_WITH_BOTTOM}
        onButtonAction={onSetupFieldModalClosed}
        updateOutSideTouchStatus={updateOutSideTouchStatus}
      />

      <ProductGroupModal
        title={selectedGroupTitle}
        products={groupList}
        settings={settings}
        geProductPrice={geProductPrice}
        openProductDetail={openProductDetail}
        //backButtonDisabled={true}
        closableWithOutsideTouch={true}
        ref={productGroupModalRef}
        isUpdatingProductPrice={isUpdatingProductPrice}
        onButtonAction={onProductGroupModalClosed}
      />

      <ProductFilterModal
        title="Filter your search"
        clearText="Clear Filters"
        closableWithOutsideTouch={true}
        ref={productFilterModalRef}
        onButtonAction={onProductFilterModalClosed}
      />

      <ProductDetailsModal
        title={productDetailTitle}
        product={product}
        settings={settings}
        onButtonAction={onProductDetailsModalClosed}
        ref={productDetailsModalRef}
      />

      <AddProductModal
        onButtonAction={onAddProductModalClosed}
        ref={addProductModalRef}
      />

      <ProductSalesView
        geProductPrice={geProductPrice}
        onGroupItemClicked={onGroupItemClicked}
        openProductDetail={openProductDetail}
        openAddProductModal={openAddProductModal}
        openCart={openCart}
        openSetup={openSetup}
        openReorder={openReorder}
        openFilter={() => {
          productFilterModalRef.current.showModal();
        }}
        lists={lists}
        cartCount={cartCount}
        regret_item={props.regret_item}
        selectedLocation={selectedLocation}
        isUpdatingProductPrice={isUpdatingProductPrice}
        {...props}
      />
    </View>
  );
};
export default ProductSalesContainer;
