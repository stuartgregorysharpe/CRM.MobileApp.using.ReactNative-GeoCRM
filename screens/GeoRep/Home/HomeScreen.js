import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ScrollTab from '../../../components/common/ScrollTab';
import {style} from '../../../constants/Styles';
import {MainPage} from './Main/MainPage';
import {useSelector} from 'react-redux';
import ActionItemsContainer from '../CRM/action_items/containers/ActionItemsContainer';
import {generateTabs} from './helper';
import {getSpeedTest} from '../../../services/DownloadService/TrackNetSpeed';
import BackgroundTimer from 'react-native-background-timer';

import {CHANGE_OFFLINE_STATUS} from '../../../actions/actionTypes';
import {useDispatch} from 'react-redux';
import {getLocalData, storeLocalValue} from '../../../constants/Storage';
import {
  clearNotification,
  showNotification,
} from '../../../actions/notification.action';
import {Strings} from '../../../constants';
import {getTime} from '../../../helpers/formatHelpers';
import {Notification} from '../../../components/modal/Notification';
import Orders from './Orders';
import DanOneSales from './DanOneSales/DanOneSales';

export default function HomeScreen(props) {
  const {route, navigation} = props;
  const [tabIndex, setTabIndex] = useState('Main');
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const speed_test = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.speed_test,
  );
  const mainPageRef = useRef(null);
  const dispatch = useDispatch();
  const offlineStatus = useSelector(state => state.auth.offlineStatus);
  const syncStart = useSelector(state => state.rep.syncStart);

  useEffect(() => {
    setTabs(generateTabs(features));
  }, []);

  useEffect(() => {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(async () => {
      if (speed_test.enabled === '1' && !syncStart) {
        const manual = await getLocalData('@manual_online_offline');
        if (manual != '1') {
          getSpeedTest('', {})
            .then(async res => {
              const isOnline = await getLocalData('@online');
              // console.log("DATA: " ,speed_test)
              // console.log("SPEED:  " , res , isOnline ,manual)
              if (
                parseInt(speed_test.minimum_speed_required) >= res &&
                (isOnline === '1' || isOnline === undefined)
              ) {
                // offline
                console.log('Go to Offline');
                showOfflineMessage();
              } else if (
                parseInt(speed_test.minimum_speed_required) < res &&
                isOnline === '0'
              ) {
                // online
                if (
                  (manual === '0' || manual === undefined) &&
                  isOnline === '0'
                ) {
                  console.log('Go to Online');
                  dispatch(
                    showNotification({
                      type: Strings.Success,
                      message: Strings.Online_Mode_Message,
                      buttonText: Strings.Ok,
                      buttonAction: async () => {
                        navigation.navigate('Home', {sync: true});
                        await storeLocalValue('@online', '1');
                        dispatch({type: CHANGE_OFFLINE_STATUS, payload: false});
                        dispatch(clearNotification());
                        dispatch(clearNotification());
                      },
                    }),
                  );
                }
              }
            })
            .catch(async e => {
              const isOnline = await getLocalData('@online');
              console.log('go to offline in error case', isOnline);
              if (isOnline === '1' || isOnline === undefined) {
                console.log('go to offline in error case');
                showOfflineMessage();
              }
            });
        }
      }
    }, parseInt(speed_test.frequency) * 1000); //parseInt(speed_test.frequency)
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [syncStart]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus');
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }

    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={style.headerTitleContainerStyle}>
                <Text style={style.headerTitle}>Home</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  });

  useEffect(() => {
    syncFun();
  }, [offlineStatus]);

  const syncFun = async () => {
    if (route.params != undefined) {
      const {sync} = route.params;
      if (sync) {
        // start sync when online
        var isOnline = await getLocalData('@online');
        if (mainPageRef.current) {
          console.log('onlineSyncTable', isOnline);
          if (isOnline === '1') {
            mainPageRef.current.onlineSyncTable();
          }
        } else {
          if (isOnline === '1') {
            setTabIndex('Main');
            setSelectedTab(0);
            mainPageRef.current.onlineSyncTable();
          }
          console.log('onlineSyncTable no');
        }
      }
    }
  };

  const showOfflineMessage = async () => {
    await storeLocalValue('@online', '0');
    if (dispatch === null || dispatch === undefined) {
      dispatch = useDispatch();
    }
    dispatch({type: CHANGE_OFFLINE_STATUS, payload: true});
    var time = getTime();
    dispatch(
      showNotification({
        type: Strings.Success,
        title: time,
        message: Strings.Offline_Mode_Message,
        buttonText: Strings.Ok,
      }),
    );
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Notification />

      <View style={{marginHorizontal: 10}}>
        <ScrollTab
          tabs={tabs}
          selectedTab={selectedTab}
          onTabSelection={item => {
            setTabIndex(item.name);
            setSelectedTab(item.id);
          }}></ScrollTab>
      </View>

      {tabIndex === 'Main' && (
        <MainPage {...props} ref={mainPageRef}>
          {' '}
        </MainPage>
      )}
      {tabIndex === 'Actions' && <ActionItemsContainer />}

      {tabIndex === 'Orders' && <Orders navigation={navigation} />}
      {tabIndex === 'Sales' && <DanOneSales />}
    </View>
  );
}
