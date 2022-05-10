

import { View, Text ,StyleSheet } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../../components/SvgIcon'
import { AppText } from '../../../../../../components/common/AppText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Colors, { whiteLabel } from '../../../../../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VisitCheckinItem({item}) {

  return (
    <View>
        <View style={{height:1, backgroundColor:Colors.lightGreyColor}}></View>
        <View style={{flexDirection:'row' , marginTop:5 , alignItems:'center' ,marginBottom:5}}>
            <View style={{flex:1 , flexDirection:'row'}}>
                <SvgIcon icon="Location_Arrow" width='15px' height='15px' />
                <View style={{marginLeft:5}}>
                    <AppText title={item.location_name}></AppText>
                    <AppText title={item.time}></AppText>
                </View>
            </View>
            <TouchableOpacity >
                <View style={styles.submitButtonStyle}>
                    <AppText color={Colors.whiteColor} title="Check In"></AppText>
                    <FontAwesomeIcon style={{marginLeft:5}} size={15} color={ whiteLabel().actionFullButtonText } icon={ faAngleDoubleRight } />
                </View>
            </TouchableOpacity>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    submitButtonStyle : {
        backgroundColor:whiteLabel().actionFullButtonBackground , 
        flexDirection:'row' , alignItems:'center' , 
        paddingHorizontal:10, paddingVertical:5 , 
        borderRadius:5
    }
})