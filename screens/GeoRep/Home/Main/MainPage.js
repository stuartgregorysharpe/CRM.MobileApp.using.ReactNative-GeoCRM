import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { SyncAll } from './../partial/SyncAll';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import IndicatorDotScroller from '../../../../components/common/IndicatorDotScroller';
import Colors from '../../../../constants/Colors';
import Visits from '../partial/cards/Visits';
import { useSelector } from 'react-redux';
import { getApiRequest, postApiRequest } from '../../../../actions/api.action';
import ActivityCard from '../partial/cards/ActivityCard';
import { getLocalData, storeLocalValue } from '../../../../constants/Storage';
import { expireToken, getPostParameter, showOfflineDialog } from '../../../../constants/Helper';
import { Constants, Strings } from '../../../../constants';
import OdometerReadingModal from './modal/OdometerReadingModal';
import { updateCurrentLocation } from '../../../../actions/google.action';
import { useDispatch } from 'react-redux';
import { Notification } from '../../../../components/modal/Notification';
import { showNotification } from '../../../../actions/notification.action';
import { CHANGE_SYNC_START, CHECKIN } from '../../../../actions/actionTypes';
import { initializeDB } from '../../../../services/SyncDatabaseService/SyncTable';
import CheckOutViewContainer from '../../../../components/common/CheckOut/CheckOutViewContainer';
import { checkConnectivity } from '../../../../DAO/helper';
import { PostRequestDAO } from '../../../../DAO';
import SellIn from '../partial/cards/SellIn';
import CardsFilterModal from '../partial/components/CardsFilterModal';
import SellOut from '../partial/cards/SellOut';

//const MainPage = props => {
export const MainPage = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(true);
  const [startEndDayId, setStartEndDayId] = useState(0);
  const [pages, setPages] = useState(['visits', 'activity']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activityCard, setActivityCard] = useState(null);
  const [visitCard, setVisitCard] = useState(null);
  const pageWidth = Dimensions.get('screen').width - 20;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const offlineStatus = useSelector(state => state.auth.offlineStatus);
  const odometerReadingModalRef = useRef(null);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const [currentCall, setCurrentCall] = useState('');
  const [checkinStatus, setCheckinStatus] = useState(false);
  const isCheckin = useSelector(state => state.location.checkIn);
  const navigation = props.navigation;
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollable, setIsScrollable] = useState(true);
  const syncAllViewRef = useRef(null);
  const cardsFilterModal = useRef(null);
  const [haveFilter, setHaveFilter] = useState(false);

  const [lindtdash_sellin, setSellInCard] = useState(false);
  const [lindtdash_sellout, setSellOutCard] = useState(false)

  useImperativeHandle(ref, () => ({
    onlineSyncTable() {
      if (syncAllViewRef.current) {
        syncAllViewRef.current.syncAllData();
      }
    },
  }));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPage();

    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    loadPage();
    if (!isCheckin) {
      cleanLocationId();
    }
  }, [isCheckin]);

  useEffect(() => {
    initializeDB().then(res => {
      console.log(' ----------------- initaliz db end ---------------- ');
      dispatch({ type: CHANGE_SYNC_START, payload: false });
      if (syncAllViewRef.current) {
        syncAllViewRef.current.refreshView();
      }
    });
    checkConnectivity().then((isConnected) => {
      if (!isConnected) {
        setIsScrollable(false)
      }
    })
  }, []);

  useEffect(() => {
    console.log("changed offline status", offlineStatus)
    if (offlineStatus) {
      setIsScrollable(false)
    } else {
      setIsScrollable(true)
    }
  }, [offlineStatus]);

  const cleanLocationId = async () => {
    await storeLocalValue('@specific_location_id', '');
  };

  const loadPage = () => {

    if (currentLocation.latitude === undefined) {
      dispatch(updateCurrentLocation());
    }

    var param = {
      current_latitude:
        currentLocation.latitude != undefined ? currentLocation.latitude : 1,
      current_longitude:
        currentLocation.longitude != undefined ? currentLocation.longitude : 1,
    };
    if (isLoading == false) {
      setIsLoading(true);


      checkConnectivity().then((isConnected) => {
        if (isConnected) {

          getApiRequest('home/main-dashboard', param)
            .then(async res => {
              setIsLoading(false);

              setVisitCard(res.items.visits_card);
              setActivityCard(res.items.activity_card);
              setCurrentCall(res.items.current_call);
              setCheckinStatus(res.items.checkin_state);
              if (res.items.checkin_state != '') {
                await storeLocalValue('@checkin', '1');
                await storeLocalValue(
                  '@specific_location_id',
                  res.items.checkin_state,
                );
                dispatch({ type: CHECKIN, payload: true });
              } else {
                await storeLocalValue('@checkin', '0');
              }
              setIsStart(
                res.items.startEndDay_state ===
                  Constants.homeStartEndType.START_MY_DAY
                  ? true
                  : false,
              );
              await storeLocalValue(
                'start_my_day',
                res.items.startEndDay_state ===
                  Constants.homeStartEndType.START_MY_DAY
                  ? '1'
                  : '0',
              );
            })
            .catch(e => {
              setIsLoading(false);
              expireToken(dispatch, e);
            });

        }
      });



    }
    initData();
    handleLindtCards();
  };

  const initData = async () => {
    var startMyDay = await getLocalData('start_my_day');
    setIsStart(startMyDay === null || startMyDay === '1' ? true : false);

  };

  const handleLindtCards = () => {
    let isSellIn = features.includes('lindtdash_sellin');
    let isSellOut = features.includes('lindtdash_sellout');
    let pageData = pages;
    if (isSellIn) {
      if (!pageData.find(x => x === 'sell_in'))
        pageData.push('sell_in');
      setSellInCard(isSellOut);
    }

    if (isSellOut) {
      if (!pageData.find(x => x === 'sell_out'))
        pageData.push('sell_out');
      setSellOutCard(isSellOut);
    }
    console.log(pageData);
    setPages(pageData);
  }

  const _callMyDay = () => {

    var userParam = getPostParameter(currentLocation);
    var postData = {
      startEndDay_type: isStart
        ? Constants.homeStartEndType.START_MY_DAY
        : Constants.homeStartEndType.END_MY_DAY,
      user_local_data:
        userParam.user_local_data != undefined
          ? userParam.user_local_data
          : { time_zone: '', latitude: 0, longitude: 0 },
    };

    PostRequestDAO.find(0, postData, "start_end_day", 'home/startEndDay', '', '', dispatch).then(async (res) => {
      if (res.status === Strings.Success) {
        setStartEndDayId(res.startEndDay_id);
        await storeLocalValue('start_my_day', isStart ? '0' : '1');
        setIsStart(!isStart);
        if (features.includes('odometer_reading')) {
          odometerReadingModalRef.current.showModal();
        }
      } else if (res.status === "NOIMPLEMENT") {
        showOfflineDialog(dispatch);
      }
    }).catch((e) => {
      expireToken(dispatch, e);
    });
  };

  const onCaptureAction = async ({ type, value }) => {
    dispatch(
      showNotification({
        type: Strings.Success,
        message: value,
        buttonText: Strings.Ok,
      }),
    );
  };

  const renderCards = (item, index) => {
    if (item === 'visits') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          <Visits {...props} visitCard={visitCard} />
        </View>
      );
    } else if (item === 'activity') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {activityCard && (
            <ActivityCard activityCard={activityCard}></ActivityCard>
          )}
        </View>
      );
    } else if (item === 'sell_in') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_sellin && (
            <SellIn haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()} />
          )}
        </View>
      );
    }
    else if (item === 'sell_out') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_sellout &&
            <SellOut haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()} />
          }
        </View>
      );
    }
  };

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
      <Notification></Notification>

      <View style={{ marginTop: 5 }}>
        <SubmitButton
          bgStyle={{
            backgroundColor: isStart ? Colors.disabledColor : Colors.redColor,
            borderRadius: 3,
          }}
          title={isStart ? Strings.Start_My_Day : Strings.End_My_Day}
          onSubmit={() => {
            _callMyDay();
          }}></SubmitButton>
      </View>

      <SyncAll ref={syncAllViewRef} ></SyncAll>

      {isCheckin && (
        <CheckOutViewContainer
          type="home"
          checkinStatus={checkinStatus}
          currentCall={currentCall}></CheckOutViewContainer>
      )}

      <FlatList
        removeClippedSubviews={false}
        initialNumToRender={10}
        horizontal={true}
        scrollEnabled={isScrollable}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={pages}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.x % pageWidth == 0) {
            setSelectedIndex(event.nativeEvent.contentOffset.x / pageWidth);
          }
        }}
        renderItem={({ item, index }) => renderCards(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />

      <IndicatorDotScroller
        total={pages.length}
        selectedIndex={selectedIndex}></IndicatorDotScroller>

      <OdometerReadingModal
        ref={odometerReadingModalRef}
        title={Strings.Home.Odometer_Reading}
        isStart={isStart}
        startEndDayId={startEndDayId}
        currentLocation={currentLocation}
        onButtonAction={onCaptureAction}
      />
      <CardsFilterModal ref={cardsFilterModal}
        onButtonAction={(data) => {
          setHaveFilter(data);
        }} />
    </ScrollView>
  );
});

//export default MainPage;
