import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import LessonStepsContainer from './containers/LessonStepsContainer';
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';
import { useNavigation } from '@react-navigation/native';

const LessonStepsScreen = ({ route, screenProps }) => {

  const navigation = useNavigation();

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => (
          <TouchableOpacity onPress={() => {
            screenProps.navigate('CourseDashboard', {
                "course_id": route.params.course_id
              });
          }}>
            <View style={style.headerTitleContainerStyle}>
              <Image
                resizeMethod="resize"
                style={styles.imageStyle}
                source={Images.backIcon}
              />
              <Text style={style.headerTitle}>Lessons</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
  });

  return (
    <SafeAreaView>
      <LessonStepsContainer course_id={route.params.course_id}/>
      
    </SafeAreaView>
  );
}

export default LessonStepsScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 15,
    height: 20,
    marginRight: 5
  }
});