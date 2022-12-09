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
import {configProductSetUp} from '../helpers';

const ProductSalesContainer = props => {
  const navigation = props.navigation;
  const productPriceLists = useSelector(state => state.sales.productPriceLists);
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

          // if(element.product_id == "1"){
          // 	console.log("element" , element);
          // 	console.log("product" , product);
          // }

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
      //};
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
    setupFieldModalRef.current.showModal();
    initializeProductLists();
  }, []);

  useEffect(() => {
    configAddProductCount();
  }, [productPriceLists])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //setupFieldModalRef.current.showModal();
      refreshList();
    });
    return unsubscribe;
  }, [navigation]);

  const refreshList = async () => {
    var productLists = await getJsonData('@product_price');
    var addProductList = await getJsonData('@add_product');
    if ( (productLists == null || productLists.length == 0 ) && (addProductList == null || addProductList.length == 0) ) {
      props.getProductLists();
    }
  };

  const initializeProductLists = async () => {
    var productLists = await getJsonData('@product_price');
    if (productLists != null) {
      dispatch(setProductPriceLists(productLists));
      setOutsideTouch(true);
      props.getProductLists();
    }
    configAddProductCount();
  };

  const configAddProductCount = async () => {
    var addProductLists = await getJsonData('@add_product');
    var count = 0;
    if (addProductLists != null && addProductLists != undefined){
      count = addProductLists.length;
    }
    if(productPriceLists != undefined && productPriceLists != null && productPriceLists.length > 0){
      var tmpLists = productPriceLists.filter(item => parseInt(item.qty) > 0);
      count += tmpLists.length;
    }
    setCartCount(count);
  };

  const onSetupFieldModalClosed = ({type, value}) => {
    if (type === Constants.actionType.ACTION_CLOSE) {
      setupFieldModalRef.current.hideModal();
      if (props.getProductLists) {
        setSelectedLocation(value.location.name);
        configProductSetUp(value, type => {
          if (type === 'changed') {
            dispatch(setProductPriceLists([]));
            storeJsonData('@product_price', []);
            removeLocalData('@add_product');
          }
        });
        configAddProductCount();
        props.getProductLists(value);
        if (value != undefined) {
          setOutsideTouch(true);
        }
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

  const saveProducts = async value => {
    var lists = await getJsonData('@add_product');
    var products = [];
    if (lists != null && lists != undefined) {
      products = lists.filter(
        item => item.add_product_id != value.add_product_id,
      );
    }
    products.push(value);
    setCartCount(products.length);
    storeJsonData('@add_product', products);
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
    console.log('set product item', item);
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

  const updateOutSideTouchStatus = async(flag) => {    
    var setup = await getJsonData("@setup");
    if(setup == null){
      setOutsideTouch(false);
    }else{
      setOutsideTouch(flag);
    }    
  }

  return (
    <View
      style={{
        alignSelf: 'stretch',
        flex: 1,
      }}>
      <SetupFieldModal
        title="Define Setup"
        //hideClear
        backButtonDisabled={true}
        closableWithOutsideTouch={outsideTouch}
        ref={setupFieldModalRef}
        hideDivider={true}
        modalType={Constants.modalType.MODAL_TYPE_CENTER}
        onButtonAction={onSetupFieldModalClosed}
        updateOutSideTouchStatus={updateOutSideTouchStatus}
      />

      <ProductGroupModal
        title={selectedGroupTitle}
        products={groupList}
        settings={settings}
        geProductPrice={geProductPrice}
        openProductDetail={openProductDetail}
        backButtonDisabled={true}
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
        selectedLocation={selectedLocation}
        isUpdatingProductPrice={isUpdatingProductPrice}
        {...props}
      />
    </View>
  );
};
export default ProductSalesContainer;
