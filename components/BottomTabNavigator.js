import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Fragment, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MoreNavigator from './MoreNavigator';
import DeviceInfo from 'react-native-device-info';
import SvgIcon from './SvgIcon';
import { whiteLabel } from '../constants/Colors';
import { 
  SLIDE_STATUS,
  
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,  
} from '../actions/actionTypes';

import {
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,  
  Platform,  
} from 'react-native'
import HeaderRightView from './Header/HeaderRightView';
import { style } from '../constants/Styles';
import FormsNavigator from '../screens/GeoRep/Forms/FormsNavigator';
import Stock from '../screens/GeoRep/Stock/Stock';
import { Constants } from '../constants';
import { getPageNameByLinker } from '../constants/Helper';

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({navigation}) {

  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);  
  const visibleMore = useSelector(state => state.rep.visibleMore);
  const backIconStatus = useSelector(state => state.rep.backIconStatus);
  const statusDispositionInfo = useSelector(state => state.rep.statusDispositionInfo);
  const [ bottomListOne, setBottomListOne ] = useState([]);
  const [ bottomListTwo, setBottomListTwo ] = useState([]);
  const [ bottomListThree, setBottomListThree ] = useState([]);  
  const [bottomTabs , setBottomTabs] = useState([]);  
    
  useEffect(() => {
    initBottomTab();
  },[selectProject]);
  

  const initBottomTab = () => {
    console.log("selectProject",selectProject);
    var modules = [];
    if(selectProject === Constants.projectType.GEO_REP){
      modules = payload.user_scopes.geo_rep.modules_nav_order;
    }else if(selectProject === Constants.projectType.GEO_LIFE){
      modules = payload.user_scopes.geo_life.modules_nav_order;
    }else if(selectProject === Constants.projectType.GEO_CRM){
      modules = payload.user_scopes.geo_crm.modules_nav_order;
    }
    var tmp = [];
    modules.forEach((element, index) => {
      if(index < 4){
        tmp = [...tmp , getPageNameByLinker(selectProject, element) ];
      }
    })
    tmp = [...tmp , { linker: "more", name: 'More', router:MoreNavigator , activeIcon:'Android_More_Horizontal', inActiveIcon: 'Android_More_Horizontal_Gray'} ];
    setBottomTabs(tmp);
    if(selectProject === Constants.projectType.GEO_LIFE){
      navigation.navigate('Root', {screen: 'Sales'});
    }        
  }
  
  useEffect(() => {
    if (visibleMore != '') {
      navigation.navigate("More");
      setTimeout(() => {
        dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
      });
    }
  }, [visibleMore]);

  const getHeaderHeight = () => {
    if(Platform.OS == 'ios'){
      if(DeviceInfo.isTablet()){
        return 82;
      }else{
        return 62;
      }
    }else{
      if(DeviceInfo.isTablet()){
        return 82;
      }else{
        return 74;
      }
    }
  }

  const getHeaderMargin = () => {
    if(Platform.OS == 'ios'){
      if(DeviceInfo.isTablet()){
        return 20;
      }else{
        return 0;
      }
    }else{
      if(DeviceInfo.isTablet()){
        return 22;
      }else{
        return 22;
      }
    }
  }

  if( bottomTabs.length == 0){
    return<View></View>;
  }
  return <BottomTab.Navigator      
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarHideOnKeyboard: true,
      headerTitleAlign:'left',
      headerStyle: {
        backgroundColor: whiteLabel().headerBackground,
        height: getHeaderHeight()
      },
      tabBarShowLabel: true,
      headerTitleStyle:  style.headerTitle,
      tabBarIconStyle: {
        color: "#fff",
      },
      headerStatusBarHeight:getHeaderMargin(),
      tabBarStyle: {
        height:50,          
        paddingTop: 0,     
        paddingBottom: Platform.OS == "android" ? 4 : 0,                  
      },
    }}>                      
      {
        bottomTabs.map((element, index) => {              
          return (
            <BottomTab.Screen
              key={index}
              name={element.name}
              component={element.router}
              options={{
                title: element.name,
                tabBarLabel: element.name,
                tabBarIcon: ({focused}) => (
                  <Fragment>
                    <SvgIcon icon={focused ? element.activeIcon : element.inActiveIcon} width='20px' height='20px' />                        
                  </Fragment>
                ),
                headerRight: () => (
                  <HeaderRightView navigation={navigation}/>
                ),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Gilroy-Medium'
                },
                tabBarActiveTintColor: whiteLabel().activeIcon,
              }}
              listeners={({navigation}) => ({
                tabPress: (e) => {
                  if(element.name === "More"){
                    e.preventDefault();
                    dispatch({type: SLIDE_STATUS, payload: false});
                    console.log("revisible mo", visibleMore)
                    if (visibleMore != '') {
                      //navigation.navigate("More");
                      dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
                    } else {
                      dispatch({type: CHANGE_MORE_STATUS, payload: 0});
                    }
                  }                  
                },
              })}

            />
          )
        })
      }

      {/* <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          title: 'More',
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => (
            <Fragment>
              {!focused && <SvgIcon icon="Android_More_Horizontal_Gray" width='20px' height='20px' />}
              {focused && <SvgIcon icon="Android_More_Horizontal" width='20px' height='20px' />}
            </Fragment>
          ),
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.header} 
              activeOpacity={1}
              onPress={() => {
                dispatch({type: SLIDE_STATUS, payload: false});
                dispatch({type: SUB_SLIDE_STATUS, payload: false});
              }}
            >
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRightView navigation={navigation}/>
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Gilroy-Medium'
          },
          tabBarActiveTintColor: whiteLabel().activeIcon,
        }}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            dispatch({type: SLIDE_STATUS, payload: false});
            if (visibleMore != '') {
              navigation.navigate("More");
              dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
            } else {
              dispatch({type: CHANGE_MORE_STATUS, payload: 0});   
            }
          },
        })}
      /> */}

    </BottomTab.Navigator>
  
  

  // return (
  //   <BottomTab.Navigator      
  //     screenOptions={{
  //       tabBarActiveTintColor: "#fff",
  //       tabBarHideOnKeyboard: true,
  //       headerTitleAlign:'left',
  //       headerStyle: {
  //         backgroundColor: whiteLabel().headerBackground,
  //         height: getHeaderHeight()
  //       },
  //       tabBarShowLabel: true,
  //       headerTitleStyle:  style.headerTitle,
  //       tabBarIconStyle: {
  //         color: "#fff",
  //       },
  //       headerStatusBarHeight:getHeaderMargin(),
  //       tabBarStyle: {
  //         height:50,          
  //         paddingTop: 0,     
  //         paddingBottom: Platform.OS == "android" ? 4 : 0,                  
  //       },
  //     }}>

  //     {/* Rep Bottom Navigator */}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('home_geo') && <BottomTab.Screen
  //       name="Home"
  //       component={HomeScreen}
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "Home"});
  //             return;
  //           }
  //           navigation.navigate('Home');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('crm_locations') && <BottomTab.Screen
  //       name="CRM"
  //       component={CRMScreen}        
  //       options={{
  //         title: 'CRM',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Location_Arrow_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Location_Arrow" width='20px' height='20px' />}
  //           </Fragment>
  //         ),            
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: Fonts.secondaryMedium
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
        
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           //dispatch(getLocationsMap());
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "CRM"});
  //             return;
  //           }
  //           console.log("page changed");
  //           dispatch({type: SLIDE_STATUS, payload: false});            
  //           navigation.navigate('CRM', { screen: 'Root' });            
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('calendar') && <BottomTab.Screen
  //       name="Calendar"
  //       component={CalendarScreen}
  //       options={{
  //         title: 'Calendar',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Calendar_Event_Fill_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Calendar_Event_Fill" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "Calendar"});
  //             return;
  //           }
  //           navigation.navigate('Calendar');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('forms') && <BottomTab.Screen
  //       name="RepForms"
  //       component={FormsNavigator}
  //       options={{
  //         title: 'Forms',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Form_inactive" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Form" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "RepForms"});
  //             return;
  //           }
  //           //navigation.navigate('RepForms');
  //           navigation.navigate("RepForms", { screen: 'Root', params: { locationInfo: null } });
  //         },
  //       })}
  //     />}

        
  //     {selectProject == 'geo_rep' && bottomListOne.includes('content_library') && <BottomTab.Screen
  //       name="RepContentLibrary"
  //       // component={RepContentLibraryScreen}        
  //       options={{
  //         title: 'Content Library',
  //         tabBarLabel: 'Content',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
  //           </Fragment>
  //         ),          
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();            
  //           navigation.navigate("RepContentLibrary" , {isBack: false});
  //         },
  //       })}
  //     >
  //         {/* screenProps={navigation} */}
  //         {props => <RepContentLibraryScreen {...props}  />}
  //       </BottomTab.Screen>
  //       }
      
  //     {selectProject == 'geo_rep' && bottomListOne.includes('web_links') && <BottomTab.Screen
  //       name="RepWebLinks"
  //       component={RepWebLinksScreen}
  //       options={{
  //         title: 'Web Links',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Travel_Explore_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Travel_Explore" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "RepWebLinks"});
  //             return;
  //           }
  //           navigation.navigate('RepWebLinks');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('product_sales') && <BottomTab.Screen
  //       name="ProductSales"
  //       component={ProductSalesScreen}
  //       options={{
  //         title: 'Sales',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Sale_inactive" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Sale" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "ProductSales"});
  //             return;
  //           }
  //           navigation.navigate('ProductSales');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('notifications') && <BottomTab.Screen
  //       name="Notifications"
  //       component={NotificationsScreen}
  //       options={{
  //         title: 'Notifications',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "Notifications"});
  //             return;
  //           }
  //           navigation.navigate('Notifications');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('messages') && <BottomTab.Screen
  //       name="RepMessages"
  //       component={RepMessagesScreen}
  //       options={{
  //         title: 'Messages',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "RepMessages"});
  //             return;
  //           }
  //           navigation.navigate('RepMessages');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('offline_sync') && <BottomTab.Screen
  //       name="OfflineSync"
  //       component={OfflineSyncScreen}
  //       options={{
  //         title: 'Offline Sync Items',
  //         tabBarLabel: 'Sync',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "OfflineSync"});
  //             return;
  //           }
  //           navigation.navigate('OfflineSync');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('recorded_sales') && <BottomTab.Screen
  //       name="RecordedSales"
  //       component={RecordedSalesScreen}
  //       options={{
  //         title: 'Recorded Sales',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "RecordedSales"});
  //             return;
  //           }
  //           navigation.navigate('RecordedSales');
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('sales_pipeline') && <BottomTab.Screen
  //       name="RepSalesPipeline"
  //       component={RepSalesPipelineScreen}
  //       options={{
  //         title: 'Pipeline',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "RepSalesPipeline"});
  //             return;
  //           }
  //           navigation.navigate('RepSalesPipeline');
  //           navigation.navigate("RepSalesPipeline", { locationInfo: null } );
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_rep' && bottomListOne.includes('stock_module') && <BottomTab.Screen
  //       name="Stock"
  //       component={Stock}
  //       options={{
  //         title: 'Stock',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Stock_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Stock" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation} />
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           if (statusDispositionInfo) {
  //             dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
  //             dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: "Stock"});
  //             return;
  //           }
  //           navigation.navigate('Stock');
  //           navigation.navigate("Stock", { locationInfo: null } );
  //         },
  //       })}
  //     />}


  //     {/* Life Bottom Navigator */}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('home_life') && <BottomTab.Screen
  //       name="HomeLife"
  //       component={HomeLifeScreen}
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('product_sales') && <BottomTab.Screen
  //       name="ProductSalesLife"
  //       component={ProductSalesScreen}
  //       options={{
  //         title: 'Sales',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Location_Arrow_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Location_Arrow" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}


  //     {selectProject == 'geo_life' && bottomListTwo.includes('news') && <BottomTab.Screen
  //       name="News"
  //       component={NewsScreen}
  //       options={{
  //         title: 'News',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Location_Arrow_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Location_Arrow" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('locations_life') && <BottomTab.Screen
  //       name="LocationsLife"
  //       component={LocationsLifeScreen}
  //       options={{
  //         title: 'Locations',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Calendar_Event_Fill_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Calendar_Event_Fill" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('check_in') && <BottomTab.Screen
  //       name="CheckIn"
  //       component={CheckInScreen}
  //       options={{
  //         title: 'Check In',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('access') && <BottomTab.Screen
  //       name="Access"
  //       component={AccessScreen}
  //       options={{
  //         title: 'Access Control',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('club') && <BottomTab.Screen
  //       name="Club"
  //       component={ClubScreen}
  //       options={{
  //         title: 'Club',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('flashbook') && <BottomTab.Screen
  //       name="Flashbook"
  //       component={FlashbookScreen}
  //       options={{
  //         title: 'FlashBook',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('business_directory') && <BottomTab.Screen
  //       name="BusinessDirectory"
  //       component={BusinessDirectoryScreen}
  //       options={{
  //         title: 'Business Directory',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('content_library') && <BottomTab.Screen
  //       name="LifeContentLibrary"
  //       component={LifeContentLibraryScreen}
  //       options={{
  //         title: 'Content Library',
  //         tabBarLabel: 'Content',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //       listeners={({navigation}) => ({
  //         tabPress: (e) => {
  //           e.preventDefault();
  //           dispatch({type: CHANGE_LIBRARY_CHILD_STATUS, payload: false});
  //           navigation.navigate("LifeContentLibrary");
  //         },
  //       })}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('forms') && <BottomTab.Screen
  //       name="LifeForms"
  //       component={LifeFormsScreen}
  //       options={{
  //         title: 'Forms',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('loyalty_cards') && <BottomTab.Screen
  //       name="LoyaltyCards"
  //       component={LoyaltyCardsScreen}
  //       options={{
  //         title: 'Loyalty Cards',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('lunch_orders') && <BottomTab.Screen
  //       name="LunchOrdersScreen"
  //       component={LunchOrdersScreen}
  //       options={{
  //         title: 'Lunch Orders',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('messages') && <BottomTab.Screen
  //       name="LifeMessagesScreen"
  //       component={LifeMessagesScreen}
  //       options={{
  //         title: 'Messages',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('report_fraud') && <BottomTab.Screen
  //       name="ReportFraudScreen"
  //       component={ReportFraudScreen}
  //       options={{
  //         title: 'Report Fraud',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('web_links') && <BottomTab.Screen
  //       name="LifeWebLinksScreen"
  //       component={LifeWebLinksScreen}
  //       options={{
  //         title: 'Web Links',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Travel_Explore_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Travel_Explore" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_life' && bottomListTwo.includes('well_being') && <BottomTab.Screen
  //       name="WellBeingScreen"
  //       component={WellBeingScreen}
  //       options={{
  //         title: 'Well-being',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {/* CRM Bottom navigator */}

  //     {selectProject == 'geo_crm' && bottomListThree.includes('crm_locations') && <BottomTab.Screen
  //       name="CRMLocations"
  //       component={CRMLocationsScreen}
  //       options={{
  //         title: 'CRM',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Home_Black_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Home_Black" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_crm' && bottomListThree.includes('sales_pipeline') && <BottomTab.Screen
  //       name="CRMSalesPipeline"
  //       component={CRMSalesPipelineScreen}
  //       options={{
  //         title: 'Pipeline',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Pipeline_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Pipeline" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}

  //     {selectProject == 'geo_crm' && bottomListThree.includes("content_library") && <BottomTab.Screen
  //       name="CRMContentLibrary"
  //       component={CRMContentLibraryScreen}
  //       options={{
  //         title: 'Content Library',
  //         tabBarLabel: 'Content',
  //         tabBarIcon: ({focused}) => (
  //           <Fragment>
  //             {!focused && <SvgIcon icon="Ballot_Gray" width='20px' height='20px' />}
  //             {focused && <SvgIcon icon="Ballot" width='20px' height='20px' />}
  //           </Fragment>
  //         ),
  //         headerRight: () => (
  //           <HeaderRightView navigation={navigation}/>
  //         ),
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: 'Gilroy-Medium'
  //         },
  //         tabBarActiveTintColor: whiteLabel().activeIcon,
  //       }}
  //     />}



  //     {/* More Screen */}

      
  //   </BottomTab.Navigator>

  // );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: whiteLabel().headerBackground,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%'
  },
  layoutBar: {        
    flexDirection:'row',
    
    justifyContent:'center',
    alignItems:'center',

  },
  
})