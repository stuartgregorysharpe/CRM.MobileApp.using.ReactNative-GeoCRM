import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , {useState , useEffect} from 'react'
import SvgIcon from '../../../../components/SvgIcon'
import { AppText } from '../../../../components/common/AppText'
import Colors , { whiteLabel } from '../../../../constants/Colors'
import { getJsonData } from '../../../../constants/Storage'


const SettingView = (props) => {    

    const { selectedLocation } = props;
    

    return (
        
            <View style={{flexDirection:'row' , marginHorizontal:10, marginBottom:10}}>

                <TouchableOpacity 
                    onPress={()=>{
                        if(props.openSetup){
                            props.openSetup();
                        }
                    }}
                    style={styles.titleContainer}>
                    <View style={{flexDirection:'column', flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <SvgIcon 
                                icon="Person_Sharp_White"
                                width="12px"
                                height="12px"
                            />
                            <AppText title="Customer Name" color={Colors.whiteColor} style={{marginLeft:5}} type="secondaryRegular"/> 
                        </View>

                        <AppText title={selectedLocation} color={Colors.whiteColor} size="medium" style={{marginTop:0}} type="secondaryMedium"/>
                    </View>
                    <SvgIcon icon="Setting" width="20" height="20" />
                </TouchableOpacity>
         
                <TouchableOpacity 
                    onPress={() => {
                        if(props.openReorder){
                            props.openReorder()
                        }
                    }}
                    >
                    <SvgIcon icon="Repeat" width="42" height="42" />
                </TouchableOpacity>
            </View>
        
    )
}

export default SettingView

const styles = StyleSheet.create({
    titleContainer: {
        flex:1,
        height:42,
        backgroundColor: whiteLabel().headerBackground, 
        marginRight:10, 
        borderRadius:5, 
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        //justifyContent:'center', 
        //alignContent:'center',
        alignItems:'center',        
        paddingRight:10
    }
})