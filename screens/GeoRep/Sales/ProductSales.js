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
  const [settings, setSettings] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const navigation = props.navigation;
  const regret_item = useSelector(state => state.sales.regret);
  console.log('regret_item', regret_item);

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
    console.log('ProductSales refreshHeader', props.hasBack);
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

  const getProductLists = async (data, search_text = '', pageNumber) => {
    if (data != undefined) {
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
    setIsLoading(true);
    var paramData = await getJsonData('@sale_product_parameter');
    if (paramData != null) {
      paramData['page_no'] = pageNumber;
      if (search_text != undefined) {
        paramData['search_text'] = search_text;
      }
      storeJsonData('@sale_product_parameter', paramData);
      console.log('param', paramData);
      GetRequestProductsList.find(paramData)
        .then(res => {
          setIsLoading(false);
          if (isMount) {
            if (res.status == Strings.Success) {
              setSettings(res.settings);
              dispatch(setSalesSetting(res.settings));
              if (pageNumber == 0) {
                setItems(res.items);
              } else {
                setItems([...items, ...res.items]);
              }
              setPage(pageNumber + 1);
            }
          }
        })
        .catch(e => {
          setIsLoading(false);
          expireToken(dispatch, e);
        });
    }
  };

  return (
    <View style={{paddingTop: 20, alignSelf: 'stretch', flex: 1}}>
      <ProductSalesContainer
        getProductLists={getProductLists}
        getProductListsByFilter={getProductListsByFilter}
        items={items}
        regret_item={regret_item}
        settings={settings}
        page={page}
        isLoading={isLoading}
        loadMoreData={(pageNumber, searchText) => {
          console.log('load more api ', pageNumber, searchText);
          getApiData(searchText, pageNumber);
        }}
        {...props}
      />
    </View>
  );
}
