import React, {useState, useEffect , useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Platform,
} from 'react-native';
import Colors, {whiteLabel} from '../../../constants/Colors';
import {boxShadow, style} from '../../../constants/Styles';
import Fonts from '../../../constants/Fonts';
import {useSelector, useDispatch } from 'react-redux';
import {CalendarItem} from './components/CalendarItem';
import DraggableFlatList, {
  ScaleDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {  
  LOCATION_LOOP_LISTS,
} from '../../../actions/actionTypes';
import moment from 'moment';
import {
  expireToken,
  getPostParameter,  
} from '../../../constants/Helper';
import {useIsFocused} from '@react-navigation/native';
import {checkConnectivity} from '../../../DAO/helper';
import GetRequestCalendarScheduleList from '../../../DAO/GetRequestCalendarScheduleList';
import LoadingBar from '../../../components/LoadingView/loading_bar';
import AlertDialog from '../../../components/modal/AlertDialog';
import { Constants, Strings } from '../../../constants';
import CalendarEditDeleteModal from './modal/CalendarEditDeleteModal';
import { getCurrentDate } from '../../../helpers/formatHelpers';
import OptimizePlusButtonContainer from './containers/OptimizePlusButtonContainer';
import ConfirmDialog from '../../../components/modal/ConfirmDialog';
import { getJsonData } from '../../../constants/Storage';
import { Notification } from '../../../components/modal/Notification';
import { postApiRequest } from '../../../actions/api.action';

var selectedIndex = 2;

export default function CalendarScreen(props) {
  
  const dispatch = useDispatch();
  const navigation = props.navigation;  
  const isFocused = useIsFocused();
  const [tabIndex, setTabIndex] = useState(2);
  const [lastWeekList, setLastWeekList] = useState([]);
  const [weekAheadList, setWeekAheadList] = useState([]);
  const [todayList, setTodayList] = useState([]);    
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);  
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState('no_have_complsory');  
  const [buttonText, setButtonText] = useState('Continue');
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isEditable = features.includes('calendar_edit');
  const isOptimize =  features.includes('calendar_optimize');
  const isAdd =  features.includes('calendar_add');

  const loadingBarRef = useRef(null);
  const calendarEditDeleteModalRef = useRef(null);
  const confirmDialogRef = useRef();

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
                <Text style={style.headerTitle}>Calendar</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  });

  useEffect(() => {
    isMount = true;
    return () => {
      isMount = false;
    }
  }, []);

  const onRefresh = (isRefresh = false) => {    
    if (selectedIndex === 1) {
      if (lastWeekList.length === 0 || isRefresh) {
        loadList('last_week');
      }
    } else if (selectedIndex === 2 || selectedIndex === 0) {
      if (todayList.length === 0 || isRefresh ) {
        selectedIndex = 2;
        loadList('today');
      }
    } else if (selectedIndex === 3) {
      if (weekAheadList.length === 0 || isRefresh) {
        loadList('week_ahead');
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (selectedIndex === 2 || selectedIndex === 0) {
        selectedIndex = 2;
        loadList('today');
      }
    });
    return unsubscribe;
  }, [navigation]);
  

  const loadList = async (type, isOptimize = false) => {

    if(isLoading) return;
      
    setIsLoading(true);    
    
    const param = {period: type};
    if (type == 'today' && isOptimize) {
      param.optimize = 1;
      param.current_time = moment().format('hh:mm:ss');
      param.user_coordinates_latitude = currentLocation.latitude;
      param.user_coordinates_longitude = currentLocation.longitude;
    }

    if(isOptimize){
      showLoadingBar();
    }

    GetRequestCalendarScheduleList.find(param)
      .then(res => {        
        setIsLoading(false);
        if(isOptimize){
          hideLoadingBar();   
          showConfirmModal( 'Route Optimized Successfully' , 'optimize', 'Ok');          
        }
        if (selectedIndex == 2 || selectedIndex == 0) {
          setTodayList(res.items);
        } else {
          updateListForWeek(res.items);
        }        
      })
      .catch(e => {        
        expireToken(dispatch, e);
        setIsLoading(false);
        if(isOptimize){
          hideLoadingBar();
          if(e != 'expired')
            confirmDialogRef.current.showModal('Route Optimization failed' , 'Cancel',  'Try again');
        }
      });
  };

  const updateListForWeek = res => {
    let schedules = [];
    schedules = res;
    let schedule_dates = [];
    schedules.forEach(item => {
      let date = schedule_dates.find(a => a === item.schedule_date);
      if (!date) {
        schedule_dates.push(item.schedule_date);
      }
    });
    let sorted_schedule_dates = schedule_dates.sort(
      (a, b) => new Date(a) - new Date(b),
    );
    let sectionList = [];
    sorted_schedule_dates.forEach((item, index) => {
      let data = schedules.filter(schedule => schedule.schedule_date === item);
      sectionList.push({
        index: index,
        title: item,
        data: data,
      });
    });
    if(selectedIndex == 1 ){
      setLastWeekList(sectionList);
    }else if(selectedIndex == 3){
      setWeekAheadList(sectionList);
    }
    
  };

  const updateTodayLocationLists = async data => {

    var userParam = getPostParameter(currentLocation);
    var postData = {
      schedules: data,
      user_local_data: userParam.user_local_data,
    };

    if(!isUpdating && !isLoading){
      setIsUpdating(true);
      showLoadingBar();

      postApiRequest('calenderupdate', postData).then((res) => {
        setIsUpdating(false);
        hideLoadingBar();
      }).catch((e) => {
        setIsUpdating(false);
        hideLoadingBar();
        expireToken(dispatch, e);
      })

    }    
  };

  const  showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }

  const hideLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.hideModal();
    }
  }


  const showConfirmModal = (message, type, buttonText) => {
    console.log("mess", message , type, buttonText)
    setMessage(message);
    setConfirmModalType(type);
    setButtonText(buttonText);
    if(Platform.OS == 'android'){
      setIsConfirmModal(true);
    }else{
      setTimeout(() => {
        setIsConfirmModal(true);
      }, 500);
    }
  }

  const renderCalendarItem = (item, index, tabIndex) => {
    return (
      <TouchableOpacity 
        onPress={() => openEditDeletePopup(item)}
        style={{marginTop: 10, }} >
        <CalendarItem
          key={index}
          showConfirmModalForCheckout={(message, type) => {
            showConfirmModal(message, type , 'Continue');
          }}
          showConfirmModal={(message , type) => {           
            if(type == 'checkin'){
              showConfirmModal(message, 'no_have_complsory' , 'Continue');                   
            }else{
              showConfirmModal(message, 'checkout' , 'Ok');
            }            
          }}
          showLoadingBar={() => {
            showLoadingBar();
          }}
          hideLoadingBar={()=> {
            hideLoadingBar();            
            showConfirmModal(Strings.PostRequestResponse.Successfully_Checkin, 'no_have_complsory' , 'Continue');
          }}
          onReloadLocationData={onReloadLocationData}
          navigation={props.navigation}
          item={item}
          current={currentLocation}
          tabIndex={tabIndex}
          onRefresh={onRefresh}
          onItemSelected={() => {} }></CalendarItem>
      </TouchableOpacity>
    );
  };

  const onReloadLocationData = () => {
    onRefresh(true);
  }

  const renderTodayItem = ({item, drag , index}) => {
    const {isActive} = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPress={() => openEditDeletePopup(item)}
          onLongPress={drag}
          disabled={isActive}
          style={[
            isActive ? {} : {marginTop: 10},
            {backgroundColor: isActive ? '#eee' : Colors.bgColor, marginBottom :  todayList?.length - 1 == index ? 80 : 0},
          ]}>
          <CalendarItem
            showConfirmModalForCheckout={(message , type) => {              
              showConfirmModal(message, type , 'Continue');
            }}
            showConfirmModal={(message , type ) => {
              if(type == 'checkin'){
                showConfirmModal(message, 'no_have_complsory' , 'Continue');                   
              }else{
                showConfirmModal(message, 'checkout' , 'Ok');
              }              
            }}
            showLoadingBar={() => {
              showLoadingBar();
            }}
            hideLoadingBar={()=> {
              hideLoadingBar();              
              showConfirmModal(Strings.PostRequestResponse.Successfully_Checkin, 'no_have_complsory' , 'Continue');
            }}
            
            onItemSelected={() => {              
              dispatch({type: LOCATION_LOOP_LISTS, payload: todayList});
            }}
            onReloadLocationData={onReloadLocationData}
            key={item.schedule_id}
            navigation={props.navigation}
            item={item}
            current={currentLocation}
            tabIndex={tabIndex}>
            {' '}
          </CalendarItem>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  const onTabChanged = index => {
    if(!isLoading){
      setTabIndex(index);
      selectedIndex = index;
      var weekName = 'last_week';
      if (index == 2) {
        weekName = 'today';
      } else if (index == 3) {        
        weekName = 'week_ahead';
      }
      loadList(weekName);
    }            
  };

  const onOptimize = () => {
    loadList('today', true);
  };

  

  const openEditDeletePopup = (item) => {
    if(isEditable){
      if(calendarEditDeleteModalRef.current){              
        if(item.schedule_date >= getCurrentDate()){
          checkConnectivity().then((isConnected) => {
            if(isConnected){
              setLocation(item);
              calendarEditDeleteModalRef.current.showModal();
            }else{              
              showConfirmModal(Strings.This_Function_Not_Available , 'calendar_edit_delete', 'Continue');
            }            
          }).catch(e => {

          })          
        }        
      }      
    }
  }

  const onCalendarEditDeleteModalClosed = ({type , value}) => {       
    if(type == Constants.actionType.ACTION_DONE){
      if(Platform.OS == 'android'){
        onTabChanged(tabIndex);
      }else{
        setTimeout(() => {
          onTabChanged(tabIndex);
        }, 500)
      }
    }
  }

  const openSpecificInfo = (location, openModal) => {
    navigation.navigate('DeeplinkLocationSpecificInfoScreen', {              
      page: 'checkin',
      openModal:openModal,
      data: location
    });
  }

  const openFormQuestion = (location) => {
    if(location != null && location != undefined){     
      navigation.navigate('DeeplinkRepForms', {
        locationInfo: location,
      });
    }
  }

  return (
    <SafeAreaView>

      <View style={styles.container}>

        <Notification />

        <AlertDialog 
          visible={isConfirmModal}
          message={message}
          buttonText={buttonText}
          onModalClose={ async () => {
            console.log("modal type", confirmModalType)         
            setIsConfirmModal(false); 
            const location = await getJsonData('@checkin_location');
            if(confirmModalType == 'compulsoryDevice'){
              openSpecificInfo(location , 'devices');
            }else if(confirmModalType == 'compulsoryLocationField'){
              openSpecificInfo(location , 'cusotmer_contact');              
            }else if(confirmModalType === 'compulsoryForm'){              
              openFormQuestion(location);
            }else if(confirmModalType === 'no_have_complsory') {
              openSpecificInfo(location , '');              
            }else {
              onRefresh(true)
            }

          }}
        />

        <ConfirmDialog 
            ref={confirmDialogRef}
            buttonTextStyle={{color:whiteLabel().mainText}}
            buttonText2Style={{color:whiteLabel().mainText}}
            onBack={() => {
              confirmDialogRef.current.hideModal();
            }}
            onDone={() => {
              confirmDialogRef.current.hideModal();
              onOptimize();
            }}
        />
        
        <LoadingBar
          ref={loadingBarRef}
        />

        <CalendarEditDeleteModal
          title="Edit schedule item"
          location={location}
          closableWithOutsideTouch
          ref={calendarEditDeleteModalRef}
          clearText='Close'
          onButtonAction={onCalendarEditDeleteModalClosed}
        />
        

        <View style={[styles.tabContainer, boxShadow]}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {              
              onTabChanged(1);
            }}>
            <Text
              style={[
                styles.tabText,
                tabIndex === 1 ? styles.tabActiveText : {},
              ]}>
              Last Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              onTabChanged(2);
            }}>
            <Text
              style={[
                styles.tabText,
                tabIndex === 2 ? styles.tabActiveText : {},
              ]}>
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              onTabChanged(3);
            }}>
            <Text
              style={[
                styles.tabText,
                tabIndex === 3 ? styles.tabActiveText : {},
              ]}>
              Week Ahead
            </Text>
          </TouchableOpacity>
        </View>

       
        <View style={{flex: 1}}>
          {(tabIndex == 1 || tabIndex == 3) && (
            <SectionList
              keyExtractor={(item, index) => index.toString()}
              sections={tabIndex == 1 ? lastWeekList : weekAheadList}
              renderItem={({item, index}) => {
                return renderCalendarItem(item, index, tabIndex);
              }}
              refreshing={isLoading}
              renderSectionHeader={({section}) => {                
                return (
                  <Text
                    style={[
                      styles.itemTitle,
                      {textDecorationLine: 'underline', fontWeight: '700'},
                    ]}>
                    {moment(section.title).format('dddd DD MMM YYYY')}
                  </Text>
                );
              }}
              renderSectionFooter={(data) => {                
                var height = 0;
                if(data?.section?.index == lastWeekList?.length - 1 && tabIndex == 1 || data?.section?.index == weekAheadList?.length - 1 && tabIndex == 3){
                  height = 80;
                }
                return <View style={{height: height }} ></View>
              }}
            />
          )}

          {tabIndex == 2 && todayList != undefined && todayList.length > 0 &&  (
            <GestureHandlerRootView>
              <DraggableFlatList
                data={todayList}
                onDragEnd={({data}) => {
                  if(data != undefined && data !=  null && data.length > 0){
                    var tmp = [];
                    var newlists = [];
                    data.forEach((item, index) => {
                      item.schedule_order = (index + 1).toString();
                      newlists.push(item);
                      tmp.push({
                        schedule_order: (index + 1).toString(),
                        location_id: item.location_id,
                        schedule_id: item.schedule_id,
                        schedule_date: item.schedule_date,
                        schedule_time: item.schedule_time,
                      });
                    });
                    setTodayList(newlists);
                    updateTodayLocationLists(tmp);
                  }                  
                }}
                //refreshing={isLoading}
                keyExtractor={item => item?.schedule_id}
                renderItem={renderTodayItem}
              />
            </GestureHandlerRootView>
          )}
    
        </View>

      </View>
      
      <OptimizePlusButtonContainer
        navigation={navigation}
        isOptimize={isOptimize}
        isAdd={isAdd}
        tabIndex={tabIndex}
        onOptimize={onOptimize}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: '100%',
    backgroundColor: Colors.bgColor,
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
  tabText: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 15,
    color: Colors.disabledColor,
  },
  tabActiveText: {
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.secondaryBold,
    borderBottomColor: whiteLabel().activeTabUnderline,
    borderBottomWidth: 2,
    paddingBottom: 2,
  },    
  itemTitle: {
    fontSize: 14,
    fontFamily: Fonts.secondaryMedium,
    color: whiteLabel().mainText,
  },
});
