import React, { useState, useEffect ,forwardRef ,useImperativeHandle } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Alert, Dimensions , Image } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import SvgIcon from '../SvgIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';
import { color, timing } from 'react-native-reanimated';
import * as ImagePicker from 'react-native-image-picker'; 
import RNFS from 'react-native-fs';

//{item , onPress ,onTouchStart}
export const TakePhotoForm = forwardRef(( props, ref ) => {

    const {item, onPress, onTouchStart ,selectPicker } = props;
    const [text,setText] = useState("");
    const [selectedPhotos, setSelectedPhotos] = useState(["D","d"]);
        
    useImperativeHandle(
        ref,
        () => ({
          updateImage(path) {        
            updateImageData(path)
          }, 
        }),
        [],
      );

    const updateImageData = (path) => {
        //console.log(props);        
        console.log("triggreere");
        setSelectedPhotos([]);
        //setSelectedPhotos([...selectedPhotos, path]);        
    }

    



    return (
        <View style={[style.card, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    <View
                        onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_text);  }} >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={whiteLabel().mainText}                    
                            />
                    </View>
                </View>
                
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}} >

                
                    <ScrollView horizontal={true}    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
                        
                        
                        {
                            selectedPhotos.map((item , index) =>{
                                return (
                                    <View key = {"photo" + index}>
                                        <Text key={index}>{index}</Text>
                                    </View>
                                    // <TouchableOpacity key={"image" + index} style={[style.buttonStyle]} onPress={() => { onPress() } }>
                                        // <View style={{width:80, height:80, backgroundColor:'red'}}>                                
                                        //     <Image style={styles.imageConainer}  source={{uri:item}} /> 
                                        // </View>
                                    // </TouchableOpacity>
                                );
                            })
                        }

                        <TouchableOpacity style={[style.buttonStyle]} onPress={() => {  selectPicker("Upload or capture an image:", ""); } }>
                                <SvgIcon icon="Add_Image" width='80px' height='80px' />                                                    
                        </TouchableOpacity>

                    </ScrollView>                    
                </View>

            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    container:{
        flex:1,        
        paddingVertical:3
    },
    titleStyle:{
        textAlign:'center',
        paddingVertical:5,
        color: Colors.blackColor,
        fontSize:15,
        fontFamily: Fonts.secondaryMedium
    },  
   
    buttonStyle:{

    },

 

    imageConainer: {
        borderWidth: 1,
        borderColor: whiteLabel().fieldBorder,
        borderRadius: 7,
        width:Dimensions.get("screen").width / 4.5,
        height:Dimensions.get("screen").width / 4.5
    },

    
    
})