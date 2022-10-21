import React, { } from 'react';
import {  Text, View, StyleSheet ,TouchableOpacity} from 'react-native';
import Colors, { whiteLabel } from '../../../../../../constants/Colors';
import Fonts from '../../../../../../constants/Fonts';
import { AppText } from '../../../../../../components/common/AppText';
import { Strings } from '../../../../../../constants';
import SvgIcon from '../../../../../../components/SvgIcon';

export const FormSubmissionListItem = ({ item, isStart, isEnd , onItemPress , index}) =>{

    return (
        <View style={[styles.container]} key={index}> 
        
            <TouchableOpacity style={{flexDirection:'row', flex:1 , alignItems:'center'}} onPress={() => {
                onItemPress(item);
            }}>     

                <View style={{flexDirection:'column', flex:1}}>

                    <View style={{ flex: 1, flexDirection:'row', alignItems:'flex-start', paddingTop:3, paddingBottom:3, }}>
                        <View style={{flexDirection:'row' , flex:1}}>
                            <AppText 
                                style={{textDecorationLine: 'underline'}}
                                size="medium"
                                type="secondaryBold" title={item.form_name} color={whiteLabel().mainText}></AppText>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <AppText 
                                style={{fontSize:13}}
                                type="secondaryRegular" title={item.date} color={whiteLabel().mainText}></AppText>                    
                        </View>                
                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}} >  
                            <AppText size="small"  type="secondaryMedium" title={Strings.CRM.Submisison_ID + item.submission_id} color={whiteLabel().subText}></AppText>
                        </View>
                        <View >                    
                            <AppText size="small"  type="secondaryMedium" title={item.user} color={whiteLabel().subText}></AppText>
                        </View>
                    </View>
                </View>
                
                <SvgIcon
                    icon={"Signature_Btn_Right_Arrow"}
                    width="20px"
                    height="20px"
                    style={{marginLeft:10}}
                  />

            </TouchableOpacity> 
                                                                        
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position: 'relative',
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row'
    },       
});