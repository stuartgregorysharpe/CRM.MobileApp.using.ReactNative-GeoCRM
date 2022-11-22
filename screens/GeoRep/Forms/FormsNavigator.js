
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormsScreen } from './FormsScreen';
import { FormQuestions } from './questions/FormQuestions';
const Stack = createNativeStackNavigator();

export default function FormsNavigator(props) { 

  var screenProps = props.screenProps;
  var navigationType = 'bottom';
  if(screenProps === undefined){
    screenProps = props.navigation;
    navigationType = 'slide';
  }

  return (
    <Stack.Navigator> 

      <Stack.Screen        
        name="Root"        
        options={{ header: () => null , headerShown: false}}>      
          {props => <FormsScreen {...props}  navigationType={navigationType} screenProps={screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="FormQuestions"
        options={{ header: () => null ,  headerShown: false}}       
      >
        {props => <FormQuestions {...props} navigationType={navigationType} screenProps={screenProps} />}
      </Stack.Screen>

    </Stack.Navigator>
  );
}