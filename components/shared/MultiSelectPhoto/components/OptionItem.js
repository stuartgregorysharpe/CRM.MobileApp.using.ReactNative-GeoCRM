import { View, Text ,Image, TouchableOpacity ,Platform , StyleSheet } from 'react-native'
import React from 'react'
import { boxShadow, style } from '../../../../constants/Styles';
import { AppText } from '../../../common/AppText';
import Colors from '../../../../constants/Colors';
import SvgIcon from '../../../../components/SvgIcon';

export default function OptionItem(props) {

    const {  item, index, checkedLists, onTapItem , onPickUpImage} = props;

    const isLocked = () => {
        var check = checkedLists.find(element => element.value === item);
        if(check != null && check != undefined){
            return false;
        }
        return true;
    }

    const getImagePath = () => {
        var check = checkedLists.find(element => element.value === item);
        if(check != null && check != undefined){
            return check.image;
        }
        return '';
    }

    const pickUpImage = (item) => {
        if(!isLocked()){
            if(props.onPickUpImage){
                onPickUpImage(item);
            }
        }
    }

    return (
        <TouchableOpacity  key={index}
            style={styles.container}
            onPress={() => {                                                                      
                onTapItem(item , index);
            }}>

            <View style={[style.card , Platform.OS === 'android' ? boxShadow : {}, {paddingHorizontal:20}]} key={index}>            
                <TouchableOpacity onPress={() => onTapItem(item , index) }>
                    <View style={[style.checkBoxStyle , !isLocked() ? {} : {backgroundColor:'white'}]}>
                        <SvgIcon icon="Yes_No_Button_Check" width='15px' height='15px' />
                    </View>
                </TouchableOpacity>

                <View style={{ alignContent:'flex-start', flex:1 ,marginLeft:15}}>
                    <AppText title={item} size="medium" color={Colors.blackColor} ></AppText>
                </View>
                                
                <TouchableOpacity onPress={() => pickUpImage(item) }>
                    {
                        getImagePath() != '' &&
                        <Image style={{width:35, height:35, borderRadius:5}} source={{uri: getImagePath()}} />
                    }
                    {
                        getImagePath() === '' &&
                        <SvgIcon icon={isLocked() ? "Image_Capture_Disable" : "Image_Capture"} width='35px' height='35px' />
                    }
                    
                </TouchableOpacity>                        
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container:{
        alignSelf:'stretch'
    }
})