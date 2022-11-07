import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect , useRef} from 'react';
import ScrollTab from '../../../components/common/ScrollTab';
import {style} from '../../../constants/Styles';
import {MainPage} from './Main/MainPage';
import {useSelector} from 'react-redux';
import ActionItemsContainer from '../CRM/action_items/containers/ActionItemsContainer';
import { generateTabs } from './helper';
import { getSpeed } from '../../../services/DownloadService/TrackNetSpeed';
import BackgroundTimer from 'react-native-background-timer';
import { CHANGE_OFFLINE_STATUS } from '../../../actions/actionTypes';
import { useDispatch } from 'react-redux';
import { getLocalData, storeLocalValue } from '../../../constants/Storage';
import { showNotification } from '../../../actions/notification.action';
import { Strings } from '../../../constants';
import { getTime } from '../../../helpers/formatHelpers';

export default function HomeScreen(props) {

  const { route, navigation } = props;
  const [tabIndex, setTabIndex] = useState('Main');
  const [tabs, setTabs] = useState([]);    
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const speed_test = useSelector(state => state.selection.payload.user_scopes.geo_rep.speed_test);
  const mainPageRef = useRef(null)
  const dispatch = useDispatch()
  const offlineStatus = useSelector(state => state.auth.offlineStatus);

  console.log(JSON.stringify(speed_test))
  
  useEffect(() => {  
    setTabs(generateTabs(features));       
    
    BackgroundTimer.runBackgroundTimer( async() => {      

      if(speed_test.enabled === "1"){
        var manual = await getLocalData("@manual_online_offline");        
        if(manual != "1"){
          getSpeed("",{}).then( async(res) => {        
            //features
            console.log("SPEED:  " , res , offlineStatus)
            var isOnline = await getLocalData("@online");
            if(parseInt(speed_test.minimum_speed_required) + 1 >= res && isOnline === "1" ){ // offline
              dispatch({type: CHANGE_OFFLINE_STATUS , payload: true });
              await storeLocalValue("@online", "0");  
              var time = getTime();
              dispatch(showNotification({type: Strings.Success, title:time, message: Strings.Offline_Mode_Message , buttonText: Strings.Ok }));
            }else if( isOnline === "0") { // online 
              
              if(manual === "0" && isOnline === "0"){
                dispatch({type: CHANGE_OFFLINE_STATUS , payload: false });
                await storeLocalValue("@online", "1")
                dispatch(showNotification({type: Strings.Success, message: Strings.Online_Mode_Message , buttonText: Strings.Ok }));
              }            
            }
          });   
        }
           
      }      
    }, 20 * 1000); //parseInt(speed_test.frequency)
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    }

  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("focus")
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
      syncFun(); 
  });

  const syncFun = async () => {
    if(route.params != undefined){
      const { sync } = route.params;
      if(sync){ // start sync when online
          if(mainPageRef.current){
            
            var isOnline = await getLocalData("@online");
            console.log("onlineSyncTable" , isOnline);
            if(isOnline === "1"){
              mainPageRef.current.onlineSyncTable();              
            }          
          }else{
            console.log("onlineSyncTable no");
          }
      }
    }
  }

  return (
    <View style={{flex: 1, marginTop: 10}}>

      <View style={{marginHorizontal: 10}}>
        <ScrollTab
          tabs={tabs}
          onTabSelection={item => {
			        setTabIndex(item.name);                    
          }}></ScrollTab>
      </View>
      
      {tabIndex === 'Main' && <MainPage {...props} ref={mainPageRef} > </MainPage>}
      {tabIndex === 'Actions' && <ActionItemsContainer />}

    </View>
  );
}

