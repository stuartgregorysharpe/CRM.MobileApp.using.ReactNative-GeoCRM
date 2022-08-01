
import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import { Fonts } from '../../../../constants';

export default function PinKeySlideUp() {
  return (
    <View style={styles.slidUpArrow}>
        <Text style={styles.slidUpArrowText}>Pin Key</Text>
        <FontAwesomeIcon
            size={12}
            icon={faChevronUp}
            color={whiteLabel().mainText}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    slidUpArrow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: whiteLabel().actionFullButtonBackground,
        backgroundColor: Colors.whiteColor,
        borderRadius: 6,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2
      },
      slidUpArrowText: {
        color: whiteLabel().mainText,
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium,
        marginRight: 8,
      }
})