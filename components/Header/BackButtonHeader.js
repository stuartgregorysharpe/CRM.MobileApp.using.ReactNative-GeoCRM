import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {Fonts, Images} from '../../constants';
import {style} from '../../constants/Styles';

const BackButtonHeader = props => {
  const {title, navigation} = props;

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        goBack();
      }}>
      <View style={style.headerTitleContainerStyle}>
        <Image
          resizeMethod="resize"
          style={{width: 15, height: 20, marginRight: 5}}
          source={Images.backIcon}
        />
        <Text
          style={{
            color: '#FFF',
            fontFamily: Fonts.primaryRegular,
            fontSize: 19,
            fontWeight: '400',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default BackButtonHeader;
