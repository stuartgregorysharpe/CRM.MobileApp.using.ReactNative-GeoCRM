import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LearningContainer from './containers/LearningContainer';
import { style } from '../../../constants/Styles';

export default function Learning({ screenProps }) {

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => (
          <TouchableOpacity>
            <View style={style.headerTitleContainerStyle}>
              <Text style={style.headerTitle}>Learning</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
  });

  return (
    <SafeAreaView>
      <LearningContainer />
    </SafeAreaView>
  );
}

