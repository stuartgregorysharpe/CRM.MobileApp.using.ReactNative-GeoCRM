import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import React, {Fragment, useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import SvgIcon from './SvgIcon';
import {whiteLabel} from '../constants/Colors';
import {  
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,
  SET_CONTENT_FEED_DATA,
} from '../actions/actionTypes';
import {StyleSheet, Dimensions, TouchableOpacity, Platform} from 'react-native';
import HeaderRightView from './Header/HeaderRightView';
import {style} from '../constants/Styles';
import {Constants, Strings} from '../constants';
import {getBottomTabs} from './helper';
import { showNotification } from '../actions/notification.action';

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({navigation}) {

  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);
  const visibleMore = useSelector(state => state.rep.visibleMore);
  const offlineStatus = useSelector(state => state.auth.offlineStatus);
  const [bottomTabs, setBottomTabs] = useState([]);

  useEffect(() => {
    initBottomTab();
  }, [selectProject]);

  const initBottomTab = () => {
    // console.log('selectProject', selectProject);
    // var modules = [];
    // if (selectProject === Constants.projectType.GEO_REP) {
    //   modules = payload.user_scopes.geo_rep.modules_nav_order;
    // } else if (selectProject === Constants.projectType.GEO_LIFE) {
    //   modules = payload.user_scopes.geo_life.modules_nav_order;
    // } else if (selectProject === Constants.projectType.GEO_CRM) {
    //   modules = payload.user_scopes.geo_crm.modules_nav_order;
    // }
    // var tmp = [];
    // modules.forEach((element, index) => {
    //   if (index < 4) {
    //     console.log("tab " + index , element )
    //     tmp = [...tmp, getPageNameByLinker(selectProject, element)];
    //   }
    // });
    // tmp = [
    //   ...tmp,
    //   {
    //     linker: 'more',
    //     name: 'More',
    //     router: MoreNavigator,
    //     activeIcon: 'Android_More_Horizontal',
    //     inActiveIcon: 'Android_More_Horizontal_Gray',
    //   },
    // ];
    // console.log("bottom tab", tmp)

    var tmp = getBottomTabs(payload, selectProject);
    setBottomTabs(tmp);
    if (selectProject === Constants.projectType.GEO_LIFE) {
      navigation.navigate('Root', {screen: 'Sales'});
    }
  };

  useEffect(() => {
    
    if (visibleMore != '' && visibleMore != 'Sales') { // Sales from bottom bar , ProductSales from right drawer menu
      if (visibleMore === 'ProductSales') {        
        navigation.navigate('More', {
          screen: 'ProductSales',
          params: {screen: 'Root', params: {regret_item: ''}},
        });
      } else {
        navigation.navigate('More', {screen: visibleMore});
      }
    }
  }, [visibleMore]);

  const getHeaderHeight = () => {
    //console.log('StatusBar.currentHeight', StatusBar.currentHeight);

    var currentHeight = 0;
    if (Platform.OS == 'ios') {
      currentHeight = 20;
    } else {
      currentHeight =
        StatusBar.currentHeight > 0 ? StatusBar.currentHeight : 24;
    }

    if (Platform.OS == 'ios') {
      if (DeviceInfo.isTablet()) {
        return 82;
      } else {
        return 62;
      }
    } else {      
      if (DeviceInfo.isTablet()) {
        return currentHeight + 62;
      } else {
        return currentHeight + 52;
      }
    }
  };

  const getHeaderMargin = () => {
    if (Platform.OS == 'ios') {
      if (DeviceInfo.isTablet()) {
        return 20;
      } else {
        return 0;
      }
    } else {
      if (DeviceInfo.isTablet()) {
        return 22;
      } else {
        return 22;
      }
    }
  };

  if (bottomTabs.length == 0) {
    return <View></View>;
  }

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: whiteLabel().headerBackground,
          height: getHeaderHeight(),
        },
        tabBarShowLabel: true,
        headerTitleStyle: style.headerTitle,
        tabBarIconStyle: {
          color: '#fff',
        },
        headerStatusBarHeight: getHeaderMargin(),
        tabBarStyle: {
          height: 50,
          paddingTop: 0,
          paddingBottom: Platform.OS == 'android' ? 4 : 0,
        },
      }}>
        
      {bottomTabs.map((element, index) => {
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
                  <SvgIcon
                    icon={focused ? element.activeIcon : element.inActiveIcon}
                    width="20px"
                    height="20px"
                  />
                </Fragment>
              ),
              headerStyle: {
                height: getHeaderHeight(), // Specify the height of your custom header
                backgroundColor: whiteLabel().headerBackground,
              },
              headerRight: () => <HeaderRightView navigation={navigation} />,
              tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'Gilroy-Medium',
              },
              tabBarActiveTintColor: whiteLabel().activeIcon,
            }}
            listeners={({navigation}) => ({
              tabPress: e => {
                
                if (element.name === 'More') {

                  e.preventDefault();
                  console.log('revisible mo', visibleMore);
                  dispatch({type: CHANGE_MORE_STATUS, payload: 0});
                  if (visibleMore != '') {
                    dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
                  }                                    
                } else {
                  console.log('bottom tab clicked', element.name);                  
                  if (element.name === 'Home') {
                    dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
                    dispatch({type: SET_CONTENT_FEED_DATA, payload: true});
                  } else if(element.name === 'Sales'){                    
                    if(!offlineStatus){
                      dispatch({
                        type: SHOW_MORE_COMPONENT,
                        payload: 'Sales',
                      });
                    }else{
                      e.preventDefault();
                      dispatch(showNotification({type : Strings.Success , message: Strings.This_Function_Not_Available, buttonText: Strings.Ok}));
                    }

                  }else{
                    dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
                  }
                }
              },
            })}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: whiteLabel().headerBackground,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '100%',
  },
  layoutBar: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
