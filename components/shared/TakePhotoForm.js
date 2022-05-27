import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Colors, {whiteLabel} from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {style} from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TakePhotoView from './TakePhotoView';

export default function TakePhotoForm({item, onPress, onTouchStart}) {
  const isOptimize = item.optimize && item.optimize === '1';
  const photos = item.value;
  const onUpdatePhotos = paths => {
    onPress(paths);
  };

  return (
    <View
      style={[
        style.card,
        item.rule_compulsory === '1' ? style.compulsoryStyle : {},
        {marginHorizontal: 5, marginVertical: 3},
      ]}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingHorizontal: 5}}>
            <Text style={styles.titleStyle}> {item.question_text} </Text>
          </View>
          <View
            onTouchStart={e => {
              onTouchStart(e.nativeEvent, item.guide_info);
            }}>
            <Icon
              name={`info-outline`}
              size={25}
              color={whiteLabel().mainText}
            />
          </View>
        </View>
        <TakePhotoView
          onUpdatePhotos={onUpdatePhotos}
          isOptimize={isOptimize}
          photos={photos}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },
  titleStyle: {
    textAlign: 'center',
    paddingVertical: 5,
    color: Colors.blackColor,
    fontSize: 15,
    fontFamily: Fonts.secondaryMedium,
  },

  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginLeft: 10,
  },

  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 7,
    width: Dimensions.get('screen').width / 4.5,
    height: Dimensions.get('screen').width / 4.5,
  },

  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    top: 3,
  },
});
