import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';
import SvgIcon from '../../../../../components/SvgIcon';

const LocationDetailsView = (props) => {

    const { locationInfo } = props;

    return (
        <View>      
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.subtitleBox}>
                        <SvgIcon
                            style={styles.headerIcon}
                            icon="Person_Sharp_White"
                            width="14px"
                            height="14px"
                        />
                        <Text style={styles.subtitle}>
                            {locationInfo.location_name != undefined &&
                            locationInfo.location_name.custom_field_name != undefined
                            ? locationInfo.location_name.custom_field_name 
                            : ''}
                        </Text>                        
                    </View>
                
                </View>

                <View style={styles.dateContainer}>                    
                    <SvgIcon
                        style={styles.headerIcon}
                        icon="Insert_Invitation"
                        width="16px"
                        height="16px"
                    />
                    <Text style={styles.subtitle}>
                        Last Interaction: {locationInfo.last_interaction}
                    </Text>
                </View>                
            </View>

            <Text style={styles.title}>
                {locationInfo.location_name != undefined
                    ? locationInfo.location_name.value 
                    : ''}
            </Text>

            <View style={styles.addressContainer}>
                <View style={styles.subtitleBox}>
                    <SvgIcon
                        style={styles.headerIcon}
                        icon="Location_Arrow_White"
                        width="14px"
                        height="14px"
                    />
                    <Text style={styles.subtitle}>Address:</Text>
                </View>
                <Text style={styles.title}>{locationInfo.address}</Text>
            </View>

        </View>
    )
}

export default LocationDetailsView

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer :{
        flex:1
    },
    dateContainer : {
        flexDirection:'row'
    },
    subtitleBox: {
        flexDirection: 'row',        
        marginBottom: 8,
        marginRight: 8,
    },
    addressContainer : {
        marginTop:8,
        marginBottom:8
    },    
    
    subtitle: {
        fontSize: 12,
        color: whiteLabel().headerText,
        textAlign: 'left',
        fontFamily: Fonts.secondaryMedium,
    },
    headerIcon: {
        marginRight: 8,
    },
    title: {
        fontSize: 14,
        color: whiteLabel().headerText,
        fontFamily: Fonts.secondaryBold,      
    },

})