import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { grayBackground } from '../../../constants/Styles';
import RefreshSlider from '../../../components/RefreshSlider';
import SvgIcon from '../../../components/SvgIcon';
import LocationInfoInput from './LocationInfoInput';
import FilterButton from '../../../components/FilterButton';
import Divider from '../../../components/Divider';
import Skeleton from '../../../components/Skeleton';
import { PRIMARY_COLOR, BG_COLOR } from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import { BACK_ICON_STATUS, SLIDE_STATUS, LOCATION_CONFIRM_MODAL_VISIBLE, CHANGE_LOCATION_ACTIONS, SUB_SLIDE_STATUS } from '../../../actions/actionTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import Images from '../../../constants/Images';

export default function LocationInfo({navigation, screenProps}) {

  const dispatch = useDispatch();
  const statusLocationInfo = useSelector(state => state.location.statusLocationInfo);
  const locationInfo = useSelector(state => state.location.locationInfo);
  const statusDispositionInfo = useSelector(state => state.rep.statusDispositionInfo);
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);  
  const subSlideStatus = useSelector(state => state.rep.subSlideStatus);
  const [showItem, setShowItem] = useState(0);
  console.log("view location info", locationInfo);

  const [statusSubmit, setStatusSubmit] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    dispatch({type: SUB_SLIDE_STATUS, payload: false});
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showLoopSlider = () => {
    setShowItem(1);
    dispatch({type: SUB_SLIDE_STATUS, payload: true});
  }

  if (statusLocationInfo == "request" || !locationInfo) {
    return (
      <View style={[styles.container, {padding: 10, justifyContent: 'center', height: '100%'}]}>
        {Array.from(Array(6)).map((_, key) => (
          <Skeleton key={key} />  
        ))}
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {subSlideStatus && <TouchableOpacity
        activeOpacity={1} 
        style={grayBackground}
        onPress={() => dispatch({type: SUB_SLIDE_STATUS, payload: false})}
      ></TouchableOpacity>}
      {subSlideStatus && <View
        style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
      >
        <RefreshSlider />
      </View>}
      <TouchableOpacity style={{ padding: 6 }} onPress={() => {
        if (statusDispositionInfo) {
          dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
          return;
        }
        dispatch({type: SLIDE_STATUS, payload: false});
        dispatch({type: BACK_ICON_STATUS, payload: false})        
      }}>
        <Divider />
      </TouchableOpacity>
      

      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraHeight={130} extraScrollHeight={130}
        behavior="padding" style={[styles.innerContainer, keyboardStatus ? {} : {marginBottom: (features && (features.includes("access_crm") || features.includes("checkin"))) ? 50 : 0}]}>
        <View style={styles.headerBox}>
          <View>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.fontIcon} icon="Person_Sharp" width='16px' height='16px' />
              {/* <Text style={styles.subtitle}>{locationInfo ? locationInfo.location_name.custom_field_name : ''}</Text> */}
            </View>
            <Text style={styles.title}>{ locationInfo &&  locationInfo.location_name ? locationInfo.location_name.value : ''}</Text>
          </View>
          <View style={styles.subtitleBox}>
            <SvgIcon style={styles.fontIcon} icon="Green_Star" width='22px' height='22px' />
            <Text style={styles.dateText}>Visited Recently: {locationInfo? locationInfo.last_visit: ''}</Text>
          </View>
        </View>
        <View style={styles.headerBox}>
          <View style={styles.addressText}>
            <View style={styles.subtitleBox}>
              <SvgIcon style={styles.fontIcon} icon="Location_Arrow" width='16px' height='16px' />
              <Text style={styles.subtitle}>Address</Text>
            </View>
            <Text style={styles.title}>{locationInfo ? locationInfo.address : ''}</Text>
          </View>
          <View style={styles.walmartImageBox}>
            <Image style={styles.walmartImage} source={Images.walmart} />
          </View>
        </View>    

        {
          locationInfo ? <LocationInfoInput navigation={navigation} screenProps={screenProps} statusSubmit={statusSubmit} showLoopSlider={showLoopSlider} /> : <View></View>
        }                        
        <View style={{ height: 20 }}></View>  

      </KeyboardAwareScrollView>

      <View style={{ height: 20 }}></View>

      {features && (features.includes("access_crm") || features.includes("checkin")) && !keyboardStatus && <View style={styles.nextButtonBar}>
        {features && features.includes("access_crm") && <TouchableOpacity style={[styles.nextButton, styles.accessButton]} onPress={() => {
          if (statusDispositionInfo) {
            dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
            dispatch({type: CHANGE_LOCATION_ACTION, payload: "LocationSpecificInfo"});
            return;
          }
          navigation.navigate("LocationSpecificInfo");
        }}>
          <Text style={styles.nextButtonText}>Access CRM</Text>
          <FontAwesomeIcon size={22} color={PRIMARY_COLOR} icon={ faAngleDoubleRight } />
        </TouchableOpacity>}
        {features && features.includes("checkin") && <TouchableOpacity style={[styles.nextButton, styles.checkInButton]} onPress={() => {
          if (statusDispositionInfo) {
            dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: true});
            dispatch({type: CHANGE_LOCATION_ACTION, payload: "LocationSpecificInfo"});
            return;
          }
          navigation.navigate("LocationSpecificInfo");
        }}>
          <Text style={[styles.checkInButtonText]}>Check In</Text>
          <FontAwesomeIcon size={22} color="#fff" icon={ faAngleDoubleRight } />
        </TouchableOpacity>}
      </View>}
      <TouchableOpacity style={styles.plusButton} onPress={() => setStatusSubmit(!statusSubmit)}>
        <SvgIcon icon="DISPOSITION_POST" width='70px' height='70px' />
      </TouchableOpacity>      
    </View>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);
const getHeight = () =>{
  if(Platform.OS == 'ios') {
    return Dimensions.get("window").height - 150;
  }else{
    if(DeviceInfo.isTablet()){
      return Dimensions.get("window").height - 110; 
    }else{
      return Dimensions.get("window").height - 90;
    }
  }
}

const styles = EStyleSheet.create(parse({
  container: {  
    height: getHeight(),
    backgroundColor: BG_COLOR,
    margin: -10
  },
  innerContainer: {
    backgroundColor: BG_COLOR,
    padding: 10,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },

  subtitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: PRIMARY_COLOR,
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium',
  },
  dateText: {
    color: '#0AD10A',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Gilroy-Bold',
    lineHeight: 20
  },
  addressText: {
    maxWidth: 175,
  },
  walmartImageBox: {
    flexGrow: 1,
    alignItems: perWidth('flex-end', 'center')
  },
  walmartImage: {
    width: perWidth(140, 90),
    height: perWidth(140, 90),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7
  },
  nextButtonBar: {
    position: 'absolute',
    bottom: DeviceInfo.isTablet() ? 0 : 0,
    left: -10,
    right: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,    
    paddingRight: 20,    
    paddingTop:10,
    paddingBottom:DeviceInfo.isTablet() ? 0 : 10,    
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderTopWidth: 0.5,
    //zIndex: 1,
  },
  nextButton: {
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
  },
  nextButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  fontIcon: {
    marginRight: 4
  },
  checkInButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
  transitionView: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
}));
