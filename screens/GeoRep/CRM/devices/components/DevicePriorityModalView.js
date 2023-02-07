import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React , { useState , useEffect } from 'react'
import { AppText } from '../../../../../components/common/AppText';
import  Colors, { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import { ScrollView } from 'react-native-gesture-handler';
import DevicePriorityItem from '../../../../../components/items/DevicePriorityItem';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function DevicePriorityModalView(props) {

    const { device } = props;

    const [isPrimary, setIsPrimary] = useState(false);

    useEffect(() => {
        setIsPrimary(device.primary_device === "1" ? true: false);
    }, [device])

    const renderItem = (item, index) => {

        return (        
            <TouchableOpacity key={index} onPress={() =>{
            // onItemSelected(item)
            }}>
                <CardView style={{borderColor:whiteLabel().borderColor, borderWidth:1, marginVertical:5 , padding:5 }}>                
                        <View key={index} style={{ flex:1, flexDirection:'column'}}>            
                            <View style={{flex: 1 , flexDirection:'row' ,marginRight:10}}>
                                <AppText                            
                                    size="big"
                                    type="secondaryBold"
                                    title={item.description}
                                    style={{fontSize: 12.5 , flex:1}}></AppText>                                                                                
                            </View>
                            
                            <View style={{flex: 1, flexDirection:'row', marginRight:10}}>
                                <AppText
                                    type="secondaryMedium"
                                    title={"MSISDN: " + item.msisdn}              
                                    color={whiteLabel().subText}
                                    style={{fontSize: 10.4 , flex:1 }}></AppText>

                                <AppText
                                    type="secondaryMedium"
                                    title={"IMEI: " + item.imei}
                                    color={whiteLabel().subText}
                                    style={{fontSize: 10.4}}></AppText>
                                
                            </View>            
                        </View>
                        {/* <View style={{height:0.5, backgroundColor:Colors.greyColor, marginVertical:3 , marginRight:10}}></View> */}                
                </CardView>
                
            </TouchableOpacity>        
        );
    };

  const onUpdate = (priamry) => {    
    setIsPrimary(priamry)
  }

  const onSubmit = () => {
    if(props.onSubmit)
        props.onSubmit(isPrimary);
  }

  return (
      <View style={styles.container}>
            <ScrollView>      
                {
                    device != undefined && renderItem(device, 0)
                }

                <DevicePriorityItem title="Primary" isPrimary={isPrimary} onUpdate={onUpdate} style={{marginTop:10}} />

                <DevicePriorityItem title="Additional" isPrimary={!isPrimary} onUpdate={onUpdate}/>

                <SubmitButton                    
                    title="Save" onSubmit={() => {
                        onSubmit();
                }}  style={{marginTop:10, marginBottom:20}}/>
            </ScrollView>           
      </View>
    
  )
}


const styles = StyleSheet.create({
    container: {        
        flexDirection:'column',
        marginTop:8,        
        marginHorizontal: 20,      
        paddingBottom:0,
        //height:Dimensions.get("window").height * 0.6
    },  
  
})

  