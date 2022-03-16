import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList, BackHandler, Image,Dimensions } from 'react-native';
import { parse, setWidthBreakpoints } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { getPipelineFilters, getPipelines } from '../../../actions/pipeline.action';
import SvgIcon from '../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { breakPoint } from '../../../constants/Breakpoint';
import { Provider } from 'react-native-paper';
import { boxShadow, grayBackground, style } from '../../../constants/Styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../../../actions/actionTypes';
import FilterView from '../../../components/FilterView';
import SearchBar from '../../../components/SearchBar';
import AddSalesPipeline from './AddSalesPipeline';
import Skeleton from '../../../components/Skeleton';
import Images from '../../../constants/Images';

export default function SalesPipelineScreen(props) {
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
  const locationInfo = props.route.params ? props.route.params.locationInfo : null;

  useEffect(() => {
    var screenProps = props.screenProps;
    if(screenProps === undefined){
      screenProps = props.navigation;
    }    
    if (screenProps) {
      screenProps.setOptions({        
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={
              () => {
                if (canAddPipeline) {
                  setCanAddPipeline(false);
                }else{
                  if(locationInfo){
                    props.navigation.navigate('CRM', {'screen': 'LocationSpecificInfo',  params : {'data': locationInfo}});
                  }
                }
              }}>
            <View style={style.headerTitleContainerStyle}>
              {
                (canAddPipeline || locationInfo) &&
                <Image
                  resizeMethod='resize'
                  style={{ width: 15, height: 20, marginRight: 5 }}
                  source={Images.backIcon}
                />
              }
              <Text style={style.headerTitle} >Pipeline</Text>
            </View></TouchableOpacity>)
        }
      });
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPipeLineData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (pipelineFilters !== undefined) {
      loadPipeLineData(pipelineFilters);
    }

  }, [pipelineFilters])

  const handleBackButtonClick = () => {
    if (canAddPipeline) {
      setCanAddPipeline(false);
      return true;
    }
  }

  const refreshHeader = () => {
    props.screenProps.setOptions({
      headerTitle: () => {
        return (<TouchableOpacity
          onPress={
            () => {
              if (canAddPipeline) {
                setCanAddPipeline(false);
              }
            }}>
          <View style={style.headerTitleContainerStyle}>
            {
              canAddPipeline &&
              <Image
                resizeMethod='resize'
                style={{ width: 15, height: 20, marginRight: 5 }}
                source={Images.backIcon}
              />
            }
            <Text style={style.headerTitle} >Pipeline</Text>
          </View></TouchableOpacity>)
      },
    });
  }


  const loadPipeLineData = async (filters = '') => {    
    setIsLoading(true);
    getPipelines(filters).then(res => {
      setIsLoading(false);
      let stageItems = [];
      stageItems.push({ stage_id: '0', stage_name: 'All' });
      stageItems.push(...res.stages);
      setStages(stageItems);
      setAllOpportunities(res.opportunities);
      setOpportunities(res.opportunities);
      setSearchList(res.opportunities);
      setSelectedStage('0');
    }).catch((e) => { setIsLoading(false) })
  }

  const onSearchList = (searchKey) => {
    let list = [];
    opportunities.map((item, index) => {
      if (searchKey === '') {
        list.push(item);
      } else {
        if (item.opportunity_name.toLowerCase().includes(searchKey.toLowerCase())
          || item.location_name.toLowerCase().includes(searchKey.toLowerCase())) {
          list.push(item);
        }
      }
    });
    setSearchList(list);
  }

  const onTabSelection = (item) => {
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
  }

  const hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
    }
    return hex;
  }

  const animation = (name) => {
    dispatch({ type: SLIDE_STATUS, payload: true });
    switch (name) {
      case "filter":
        dispatch(getPipelineFilters());
        setShowItem(1);
        return;
      case "add_pipeline":      
        setShowItem(2);
      default:
        return;
    }
  }

  const renderOpportunity = (item, index) => {
    return (
      <TouchableOpacity onPress={() => {
        setSelectedOpportunityId(item.opportinity_id);
        setPageType('update');
        setCanAddPipeline(true);
      }}>
        <View style={styles.itemContainer}>
          <View style={[styles.opportunityStyle, { alignItems: 'baseline' }]}>
            <View style={[styles.dotIndicator, { backgroundColor: item.opportunity_status_color }]}></View>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.opportunityTitle}>{item.opportunity_name}</Text>
              <Text style={{ fontFamily: Fonts.secondaryMedium, fontSize: 12 }}>{item.location_name}</Text>
            </View>
          </View>
          <View style={[styles.stageItemBg, { backgroundColor: hexToRgbA(item.stage_color, 0.32) }]}>
            <Text style={{
              color: Colors.textColor,
              fontFamily: Fonts.secondaryRegular,
              fontSize: 12,
              textAlign: 'center', zIndex: 0
            }}>{item.stage_name}</Text>
          </View>
          <Text style={{ flex: 0.9, textAlign: 'right', fontFamily: Fonts.secondaryMedium, fontSize: 13 }}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#70707045',
        height: 0.5,
      }}
    />
  );

  const renderListHeading = () => {
    return <View style={{ paddingHorizontal: 0 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.listheadingText, { flex: 2.2 }]}>Opportunity</Text>
        <Text style={[styles.listheadingText, { flex: 1.1 }]}>Stage</Text>
        <Text style={[styles.listheadingText, { textAlign: 'right', marginRight: 10 }]}>Value</Text>
      </View>
      <View style={{ backgroundColor: whiteLabel().mainText, height: 2, marginVertical: 10 }}></View>
    </View>
  }

  const renderSearchBox = () => {
    return <View style={{ marginHorizontal: -10, marginTop: -10 }}>
      <SearchBar
        isFilter={true}
        animation={() => animation("filter")}
        onSearch={(text) => {
          onSearchList(text);
        }} />
    </View>
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { padding: 10, justifyContent: 'center', height: '100%' }]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />
        ))}
      </View>
    )
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>

        {canAddPipeline && <AddSalesPipeline
          props={props}
          onClose={() => {
            // setShowItem("refresh"),
            loadPipeLineData();
            setCanAddPipeline(false);
          }}
          pageType={pageType}
          opportunity_id={selectedOpportunityId} />
        }

        {crmStatus && showItem == 1 && <TouchableOpacity
          activeOpacity={1}
          style={grayBackground}
          onPress={() => {

            dispatch({ type: SUB_SLIDE_STATUS, payload: false })
            dispatch({ type: SLIDE_STATUS, payload: false });
            setShowItem(0);

          }}>

        </TouchableOpacity>
        }

        {crmStatus && showItem == 1 && <View
          style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] }]}
        >
          <FilterView navigation={navigation} page={"pipeline"} onClose={() => {
            dispatch({ type: SLIDE_STATUS, payload: false });
            setShowItem(0);
          }} />
        </View>}

        <View style={styles.container}>
          <View style={[styles.tabContainer, boxShadow, { alignItems: 'center' }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginRight: 10, alignItems: 'center' }}
              onMomentumScrollEnd={(e) => {
                if (e.nativeEvent.contentOffset.x == 0) {
                  setShowArrow(true);
                } else {
                  setShowArrow(false);
                }
              }}>

              {stages.map((item, index) => {
                return <TouchableOpacity key={index} onPress={() => { onTabSelection(item) }}>
                  <Text key={index} style={[
                    styles.tabText, selectedStage === item.stage_id ? styles.tabActiveText : {}
                  ]}>{item.stage_name}</Text>
                </TouchableOpacity>
              })}

            </ScrollView>
            {canShowArrow && <SvgIcon icon="Arrow_Right_Btn" width='20px' height='25px' />}
          </View>
          {renderSearchBox()}
          {renderListHeading()}
          <FlatList
            data={searchList}
            renderItem={
              ({ item, index }) => renderOpportunity(item, index)
            }
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 7, marginTop: 0 }}
            ItemSeparatorComponent={renderSeparator}
          />
          <View style={styles.plusButtonContainer}>
            <TouchableOpacity style={style.innerPlusButton} onPress={() => {
              setPageType('add');
              setCanAddPipeline(true);
            }}>
              <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Provider>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const styles = EStyleSheet.create(parse({
  container: {
    padding: 10,
    minHeight: '100%',
    backgroundColor: Colors.bgColor
  },

  tabText: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 15,
    color: Colors.disabledColor,
    marginHorizontal: 10
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginBottom: 8
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
    flexDirection: "row",
    bottom: Dimensions.get('window').height*0.02,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },

  opportunityStyle: {
    flex: 2.2,
    flexDirection: 'row',
    marginLeft: -5
  },

  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  opportunityTitle: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 14,
    color: 'black'
  },

  stageItemBg: {
    flex: 1.0,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5
  },

  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,
    elevation: 2,
    zIndex: 2,
    padding: 0,
  },

}));
