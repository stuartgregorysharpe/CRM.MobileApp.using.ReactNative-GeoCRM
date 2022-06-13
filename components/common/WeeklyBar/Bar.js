import { View, Text , StyleSheet, Dimensions } from 'react-native'
import React , { useState ,useEffect } from 'react'
import { style } from '../../../constants/Styles';
import Colors, { whiteLabel } from '../../../constants/Colors';
import { AppText } from '../AppText';
import moment from 'moment-timezone';

export default function Bar({maxValue, title, values}) {
    
    const colors = [ whiteLabel().graphs.color_3 , whiteLabel().graphs.color_2, whiteLabel().graphs.color_1, whiteLabel().graphs.primary];
    const [week , setWeek] = useState(0);
    const  getHeight = (value, index) =>{

        if(values[0] != 0 && values[1] == 0 && values[2] == 0 && values[3] == 0 && index == 0){
            return 80;
        }
        if(values[0] == 0 && values[1] == 0 && values[2] == 0 && values[3] == 0 && index == 0){
            return 80;
        }
        return 80 * value/maxValue;
    }

    useEffect(() => {
        var weekOfDay = moment().isoWeekday();
        console.log(weekOfDay)
        switch(weekOfDay){
            case 1:
                setWeek("Mon");
                break;
            case 2:
                setWeek("Tue");
                break;
            case 3:
                setWeek("Wen");
                break;
            case 4:
                setWeek("Thur");
                break;
            case 5:
                setWeek("Fri");
                break;
            case 6:
                setWeek("Sat");
                break;
            case 7:
                setWeek("Sun");
                break;
        }
        
    }, [])


  return (
    <View style={{justifyContent:'flex-end', alignItems:'center'}}>
        <View style={{}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            {
                values.map((item, index) =>{
                    return (
                        <View key={index} style={{alignItems:'center', marginLeft:0}} >
                            {
                                getHeight(item , index) < 20 && 
                                <AppText size="medium" color={colors[index]} title={item == 0 ? '' : item} ></AppText>
                            }                            
                        </View>
                    )
                })            
            }
            </View>

            {
                values.map((item, index) =>{
                    return (
                        <View key={index} style={[styles.barStyle, { height:getHeight(item , index) , backgroundColor:colors[index] , marginTop:getHeight(item , index) === 0? 0: 3 }]} >
                            {
                                getHeight(item, index) >= 20 && 
                                <AppText size="medium" color={Colors.whiteColor} title={item != 0 ? item: ''} ></AppText>                                
                            }                                                

                        </View>
                    )
                })            
            } 
        </View>
        <AppText style={{marginTop:3}} title={title} 
            type={week === title ? "secondaryBold" : 'secondaryMedium'}
            color={week === title ?  whiteLabel().mainText : Colors.blackColor} ></AppText>            
        <View style={{height:2, width:'70%', backgroundColor:week === title? whiteLabel().mainText : Colors.whiteColor }}></View>
        
        
    </View>
  )
}

const styles = StyleSheet.create({
    barStyle:{
        marginTop:3,
        width:Dimensions.get("screen").width/9,
        borderRadius:5,
        backgroundColor:Colors.primaryColor,
        alignItems:'center',
        justifyContent:'center'
    }
})