import React, { Fragment, useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Skeleton from '../../../../components/Skeleton';
import {parse} from 'react-native-extended-stylesheet-breakpoints';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import DeviceInfo from 'react-native-device-info';
import SvgIcon from '../../../../components/SvgIcon';

export function MarkerView({isRequest}) {

  const statusPinKeys = useSelector(state => state.location.statusPinKeys);
  const pins = useSelector(state => state.location.locationPins);
  const [markerIcons, setMarkerIcons] = useState([]);

  useEffect(() => {
    let items = [];
    pins.map((pin, key) => {
      items.push({
        text: pin.label,
        icon: pin.pin_image.split('/')[pin.pin_image.split('/').length - 1],
        code:pin.svg_code
      });
    });    
    setMarkerIcons(items);
  }, [pins]);


  if (statusPinKeys == 'request' || isRequest) {
    return (
      <SafeAreaView>
        <View style={{padding: 10, justifyContent: 'center'}}>
          {Array.from(Array(6)).map((_, key) => (
            <Skeleton key={key} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Fragment>
      <View style={styles.markerContent}>
        {markerIcons.map((markerIcon, key) => (
          <View style={styles.markerBox} key={key}>            
            <SvgIcon  width="28" height="28" xml={ markerIcon.code} />            
            <Text style={styles.markerText}>{markerIcon.text}</Text>
          </View>
        ))}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create(
  parse({
    markerContent: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    markerBox: {
      width: DeviceInfo.isTablet() ? '35%' : '45%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },    
    markerText: {
      fontSize: 12,
      color: Colors.textColor,
      fontFamily: Fonts.secondaryMedium,
    },
  }),
);
