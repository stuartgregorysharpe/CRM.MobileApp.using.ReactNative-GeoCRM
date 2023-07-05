import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Image,  
  StyleSheet
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPipelineFilters,  
} from '../../../actions/pipeline.action';
import SvgIcon from '../../../components/SvgIcon';
import Colors, {whiteLabel} from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import {Provider} from 'react-native-paper';
import {boxShadow, style} from '../../../constants/Styles';
import SearchBar from '../../../components/SearchBar';
import AddSalesPipeline from './AddSalesPipeline';
import Skeleton from '../../../components/Skeleton';
import Images from '../../../constants/Images';
import DeviceInfo from 'react-native-device-info';
import {expireToken} from '../../../constants/Helper';
import {Notification} from '../../../components/modal/Notification';
import {getApiRequest} from '../../../actions/api.action';
import {updateCurrentLocation} from '../../../actions/google.action';
import NavigationHeader from '../../../components/Header/NavigationHeader';
import LocationService from '../../../services/LocationService';
import LoadingProgressBar from '../../../components/modal/LoadingProgressBar';
import FilterYourSearchModal from '../../../components/modal/filter_your_search';

//export default function SalesPipelineScreen(props) {
export const SalesPipelineScreen = props => {

  const dispatch = useDispatch();
  const navigation = props.navigation;
  const pipelineFilters = useSelector(state => state.selection.pipelineFilters);
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState('0');
  const [showItem, setShowItem] = useState(0);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [canShowArrow, setShowArrow] = useState(true);
  const [canAddPipeline, setCanAddPipeline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageType, setPageType] = useState('add');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState('');
  const [locationName, setLocationName] = useState('');
  const locationFilterModalRef = useRef();
  const locationIdSpecific = props.route.params
    ? props.route.params.locationInfo
    : null;

  const isShowCustomNavigationHeader = props.isDeeplink != undefined;


  useEffect(() => {
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (canAddPipeline) {
                  setCanAddPipeline(false);
                } else {
                  if (locationIdSpecific) {
                    props.navigation.navigate('CRM', {
                      screen: 'LocationSpecificInfo',
                      params: {data: locationIdSpecific},
                    });
                  }
                }
              }}>
              <View style={style.headerTitleContainerStyle}>
                {(canAddPipeline || locationIdSpecific) && (
                  <Image
                    resizeMethod="resize"
                    style={{width: 15, height: 20, marginRight: 5}}
                    source={Images.backIcon}
                  />
                )}
                <Text style={style.headerTitle}>Pipeline</Text>
              </View>
            </TouchableOpacity>
          );
        },        
      });    
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });

  useEffect(() => {
    loadPipeLineData('');
  }, [locationIdSpecific]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {      
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (pipelineFilters !== undefined) {  
      loadPipeLineData(pipelineFilters);
    }
  }, [pipelineFilters]);

  async function requestPermissions() {
    LocationService.getLocationService().then(locationService => {
      locationService.requestPermissions().then(granted => {
        if (granted) {
          dispatch(updateCurrentLocation());
        }
      });
    });
  }

  const handleBackButtonClick = () => {
    if (canAddPipeline) {
      setCanAddPipeline(false);
      return true;
    }
  };

  const loadPipeLineData = useCallback(
    (filters = '') => {
      setIsLoading(true);
      let params = {filters: filters};
      if (locationIdSpecific != null) {
        params['location_id'] = locationIdSpecific.location_id;
      }
      getApiRequest('pipeline/pipeline-opportunities', params)
        .then(res => {
          setIsLoading(false);
          console.log('data', res);
          let stageItems = [];
          stageItems.push({stage_id: '0', stage_name: 'All'});
          stageItems.push(...res.stages);
          setStages(stageItems);
          setAllOpportunities(res.opportunities);
          setOpportunities(res.opportunities);
          setSearchList(res.opportunities);
          setSelectedStage('0');
        })
        .catch(e => {
          console.log('pipeline-opportunities api error: ', e);
          expireToken(dispatch, e);
          setIsLoading(false);
        });
    },
    [locationIdSpecific],
  );

  const onSearchList = searchKey => {
    let list = [];
    opportunities.map((item, index) => {
      if (searchKey === '') {
        list.push(item);
      } else {
        if (
          item.opportunity_name
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          item.location_name.toLowerCase().includes(searchKey.toLowerCase())
        ) {
          list.push(item);
        }
      }
    });
    setSearchList(list);
  };

  const onTabSelection = item => {
    setSelectedStage(item.stage_id);
    let data = [];
    allOpportunities.map((opportunity, index) => {
      if (item.stage_id == '0') {
        data.push(opportunity);
      } else if (opportunity.stage_id == item.stage_id) {
        data.push(opportunity);
      }
    });
    setOpportunities(data);
    setSearchList(data);
  };

  const hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
        `,${opacity})`
      );
    }
    return hex;
  };

  const animation = name => {
    
    switch (name) {
      case 'filter':
        dispatch(getPipelineFilters());
        if(locationFilterModalRef.current) {
          locationFilterModalRef.current.showModal();
        }
        return;
      case 'add_pipeline':        
        setShowItem(2);
      default:
        return;
    }
  };

  const renderOpportunity = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedOpportunityId(item.opportunity_id);
          setLocationName(item.location_name);
          setPageType('update');
          setCanAddPipeline(true);
        }}>
        <View style={styles.itemContainer}>
          <View style={[styles.opportunityStyle, {alignItems: 'baseline'}]}>
            <View
              style={[
                styles.dotIndicator,
                {backgroundColor: item.opportunity_status_color},
              ]}></View>
            <View style={{marginHorizontal: 5}}>
              <Text style={styles.opportunityTitle}>
                {item.opportunity_name}
              </Text>
              <Text style={{fontFamily: Fonts.secondaryMedium, fontSize: 12}}>
                {item.location_name}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.stageItemBg,
              {backgroundColor: hexToRgbA(item.stage_color, 0.32)},
            ]}>
            <Text
              style={{
                color: Colors.textColor,
                fontFamily: Fonts.secondaryRegular,
                fontSize: 12,
                textAlign: 'center',
                zIndex: 0,
              }}>
              {item.stage_name}
            </Text>
          </View>
          <Text
            style={{
              flex: 0.9,
              textAlign: 'right',
              fontFamily: Fonts.secondaryMedium,
              fontSize: 13,
            }}>
            {item.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#70707045',
        height: 0.5,
      }}
    />
  );

  const renderListHeading = () => {
    return (
      <View style={{paddingHorizontal: 0}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.listheadingText, {flex: 2.2}]}>Opportunity</Text>
          <Text style={[styles.listheadingText, {flex: 1.1}]}>Stage</Text>
          <Text
            style={[
              styles.listheadingText,
              {textAlign: 'right', marginRight: 10},
            ]}>
            Value
          </Text>
        </View>
        <View
          style={{
            backgroundColor: whiteLabel().mainText,
            height: 2,
            marginVertical: 10,
          }}></View>
      </View>
    );
  };

  const renderSearchBox = () => {
    return (
      <View style={{marginHorizontal: -10, marginTop: -10}}>
        <SearchBar
          isFilter={true}
          animation={() => animation('filter')}
          onSearch={text => {
            onSearchList(text);
          }}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {padding: 10, justifyContent: 'center', height: '100%'},
        ]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />
        ))}
      </View>
    );
  }

  return (
    <Provider>
      <View style={{minHeight:'100%'}}>
        {isShowCustomNavigationHeader && (
          <NavigationHeader
            showIcon={true}
            title={'Pipeline'}
            onBackPressed={() => {
              props.navigation.goBack();
            }}
          />
        )}

        <Notification></Notification>
        <LoadingProgressBar />

        {canAddPipeline && (
          <AddSalesPipeline
            props={props}
            onClose={() => {
              loadPipeLineData();
              setCanAddPipeline(false);
            }}
            pageType={pageType}
            locationName={locationName}
            opportunity_id={selectedOpportunityId}
          />
        )}
        
        <FilterYourSearchModal
            title='Filter Your Search'
            ref={locationFilterModalRef}
            page={'pipeline'}
        />      

        <View style={styles.container}>
          <View
            style={[styles.tabContainer, boxShadow, {alignItems: 'center'}]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginRight: 10, alignItems: 'center'}}
              onMomentumScrollEnd={e => {
                if (e.nativeEvent.contentOffset.x == 0) {
                  setShowArrow(true);
                } else {
                  setShowArrow(false);
                }
              }}>
              {stages.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onTabSelection(item);
                    }}>
                    <Text
                      key={index}
                      style={[
                        styles.tabText,
                        selectedStage === item.stage_id
                          ? styles.tabActiveText
                          : {},
                      ]}>
                      {item.stage_name}{' '}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {canShowArrow && (
              <SvgIcon icon="Arrow_Right_Btn" width="20px" height="25px" />
            )}
          </View>
          {renderSearchBox()}
          {renderListHeading()}
          <FlatList
            data={searchList}
            renderItem={({item, index}) => renderOpportunity(item, index)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingHorizontal: 7, marginTop: 0}}
            ItemSeparatorComponent={renderSeparator}
            style={{
              marginBottom: DeviceInfo.getSystemVersion() === '11' ? 10 : 0,
            }}
          />

          {!canAddPipeline && (
            <View
              style={[
                styles.plusButtonContainer,
                {
                  marginBottom: DeviceInfo.getSystemVersion() === '11' ? 10 : 0,
                },
              ]}>
              <TouchableOpacity
                style={style.innerPlusButton}
                onPress={() => {
                  setLocationName('');
                  setPageType('add');
                  setCanAddPipeline(true);
                }}>
                <SvgIcon
                  icon="Round_Btn_Default_Dark"
                  width="70px"
                  height="70px"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      padding: 10,      
      backgroundColor: Colors.bgColor,
      flex:1,      
    },

    tabText: {
      fontFamily: Fonts.secondaryMedium,
      fontSize: 15,
      color: Colors.disabledColor,
      marginHorizontal: 10,
    },

    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 7,
      backgroundColor: '#fff',
      marginBottom: 8,
    },

    tabActiveText: {
      color: whiteLabel().activeTabText,
      fontFamily: Fonts.secondaryBold,
      borderBottomColor: whiteLabel().activeTabUnderline,
      borderBottomWidth: 2,
      paddingBottom: 2,
    },

    listheadingText: {
      color: whiteLabel().mainText,
      fontSize: 15,
      fontFamily: Fonts.secondaryMedium,
    },

    plusButtonContainer: {
      position: 'absolute',
      //flexDirection: 'row',
      bottom: 20,      
      right: 20,
      zIndex: 1,
      elevation: 1,
    },

    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },

    opportunityStyle: {
      flex: 2.2,
      flexDirection: 'row',
      marginLeft: -5,
    },

    dotIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    opportunityTitle: {
      fontFamily: 'Gilroy-Bold',
      fontSize: 14,
      color: 'black',
    },

    stageItemBg: {
      flex: 1.0,
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 5,
    },
        
  },
);
