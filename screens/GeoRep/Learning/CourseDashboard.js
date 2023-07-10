import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CourseDashboardContainer from './containers/CourseDashboardContainer';
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';
import { useNavigation } from '@react-navigation/native';

const CourseDashboardScreen = ({ route, screenProps }) => {

  const navigation = useNavigation();

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => (
          <TouchableOpacity onPress={() => {
            screenProps.navigate('Learning');
          }}>
            <View style={style.headerTitleContainerStyle}>
              <Image
                resizeMethod="resize"
                style={styles.imageStyle}
                source={Images.backIcon}
              />
              <Text style={style.headerTitle}>Course Dashboard</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
  });

  return (
    <SafeAreaView>
      <CourseDashboardContainer course_id={route.params.course_id} />
    </SafeAreaView>
  );
}

export default CourseDashboardScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 15,
    height: 20,
    marginRight: 5
  }
});