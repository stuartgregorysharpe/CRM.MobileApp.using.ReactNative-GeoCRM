import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import ProductItem from './items/ProductItem';
import ProductGroupItem from './items/ProductGroupItem';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import {getJsonData} from '../../../../constants/Storage';
import SvgIcon from '../../../../components/SvgIcon';
import SettingView from './SettingView';
import {AppText} from '../../../../components/common/AppText';
import {style} from '../../../../constants/Styles';
import {Colors, Constants, Images} from '../../../../constants';
import QRScanModal from '../../../../components/common/QRScanModal';
import ProductSalesPlaceholder from './ProductSalesPlaceholder';
import {SALES_SET_SEARCH_TEXT} from '../../../../actions/actionTypes';
var currentSearchKey = '';

const ProductSalesView = props => {
  const {
    settings,
    selectedLocation,
    lists,
    page,
    isLoading,
    isEndPage,
    cartCount,
    isUpdatingProductPrice,
    initVal
  } = props;

  const productPriceLists = useSelector(state => state.sales.productPriceLists);
  const [isEndPageLoading, setIsEndPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [haveFilter, setHaveFilter] = useState(false);
  //const searchText = useSelector(state => state.sales.searchText);
  const [searchText, setSearchText] = useState('');
  const [isInitializeView, setIsInitializeView] = useState(true);
  const barcodeScanModalRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {    
    setSearchText(initVal);
  }, [initVal]);

  useEffect(() => {
    setPageNumber(page);
  }, [page]);

  useEffect(() => {
    configPlaceholder(isLoading, selectedLocation);
  }, [isLoading, selectedLocation]);

  useEffect(() => {
    checkFilter();
  }, [lists]);

  useEffect(() => {
    console.log("Search key", searchText);
    console.log("currnt Search key", currentSearchKey , isLoading);
    //!isLoading && 
    if (currentSearchKey != undefined && (searchText != currentSearchKey || searchText == currentSearchKey) ) {
      if(searchText !=undefined){
        loadMoreData(0, searchText);
      }      
    }    
  }, [searchText]); //isLoading

  const configPlaceholder = async (isLoading, selectedLocation) => {
    const setupData = await getJsonData('@setup');    
    if (setupData === null || selectedLocation === null) {
      setIsInitializeView(true);
    } else {
      console.log("triger false");
      setIsInitializeView(false);
    }
  };

  const checkFilter = async () => {
    var param = await getJsonData('@sale_product_parameter');
    if (param != null) {
      var filters = param['filters'];
      var flag = false;
      if (
        filters != '' &&
        filters != undefined &&
        filters.product_type &&
        filters.brands
      ) {
        if (filters.product_type.length > 0 || filters.brands.length > 0) {
          flag = true;
        }
      }
      setHaveFilter(flag);
    }
  };

  const renderItem = (item, index) => {
    const products = item.products;
    if (parseInt(item.count) == 1) {
      return (
        <ProductItem
          key={index}
          settings={settings}
          isLoading={isUpdatingProductPrice}
          geProductPrice={(product_id, qty) => {
            if (props.geProductPrice) {
              props.geProductPrice(product_id, qty);
            }
          }}
          openProductDetail={item => {
            if (props.openProductDetail) {
              props.openProductDetail(item);
            }
          }}
          item={products.length == 1 ? products[0] : null}
          productPriceLists={productPriceLists}
        />
      );
    }
    if (parseInt(item.count) > 1) {
      return (
        <ProductGroupItem
          key={index}
          onGroupItemClicked={() => {
            if (props.onGroupItemClicked) {
              props.onGroupItemClicked(item);
            }
          }}
          title={item.product_group}
          products={products}
        />
      );
    }
  };

  const loadMoreData = useCallback(
    (pageNumber, searchKey) => {
      console.log('isLoading', isLoading);
      if (isEndPageLoading === false && isLoading === false) {
        if (props.loadMoreData) {
          currentSearchKey = searchKey;
          props.loadMoreData(pageNumber, searchKey);
        }
      }
    },
    [isEndPageLoading, isLoading],
  );

  const onScanAction = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      if (value) {
        //const capturedItem = captureDeviceStockItem(items, value);
        //dispatch({type: SALES_SET_SEARCH_TEXT, payload: value});
        setSearchText(value);
        loadMoreData(0, value);
      }
    }
  };

  renderFooter = () => {
    if (!isEndPageLoading && isLoading) {
      if (page == 0 && pageNumber == 0) {
       return <ProductSalesPlaceholder />;
      } else {
        return (
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.loadMoreBtn}>
              <Text style={styles.btnText}>Loading</Text>
              {isLoading ? (
                <ActivityIndicator color="white" style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity>
          </View>
        );
      }
    }
    return <View style={{height: 100}}></View>;
  };

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>
      <View style={{marginTop: -10}}>
        <SearchBar
          isFilter
          haveFilter={haveFilter}
          isScan
          onSearch={searchText => {
            if (!isInitializeView) {
              //dispatch({type: SALES_SET_SEARCH_TEXT, payload: searchText});
              if(currentSearchKey === undefined){
                currentSearchKey = searchText;
              }
              setSearchText(searchText);
              console.log('search text ', searchText);
              // if ((searchText != '', searchText.length >= 2)) {
              //   loadMoreData(0, searchText);
              // } else if (searchText == '') {
              //   loadMoreData(0, searchText);
              // }
            }
          }}
          onSuffixButtonPress={() => {
            if (props.openFilter && !isInitializeView) {
              props.openFilter();
            }
          }}
          onScan={() => {
            if (!isInitializeView) barcodeScanModalRef.current.showModal();
          }}
          initVal={initVal}
          isLoading={isInitializeView}
        />

        <SettingView
          openSetup={props.openSetup}
          openReorder={props.openReorder}
          selectedLocation={selectedLocation}
          isInitializeView={isInitializeView}
        />

        {isInitializeView && <ProductSalesPlaceholder />}
      </View>

      <FlatList
        data={lists}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.props}
        onEndReached={() => {          
          loadMoreData(pageNumber, undefined);
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={false}
        ListFooterComponent={renderFooter.bind(this)}
      />

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          right: 10,
        }}>
        {(settings != undefined && settings?.allow_add_product === '1') ||
          (isInitializeView && settings == null && (
            <TouchableOpacity onPress={props.openAddProductModal}>
              <SvgIcon
                icon={
                  isInitializeView
                    ? 'Round_Btn_Default_Dark_Gray'
                    : 'Round_Btn_Default_Dark'
                }
                width="70px"
                height="70px"
              />
            </TouchableOpacity>
          ))}

        {true && ( ///cartCount != undefined && cartCount != 0
          <TouchableOpacity
            onPress={props.openCart}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <SvgIcon
              icon={isInitializeView ? 'Sales_Cart_Gray' : 'Sales_Cart'}
              width="70px"
              height="70px"
            />
            <AppText
              title={cartCount}
              style={styles.cartNumberStyle}
              color={Colors.whiteColor}
            />
          </TouchableOpacity>
        )}
      </View>

      <QRScanModal
        ref={barcodeScanModalRef}
        isPartialDetect={true}
        onButtonAction={onScanAction}
        showClose={true}
        onClose={() => {
          barcodeScanModalRef.current.hideModal();
        }}
      />
    </View>
  );
};

export default ProductSalesView;

const styles = StyleSheet.create({
  cartNumberStyle: {
    position: 'absolute',
    fontSize: 14,
    alignItems: 'center',
    paddingTop: 5,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  
});
