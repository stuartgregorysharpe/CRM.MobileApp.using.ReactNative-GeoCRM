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
import {useSelector} from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import {getJsonData} from '../../../../constants/Storage';
import SvgIcon from '../../../../components/SvgIcon';
import SettingView from './SettingView';
import {AppText} from '../../../../components/common/AppText';
import {style} from '../../../../constants/Styles';
import {Colors, Constants, Images} from '../../../../constants';
import QRScanModal from '../../../../components/common/QRScanModal';
var currentSearchKey = '';

const ProductSalesView = props => {
  const {
    settings,
    selectedLocation,
    lists,
    page,
    isLoading,
    cartCount,
    isUpdatingProductPrice,
  } = props;

  const productPriceLists = useSelector(state => state.sales.productPriceLists);
  const [isEndPageLoading, setIsEndPageLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [haveFilter, setHaveFilter] = useState(false);
  const [searchText, setSearchText] = useState('');
  const barcodeScanModalRef = useRef(null);

  useEffect(() => {
    setPageNumber(page);
  }, [page]);

  useEffect(() => {
    checkFilter();
  }, [lists]);

  useEffect(() => {
    if (!isLoading && searchText != currentSearchKey) {
      loadMoreData(0, searchText);
    }
  }, [searchText, isLoading]);
  useEffect(() => {
    if (props.regret_item) {
      setSearchText(props.regret_item?.search_text);
    }
  }, [props.regret_item]);

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
      console.log("isLoading", isLoading)
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
        setSearchText(value);
        loadMoreData(0, value);
      }
    }
  };

  renderFooter = () => {
    if (!isEndPageLoading && isLoading) {
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
    return <View style={{height:100}}></View>;
  };

  return (
    <View style={{alignSelf: 'stretch', flex: 1}}>

      {
        lists.length == 0 &&
        <Image 
          source={Images.productSalePlaceholder}
          style={styles.placeholderStyle}
          resizeMode="stretch"
        />
      }

      {
        lists.length > 0 &&
        <View style={{marginTop:-10}}>
          <SearchBar            
            isFilter
            haveFilter={haveFilter}
            isScan
            onSearch={searchText => {
              setSearchText(searchText);
              console.log('search text ', searchText);
              if ((searchText != '', searchText.length >= 2)) {
                loadMoreData(0, searchText);
              } else if (searchText == '') {
                loadMoreData(0, searchText);
              }
            }}
            onSuffixButtonPress={() => {
              if (props.openFilter) {
                props.openFilter();
              }
            }}
            onScan={() => {
              barcodeScanModalRef.current.showModal();
            }}
            initVal={searchText}
          />

          <SettingView
            openSetup={props.openSetup}
            openReorder={props.openReorder}
            selectedLocation={selectedLocation}
          />

          <FlatList
            data={lists}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
            onEndReached={() => {
              loadMoreData(pageNumber, searchText);
            }}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={false}
            ListFooterComponent={renderFooter.bind(this)}
          />

      
        </View>        
      }


      <View     
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          right: 10,
        }}>

        { lists.length > 0 && settings != undefined && settings?.allow_add_product === '1' && (
          <TouchableOpacity onPress={props.openAddProductModal}>
            <SvgIcon icon="Round_Btn_Default_Dark" width="70px" height="70px" />
          </TouchableOpacity>
        )}

        {lists.length > 0 && ( ///cartCount != undefined && cartCount != 0
          <TouchableOpacity
            onPress={props.openCart}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <SvgIcon icon="Sales_Cart" width="70px" height="70px" />
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
    marginBottom:100
  },
  placeholderStyle:{
    width: Dimensions.get("screen").width,
    height:  Dimensions.get("screen").height - 160
  }
});
