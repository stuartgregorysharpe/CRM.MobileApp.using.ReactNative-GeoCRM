import React from 'react';
import { View , StyleSheet ,Image } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import { style } from '../../../../constants/Styles';
import DeviceInfo from 'react-native-device-info';
import Colors from '../../../../constants/Colors';

export default function LocationInfoPlaceHolder({locationInfo}){
    
    return (
        <View style={{paddingRight:0}}>
            <View style={styles.headerBox}>                                    
                {
                (locationInfo === undefined || locationInfo.location_name === "") &&
                <View style={{flexDirection:'row',flex:2}}>
                    <View style={[style.grey_bar, {width:12}]} ></View>
                    <View style={[style.grey_bar, {width:"30%"}]} ></View>
                    <View style={[style.grey_bar, {width:"20%"}]} ></View>
                </View>
                }
                
                {
                (locationInfo === undefined || locationInfo.last_visit === "" )&&
                <View style={{flexDirection:'row' , flex:2}}>
                    <View style={[style.grey_bar, {width:12}]} ></View>
                    <View style={[style.grey_bar, {width:"15%"}]} ></View>
                    <View style={[style.grey_bar, {width:"15%"}]} ></View>
                    <View style={[style.grey_bar, {width:12}]} ></View>
                    <View style={[style.grey_bar, {width:"15%"}]} ></View>
                    <View style={[style.grey_bar, {width:"12%",marginRight:10}]} ></View>
                </View>
                }
            </View>

            {
                (locationInfo === undefined || locationInfo.location_name === "") && 
                <View style={{flexDirection:'row'}}>
                    <View style={[style.grey_bar,{width:"20%", marginLeft:10}]}></View>
                    <View style={[style.grey_bar,{width:"20%", marginLeft:10}]}></View>
                </View>
            }

            <View style={styles.headerBox}>
                <View style={styles.addressText}>               
                {
                    (locationInfo === undefined || locationInfo.address === "") && 
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <View style={[style.grey_bar,{width:12,}]}></View>
                        <View style={[style.grey_bar,{width:"25%"}]}></View>
                    </View>
                }                                
                {
                    (locationInfo === undefined || locationInfo.address ===  "") &&
                <View>
                    <View style={{flexDirection:'row' , marginTop:10}}>
                        <View style={[style.grey_bar, {width:"20%"}]} ></View>
                        <View style={[style.grey_bar, {width:"15%"}]} ></View>
                        <View style={[style.grey_bar, {width:"20%"}]} ></View>                  
                        <View style={[style.grey_bar, {width:"15%"}]} ></View>
                    </View>
                    <View style={{flexDirection:'row' , flex:2}}>
                        <View style={[style.grey_bar, {width:"15%"}]} ></View>
                        <View style={[style.grey_bar, {width:"12%"}]} ></View>
                        <View style={[style.grey_bar, {width:"20%"}]} ></View>                  
                        <View style={[style.grey_bar, {width:"10%"}]} ></View>
                        <View style={[style.grey_bar, {width:"10%"}]} ></View>
                    </View>
                    <View style={{flexDirection:'row' , flex:2}}>                  
                        <View style={[style.grey_bar, {width:"15%"}]} ></View>
                        <View style={[style.grey_bar, {width:"20%"}]} ></View>                  
                        <View style={[style.grey_bar, {width:"20%"}]} ></View>
                    </View>
                </View>
                }            
                </View>

                <View style={styles.walmartImageBox}>          
               
                {
                    (locationInfo === undefined || locationInfo.location_image === "") &&  
                    <SvgIcon style={styles.fontIcon} icon={"Add_Image_Gray"} width={DeviceInfo.isTablet() ? '150px': '90px'} height={DeviceInfo.isTablet() ? '130px': '80px'} />                                                        
                }
                </View>
            </View> 

            
            <View style={[style.card, styles.refreshBox ]}>        
                
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={[style.grey_bar, {width:'50%' }]}></View>  
                </View>
                <View style={{flex:2, alignItems:'center'}}>
                    <View style={{padding:10, borderWidth:1, width:'80%', borderColor:Colors.skeletonColor, borderRadius:15}}>
                        <View style={[style.grey_bar, {width:'100%'}]}></View>                
                    </View>                
                </View>                
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={{padding:3, borderWidth:1, borderColor:Colors.skeletonColor, borderRadius:25}}>
                        <View style={[style.grey_bar, {height:20, width:20,marginTop:0, marginBottom:0, marginRight:0}]}></View>                
                    </View>
                </View>                
            </View>
            
            <View style={{flexDirection:'row'}}>

                <View style={[style.card, styles.refreshBox ]}>                        
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={[style.grey_bar, {width:'50%' }]}></View>  
                    </View>
                    <View style={{flex:2, alignItems:'center'}}>
                        <View style={{padding:10, borderWidth:1, width:'80%', borderColor:Colors.skeletonColor, borderRadius:15}}>
                            <View style={[style.grey_bar, {width:'100%'}]}></View>                
                        </View>                
                    </View>                
                    <View style={{flex:1, alignItems:'center'}}>
                        <View style={{padding:3, borderWidth:1, borderColor:Colors.skeletonColor, borderRadius:25}}>
                            <View style={[style.grey_bar, {height:20, width:20,marginTop:0, marginBottom:0, marginRight:0}]}></View>                
                        </View>
                    </View>                
                </View>

                <SvgIcon style={styles.fontIcon} icon={"Roop_Gray"} width={DeviceInfo.isTablet() ? '100px': '80px'}/>
                                
            </View>


            <View style={styles.textContainer}>
                <View style={[style.grey_bar, {width:'20%'}]}></View>
            </View>
            <View style={styles.textContainer}>
                <View style={[style.grey_bar, {width:'20%'}]}></View>
            </View>            
            <View style={styles.textContainer}>
                <View style={[style.grey_bar, {width:'20%'}]}></View>
                <View style={[style.grey_bar, {width:'20%'}]}></View>
            </View>
            <View style={styles.textContainer}>
                <View style={[style.grey_bar, {width:'30%'}]}></View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                </View>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'30%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    
                </View>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'30%'}]}></View>                    
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                </View>
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'10%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                </View>
                <View style={[styles.textContainer, {flex:1}]}>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                    <View style={[style.grey_bar, {width:'10%'}]}></View>
                    <View style={[style.grey_bar, {width:'20%'}]}></View>
                </View>
            </View>                                
        </View>
    )
}


const styles = StyleSheet.create({
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        paddingLeft:10,
        paddingRight:10
    },
    walmartImageBox: {    
        alignItems: 'flex-end',    
    },
    fontIcon: {
        marginRight: 0
    },
    addressText: {
        flex:1
    },
    refreshBox: {
        flex:1,        
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems: 'center',
        marginBottom: 8,
    },

    textContainer:{
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        padding:10,
        marginTop:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:Colors.skeletonColor,

    }

})