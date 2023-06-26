import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { SyncAll } from './../partial/SyncAll';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import Colors from '../../../../constants/Colors';
import Visits from '../partial/cards/Visits';
import { connect, useSelector } from 'react-redux';
import { getApiRequest, postApiRequest } from '../../../../actions/api.action';
import ActivityCard from '../partial/cards/ActivityCard';
import { getJsonData, getLocalData, getUserData, getUserId, storeJsonData, storeLocalValue } from '../../../../constants/Storage';
import { expireToken, getPostParameter, showOfflineDialog } from '../../../../constants/Helper';
import { Constants, Strings } from '../../../../constants';
import OdometerReadingModal from './modal/OdometerReadingModal';
import { updateCurrentLocation } from '../../../../actions/google.action';
import { useDispatch } from 'react-redux';
import { CHANGE_SYNC_START, CHECKIN, SET_CONTENT_FEED_DATA } from '../../../../actions/actionTypes';
import { initializeDB } from '../../../../services/SyncDatabaseService/SyncTable';
import CheckOutViewContainer from '../../../../components/common/CheckOut/CheckOutViewContainer';
import { checkConnectivity } from '../../../../DAO/helper';
import { PostRequestDAO } from '../../../../DAO';
import SellIn from '../partial/cards/SellIn';
import CardsFilterModal from '../partial/components/CardsFilterModal';
import SellOut from '../partial/cards/SellOut';
import Mobility from '../partial/cards/Mobility';
import Festivals from '../partial/cards/Festivals';
import Tracking from '../partial/cards/Tracking';
import Compliance from '../partial/cards/Compliance';
import TwoRowContent from '../../../../components/modal/content_type_modals/TwoRowContentFeed';
import { getContentFeeds, updateContentFeed_post } from '../../../../actions/contentLibrary.action';
import CustomImageDialog from '../../../../components/modal/content_type_modals/CustomImageDialog';
import AlertDialog from '../../../../components/modal/AlertDialog';

const MainPage = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const [isStart, setIsStart] = useState(true);
  const [pages, setPages] = useState([{ card: 'visits', index: 0 }, { card: 'activity', index: 1 }]);
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
  const [lindtdash_sellout, setSellOutCard] = useState(false);
  const [lindtdash_mobility, setMobilityCard] = useState(false);
  const [lindtdash_festival, setFestivalCard] = useState(false);
  const [lindtdash_tracking, setTrackingCard] = useState(false);
  const [lindtdash_compliance, setComplianceCard] = useState(false);
  const [contentFeedData, setContentFeedData] = useState([]);
  const dataUpdated = useSelector(state => state.feed.content_feed_data);
  const [isFeedImageVisible, setImageVisible] = useState(false);
  const [feedData, setFeedData] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (dataUpdated) {
      loadContentFeedData();
    }
  }, [dataUpdated]);

  useImperativeHandle(ref, () => ({

    onlineSyncTable(syncType , flag) {
      if (syncAllViewRef.current) {
        syncAllViewRef.current.syncAllData(syncType , flag);
      }
    },

    reloadMainPage () {
      loadPage();
    },

  }));
    
  useEffect(() => {
    loadPage();
  }, [isCheckin]);

  useEffect(() => {
    
    // initializeDB().then(res => {
    //   console.log(' ----------------- initaliz db end ---------------- ');
    //   dispatch({ type: CHANGE_SYNC_START, payload: false });
    //   if (syncAllViewRef.current) {
    //     syncAllViewRef.current.refreshView();
    //   }
    // });

    checkConnectivity().then((isConnected) => {
      if (!isConnected) {
        setIsScrollable(false)
      }
    });
    loadContentFeedData();
  }, []);

  const loadContentFeedData = async () => {
    dispatch({ type: SET_CONTENT_FEED_DATA, payload: false });
    var user_id = await getUserId();
    var userData = await getUserData();
    let params = `?app=1&user_id=${userData.universal_user_id}`; //`?user_id=${user_id}&app=1&role=${userData.role}&manager=&region=`;
    getContentFeeds(params).then((responseJson) => {
      let modifiedList = [];
      if (responseJson) {
        for (let i = 0; i < responseJson.length; i++) {
          let contenticon = null;
          let contentcolor = "#FF8900";
          let contentsubcolor = "#CFF3EA";
          let maincolor = "#CFF3EA"
          let contentSubList = [];
          let serveyList = [];
          if (responseJson[i].content_type == 1) {
            /** Flash Club */
            contenticon = 'Shield_Fail';
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#8BD41F"
          }
          else if (responseJson[i].content_type == 2) {
            /** News */
            contenticon = "News"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#00C193"
          }
          else if (responseJson[i].content_type == 3) {
            /** Information */
            contenticon = "Info"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#0097F7"
          }
          else if (responseJson[i].content_type == 4) {
            /** Fraud Warning */
            contenticon = "Fraud"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#FF002C"
          }
          else if (responseJson[i].content_type == 5) {
            /** Learning */
            contenticon = "Learning"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#F6267D"
          }
          else if (responseJson[i].content_type == 6) {
            /** Rewards */
            contenticon = "Star"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#5756E9"
          }
          else if (responseJson[i].content_type == 7) {
            /** Health & Saftey */
            contenticon = "HealthySafety";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#00C193"
          }
          else if (responseJson[i].content_type == 8) {
            /** System Information */
            contenticon = "Danger"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#F54949"
          }
          else if (responseJson[i].content_type == 9) {
            /** BI */
            contenticon = "Bi"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#FF8900"
          }
          else if (responseJson[i].content_type == 10) {
            /** Marketing */
            contenticon = "Marketing"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#00C193"
          }
          else if (responseJson[i].content_type == 11) {
            /** Sales */
            contenticon = "Sales";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#0052B0"
          }
          else if (responseJson[i].content_type == 12) {
            /** Office */
            contenticon = "Office";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#FF8900";
          }
          else if (responseJson[i].content_type == 13) {
            /** Careers */
            contenticon = "Careers";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#9231FC"
          }
          else if (responseJson[i].content_type == 14) {
            /** Birthday */
            contenticon = "Birhday";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#0052B0"
            contentSubList = this.state.birthDayList

          }
          else if (responseJson[i].content_type == 15) {
            /** Fire */
            contenticon = "Health_Safety"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#0097F7"
          }
          else if (responseJson[i].content_type == 16) {
            /** Standard Notification */
            contenticon = "Notify";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#CFF3EA"
            if (contentcolor == "blue") {
              contentsubcolor = "#CFECFD"
            }
            else if (contentcolor == "red") {
              contentsubcolor = "#FFE6EA"
            }
            else if (contentcolor == "orange") {
              contentsubcolor = "#FFD400"
            }
            else if (contentcolor == "green") {
              contentsubcolor = "#CFF3EA"
            }
          }
          else if (responseJson[i].content_type == 17) {
            /** None */
            contenticon = "Notify";
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#CFF3EA"
          }
          else if (responseJson[i].content_type == 18) {
            /** Quick Survey */
            contenticon = "Survey"
            contentcolor = responseJson[i].card_severity.toLowerCase();
            maincolor = "#8BD41F"
            if (responseJson[i].survey_details.question_type == "DropDown") {
              for (let s = 0; s < responseJson[i].survey_details.answer_options.length; s++) {
                if (responseJson[i].survey_details.answer_options[s] != "") {
                  serveyList.push({
                    id: s,
                    date: responseJson[i].survey_details.answer_options[s],
                    isActive: false
                  })
                }
              }
            }
            else {
              serveyList = this.state.gpstrackerratingList
            }
          }
          modifiedList.push({
            content_feed_id: responseJson[i].content_feed_id,
            headertitle: responseJson[i].card_name,
            icon: contenticon,
            title: responseJson[i].card_headline,
            subtitle: responseJson[i].card_sub_text,
            subtitleIcon: null,
            color: contentcolor,
            notificationImage: responseJson[i].card_image,
            day: "test",
            answer: "",
            isActive: isUserAvailable(responseJson[i].user_engagement_acknowledge) ? true : false,
            card_type: responseJson[i].card_type,
            card_action: responseJson[i].card_action,
            content_type: responseJson[i].content_type,
            action_text: responseJson[i].action_text,
            action_type_id: responseJson[i].action_type_details.action_type_id,
            card_sub_text: responseJson[i].card_sub_text,
            date_created: responseJson[i].date_created,
            start_date: responseJson[i].start_date,
            createdAt: null,
            subcolor: contentsubcolor,
            subList: contentSubList,
            maincolor: maincolor,
            active: responseJson[i].active,
            survey_details: responseJson[i].survey_details,
            serveyList: serveyList,
            card_interaction: responseJson[i].card_interaction[0],
            landing_header: responseJson[i].landing_header,
            landing_text: responseJson[i].landing_text,
            landing_image: responseJson[i].landing_image,
            landing_action: responseJson[i].landing_action,
            app_link: responseJson[i].app_link,
            download_file: responseJson[i].download_file,
            web_link: responseJson[i].web_link,
            user_engagement_info: responseJson[i].user_engagement_info,
            user_engagement_close: responseJson[i].user_engagement_close,
            user_engagement_acknowledge: responseJson[i].user_engagement_acknowledge,
            user_engagement_action: responseJson[i].user_engagement_action,
            user_engagement_survey: responseJson[i].user_engagement_survey,
            user_engagement_like: responseJson[i].user_engagement_like,
            user_engagement_hunt: responseJson[i].user_engagement_hunt,
            card_info_heading: responseJson[i].card_info_heading,
            card_info_text: responseJson[i].card_info_text,
            card_info_image: responseJson[i].card_info_image,
            survey_id: responseJson[i].survey_id,
            istooltipvisible: false,
            isShowMore: false,
            video_url: responseJson[i].video,
            like: responseJson[i].like,
            content_feed_type: responseJson[i].action_type_details.action_type,
            gif: responseJson[i].gif,
            huntImage: responseJson[i].hunt_image,
            huntValue: responseJson[i].hunt
          })
        }
        setContentFeedData(modifiedList);
      }
    }).catch((error) => {
      console.log("Error", error);
    })
  }

  const isUserAvailable = async (item) => {
    var userData = await getUserData();
    let value = item.find(item => item === userData.universal_user_id);
    if (value == userData.universal_user_id) {
      return true;
    }
    else {
      return false;
    }
  };
  const updateContentFeed = async (item_id) => {
    var userData = await getUserData();
    let params = JSON.stringify({
      engagement_close_user_id: userData.universal_user_id
    });
    console.log("item id", item_id);
    updateContentFeed_post(params, item_id).then((res) => {
      console.log("content feed update res", res);
      if (res) {
        loadContentFeedData();
      }

    }).catch((error) => {
      console.log("content feed update error", error);
    })
  }
  useEffect(() => {
    console.log("changed offline status", offlineStatus)
    if (offlineStatus) {
      setIsScrollable(false)
    } else {
      setIsScrollable(true)
    }
  }, [offlineStatus]);


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
      checkConnectivity().then(async (isConnected) => {
        if (isConnected) {

          getApiRequest('home/main-dashboard', param)
            .then(async res => {
              setIsLoading(false);
              setVisitCard(res.items.visits_card);
              setActivityCard(res.items.activity_card);
              setCurrentCall(res.items.current_call);
              setCheckinStatus(res.items.checkin_state);
              if (res.items.checkin_state != '' && res.items.checkin_state != undefined ) {
                var locId  = await getLocalData("@specific_location_id");
                if(locId != undefined && locId != res.items.checkin_state){
                  await storeJsonData('@checkin_location', null);
                }
                await storeLocalValue('@checkin', '1');
                await storeLocalValue(
                  '@specific_location_id',
                  res.items.checkin_state,
                );
                dispatch({ type: CHECKIN, payload: true });
              } else {
                await storeLocalValue('@checkin', '0');
                dispatch({ type: CHECKIN, payload: false });
              }
              console.log("res.items.checkin_state => ", res.items.checkin_state )
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

        } else {
          setIsLoading(false);
          let checkInStatus = await getLocalData('@checkin');
          dispatch({ type: CHECKIN, payload: checkInStatus === '1' ? true : false });
          if (checkInStatus === '1') {
            var location = await getJsonData('@checkin_location');
            console.log("location dd=>", location)
            if (location != null) {
              setCurrentCall(location.current_call);
            }
          }

        }
      });

    }
    initData();
    handleLindtCards();
  };

  const initData = async () => {
    var startMyDay = await getLocalData('start_my_day');
    setIsStart((startMyDay === undefined || startMyDay === null || startMyDay === '1') ? true : false);

  };

  const handleLindtCards = () => {
    let isSellIn = features.includes('lindtdash_sellin');
    let isSellOut = features.includes('lindtdash_sellout');
    let isMobility = features.includes('lindtdash_mobility');
    let isFestival = features.includes('lindtdash_festival');
    let isTracking = features.includes('lindtdash_tracking');
    let isCompliance = features.includes('lindtdash_compliance');

    let pageData = pages;
    if (isSellIn) {
      if (!pageData.find(x => x.card === 'sell_in'))
        pageData.push({ card: 'sell_in', index: pages.length });
      setSellInCard(isSellIn);
    }

    if (isSellOut) {
      if (!pageData.find(x => x.card === 'sell_out'))
        pageData.push({ card: 'sell_out', index: pages.length });
      setSellOutCard(isSellOut);
    }

    if (isTracking) {
      if (!pageData.find(x => x.card === 'tracking'))
        pageData.push({ card: 'tracking', index: pages.length });
      setTrackingCard(isTracking);
    }

    if (isFestival) {
      if (!pageData.find(x => x.card === 'festival'))
        pageData.push({ card: 'festival', index: pages.length });
      setFestivalCard(isFestival);
    }

    if (isCompliance) {
      if (!pageData.find(x => x.card === 'compliance'))
        pageData.push({ card: 'compliance', index: pages.length });
      setComplianceCard(isCompliance);
    }

    if (isMobility) {
      if (!pageData.find(x => x.card === 'mobility'))
        pageData.push({ card: 'mobility', index: pages.length });
      setMobilityCard(isMobility);
    }

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

    if (!isLoading) {
      setIsLoading(true)
      PostRequestDAO.find(0, postData, "start_end_day", 'home/startEndDay', '', '', null, dispatch).then(async (res) => {
        if (res.status == Strings.Success) {
          //setStartEndDayId(res.startEndDay_id);
          await storeLocalValue('start_my_day', isStart ? '0' : '1');
          setIsStart(!isStart);
          if(res.status == "NOIMPLEMENT") {
            showOfflineDialog(dispatch);
          }
        }
        setIsLoading(false);
      }).catch((e) => {
        setIsLoading(false);
        expireToken(dispatch, e);
      });

    }

  };

  const onSubmitOdometerReading = async ({ type, value }) => {
    if (type == Constants.actionType.ACTION_DONE) {
      setIsStart(!isStart);
      setTimeout(() => {
        setMessage(value);
        setIsConfirmModal(true);
      }, 300);
    }
  };

  const onReloadLocationData = () => {
    loadPage();
  }

  const renderCards = (item, index) => {
    if (item.card === 'visits') {
      return (
        <View collapsable={false} key={index} style={{ marginRight: 1, width: pageWidth }}>
          <View>
            <Visits {...props} 
              onReloadLocationData={onReloadLocationData}
              visitCard={visitCard} pageCount={pages.length} pageIndex={item.index} />
            <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
              item={item}
              onImageClick={() => {
                if (item.app_link == null || item.app_link == "") {
                  setFeedData(item);
                  setImageVisible(true);
                }

              }}
              onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
          </View>
        </View>
      );
    } else if (item.card === 'activity') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {activityCard && (
            <View>
              <ActivityCard activityCard={activityCard} pageCount={pages.length} pageIndex={item.index}>
              </ActivityCard>
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }} onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          )}

        </View>
      );
    } else if (item.card === 'sell_in') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_sellin && (
            <View>
              <SellIn haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
                onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          )}
        </View>
      );
    }
    else if (item.card === 'sell_out') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_sellout &&
            <View>
              <SellOut haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
                onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          }
        </View>
      );
    } else if (item.card === 'tracking') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_tracking &&
            <View>
              <Tracking haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
                onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          }
        </View>
      );
    } else if (item.card === 'festival') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_festival &&
            <View>
              <Festivals haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
                onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          }
        </View>
      );
    } else if (item.card === 'mobility') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_mobility &&
            <View>
              <Mobility haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
                onClose={() => updateContentFeed(item.content_feed_id)} />))}</View>
            </View>
          }
        </View>
      );
    } else if (item.card === 'compliance') {
      return (
        <View key={index} style={{ marginRight: 1, width: pageWidth }}>
          {lindtdash_compliance &&
            <View>
              <Compliance haveFilter={haveFilter} onFilterPress={() => cardsFilterModal.current.showModal()}
                pageCount={pages.length} pageIndex={item.index} />
              <View>{contentFeedData.map((item, index) => (<TwoRowContent key={index.toString()}
                item={item}
                onClose={() => updateContentFeed(item.content_feed_id)}
                onImageClick={() => {
                  if (item.app_link == null || item.app_link == "") {
                    setFeedData(item);
                    setImageVisible(true);
                  }
                }}
              />))}</View>
            </View>
          }
        </View>
      );
    }
  };
  const onPressStartEndDay = () => {
    checkConnectivity().then(isConnected => {
      if(isConnected) {
        const isOdometerReading = features.includes('odometer_reading')
        if (isOdometerReading) {
          odometerReadingModalRef.current.showModal();
        } else {
          _callMyDay();
        }
      } else {
        showOfflineDialog(dispatch)
      }
    })
  }

  const openLocationSpecificInfo = ( location, openModal) => {
    navigation.navigate('DeeplinkLocationSpecificInfoScreen', {              
      page: 'checkin',
      openModal:openModal,
      data : location
    }); 
  }

  const openFormQuestion = (location) => {
    if (location != null && location != undefined) {
      navigation.navigate('DeeplinkRepForms', {
        locationInfo: location,
      });
    }
  }

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>

      <AlertDialog
        visible={isConfirmModal}
        message={message}
        onModalClose={async () => {
          setIsConfirmModal(false);
          const location = await getJsonData('@checkin_location');
          if (confirmModalType == 'compulsoryForm') {                
            openFormQuestion(location);      
          }else if(confirmModalType == 'compulsoryDevice'){
            openLocationSpecificInfo(location , 'devices');            
          }else if(confirmModalType == 'compulsoryLocationField'){
            openLocationSpecificInfo(location , 'cusotmer_contact');            
          }
          
        }}
      />

      <View style={{ marginTop: 5 }}>
        <SubmitButton
          bgStyle={{
            backgroundColor: isStart ? Colors.disabledColor : Colors.redColor,
            borderRadius: 3,
          }}
          title={isStart ? Strings.Start_My_Day : Strings.End_My_Day}
          onSubmit={onPressStartEndDay}></SubmitButton>
      </View>

      <SyncAll ref={syncAllViewRef} ></SyncAll>

      {isCheckin && currentCall?.checkin_time != '' && currentCall?.location_name != '' && (
        <CheckOutViewContainer
          type="home"
          isLoadingForm={isLoading}
          loadCompulsoryInfo={true}
          checkinStatus={checkinStatus}
          showConfirmModal={(message , type) => {
            setMessage(message);
            setConfirmModalType(type);
            setIsConfirmModal(true);
          }}
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
          if (Math.round(event.nativeEvent.contentOffset.x) % Math.round(pageWidth) < 10) {
            let _index = Math.round(event.nativeEvent.contentOffset.x) / Math.round(pageWidth)
            setSelectedIndex(Math.round(_index));
          }
        }}
        renderItem={({ item, index }) => renderCards(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* <IndicatorDotScroller
        total={pages.length}
        selectedIndex={selectedIndex}></IndicatorDotScroller> */}

      <OdometerReadingModal
        ref={odometerReadingModalRef}
        title={Strings.Home.Odometer_Reading}
        isStart={isStart}
        currentLocation={currentLocation}
        onButtonAction={onSubmitOdometerReading}
      />
      <CardsFilterModal ref={cardsFilterModal}
        onButtonAction={(data) => {
          setHaveFilter(data);
        }} />
      {isFeedImageVisible && <CustomImageDialog
        visible={isFeedImageVisible}
        data={feedData}
        onControlDialogVisible={() => {
          setFeedData(null);
          setImageVisible(!isFeedImageVisible)
        }}
      />}

    </ScrollView>
  );
});

export default MainPage;