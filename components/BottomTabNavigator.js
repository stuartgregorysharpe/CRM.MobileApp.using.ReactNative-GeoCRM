import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Fragment, useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MoreNavigator from './MoreNavigator';
import DeviceInfo from 'react-native-device-info';
import SvgIcon from './SvgIcon';
import {whiteLabel} from '../constants/Colors';
import {
  SLIDE_STATUS,
  CHANGE_MORE_STATUS,
  SHOW_MORE_COMPONENT,
} from '../actions/actionTypes';

import {StyleSheet, Dimensions, TouchableOpacity, Platform} from 'react-native';
import HeaderRightView from './Header/HeaderRightView';
import {style} from '../constants/Styles';
import {Constants} from '../constants';
import {getPageNameByLinker} from '../constants/Helper';
import { getBottomTabs } from './helper';

const BottomTab = createBottomTabNavigator();

export default function RepBottomTabNavigator({navigation}) {
  const dispatch = useDispatch();
  const payload = useSelector(state => state.selection.payload);
  const selectProject = useSelector(state => state.selection.selectProject);
  const visibleMore = useSelector(state => state.rep.visibleMore);

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
    
    if (visibleMore != '') {
      navigation.navigate('More');
      setTimeout(() => {
        //dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
      });
    }
  }, [visibleMore]);

  const getHeaderHeight = () => {
    if (Platform.OS == 'ios') {
      if (DeviceInfo.isTablet()) {
        return 82;
      } else {
        return 62;
      }
    } else {
      if (DeviceInfo.isTablet()) {
        return 82;
      } else {
        return 74;
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
                height: 70, // Specify the height of your custom header
                backgroundColor:whiteLabel().actionFullButtonBackground
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

                  //dispatch({type: SLIDE_STATUS, payload: false});
                  console.log('revisible mo', visibleMore);
                  dispatch({type: CHANGE_MORE_STATUS, payload: 0});

                  // if (visibleMore != '') {
                  //   //dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
                  // } else {
                  //   dispatch({type: CHANGE_MORE_STATUS, payload: 0});
                  // }

                }else{
                  console.log("bottom tab clicked")
                  dispatch({type: SHOW_MORE_COMPONENT, payload: ''});
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
