import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { whiteLabel } from '../../../../constants/Colors';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const CalendarCheckOutButton = (props) => {

  return (
    <TouchableOpacity
		style={[
			styles.itemButton,
			{backgroundColor: Colors.selectedRedColor },
		]}
		onPress={() => {
			if(props._callCheckOut){
				props._callCheckOut();
			}
		}}>
		
		<Text style={styles.itemButtonText}>
			{' '}
			{'Check Out'}{' '}
		</Text>

		<FontAwesomeIcon
			style={styles.itemButtonIcon}
			size={16}
			color={whiteLabel().actionFullButtonIcon}
			icon={faCheckCircle}
		/>
    </TouchableOpacity>
  )
}

export default CalendarCheckOutButton

const styles = StyleSheet.create({
    itemButton: {
        position: 'relative',
        justifyContent: 'center',
        padding: 4,
        marginTop: 4,
        marginBottom: 4,
        borderRadius: 4,
      },
    itemButtonText: {
        fontSize: 14,
        fontFamily: Fonts.secondaryMedium,
        textAlign: 'center',
        color: '#fff',
    },
    itemButtonIcon: {
        position: 'absolute',
        right: 8,
    },

})