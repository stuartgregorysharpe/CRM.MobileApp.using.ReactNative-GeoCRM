import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import QuizStepsContainer from './containers/QuizStepsContainer.js';
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';
import { useNavigation } from '@react-navigation/native';

const QuizStepsScreen = ({ route, screenProps }) => {

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
              <Text style={style.headerTitle}>Quiz</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
  });
console.log(route.params.course_id, route.params.quiz_id, "asdfasdf")
// on the development 7.17 quiz_id is not 1 so, I will decided static 1 that is not 3636346346
  return (
    <SafeAreaView>
      {/* <QuizStepsContainer quiz_id={route.params.quiz_id}/> */}
      <QuizStepsContainer quiz_id={1} course_id = {route.params.course_id}/>

    </SafeAreaView>
  );
}

export default QuizStepsScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 15,
    height: 20,
    marginRight: 5
  }
});