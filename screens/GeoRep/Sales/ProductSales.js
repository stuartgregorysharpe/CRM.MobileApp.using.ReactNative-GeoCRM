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
import BackButtonHeader from '../../../components/Header/BackButtonHeader';

export default function ProductSales(props) {
  const navigation = props.navigation;

  const [settings, setSettings] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEndPage, setIsEndPage] = useState(false);

  const regret_item = props.route.params?.regret_item;
  console.log('regret_item', regret_item);
  const productSaleContainerRef = useRef(null);
  const dispatch = useDispatch();
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
      }
      return postParam;
    }
    return {};
  };

  const clearProducts = () => {
    if (productSaleContainerRef)
      productSaleContainerRef.current.showPlaceHolder();
  };

  const getProductLists = async (data, search_text = '', pageNumber) => {
    console.log('call get product list api', search_text, pageNumber);
    let searchText = search_text;
    setPage(pageNumber);
    if (pageNumber != undefined && pageNumber == 0) {
      setIsEndPage(false);
    }
    if (data != undefined && data != null) {
      const param = getParamData(data);
      await storeJsonData('@sale_product_parameter', param);
    }
    getApiData(searchText, 0);
  };

  const getProductListsByFilter = async data => {
    console.log('getProductListsByFilter');
    var paramData = await getJsonData('@sale_product_parameter');
    if (paramData != null) {
      paramData['filters'] = data;
      await storeJsonData('@sale_product_parameter', paramData);
      getApiData('', 0);
    }
  };

  const getApiData = async (search_text, pageNumber) => {
    console.log('getApiData', isLoading, isEndPage, search_text, pageNumber);
    setPage(pageNumber);
    if ((!isLoading || search_text != '') && (!isEndPage || pageNumber == 0)) {
      var paramData = await getJsonData('@sale_product_parameter');
      if (paramData != null) {
        if (pageNumber == 0) {
          setIsEndPage(false);
          clearProducts();
        }
        setIsLoading(true);
        console.log('is loading ... true');
        paramData['page_no'] = pageNumber;
        if (search_text != undefined) {
          paramData['search_text'] = search_text;
        }
        storeJsonData('@sale_product_parameter', paramData);
        console.log('product list param => ', paramData);

        GetRequestProductsList.find(paramData)
          .then(res => {
            setIsLoading(false);
            console.log('is loading => ', false);

            if (res.status == Strings.Success) {
              console.log('Product Lists => ', res.items.length);
              setSettings(res.settings);
              dispatch(setSalesSetting(res.settings));
              productSaleContainerRef.current.updateProductList(
                res.items,
                pageNumber,
              );
              if (res.items.length == 0) {
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
          })
          .catch(e => {
            setIsLoading(false);
            expireToken(dispatch, e);
          });
      } else {
        console.log('paramData', paramData);
        clearProducts();
      }
    } else {
      console.log('api not called');
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
