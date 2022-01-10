import React from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Title, Button } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useDispatch } from 'react-redux';

import Divider from './Divider';
import FilterButton from './FilterButton';
import { PRIMARY_COLOR, TEXT_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';
import { SLIDE_STATUS } from '../actions/actionTypes';
import Fonts from '../constants/Fonts';

export default function RefreshSlider() {
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.refreshSliderContainer}>
    <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
      <Divider />
    </TouchableOpacity>
    <View style={styles.sliderHeader}>
      <Title style={{ fontFamily: Fonts.primaryBold }}>Re-loop</Title>
      <Button 
      labelStyle={{
        fontFamily: Fonts.primaryRegular, 
        letterSpacing: 0.2
      }}
      color="#DC143C" 
      uppercase={false} 
      onPress={() => setSelectFilters(emptyArray)}
      >
        Close
      </Button>
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
