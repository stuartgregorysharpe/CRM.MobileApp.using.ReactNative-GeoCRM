import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect , useRef} from 'react';
import ScrollTab from '../../../components/common/ScrollTab';
import {style} from '../../../constants/Styles';
import {MainPage} from './Main/MainPage';
import {useSelector} from 'react-redux';
import ActionItemsContainer from '../CRM/action_items/containers/ActionItemsContainer';
import { generateTabs } from './helper';

export default function HomeScreen(props) {

  const { route, navigation } = props;
  

  const [tabIndex, setTabIndex] = useState('Main');
  const [tabs, setTabs] = useState([]);    
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const mainPageRef = useRef(null)
  
  useEffect(() => {  
    setTabs(generateTabs(features));       
    console.log("open home", props.navigation) 
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
      
      if(route.params != undefined){
        const { sync } = route.params;
        if(sync){ // start sync when online
            if(mainPageRef.current){
              console.log("onlineSyncTable");
              mainPageRef.current.onlineSyncTable();              
            }else{
              console.log("onlineSyncTable no");
            }
        }
      }
      
  });


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

