

import { View, Text ,StyleSheet ,TouchableOpacity } from 'react-native'
import React , { useState , useEffect } from 'react'
import ScrollTab from '../../../components/common/ScrollTab'
import { style } from '../../../constants/Styles'
import MainPage from './Main/MainPage'
import Actions from './Actions/Actions'
import { useSelector } from 'react-redux'

export default function HomeScreen(props) {
  
  const [tabIndex, setTabIndex] = useState("Main");    
  const [tabs, setTabs] = useState([{name:"Main" , id: 0}]);
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const basicTabs = [{slug: 'actions_items', name:'Actions'} , {slug: 'leaderboard', name:'Leaderboard'} , {slug: 'sales', name:'Sales'}];
  
  useEffect(() =>{
      var tmp = [...tabs];
      basicTabs.forEach((element) => {
        if(features.includes(element.slug)){
          tmp = [...tmp, {name: element.name , id: tmp.length + 1 }];
        }
      });
      setTabs(tmp);            
  }, []);


  useEffect(() => {
    var screenProps = props.screenProps;    
    if(screenProps === undefined){
      screenProps = props.navigation;
    }
    if (screenProps) {
      screenProps.setOptions({        
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={
              () => {}}>
            <View style={style.headerTitleContainerStyle}>                
              <Text style={style.headerTitle} >Home</Text>
            </View></TouchableOpacity>)
        }
      });      
    }
  });

  return (
    <View style={{flex:1,  marginTop:10}}>        
        <View style={{marginHorizontal:10}}>
          <ScrollTab tabs={tabs} onTabSelection={(item) => { setTabIndex(item.name)}} ></ScrollTab> 
        </View>
        {
          tabIndex === "Main" &&
          <MainPage></MainPage>
        }
        {
          tabIndex === "Actions" &&
          <Actions></Actions>
        }                                                                            
    </View>
  )
}
