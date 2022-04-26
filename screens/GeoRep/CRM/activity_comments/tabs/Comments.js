
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ScrollView, SectionList, Dimensions, Linking, BackHandler } from 'react-native';
import { getApiRequest } from '../../../../../actions/api.action';
import { AppText } from '../../../../../components/common/AppText';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../../constants/Colors';

export default function Comments(props) {

    //const location_id = props.route.params.location_id;    
    const location_id = props.location_id;
    const [historyItems, setHistoryItems] = useState([]);
    console.log("lo", location_id)

    useEffect(() => {
        
    },[]);

    const _callApiRequest = () =>{
        let param = {page: 1 , location_id: location_id};
        getApiRequest("https://dev.georep.com/local_api_old/locations/location-history" , param).then((res) => {
            setHistoryItems(res.history_items);    
            console.log(res);        
        }).catch((e) => {

        });
    }

    return (
        <View style={styles.container}>            

            <View style={{marginTop:30 , width:Dimensions.get("screen").width, flex:1 , flexDirection:'column', alignItems:'center'}}> 

                <SvgIcon style={styles.pickerIcon} icon="Faq" height='300' />
                <View style={{ padding:20 , alignItems:'center'}}>
                    <AppText color={whiteLabel().helpText} style={{textAlign:'center'}} 
                        size="medium" 
                        title="No forms currently available,">                    
                    </AppText>
                    <AppText color={whiteLabel().helpText} style={{textAlign:'center'}} 
                        size="medium" 
                        title="please check back at a later stage.">                    
                    </AppText>
                </View>
            </View>
                                    
            {/* <View style={{ marginBottom:10, marginTop:10, width:Dimensions.get('window').width * 0.94 }}>
                <SubmitButton 
                    onSubmit={() => { }}
                    title="Add comment"></SubmitButton>
            </View>                             */}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    }
});
