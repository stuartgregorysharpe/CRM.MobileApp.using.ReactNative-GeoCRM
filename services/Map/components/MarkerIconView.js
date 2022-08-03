import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import MarkerIcon from '../../../components/Marker';

const MarkerIconView = props => {
  const {isSelected, item} = props;
  if (isSelected) {
    return <MarkerIcon icon={'Selected_Marker'} width="34px" height="34px" />;
  }

  if (item.pinIcon) {
    return <SvgXml xml={item.pinIcon.svg_code} width="34px" height="34px" />;
  }
  return <View />;
};

export default MarkerIconView;
