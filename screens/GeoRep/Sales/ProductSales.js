import {View, Text, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {style} from '../../../constants/Styles';
import {Colors, Strings} from '../../../constants';
import GetRequestProductsList from '../../../DAO/sales/GetRequestProductsList';
import {useDispatch, useSelector} from 'react-redux';
import {expireToken} from '../../../constants/Helper';
import ProductSalesContainer from './containers/ProductSalesContainer';
import {getJsonData, storeJsonData} from '../../../constants/Storage';
import {setSalesSetting} from '../../../actions/sales.action';
import {getConfigFromRegret} from './helpers';
import BackButtonHeader from '../../../components/Header/BackButtonHeader';

export default function ProductSales(props) {
  
  const navigation = props.navigation;

  const [settings, setSettings] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEndPage, setIsEndPage] = useState(false);

  const regret_item = useSelector(state => state.sales.regret);
  const productSaleContainerRef = useRef(null);
  const dispatch = useDispatch();
  let isMount = true;

  useEffect(() => {
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
      var postParam = {
        page_no: 0,
        transaction_type: data.transaction_type.type,
        currency_id: data.currency_id ? data.currency_id.id : '',
        warehouse_id: data.warehouse_id
          ? data.warehouse_id.map(item => item.id).join(',')
          : '',
        filters: '',
      };
      return postParam;
    }
    return {};
  };

  const clearProducts = () => {      
    if(productSaleContainerRef)
      productSaleContainerRef.current.showPlaceHolder();    
  }

  const getProductLists = async (data, search_text = '', pageNumber) => {
    console.log("get product lists", data, search_text, pageNumber)
    if( pageNumber != undefined && pageNumber == 0){
      setIsEndPage(false);
    }
    if (data != undefined  && data != null) {
      storeJsonData('@setup', data);
      const param = getParamData(data);
      await storeJsonData('@sale_product_parameter', param);
    }
    getApiData(search_text, 0);
  };

  const getProductListsByFilter = async data => {
    var paramData = await getJsonData('@sale_product_parameter');
    if (paramData != null) {
      paramData['filters'] = data;
      await storeJsonData('@sale_product_parameter', paramData);
      getApiData('', 0);
    }
  };

  const getApiData = async (search_text, pageNumber) => {
   
    console.log("getApiData", isLoading, isEndPage , search_text , pageNumber);
    if( ( !isLoading || search_text != '' ) && ( !isEndPage || pageNumber == 0) ){      
      var paramData = await getJsonData('@sale_product_parameter');
      if (paramData != null) {
        if(pageNumber == 0){
          setIsEndPage(false);
          clearProducts();
        }
        setIsLoading(true);        
        paramData['page_no'] = pageNumber;
        if (search_text != undefined) {
          paramData['search_text'] = search_text;
        }
        storeJsonData('@sale_product_parameter', paramData);
        console.log("product list param => ", paramData);
        
        GetRequestProductsList.find(paramData)
          .then(res => {
            setIsLoading(false);
            if (isMount) {
              if (res.status == Strings.Success) {
                console.log("Product Lists => ", res.items.length)
                setSettings(res.settings);
                dispatch(setSalesSetting(res.settings));
                productSaleContainerRef.current.updateProductList(res.items, pageNumber);
                if(res.items.length == 0){
                  setIsEndPage(true);
                }
                if (pageNumber == 0) {
                  //setItems(getNewList(res.items));
                  //setItems(res.items);
                } else {
                  //setItems(res.items);
                  //setItems([...items, getNewList(res.items)]);
                }
                setPage(pageNumber + 1);
              }
            }
          })
          .catch(e => {
            setIsLoading(false);
            expireToken(dispatch, e);
          });
      }else{
        console.log("paramData",paramData);
        clearProducts();
      }
    }else{
      console.log("api not called");
    }
    
  };
  
  // const getNewList = (items) => {
  //   var newLists = [];
  //   items.forEach((element) => {
  //     newLists.push({
  //       ...element,
  //       finalPrice: 0,
  //       qty: 0,
  //     });
  //   });
  //   return newLists;        
  // }

  return (
    <View style={{paddingTop: 20, alignSelf: 'stretch', flex: 1}}>
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
