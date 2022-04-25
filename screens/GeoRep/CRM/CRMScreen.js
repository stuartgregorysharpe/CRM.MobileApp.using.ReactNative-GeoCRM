import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from './LocationScreen';
import LocationSpecificInfoScreen from './checkin/LocationSpecificInfoScreen';
import LocationSearchScreen from './LocationSearchScreen';
import ActivityComments from './activity_comments/ActivityComments';
const Stack = createNativeStackNavigator();

export default function CRMScreen(props) {

  var screenProps = props.screenProps;
  if(screenProps === undefined){
    screenProps = props.navigation;
  }

  return (
    <Stack.Navigator> 
      
      <Stack.Screen        
        name="Root"    
        options={{ header: () => null , headerShown: false}}>      
          {props => <LocationScreen {...props} screenProps={screenProps} />}
      </Stack.Screen>
      
      <Stack.Screen
        name="LocationSearch"
        //initialParams={{location_id: ...props.route.params }}
        // component={LocationSearchScreen}
        options={{ header: () => null }}
      >
        {props => <LocationSearchScreen {...props} screenProps={screenProps} />}
      </Stack.Screen>
            
      <Stack.Screen
        name="LocationSpecificInfo"        
        options={{ header: () => null , headerShown: false}}>
          {props => <LocationSpecificInfoScreen {...props} screenProps={screenProps}  />}
      </Stack.Screen>
      
      {/* <Stack.Screen
        name="Root"        
        options={{ header: () => null , headerShown: false}}>
          {props => <ActivityComments {...props} screenProps={screenProps} location_id = {'1367'}  />}
      </Stack.Screen> */}
   
      
      
    </Stack.Navigator>
  );
}