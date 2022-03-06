


import React , {useEffect , useState} from 'react';
import {View, Text, TouchableOpacity ,StyleSheet ,Linking, Platform ,Image} from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import { PRIMARY_COLOR, whiteLabel } from '../../../../constants/Colors';
import Images from '../../../../constants/Images';
import { checkFeatureIncludeParam } from '../../../../constants/Storage';
import { style } from '../../../../constants/Styles';

export default function WazeNavigation({location}){

    const [isExpanded , setIsExpanded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() =>{
        checkVisible();
    },[]);

    const checkVisible = async () => {
        setVisible( await checkFeatureIncludeParam("navigation"));
    }

    return (        
        <View styles={styles.conainer}>
            {
                visible &&
                    <View style={[style.card, {marginLeft:10, marginRight:10 , flexDirection:'column'}]}>

                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{flexDirection:"row", padding:5}}>
                        <View style={{flexDirection:"row", padding:5, flex:1}}>
                            <Text style={{flex:1}} >Navigation</Text>                        
                            <SvgIcon icon="Drop_Down" width='23px' height='23px' />                            
                        </View>
                    </TouchableOpacity>                    


                    {
                        isExpanded && 
                        <View style={{flexDirection:'column', width:'100%' , marginTop:10}}>
                            <View style={{height:1, width:'100%', backgroundColor:"#eee"}}></View>                        
                            <TouchableOpacity onPress={() =>{
                                console.log("loc", location);
                                try{
                                    console.log('https://waze.com/ul?ll=' + location.latitude + ',' + location.longitude + '&navigate=yes');
                                    Linking.openURL('https://waze.com/ul?ll=' + location.latitude + ',' + location.longitude + '&navigate=no')
                                }catch(e){
                                    if(Platform.OS === "android"){
                                        Linking.openURL('market://details?id=com.waze')                                    
                                    }else{
                                        Linking.openURL('http://itunes.apple.com/us/app/id323229106')  
                                    }                                
                                }                                
                            }}>
                                <View style={{flex:1, marginLeft:10, flexWrap:'wrap',}}> 
                                    <View style={styles.wazeStyle}>
                                        <Text style={{fontSize:12}}>Waze</Text>
                                        <Image
                                            resizeMethod='resize'  
                                            style={{width:20,height:20, marginLeft:10}}
                                            source={Images.waze}
                                        />
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    }
                                    
                </View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    conainer:{

    },
    wazeStyle:{      
        alignItems:'center',       
        marginTop:10,
        flexDirection:'row',
        borderWidth:1,
        borderColor:whiteLabel().fieldBorder,
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        paddingBottom:5,        
    }
})