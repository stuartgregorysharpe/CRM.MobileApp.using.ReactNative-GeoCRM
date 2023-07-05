import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,  
  StyleSheet,
  FlatList,
  Image,  
  ActivityIndicator,
} from 'react-native';
import {Provider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../../components/SearchBar';
import Colors from '../../../constants/Colors';
import {
  CHANGE_LOCATION_FILTERS,
  IS_CALENDAR_SELECTION,
  LOCATION_ID_CHANGED,
  SELECTED_LOCATIONS_FOR_CALENDAR,
  SLIDE_STATUS,
  SUB_SLIDE_STATUS,
} from '../../../actions/actionTypes';
import {
  getLocationFilters,
  getLocationInfo,
} from '../../../actions/location.action';
import Fonts from '../../../constants/Fonts';
import Images from '../../../constants/Images';
import {grayBackground, style} from '../../../constants/Styles';
import {expireToken} from '../../../constants/Helper';
import {LocationItem} from './partial/LocationItem';
import AlertDialog from '../../../components/modal/AlertDialog';
import SvgIcon from '../../../components/SvgIcon';
import {getFilterData, getLocalData} from '../../../constants/Storage';
import LocationSearchScreenPlaceholder from './LocationSearchScreenPlaceholder';
import {Notification} from '../../../components/modal/Notification';
import CheckInStatusView from './partial/CheckInStatusView';
import AddLeadModal from './add_lead';
import {Constants} from '../../../constants';
import {LocationSearchDAO} from '../../../DAO';
import LocationInfoDetailModal from './locationInfoDetails/LocationInfoDetailModal';
import SelectLocationView from './partial/SelectLocationView';
import LoadingProgressBar from '../../../components/modal/LoadingProgressBar';
import AddToCalendarModal from '../../../components/modal/add_to_calendar';
import FilterYourSearchModal from '../../../components/modal/filter_your_search';
import AlertModal from '../../../components/modal/AlertModal';

var isEndPageLoading = false;
var searchKey = '';
var changedKey = '';
var savedShowItem = 0;
var specificLocationId = 0;

export default function LocationSearchScreen(props) {

  const navigation = props.navigation;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const filterParmeterChanged = useSelector(
    state => state.selection.searchFilters,
  );
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );    
  const locationId = useSelector(state => state.location.locationId.value);
  const tabType = useSelector(state => state.location.locationId.type);
  const isSelected = useSelector(state => state.selection.isCalendarSelection);
  const selectedLocationsForCalendar = useSelector(
    state => state.selection.selectedLocationsForCalendar,
  );

  const [orderLists, setOrderLists] = useState([]);
  const [originLists, setOriginLists] = useState([]);
  const [showItem, setShowItem] = useState(savedShowItem);
  const [locationInfo, setLocationInfo] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [message, setMessage] = useState('');
  const [calendarType, setCalendarType] = useState(
    props.route.params !== undefined &&
      props.route.params.calendar_type !== undefined
      ? props.route.params.calendar_type
      : '',
  );
  const [pageType, setPageType] = useState({name: 'search-lists'});
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [myLocation, setMyLocation] = useState(currentLocation);
  const [isCheckin, setIsCheckin] = useState(false);
  const addLeadModalRef = useRef(null);
  const locationInfoModalRef = useRef(null);
  const addToCalendarModalRef = useRef(null);
  const filterYourSearchModalRef = useRef();
  const alertModalRef = useRef();

  useEffect(() => {
    initData();
    if (orderLists.length === 0) {
      isEndPageLoading = false;
      loadMoreData();
    }
    refreshHeader();
  }, []);

  useEffect(() => {
    refreshHeader();
    if (showItem === 0) {
      setTimeout(() => {
        refreshHeader();
      }, 500);
    }
  }, [showItem]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('location search focussed' , savedShowItem);
      if (savedShowItem == 2) {        
        refreshHeader();        
      }
      initData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setMyLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    console.log('selectedLocationsForCalendar', selectedLocationsForCalendar);
  }, [selectedLocationsForCalendar]);

  useEffect(() => {
    if (locationId !== 0 && tabType !== undefined) {
      setPageType({name: 'camera', type: tabType});
      openLocationInfo(locationId);
    }
  }, [locationId, tabType]);

  useEffect(() => {
    if (calendarType == 'optimize' || calendarType == 'add') {
      dispatch({type: IS_CALENDAR_SELECTION, payload: true});
    }
  }, [calendarType]);

  useEffect(() => {
    if (filterParmeterChanged !== undefined) {
      isEndPageLoading = false;
      setPageNumber(0);
      setOrderLists([]);
      setOriginLists([]);
      loadMoreData();
    }
  }, [filterParmeterChanged]);

  useEffect(() => {
    if (isPageLoading) {
      searchKey = searchKeyword;
      loadData(searchKey);
    }
  }, [isPageLoading]);

  useEffect(() => {
    changedKey = searchKeyword;
  }, [searchKeyword]);

  const initData = async () => {
    var ischeckIn = await getLocalData('@checkin');
    setIsCheckin(ischeckIn);
    specificLocationId = await getLocalData('@specific_location_id');
  };

  const refreshHeader = () => {
    props.screenProps.setOptions({
      headerTitle: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              console.log('LOG: goPreviousPage');
              goPreviousPage();
            }}>
            <View style={style.headerTitleContainerStyle}>
              {(!features.includes('disable_crm_map_view') ||
                savedShowItem != 0) && (
                <Image
                  resizeMethod="resize"
                  style={{width: 15, height: 20, marginRight: 5}}
                  source={Images.backIcon}
                />
              )}
              <Text
                style={{
                  color: '#FFF',
                  fontFamily: Fonts.primaryRegular,
                  fontSize: 19,
                  fontWeight: '400',
                }}>
                CRM
              </Text>
            </View>
          </TouchableOpacity>
        );
      },
      headerLeft: () => (
        <TouchableOpacity
          style={style.headerLeftStyle}
          activeOpacity={1}
          onPress={() => {
            setShowItem(0);
            console.log('set show Item 0');
            dispatch({type: SLIDE_STATUS, payload: false});
            dispatch({
              type: LOCATION_ID_CHANGED,
              payload: {value: 0, type: 0},
            });
          }}></TouchableOpacity>
      ),
    });    
  };

  const loadData = async searchKey => {
    var filterData = await getFilterData('@filter');    
    LocationSearchDAO.find(
      currentLocation,
      filterData,
      pageNumber,
      searchKey,
      features,
    )
      .then(res => {
        setIsLoading(false);
        if (searchKey !== changedKey) {
          setPageNumber(0);
          isEndPageLoading = false;
          getSearchData(res, searchKey, 'pagination');
          searchKey = changedKey;
          loadData(searchKey);
        } else {
          setIsPageLoading(false);
          getSearchData(res, searchKey, 'pagination');
          if (res.length < 50) {
            isEndPageLoading = true;
          } else {
            setPageNumber(pageNumber + 1);
          }
        }
      })
      .catch(e => {
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const goPreviousPage = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      dispatch({type: SLIDE_STATUS, payload: false});
      dispatch({type: LOCATION_ID_CHANGED, payload: {value: 0, type: 0}});
    } else {
      animation('search-page');      
    }
  };

  const getSearchData = (lists, searchKey, type) => {
    if (pageNumber == 0) {
      setOrderLists(lists);
      if (searchKey === '') {
        setOriginLists(lists);
      }
    } else {
      const tempLists = [...orderLists, ...lists];
      setOrderLists(tempLists);
    }
  };

  const animation = name => {
    switch (name) {
      case 'search-page':
        setShowItem(0);
        savedShowItem = 0;
        return;
      case 'filter':
        filterYourSearchModalRef.current.showModal();
        getLocationFilters( (type, respnose) => {
          if(type == 'success'){
            dispatch({type: CHANGE_LOCATION_FILTERS, payload: respnose});
          }else if(type == 'failed'){
            filterYourSearchModalRef.current.hideModal();
            expireToken(dispatch, respnose, alertModalRef);
          }
        });        
        return;
      case 'locationInfo':
        if (locationInfoModalRef.current) {
          console.log("location info open");
          locationInfoModalRef.current.showModal();
        }else{
          console.log("location info closed");
        }
        return;
      case 'addtocalendar':        
        if(addToCalendarModalRef.current){
          addToCalendarModalRef.current.showModal();
        }        
        savedShowItem = 3;
        return;
      default:
        setShowItem(0);
        savedShowItem = 0;
        return;
    }
  };

  const openLocationInfo = async location_id => {
      animation('locationInfo');      
      setLocationInfo(undefined);
      getLocationInfo(Number(location_id), currentLocation)
      .then(res => {        
        setLocationInfo(res);        
      })
      .catch(e => {        
        expireToken(dispatch, e , alertModalRef);
      });        

  };

  const renderLocation = (item, index) => {
    return (
      <LocationItem
        isChecked={selectedLocationsForCalendar.find(element =>
          element.location_id === item.location_id ? true : false,
        )}
        isSelected={isSelected}
        item={item}
        onItemClicked={isChecked => {
          if (isSelected) {
            orderLists[index].checked = isChecked;
            var selectedItems = [...selectedLocationsForCalendar];
            if (isChecked) {
              selectedItems = [
                ...selectedItems,
                {
                  schedule_order: (index + 1).toString(),
                  location_id: item.location_id,
                  schedule_date: 'Today',
                  schedule_time: '',
                  schedule_end_time: '',
                },
              ];
            } else {
              selectedItems = selectedItems.filter(
                element => element.location_id !== item.location_id,
              );
            }
            dispatch({
              type: SELECTED_LOCATIONS_FOR_CALENDAR,
              payload: selectedItems,
            });
          } else {            
            openLocationInfo(item.location_id);
          }
        }}></LocationItem>
    );
  };

  const loadMoreData = async () => {
    console.log('isEnd Page Loading', isEndPageLoading);
    console.log('isPageLoading', isPageLoading);
    if (isEndPageLoading === false && isPageLoading === false) {
      if (pageNumber == 0 && searchKeyword === '') {
        setIsLoading(true);
      }
      setIsPageLoading(true);
    }
  };

  renderFooter = () => {
    if (!isEndPageLoading && isPageLoading) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.9} style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Loading</Text>
            {isPageLoading ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    } 
    return <View></View>;
  };

  const onAddLeadModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      addLeadModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_DONE) {
      addLeadModalRef.current.hideModal();
    }
  };

  const detailModalClosed = ({type, value}) => {
  
    if (type == Constants.actionType.ACTION_CLOSE) {
      locationInfoModalRef.current.hideModal();
      if (value === 'access_crm' || value == 'checkin') {
        navigation.navigate('LocationSpecificInfo', {          
          data: locationInfo,
          page: value,
        });
      }
    }else if(type == Constants.actionType.ACTION_REFRESH){      
      if(value != undefined)
        openLocationInfo(value);
    }
  };

  const onAddToCalendarClosed = ({ type, value}) => {
    if (type == Constants.actionType.ACTION_CLOSE) {
      addToCalendarModalRef.current.hideModal();      
    }else if(type == Constants.actionType.ACTION_DONE) {
      addToCalendarModalRef.current.hideModal();
      setShowItem(0);
      dispatch({type: IS_CALENDAR_SELECTION, payload: false});
      dispatch({type: SELECTED_LOCATIONS_FOR_CALENDAR, payload: []});
      getSearchData(originLists, '', 'search');   
    }
  }
  

  return (
    <Provider>
      <SafeAreaView style={{flex: 1}}>
        <Notification />
        <LoadingProgressBar/>

        <AlertModal ref={alertModalRef} />

        <AlertDialog
          visible={isCreated}
          message={message}
          onModalClose={() => setIsCreated(false)}></AlertDialog>

        {(showItem == 3 ) && (
          <TouchableOpacity
            activeOpacity={1}
            style={grayBackground}
            onPress={() => {
              dispatch({type: SUB_SLIDE_STATUS, payload: false});
              dispatch({type: SLIDE_STATUS, payload: false});
              setShowItem(0);
            }}></TouchableOpacity>
        )}

        <FilterYourSearchModal 
          title='Filter Your Search'
          ref={filterYourSearchModalRef}
          page={'search'}
        />

        <AddToCalendarModal 
          selectedItems={selectedLocationsForCalendar}
          ref={addToCalendarModalRef}                    
          onButtonAction={onAddToCalendarClosed}          
        />
        
        <AddLeadModal
          title="Add Lead"
          ref={addLeadModalRef}
          onButtonAction={onAddLeadModalClosed}
        />

        <LocationInfoDetailModal
          ref={locationInfoModalRef}
          locInfo={locationInfo}
          navigation={navigation} 
          pageType={{name: 'search-lists'}}
          refreshLocationInfo={id => {
            openLocationInfo(id);
          }}
          onButtonAction={detailModalClosed}
        />

        <View style={styles.container}>
          <SearchBar
            onSearch={text => {
              if (text.length >= 3) {
                setSearchKeyword(text);
              } else {
                setSearchKeyword('');
              }

              if (text.length >= 3) {
                setPageNumber(0);
                isEndPageLoading = false;
                loadMoreData();
              } else if (text.length == 0) {
                setPageNumber(1);
                isEndPageLoading = false;
                setOrderLists(originLists);
              }
            }}
            initVal={searchKeyword}
            isFilter={true}
            isLoading={isLoading}
            animation={() => {
              animation('filter');
            }}
          />

          <View>
            <SelectLocationView
              features={features}
              isLoading={isLoading}
              isSelected={isSelected}
              selectedLocationsForCalendar={selectedLocationsForCalendar}
              goPreviousPage={goPreviousPage}
              addToCalendar={() => {
                animation('addtocalendar');
              }}
            />

            {isLoading && (
              <LocationSearchScreenPlaceholder></LocationSearchScreenPlaceholder>
            )}

            {orderLists.length !== 0 && (
              <FlatList
                removeClippedSubviews={false}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                windowSize={21}
                data={orderLists}
                renderItem={({item, index}) => renderLocation(item, index)}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{paddingHorizontal: 7, marginTop: 0}}
                onEndReached={loadMoreData}
                onEndReachedThreshold={1}
                ListFooterComponent={renderFooter.bind(this)}
              />
            )}

            {orderLists.length !== 0 &&
              features.includes('disable_crm_map_view') && (
                <TouchableOpacity
                  style={[
                    style.plusButton,
                    {bottom: isCheckin === '1' ? 200 : 150},
                  ]}
                  onPress={() => {
                    addLeadModalRef.current.showModal();
                  }}>
                  <SvgIcon
                    icon="Round_Btn_Default_Dark"
                    width="70px"
                    height="70px"
                  />
                </TouchableOpacity>
              )}
            {orderLists.length !== 0 &&
              features.includes('disable_crm_map_view') &&
              isCheckin === '1' && (
                <CheckInStatusView
                  page="search-list"
                  specificLocationId={specificLocationId}
                  onGo={() => {
                    props.navigation.navigate('LocationSpecificInfo', {
                      locationId: specificLocationId,
                      page: 'checkin',
                    });
                  }}></CheckInStatusView>
              )}
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,    
    paddingBottom: 0,
  },    
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  loadMoreBtn: {
    padding: 10,
    backgroundColor: Colors.skeletonColor,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: Colors.whiteColor,
    fontSize: 15,
    textAlign: 'center',
  },
});
