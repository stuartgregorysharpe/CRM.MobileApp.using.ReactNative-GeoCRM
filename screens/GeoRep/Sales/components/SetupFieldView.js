import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import DropdownSelection from './DropdownSelection';
import SaleType from './SaleType';
import SearchLocationContainer from '../../Stock/stock/container/SearchLocationContainer';
import LocationInfo from './LocationInfo';
import {useSelector} from 'react-redux';
import {
  getJsonData,
  getLocalData,
  storeJsonData,
} from '../../../../constants/Storage';
import CurrencyType from './CurrencyType';
import Warehouse from './Warehouse';
import {AppText} from '../../../../components/common/AppText';
import {Colors, Fonts, Strings, Values} from '../../../../constants';
import {getLocationInfo} from '../../../../actions/location.action';
import {getLocationInfoFromLocal} from '../../../../sqlite/DBHelper';
import {getReconfigFromRegret, onCheckProductSetupChanged} from '../helpers';

export const SetupFieldView = forwardRef((props, ref) => {

  const {
    isClear,
    isLoading,
    setupField,
    transaction_types,
    currency,
    warehouse,  
  } = props;

  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const [isSearchStart, setIsSearchStart] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSaleType, setSelectedSaleType] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [warehouseRequired, setWarehouseRequired] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [isDiscard, setIsDiscard] = useState(false);
  const isCheckin = useSelector(state => state.location.checkIn);

  useImperativeHandle(ref, () => ({
    updateSetupData(type) {      
      if (type == 'load') {
        initializeSetupDataFromStorage();
      } else {
        intializeSetupDataFromApi(currency, warehouse, transaction_types);
      }
    },
  }));

  useEffect(() => {
    initializeLocation();
  }, [isCheckin]);

  useEffect(() => {
    if (isClear) {
      if (!isLoading) {
        clearSetup();
      }
      if (props.updateClear) {
        props.updateClear(false);
      }
    }
  }, [isClear]);

  useEffect(() => {
    if (
      selectedSaleType != null &&
      selectedCurrency != null &&
      selectedWarehouse != null &&
      selectedLocation != null
    ) {
      if (selectedWarehouse.length > 0) {
        getChangedStatus();
      }
    }
  }, [selectedSaleType, selectedCurrency, selectedWarehouse, selectedLocation]);

  const clearSetup = async () => {
    
    if (isCheckin) {
      getCheckinLocationInfo();
    } else {
      setSelectedLocation(null);
    }
    
    if (props.onChangeLocation) {
      const locationId = await getLocalData('@specific_location_id');
      const locInfo = await getLocationInfoFromLocal(locationId);
      const location = {...locInfo, location_id: locationId};
      props.onChangeLocation(location);
    }
  };

  const getCheckinLocationInfo = async () => {
    const locationId = await getLocalData('@specific_location_id');
    const locInfo = await getLocationInfoFromLocal(locationId);
    if (locInfo.name != '') {
      setSelectedLocation({...locInfo, location_id: locationId});
    } else {
      // get location info from online api call.
      getLocationInfo(locationId)
        .then(async res => {          
          var location = {
            name: res.location_name.value,
            address: res.address,
            location_id: locationId,
          };
          setSelectedLocation(location);
        })
        .catch(e => {});
    }
  };

  const initializeLocation = async () => {
    var data = await getJsonData('@setup');
    if (data != null) {
      setSelectedLocation(data.location);
    } else if (isCheckin) {
      getCheckinLocationInfo();
    } else {
      setSelectedLocation(null);
    }
  };

  const initializeSetupDataFromStorage = async () => {
    var data = await getJsonData('@setup');
    if (data != null) {
      setSelectedSaleType(data.transaction_type);
      setSelectedCurrency(data.currency_id);
      setSelectedLocation(data.location);

      if (
        data?.currency_id?.abbreviation != undefined &&
        data?.currency_id?.abbreviation != ''
      ) {
        setSelectedCurrency(data.currency_id);
      } else if (data?.currency_id?.id != undefined && data?.currency_id?.abbreviation === undefined) {        
        const config = getReconfigFromRegret(data, setupField);
        setSelectedCurrency(config.currency_id);
        if(config?.location?.location_id != undefined){
          storeJsonData('@setup', config);
        }        
      }

      if (data.transaction_type != '') {
        onWarehouseRequired(data.transaction_type.warehouse_required);
      }

      if (data.warehouse_id != '') {
        setSelectedWarehouse(data.warehouse_id);
      }
    }
  };

  const intializeSetupDataFromApi = async (
    currency,
    warehouse,
    transaction_types,
  ) => {
    console.log('cur', currency);
    if (currency != null && warehouse != null && transaction_types != null) {
      if (transaction_types != null && transaction_types.default_type != '') {
        const transactionType = transaction_types.options.find(
          item => item.type === transaction_types.default_type,
        );
        setSelectedSaleType(transactionType);
        if (transactionType != undefined) {
          onWarehouseRequired(transactionType.warehouse_required);
        }
      }
      if (currency != undefined && currency.default_currency) {
        const defaultCurrency = currency.options.find(
          item => item.id === currency.default_currency,
        );
        setSelectedCurrency(defaultCurrency);
      }

      if (warehouse != undefined && warehouse.default_warehouse) {
        const options = warehouse.options ? warehouse.options : [];
        const items = options.filter(element =>
          warehouse.default_warehouse.includes(element.id),
        );
        if (items != undefined) {
          console.log('warhouse froma api');
          setSelectedWarehouse(items);
        }
      }
    }
  };


  const onSearch = (location, locationId) => {
    setIsSearchStart(false);
    setSelectedLocation(location);
    if (props.onChangeLocation) {
      props.onChangeLocation(location);
    }
  };

  const onStartSearch = flag => {
    setIsSearchStart(flag);
  };

  const onCurrencyItemSelected = item => {
    setSelectedCurrency(item);
  };

  const onWarehouseItemSelected = (item, isChecked) => {
    if (item.id === 0) {
      // All Warehouse
      if (isChecked) {
        //setSelectedWarehouse([])
      } else {
        setSelectedWarehouse([{id: 0, label: 'all'}, ...warehouse.options]);
      }
    } else {
      if (isChecked) {
        const tmp = selectedWarehouse.filter(
          element => element.id != item.id && element.id != 0,
        );
        if (tmp.length != 0) {
          setSelectedWarehouse(tmp);
        } else if (tmp.length == 0) {
          setSelectedWarehouse([{id: 0, label: 'all'}, ...warehouse.options]);
        }
      } else {
        setSelectedWarehouse([...selectedWarehouse, item]);
      }
    }
  };

  const onSelectedSaleType = type => {
    setSelectedSaleType(type);
  };

  const onWarehouseRequired = required => {
    if (features.includes('product_multiple_warehouse')) {
      setWarehouseRequired(required === '1' ? true : false);
    }
  };

  const renderWarehouseTitle = () => {
    if (warehouse && warehouse?.options?.length > 0) {
      const allSelected = selectedWarehouse.find(item => item.id == 0);
      if (allSelected != undefined) {
        return 'ALL SELECTED';
      }
      if (selectedWarehouse.length == 1) {
        return selectedWarehouse[0].label;
      } else if (selectedWarehouse.length > 1) {
        return selectedWarehouse.length + ' SELECTED';
      }
    }
    return '';
  };

  const renderCurrencyTitle = () => {
    if (currency && currency?.options?.length > 0) {
      return selectedCurrency != null
        ? selectedCurrency.abbreviation + '(' + selectedCurrency.symbol + ')'
        : '';
    }
    return '';
  };

  const isValidate = () => {
    var flag = false;
    if (
      !isLoading &&
      selectedLocation != null &&
      selectedSaleType != null &&
      selectedCurrency != null &&
      currency &&
      currency?.options?.length > 0 &&
      ((warehouseRequired &&
        selectedWarehouse.length != 0 &&
        warehouse &&
        warehouse?.options?.length > 0) ||
        !warehouseRequired)
    ) {
      flag = true;
    }    
    return flag;
  };

  const onContinue = () => {
    if (isValidate()) {
      props.onContinue({
        transaction_type: selectedSaleType,
        currency_id: selectedCurrency,
        warehouse_id: selectedWarehouse,
        location: selectedLocation,
      });
    }
  };

  const onClear = () => {
    if (props.updateClear) {
      props.updateClear(true);
    }
  };

  const getChangedStatus = useCallback(async () => {
    var setupData = await getJsonData('@setup');
    if (setupData != null) {
      const value = {
        transaction_type: selectedSaleType,
        currency_id: selectedCurrency,
        warehouse_id: selectedWarehouse,
        location: selectedLocation,
      };

      onCheckProductSetupChanged(value, async type => {
        if (props.updateOutSideTouchStatus) {          
          if (type.includes('changed')) {
            props.updateOutSideTouchStatus(false);
            setIsDiscard(true);
          } else {
            props.updateOutSideTouchStatus(true);
            setIsDiscard(false);
          }
        }
      });
    }
  }, [selectedSaleType, selectedCurrency, selectedWarehouse, selectedLocation]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.titleContainer, {marginTop: 5}]}>
        <View
          style={{
            flex: 1,
            marginRight: 50,
            alignItems: props.headerType === 'center' ? 'center' : 'flex-start',
          }}>
          {props.title && (
            <AppText
              title={props.title}
              size="big"
              type="secondaryBold"
              style={{marginBottom: 5}}
            />
          )}
        </View>

        {true && (
          <TouchableOpacity
            style={styles.clearButtonContainer}
            onPress={onClear}>
            <Text style={styles.clearText}>{'Clear'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{maxHeight: Values.modalHeight - 160  }}>

          <ScrollView style={{ flexDirection:'column'}}>
            <SearchLocationContainer
                type="setup"
                onSubmit={onSearch}
                onStartSearch={onStartSearch}
                isSkipLocationIdCheck
                //style={ styles.bgColor}
                //style={[isSearchStart ? styles.bgColor : {}]}
                {...props}
              />

              {selectedLocation != null && !isSearchStart && (
                <LocationInfo
                  onClose={() => {
                    setSelectedLocation(null);
                  }}
                  location={selectedLocation}
                />
              )}

              {!isSearchStart && (
                <View style={{alignSelf: 'stretch'}}>
                  <SaleType
                    transaction_types={transaction_types}
                    selectedSaleType={selectedSaleType}
                    onSelectedSaleType={onSelectedSaleType}
                    onWarehouseRequired={onWarehouseRequired}
                  />

                  <DropdownSelection
                    title="Currency Type"
                    selectedItem={renderCurrencyTitle()}
                    selectedCurrency={selectedCurrency}
                    items={currency ? currency.options : []}>
                    <CurrencyType
                      selectedItem={selectedCurrency}
                      onItemSelected={onCurrencyItemSelected}
                      lists={currency ? currency.options : []}></CurrencyType>
                  </DropdownSelection>

                  {warehouseRequired && (
                    <DropdownSelection
                      title="Warehouse"
                      selectedItem={renderWarehouseTitle()}
                      items={warehouse ? warehouse.options : []}>
                      <Warehouse
                        selectedItem={selectedWarehouse}
                        onItemSelected={onWarehouseItemSelected}
                        warehouse={warehouse}
                      />
                    </DropdownSelection>
                  )}

                  {isDiscard && (
                    <AppText
                      title={Strings.ProductSales.Click_Update}
                      color={Colors.redColor}
                      style={{textAlign: 'center', marginHorizontal: 20}}></AppText>
                  )}                                    
                </View>
              )}
          </ScrollView>

          {!isSearchStart &&
            <View >            
                <View style={styles.divider}></View>
                {!isDiscard && (
                    <View style={{alignItems: 'center', paddingVertical: 5}}>
                      <TouchableOpacity
                        style={{alignSelf: 'stretch', alignItems: 'center'}}
                        disabled={!isValidate()}
                        onPress={() => onContinue()}>
                        <AppText
                          title="Continue"
                          size="big"
                          color={
                            !isValidate() ? Colors.disabledColor : Colors.primaryColor
                          }></AppText>
                      </TouchableOpacity>
                    </View>
                )}

                {isDiscard && (
                  <View style={styles.updateBtnContainer}>
                    <TouchableOpacity
                      style={{alignSelf: 'stretch', alignItems: 'center', flex: 1}}
                      onPress={() => {
                        if (props.onClose) {
                          props.onClose();
                        }
                      }}>
                      <AppText
                        title="Discard"
                        size="big"
                        color={Colors.redColor}></AppText>
                    </TouchableOpacity>

                    <View style={styles.updateBtnDivider}></View>

                    <TouchableOpacity
                      style={{alignSelf: 'stretch', alignItems: 'center', flex: 1}}
                      disabled={!isValidate()}
                      onPress={() => onContinue()}>
                      <AppText
                        title="Update"
                        size="big"
                        color={
                          !isValidate() ? Colors.disabledColor : Colors.primaryColor
                        }></AppText>
                    </TouchableOpacity>
                  </View>
                )}

            </View>
          }
      </View>
      

    </View>
  );
});

export default SetupFieldView;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 5,
  },

  container: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    minHeight: 250,  
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',    
    width: Dimensions.get("screen").width - 20
  },

  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 15,
  },
  
  clearText: {
    fontSize: Values.fontSize.small,
    fontFamily: Fonts.secondaryRegular,
    color: Colors.redColor,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.greyColor,
    marginHorizontal: -10,
    marginTop: 10,
    marginBottom: 10,
  },

  updateBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  updateBtnDivider : {
      backgroundColor: Colors.greyColor,
      width: 1,
      marginVertical: -10,
      alignSelf: 'stretch',
  }




});
