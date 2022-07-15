import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MarkerIcon from '../../../components/Marker';

const MarkerIconView = props => {
  const {isSelected, item, mapPinSvg} = props;
  if (isSelected) {
    return <MarkerIcon icon={'Selected_Marker'} width="34px" height="34px" />;
  }
  let foundPinSvg = null;
  foundPinSvg = mapPinSvg.find(
    element => parseInt(element.pin_id) == parseInt(item.pin_id),
  );
  if (foundPinSvg && foundPinSvg.svg_code) {
    return (
      <SvgXml
        xml={
          mapPinSvg.find(
            element => parseInt(element.pin_id) == parseInt(item.pin_id),
          ).svg_code
        }
        width="34px"
        height="34px"
      />
    );
  }
  return <View />;
};

export default MarkerIconView;
