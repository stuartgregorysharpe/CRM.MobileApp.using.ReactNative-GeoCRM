import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import TermsToKnowContainer from './containers/TermsToKnowContainer.js';
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';
import { useNavigation } from '@react-navigation/native';

const TermsToKnow = ({ route, screenProps }) => {

  const navigation = useNavigation();

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => (
          <View style={{flexDirection: 'row'}}>
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
                <Text style={style.headerTitle}>Terms To Know</Text>
              </View>
            </TouchableOpacity>
          </View>
        ),
      });
    }
  });

  return (
    <SafeAreaView>
      <TermsToKnowContainer course_id={route.params.course_id} course_title={route.params.course_title} course_description={route.params.course_description} />
    </SafeAreaView>
  );
}

export default TermsToKnow;

const styles = StyleSheet.create({
  imageStyle: {
    width: 15,
    height: 20,
    marginRight: 5
  }
});