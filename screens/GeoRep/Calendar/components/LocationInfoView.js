import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../components/SvgIcon';
import { whiteLabel } from '../../../../constants/Colors';
import { AppText } from '../../../../components/common/AppText';

const LocationInfoView = (props) => {

    const { location } = props;    
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <SvgIcon icon="Person_Sharp_White" width='14px' height='14px' />
                <AppText title='Customer Name' color='white' style={{marginLeft:8}} />
            </View>

            <View style={[styles.titleContainer, {marginTop:5}]}>
                <AppText title={location?.location_name} color='white' size="medium" />
            </View>

            <View style={[styles.titleContainer , {marginTop: 8}]}>
                <SvgIcon icon="Location_Arrow_White" width='14px' height='14px' />
                <AppText title='Address' color='white' style={{marginLeft:8}} />
            </View>

            <View style={[styles.titleContainer, {marginTop:5}]}>
                <AppText title={location?.address } color='white' size="medium" />
            </View>            
            
        </View>
    )
}

export default LocationInfoView

const styles = StyleSheet.create({
    container :{
        backgroundColor : whiteLabel().actionFullButtonBackground,
        marginTop:10,
        marginHorizontal : 10,
        padding:10,
        borderRadius:5,
    },
    titleContainer : {
        marginLeft:5,
        flexDirection:'row'
    },

})