
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormsScreen from './FormsScreen';
import { FormQuestions } from './questions/FormQuestions';
const Stack = createNativeStackNavigator();

export default function FormsNavigator(props) {

  const screenProps = props.screenProps;
  return (
    <Stack.Navigator> 
      <Stack.Screen        
        name="Root"        
        options={{ header: () => null , headerShown: false}}>      
          {props => <FormsScreen {...props} screenProps={screenProps} />}
      </Stack.Screen>
            
      <Stack.Screen
        name="FormQuestions"        
        options={{ header: () => null }}       
      >
        {props => <FormQuestions {...props} screenProps={screenProps} />}
      </Stack.Screen>
                        
    </Stack.Navigator>
  );
}