import React from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions , Text} from 'react-native';
import { Title, Button } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch } from 'react-redux';

import Divider from './Divider';
import FilterButton from './FilterButton';
import { PRIMARY_COLOR, TEXT_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';
import { SLIDE_STATUS, SUB_SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';


export default function RefreshSlider({onClose}) {
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.refreshSliderContainer}>

    <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
      <Divider />
    </TouchableOpacity>

    <View style={styles.sliderHeader}>
      <Title style={{ fontFamily: Fonts.primaryBold }}>Re-loop</Title>

      <TouchableOpacity       
        onPress={() => {
          console.log("button close");
            dispatch({type: SUB_SLIDE_STATUS, payload: false});
        }}>
        <Text style={{ color:"#DC143C" , paddingRight:20, paddingLeft:20, paddingTop:20, paddingBottom:10}}>Close</Text>
      </TouchableOpacity>      
    </View>

    <FilterButton 
      text="Later Today" 
      onPress={() => console.log("pressed")}
    />
    <FilterButton 
      text="Schedule Date" 
      onPress={() => console.log("pressed")}
    />
    </ScrollView>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 100,
    padding: 10,
    overflow: "visible" 
  },
  refreshSliderContainer: {
    backgroundColor: BG_COLOR    
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
}));
