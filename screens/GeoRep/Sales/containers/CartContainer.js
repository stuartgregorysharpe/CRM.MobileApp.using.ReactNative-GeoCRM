import React, {useState, useEffect, useRef} from 'react';
import {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Constants} from '../../../../constants';
import {getJsonData, storeJsonData} from '../../../../constants/Storage';
import {GetRequestProductPriceDAO} from '../../../../DAO';
import CartView from '../components/CartView';
import {
  calculateCartStatistics,
  configProductSetUp,
  getTotalCartProductList,
  getWarehouseGroups,
} from '../helpers';
import ProductGroupModal from '../modal/ProductGroupModal';
import SetupFieldModal from '../modal/SetupFieldModal';
import TransactionSubmitModal from '../modal/TransactionSubmitModal';
import { useDispatch } from 'react-redux';
import { setProductPriceLists } from '../../../../actions/sales.action';

const CartContainer = props => {

  const navigation = props.navigation;
  const transactionSubmitModalRef = useRef(null);
  const dispatch = useDispatch()

  const productPriceList = useSelector(state => state.sales.productPriceLists);
  const settings = useSelector(state => state.sales.salesSettings);
  const [addProductList, setAddProductList] = useState([]);
  const [defineSetup, setDefineSetup] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productListTitle, setProductListTitle] = useState('');
  const setupFieldModalRef = useRef(null);
  const currency = defineSetup?.currency_id;
  const taxRate = currency?.tax_rate;
  const totalProductList = useMemo(
    () => getTotalCartProductList(productPriceList, addProductList),
    [productPriceList, addProductList],
  );
  const cartStatistics = useMemo(
    () => calculateCartStatistics(totalProductList, taxRate),
    [totalProductList, taxRate],
  );
  const wareHouseGroups = useMemo(
    () => getWarehouseGroups(totalProductList),
    [totalProductList],
  );
  useEffect(() => {
    loadAddProductLists();
    loadDefinedConfig();
  }, []);
  const loadAddProductLists = async () => {
    const addProductList = await getJsonData('@add_product');
    if (addProductList != null && addProductList != undefined)
      setAddProductList(addProductList);
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
      configProductSetUp(value , async(type) => {					
        storeJsonData('@setup', value);
        if(type === 'changed'){
          dispatch(setProductPriceLists([]));          
          await storeJsonData("@product_price" , []);
          if (navigation.canGoBack()) {
            navigation.popToTop(); 
          }
        }else{
          loadDefinedConfig();
        }
      });
      setupFieldModalRef.current.hideModal();                        
    }
  };
  const openSetup = () => {
    setupFieldModalRef.current.showModal();
  };
  const updateProductPrice = (product, qty) => {};

  const onTransactionSubmitModalClosed = ({ type, value}) => {
    if(type == Constants.actionType.ACTION_DONE){
      transactionSubmitModalRef.current.hideModal();
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
          if(transactionSubmitModalRef.current)
            transactionSubmitModalRef.current.showModal();
        }}
      />

      <SetupFieldModal
        title="Define Setup"
        hideClear
        backButtonDisabled={true}
        closableWithOutsideTouch={false}
        ref={setupFieldModalRef}
        hideDivider={true}
        modalType={Constants.modalType.MODAL_TYPE_CENTER}
        onButtonAction={onSetupFieldModalClosed}
      />
      

      {/* <ProductGroupModal
        title={productListTitle}
        products={productList}
        settings={settings}
        geProductPrice={updateProductPrice}
        openProductDetail={openProductDetail}
        backButtonDisabled={true}
        closableWithOutsideTouch={false}
        ref={productGroupModalRef}
        onButtonAction={onProductGroupModalClosed}
      /> */}

      
      <TransactionSubmitModal         
        hideClear
        ref={transactionSubmitModalRef}
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
