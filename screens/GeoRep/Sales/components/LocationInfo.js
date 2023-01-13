import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { whiteLabel } from '../../../../constants/Colors'
import SvgIcon from '../../../../components/SvgIcon'
import { AppText } from '../../../../components/common/AppText'

const LocationInfo = (props) => {

    const { location } = props;
    return (
        <View style={[styles.container , props.style]}>
            <View>
                <View style={{flexDirection:'row'}}>
                    <SvgIcon
                        style={styles.headerIcon}
                        icon="Person_Sharp_White"
                        width="14px"
                        height="14px"
                        />                  
                    <AppText title="Customer Name" color={'white'} style={{marginLeft:5}} type="secondaryRegular" ></AppText>
                </View>
                <AppText title={location.name} color={'white'}  type="secondaryBold" style={{marginTop:5}} ></AppText>
            </View>

            <View style={{flex:1, marginLeft:10}}>

                <View style={{flexDirection:'row'}}>
                    <SvgIcon
                        style={styles.headerIcon}
                        icon="Location_Arrow_White"
                        width="14px"
                        height="14px"
                        />                  
                    <AppText title="Address" color={'white'} style={{marginLeft:5}} type="secondaryRegular" ></AppText>
                </View>
                
                <AppText title={location.address} color={'white'}  type="secondaryBold" style={{marginTop:5}} ></AppText>

                <TouchableOpacity style={{position:'absolute', right:0}}
                    onPress={() => {
                        if(props.onClose)
                            props.onClose();
                    }}
                >
                <SvgIcon
                    icon="Close"
                    width="20"
                    height="20"
                    />
                </TouchableOpacity>
                

            </View>

        </View>
    )
    
}

export default LocationInfo

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteLabel().headerBackground,
        borderRadius:3,
        flexDirection:'row',
        padding:7,
        marginBottom:10
    }
})