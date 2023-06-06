import {View, Text, TouchableOpacity, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LearningGradientView from './components/LearningGradientView';
import { AppText } from "../../../components/common/AppText";
import { whiteLabel } from '../../../constants/Colors';  
import SvgIcon from '../../../components/SvgIcon';
import CourseCardItemView from './components/CourseCardItemView';
import LearningContainer from './containers/LearningContainer';
const Learning = ({screenProps}) =>{
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Learning"
      });
    }
  });
  return (
    <SafeAreaView>
      <LearningContainer/>
    </SafeAreaView>
  );
}

export default Learning;