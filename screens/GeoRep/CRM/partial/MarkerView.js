
import React, { Fragment , useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {SafeAreaView , Text, View ,StyleSheet, TouchableOpacity } from 'react-native';
import MarkerIcon from '../../../../components/Marker';
import Skeleton from '../../../../components/Skeleton';
import Divider from '../../../../components/Divider';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { breakPoint } from '../../../../constants/Breakpoint';
import { TEXT_COLOR } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export function MarkerView( {isRequest} ) {

    const dispatch = useDispatch();
    const statusPinKeys = useSelector(state => state.location.statusPinKeys);
    const pins = useSelector(state => state.location.locationPins);
    const [markerIcons, setMarkerIcons] = useState([]);
  
    useEffect(() => {
      let items = [];
      pins.map((pin, key) => {
        items.push({
          text: pin.label,
          icon: pin.pin_image.split('/')[pin.pin_image.split('/').length - 1]
        })
      })
      setMarkerIcons(items);     
    }, [pins])
  
    if (statusPinKeys == "request" || isRequest ) {
      
      return (
        <SafeAreaView>
          <View style={{padding: 10, justifyContent: 'center'}}>
            {Array.from(Array(6)).map((_, key) => (
              <Skeleton key={key} />  
            ))}
          </View>
        </SafeAreaView>
      )
    }
  
    return (
      <Fragment>
        <TouchableOpacity style={{ padding: 6 }} onPress={() => dispatch({type: SLIDE_STATUS, payload: false})}>
          <Divider />
        </TouchableOpacity>
        <View style={styles.markerContent}>
          {markerIcons.map((markerIcon, key) => (
            <View style={styles.markerBox} key={key}>
              <MarkerIcon style={styles.markerIcon} icon={markerIcon.icon} width="28px" height="28px" />
              <Text style={styles.markerText}>{markerIcon.text}</Text>
            </View>
          ))}
        </View>
      </Fragment>
    )
  };

  
const perWidth = setWidthBreakpoints(breakPoint);
const styles = StyleSheet.create(parse({
    markerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },

    markerBox: {
        width: perWidth('30%', '45%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
      },
    markerIcon: {
        marginRight: 10
    },
    markerText: {
        fontSize: 12,
        color: TEXT_COLOR,
        fontFamily: Fonts.secondaryMedium
    },

}));
