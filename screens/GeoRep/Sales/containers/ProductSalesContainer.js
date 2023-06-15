import {View} from 'react-native';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
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
  getLocalData,
  removeLocalData,
  storeJsonData,
  storeLocalValue,
} from '../../../../constants/Storage';
import ProductDetailsModal from '../modal/ProductDetailsModal';
import AddProductModal from '../modal/AddProductModal';
import {
  setProductPriceLists,
  setRegret,  
} from '../../../../actions/sales.action';
import {showNotification} from '../../../../actions/notification.action';
import {getConfigFromRegret, getSearchKey, onCheckProductSetupChanged} from '../helpers';
import {CHANGE_MORE_STATUS} from '../../../../actions/actionTypes';

export const ProductSalesContainer = forwardRef((props, ref) => {
  
  const { navigation , regret_item } = props;
  const productPriceLists = useSelector(state => state.sales.productPriceLists);
  const visibleMore = useSelector(state => state.rep.visibleMore);
  const showMoreScreen = useSelector(state => state.rep.showMoreScreen);
  const {page, items, settings} = props;
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
  const [lists, setLists] = useState([]);
  const [searchInitVal, setSearchInitVal] = useState('');

  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({
    updateProductList(items, page) {
      var newList = [];
      if (
        items != undefined &&
        productPriceLists != undefined &&
        items.length > 0
      ) {
        const tmp = [...items];
        tmp.forEach(item => {
          const newItem = {...item};
          const originProducts = [...newItem.products];
          const products = getProducts(originProducts);
          newItem.products = [...products];
          newList.push(newItem);
        });
      }
      console.log("update lists", page , newList.length)
      if (page == 0) {
        setLists(newList);
      } else {
        if(newList.length != 0){
          setLists([...lists, ...newList]);
        }      
      }
    },

    showPlaceHolder() {
      setLists([]);
    },
  }));

  const getProducts = useCallback(
    products => {
      var list = [];
      if (products != undefined) {
        products.forEach(element => {

          const product = productPriceLists.find(
            item =>
              item != undefined &&
              parseInt(item.product_id) == parseInt(element.product_id) &&
              parseInt(item.warehouse_id) == parseInt(element.warehouse_id) 
          );

          var newElement = {
            ...element,
          };
          var price = element.price;
          if (product != undefined) {
            var finalPrice = 0;
            var discountPrice = 0;
            if (
              product.finalPrice != undefined &&
              product.finalPrice != '' &&
              product.finalPrice.final_price != undefined
            ) {
              finalPrice = product.finalPrice.final_price;
              discountPrice = product.finalPrice.discountPrice;
            }
            if (
              product.price != undefined &&
              product.price != '' 
              //product.price != 0
            ) {
              price = product.price;
            }

            list.push({
              ...newElement,
              price: price,
              finalPrice: finalPrice,
              discountPrice : discountPrice,
              special: product.special,
              qty: product.qty,
            });
          } else {
            list.push({
              ...newElement,
              finalPrice: 0,
              discountPrice : '',
              qty: 0,
            });
          }
        });
      }
      return list;
    },
    [productPriceLists],
  );

  useEffect(() => {
    var newList = [];
    if (
      lists != undefined &&
      productPriceLists != undefined &&
      lists.length > 0
    ) {
      const tmp = [...lists];
      tmp.forEach(item => {
        const newItem = {...item};
        const originProducts = [...newItem.products];
        const products = getProducts(originProducts);
        newItem.products = [...products];
        newList.push(newItem);
      });
    }
    setLists(newList);
  }, [productPriceLists]);

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
    onInitialize();    
  }, []);

  useEffect(() => {
    console.log('show more screen', showMoreScreen, visibleMore);    
    if (showMoreScreen === 1 && (visibleMore == 'ProductSales' || visibleMore == 'Sales') ) {      
      refreshList();
    }
  }, [showMoreScreen, visibleMore]);
  const checkIsRegret = () => {    
    return regret_item != undefined && regret_item != null ? true : false;
  };
  const onInitialize = () => {
    const isRegret = checkIsRegret();
    if (!isRegret) {
      checkAndOpenSetup();
      initializeProductLists();
    }
  };
  const checkAndOpenSetup = async () => {    
    const isRegretInitialize = await getLocalData('@regret_sales_initialize');    
    if (isRegretInitialize === '0' || isRegretInitialize === undefined ) {
      openSetup();
    }
  };
  useEffect(() => {
    if (productPriceLists != null) {
      configAddProductCount();
    }
  }, [productPriceLists]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {            
      const isRegretInitialize = await getLocalData('@regret_sales_initialize');      
      if (isRegretInitialize === '1') {        
        const regret = await getJsonData('@regret');
        console.log("focus", isRegretInitialize, regret);
        if(regret != undefined && regret != null){
          setupDefineSetupFromRegret(regret);  
        }        
      } else {
        refreshList();
      }
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {    
  //   if(checkIsRegret()){            
  //     setupDefineSetupFromRegret(regret_item);
  //     setSearchInitVal(regret_item?.search_text);
  //   }
  // }, [regret_item]);

  const refreshList = async (search_text = undefined) => {
    var storedProductPriceList = await getJsonData('@product_price');
    var storedAddProductList = await getJsonData('@add_product');
    var defineSetup = await getJsonData('@setup');
    if (
      (storedProductPriceList == null || storedProductPriceList.length == 0) &&
      (storedAddProductList == null || storedAddProductList.length == 0) &&
      defineSetup != null
    ) {
      props.getProductLists(defineSetup, search_text , 0);      
    }

    var searchKey = await getSearchKey();
    setSearchInitVal(searchKey);

    console.log("defineSetup", defineSetup);
    if (defineSetup === null) {      
      setSelectedLocation(null)
      checkAndOpenSetup();
    } else {
      setSelectedLocation(defineSetup.location.name);      
    }
  };

  const initializeProductLists = async () => {
    const storedProductPriceList = await getJsonData('@product_price');
    console.log('storedProductPriceList ==', storedProductPriceList);
    if (storedProductPriceList != null && storedProductPriceList.length > 0) {
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

  const setupDefineSetupFromRegret = async (regret_item) => {    
    const isRegretInitialize = await getLocalData('@regret_sales_initialize');    
    if (regret_item && isRegretInitialize === '1') {
      storeLocalValue('@regret_sales_initialize', '0');
      console.log('setupDefineSetupFromRegret: regret_item', regret_item);
      const config = getConfigFromRegret(regret_item);      
      await storeJsonData('@product_price', []);
      await removeLocalData('@add_product');
      dispatch(setProductPriceLists([]));
      setCartCount(0);
      if(config?.location?.location_id != undefined){                        
        setupFromConfig(config, regret_item?.search_text , 'regret');
      }
    }
  };

  const setupFromConfig = (config, searchText, regretType) => {

    if (props.getProductLists) {      

      if(config?.location?.name != undefined){
        setSelectedLocation(config?.location?.name);
      }
      
      setSearchInitVal('');

      onCheckProductSetupChanged(config, type => {
        if (type.includes('changed')) {          
          storeJsonData('@setup', config);
          storeJsonData('@product_price', []);
          removeLocalData('@add_product');
          dispatch(setProductPriceLists([]));
          console.log("changed", searchText)
          setSearchInitVal(searchText);
          props.getProductLists(config, searchText, 0);
        }else{
          if(regretType === 'regret'){
            console.log("no changed", searchText)
            setSearchInitVal(searchText);
            props.getProductLists(config, searchText, 0);
          }
        }
      });

      configAddProductCount();      
      if (config != undefined) {
        setOutsideTouch(true);
      }
    }
  };
  const onSetupFieldModalClosed = ({type, value}) => {
    setOutsideTouch(false);
    if (type === Constants.actionType.ACTION_CLOSE) {
      setupFieldModalRef.current.hideModal();
      if (value != null) {
        setupFromConfig(value, '' , '');
        dispatch(setRegret(null));
      }
    } else if (type == Constants.actionType.ACTION_DONE) {
      setupFieldModalRef.current.hideModal();
      if (value?.name === 'More') {
        dispatch({type: CHANGE_MORE_STATUS, payload: 0});
      } else {
        navigation.navigate(value.name);
      }
    } else if (type === Constants.actionType.ACTION_FORM_CLEAR) {
      //setSelectedLocation(null);
      // if(props.clearProducts){
      //   props.clearProducts();
      // }
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

  const onProductDetailsModalClosedFromGroupModal = ({type, value}) => {
    if (type === Constants.actionType.ACTION_DONE) {
      saveFinalPrice(value, 'done');      
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
      value.warehouse_id,
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

  const geProductPrice = async (product, qty) => {
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
            console.log('res => ', res);
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
              product.warehouse_id,
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
    } else {
      console.log(' There is no Define Setup');
    }
  };

  const updateProductPriceLists = useCallback(
    async (product_id, warehouse_id , price, qty, special, finalPrice, product) => {

      const lists = [...productPriceLists];
      var tmpList = lists.filter(item => !(parseInt(item.product_id) == parseInt(product_id) && parseInt(item.warehouse_id) == parseInt(warehouse_id)) );
      var check = lists.find( item => parseInt(item.product_id) == parseInt(product_id) && parseInt(item.warehouse_id) == parseInt(warehouse_id)  );
      
      console.log("update price", price)

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
    setOutsideTouch(false);
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
        backButtonDisabled={!outsideTouch}
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
        //openProductDetail={openProductDetail}
        closableWithOutsideTouch={true}
        ref={productGroupModalRef}
        isUpdatingProductPrice={isUpdatingProductPrice}
        onButtonAction={onProductGroupModalClosed}
        onProductDetailsModalClosed={onProductDetailsModalClosedFromGroupModal}

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
        regret_item={regret_item}
        selectedLocation={selectedLocation}
        isUpdatingProductPrice={isUpdatingProductPrice}
        initVal={searchInitVal}
        {...props}
      />
    </View>
  );
});

export default ProductSalesContainer;
