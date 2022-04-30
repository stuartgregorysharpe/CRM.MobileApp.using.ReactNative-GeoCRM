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
import ImageResizer from 'react-native-image-resizer';

export default function TakePhotoForm ({item, onPress, onTouchStart}) {

    //const {  } = props;
    const [isPicker , setIsPicker] = useState(false);
    //const [photos, setPhotos] = useState([]);

    const updateImageData = async (path) => {
      setIsPicker(false);
      //onPress(path);  
      if(item.value && item.value !== null){
        onPress([...item.value, path ]);
      }else{
        onPress([ path ]);
      }      
    }
    
    const showSelectionDialog = () => {
        setIsPicker(true);      
    }

    const optimizeImage = (filePath , quality , index) =>{
      var outputPath = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}` :  `${RNFS.ExternalDirectoryPath}`; 
      console.log("compress quality ====", quality);
      var width_height = 800;
      if(item.optimize && item.optimize === "1"){
        width_height = 500;
      }      
      ImageResizer.createResizedImage(filePath, width_height, width_height, "JPEG", quality, 0, outputPath)
      .then(res => {              
        console.log("resut", res);
        if(item.optimize && item.optimize === "1" ){
          if(res.size < 1024 * 200 || index >= 2){
            console.log("POST image size", res);
            updateImageData(res.uri);
          }else{
            var newQuality = 1024 * 200 * 100 / res.size ;
            console.log("newQuality", newQuality);
            optimizeImage(res.uri, newQuality, index + 1);
          }
        }else{
          if(res.size < 1024 * 500 || index >= 2){
            console.log("POST image size", res);
            updateImageData(res.uri);
          }else{
            var newQuality = 1024 * 500 * 100 / res.size ;
            console.log("newQuality", newQuality);
            optimizeImage(res.uri, newQuality, index + 1);            
          }
        }
      })
      .catch(err => {    
        console.log("error", err);
      });              
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
            var fileName = "tmp";
            optimizeImage(response.assets[0].uri , 100 , 0);
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
            optimizeImage(response.assets[0].uri , 100 , 0);            
          }

        }
      });      
    }


    return (
        <View style={[style.card,  item.rule_compulsory === "1" ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginVertical:3 }]}>
            
            <View style={styles.container}>

                <PhotoCameraPickerDialog visible={isPicker} message={"Choose Image"} 
                    onCamera={launchCamera}
                    onGallery={launchImageLibrary}
                    onModalClose={() => {                        
                        setIsPicker(false);
                    }}
                ></PhotoCameraPickerDialog>


                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text} </Text>
                    </View>
                    <View
                        onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_info);  }} >
                            <Icon
                                name={`info-outline`}
                                size={25}
                                color={whiteLabel().mainText}                    
                            />
                    </View>
                </View>
                
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:10}} >                
                    <ScrollView key={"scroll" + item.question_group_id} horizontal={true} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >                                                
                        {
                            item.value && item.value.length > 0 && item.value.map((subItem , index) =>{
                                return (                                    
                                    <View key={"image" + index} style={styles.imageStyle}>  
                                        <Image style={styles.imageContainer}  source={{uri:subItem}} />
                                        <TouchableOpacity  style={[styles.closeButtonStyle]} 
                                          onPress={() => { 
                                            var tmp = item.value.filter(element => element !== subItem );                                             
                                            onPress(tmp); 
                                            } }>
                                          <SvgIcon icon="Close" width="20px" height="20px" />
                                        </TouchableOpacity>
                                    </View>                                    
                                );
                            })
                        }

                        <TouchableOpacity style={[styles.imageContainer, {marginLeft:10 }]} onPress={() => { showSelectionDialog() } }>
                          <SvgIcon icon="Add_Image" />   
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
   
    imageStyle:{
        width:80, 
        height:80 , 
        marginBottom : 10 , 
        marginLeft:10
    },

    imageContainer: {
        padding:5,
        borderWidth: 1,
        borderColor: whiteLabel().fieldBorder,
        borderRadius: 7,
        width:Dimensions.get("screen").width / 4.5,
        height:Dimensions.get("screen").width / 4.5
    },

    closeButtonStyle:{
      position:'absolute',
      right:0,
      top:3
    }

    
    
})