import React, { useState, useEffect } from 'react';
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
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';

//{item , onPress ,onTouchStart}

export default function TakePhotoForm (props , ref) {

    const {item, onPress, onTouchStart } = props;
    const [isPicker , setIsPicker] = useState(false);
    const [photos, setPhotos] = useState([]);
            
    const updateImageData = async (path) => {        

        setPhotos([path]);
        console.log(path);
    }
    
    selectPicker = (title, description) => {        
        setIsPicker(true);
    }

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary (options, (response)  => {      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);        
      } else {                                                  
        if(response.assets != null && response.assets.length > 0){                     
            
            updateImageData(response.assets[0].uri);
            setIsPicker(false);
            //setFilePath(response.assets[0].uri);
            //updateLocationImage(response.assets[0].uri);
        }
      }
    });
  }
  
  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {        
        if(response.assets != null && response.assets.length > 0){         
            
          //setFilePath(response.assets[0].uri);
          //updateLocationImage(response.assets[0].uri);
        }

      }
    });

  }


    return (
        <View style={[style.card, {marginHorizontal:5 , marginVertical:3 }]}>
            
            <View style={styles.container}>

                <PhotoCameraPickerDialog visible={isPicker} message={"Choose Image"} 
                    onCamera={launchCamera}
                    onGallery={launchImageLibrary}
                    onModalClose={() => {
                        console.log("closed modal");
                        setIsPicker(false);
                    }}
                ></PhotoCameraPickerDialog>


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
                            photos.map((item , index) =>{
                                return (                                    
                                    <TouchableOpacity key={"image" + index} style={[style.buttonStyle]} onPress={() => {  } }>
                                        <View style={{width:80, height:80 , marginBottom : 10 , marginLeft:10}}>                                
                                            <Image style={styles.imageConainer}  source={{uri:item}} /> 
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }

                        <TouchableOpacity style={[style.buttonStyle]} onPress={() => {  selectPicker("", "") } }>
                                <SvgIcon icon="Add_Image" width='80px' height='80px' />                                                    
                        </TouchableOpacity>

                    </ScrollView>                    
                </View>

            </View>
        </View>
    );
}

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