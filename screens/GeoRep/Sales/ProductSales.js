import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef, useState } from 'react';
import {style} from '../../../constants/Styles';
import {Colors, Strings} from '../../../constants';
import GetRequestProductsList from '../../../DAO/sales/GetRequestProductsList';
import {useDispatch, useSelector} from 'react-redux';
import {expireToken} from '../../../constants/Helper';
import ProductSalesContainer from './containers/ProductSalesContainer';
import {getJsonData, storeJsonData} from '../../../constants/Storage';
import {setSalesSetting} from '../../../actions/sales.action';
import BackButtonHeader from '../../../components/Header/BackButtonHeader';
import AlertModal from '../../../components/modal/AlertModal';

export default function ProductSales(props) {

  const navigation = props.navigation;

  const [settings, setSettings] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEndPage, setIsEndPage] = useState(false);
  const regret_item = props.route.params?.regret_item;  
  const productSaleContainerRef = useRef(null);
  const alertModalRef = useRef();
  const dispatch = useDispatch();
  const PAGE_SIZE = 10;

  let isMount = true;

  useEffect(() => {
    isMount = true;
    refreshHeader();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshHeader();
    });
    return unsubscribe;
  }, [navigation]);

  const refreshHeader = () => {
    if (props.screenProps) {
      if (props.hasBack) {
        props.screenProps.setOptions({
          headerTitle: () => {
            return (
              <BackButtonHeader title={'Sales'} navigation={props.navigation} />
            );
          },
          tabBarStyle: {
            height: 50,
            paddingBottom: Platform.OS == 'android' ? 5 : 0,
            backgroundColor: Colors.whiteColor,
          },
        });
      } else {
        props.screenProps.setOptions({
          headerTitle: () => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View style={style.headerTitleContainerStyle}>
                  <Text style={style.headerTitle}>Sales</Text>
                </View>
              </TouchableOpacity>
            );
          },
        });
      }
    }
  };

  const getParamData = data => {
    if (data != null && data != undefined) {
      const postParam = {
        page_no: 0,
        transaction_type: data.transaction_type.type,
        currency_id: data.currency_id ? data.currency_id.id : '',
        warehouse_id: data.warehouse_id
          ? data.warehouse_id.map(item => item.id).join(',')
          : '',
        filters: '',
      };

      if (data.location?.location_id) {
        postParam.location_id = data.location?.location_id;
        return postParam;
      }
      
    }
    return null;
  };

  const clearProducts = () => {
    if (productSaleContainerRef)
      productSaleContainerRef.current.showPlaceHolder();
  };

  const getProductLists = async (data, search_text = undefined , pageNumber) => {
    console.log('call get product list api', search_text, pageNumber);
    let searchText = search_text;
    setPage(pageNumber);
    if (pageNumber != undefined && pageNumber == 0) {
      setIsEndPage(false);
    }
    if (data != undefined && data != null) {
      const param = getParamData(data);
      if(param != null){
        var sale_product_parameter = await getJsonData("@sale_product_parameter");
        if(sale_product_parameter != null){
          param['search_text'] = sale_product_parameter.search_text;
        }
        await storeJsonData('@sale_product_parameter', param);
      }
    }    
    getApiData(searchText, 0);
  };

  const getProductListsByFilter = async data => {
    console.log('getProductListsByFilter');
    var paramData = await getJsonData('@sale_product_parameter');
    if (paramData != null) {
      paramData['filters'] = data;
      await storeJsonData('@sale_product_parameter', paramData);
      getApiData(undefined, 0);
    }
  };

  const getApiData = async (search_text, pageNumber) => {
    
    setPage(pageNumber);
    if ((!isLoading || search_text != '') && (!isEndPage || pageNumber == 0)) {
      var paramData = await getJsonData('@sale_product_parameter');
      if (paramData != null) {
        if (pageNumber == 0) {
          setIsEndPage(false);
          clearProducts();
        }
        setIsLoading(true);        
        paramData['page_no'] = pageNumber;
        if (search_text != undefined) {
          paramData['search_text'] = search_text;
        }
        storeJsonData('@sale_product_parameter', paramData);
        console.log('product list param => ', paramData);
        GetRequestProductsList.find(paramData)
          .then(res => {
            setIsLoading(false);
            if (res.status == Strings.Success) {
              setSettings(res.settings);
              dispatch(setSalesSetting(res.settings));
              if (res.items.length == 0 ) { //< PAGE_SIZE
                setIsEndPage(true);
              }else{
                productSaleContainerRef.current.updateProductList(
                  res.items,
                  pageNumber,
                );
              }
              setPage(pageNumber + 1);
            }
          })
          .catch(e => {
            setIsLoading(false);
            expireToken(dispatch, e, alertModalRef);
          });
      } else {        
        clearProducts();
      }
    } else {
      console.log('api not called');
    }

  };
  
  return (
    <View style={{paddingTop: 20, alignSelf: 'stretch', flex: 1}}>

      <AlertModal ref={alertModalRef} />

      <ProductSalesContainer
        ref={productSaleContainerRef}
        clearProducts={clearProducts}
        getProductLists={getProductLists}
        getProductListsByFilter={getProductListsByFilter}
        items={items}
        regret_item={regret_item}
        settings={settings}
        page={page}
        isLoading={isLoading}
        loadMoreData={(pageNumber, searchText) => {          
          getApiData(searchText, pageNumber);
        }}
        {...props}
      />
    </View>
  );
}
