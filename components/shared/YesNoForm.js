import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Text, Image,Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';
import SvgIcon from '../SvgIcon';
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';
import * as ImagePicker from 'react-native-image-picker'; 
import RNFS from 'react-native-fs';

export const YesNoForm = ({item , onTouchStart , onPress , onTakeImage }) => {

    const [isYes, setIsYes] = useState(item.value !== null && item.value === "yes" ? true:false);
    const [isNo, setIsNo] = useState(item.value !== null && item.value === "no" ? true:false);
    const [isPicker , setIsPicker] = useState(false);
    const isShowInfoIcon = item.guide_info !== undefined && item.guide_info.length != 0
    
    //console.log("item.include_image.length" ,item.include_image.length)
    const showSelectionDialog = () => {        
        setIsPicker(true);      
    }
    const updateImageData = async (path) => {
        setIsPicker(false);
        //onPress(path);  
        
        if(item.value && item.value !== null){
            onTakeImage([ path ] ,item.value);
        }else{
            onTakeImage([ path ] ,item.value);
        }      
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
            updateImageData(response.assets[0].uri);          
          }

        }
      });      
    }

    const isIncludeImage = () => {
      if(item.include_image.length > 0){
        return true;
      }
      return false;
    }

    const getImagePath = () =>{
      console.log("image path", item.value);
      if(item.value === "yes"){        
        return item.yes_image;        
      }else{
        return item.no_image;
      }
    }

    const haveImage = () => {
      if(item && item.value === null || item.value === ""){
        return false;
      }
      if(item && item.value === "yes" && item.yes_image){
        return true;
      }
      if(item && item.value === "no" && item.no_image){
        return true;
      }
      return false;
    }

    return (
        <View style={[style.card, item.rule_compulsory === "1" ? style.compulsoryStyle :{}, {marginHorizontal:5 , marginVertical:3 }]}>
            <View style={[styles.container]}>
                
                <PhotoCameraPickerDialog visible={isPicker} message={"Choose Image"} 
                    onCamera={launchCamera}
                    onGallery={launchImageLibrary}
                    onModalClose={() => {                        
                        setIsPicker(false);
                    }}
                ></PhotoCameraPickerDialog>

                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, paddingHorizontal:5}}>
                        <Text style={styles.titleStyle}> {item.question_text}</Text>
                    </View>
                    {
                      isShowInfoIcon &&
                      <View
                          onTouchStart={(e) => { onTouchStart(e.nativeEvent , item.guide_info);  }} >
                              <Icon
                                  name={`info-outline`}
                                  size={25}
                                  color={whiteLabel().mainText}                    
                              />
                      </View>
                    }
                    
                </View>

                <View style={{flexDirection:'row' , justifyContent:'center'}}>

                    <View style={{flexDirection: isIncludeImage() && item.value !== null ? 'column':'row' , justifyContent:'center'}}>
                        <Button btnStyle={{marginTop:10}} title={'Yes'} onTaped= {item.value !== null && item.value === "yes" ? true:false} 
                        onClick={() => {
                            setIsYes(true);
                            setIsNo(false);
                            if(item.include_image.length == 0){
                              onPress("yes" , "no_image");
                            }else{
                              onPress("yes" , "include_image");
                            }                            
                        }} ></Button>

                        <Button btnStyle={{marginTop:10,marginLeft: isIncludeImage() && item.value !== null ? 0 : 20}} title={'No'} onTaped={item.value !== null && item.value === "no" ? true:false} 
                        onClick={() =>{
                            setIsYes(false);
                            setIsNo(true);
                            if(item.include_image.length == 0){
                              onPress("no" , "no_image");
                            }else{
                              onPress("no" , "include_image");
                            }                            
                        }}
                        ></Button>
                    </View>

                    {
                        isIncludeImage() && haveImage() && getImagePath() != undefined && getImagePath().map((subItem , index) =>{
                            if(subItem.includes("png") || subItem.includes("jpg")){
                                return (
                                  <TouchableOpacity onPress={()=> showSelectionDialog()}>
                                    <View key={"image" + index} style={styles.imageStyle}>
                                        <Image style={styles.imageContainer}  source={{uri:subItem}} />                                    
                                    </View>                                    
                                  </TouchableOpacity>                                        
                                );
                            }                                
                        })
                    }

                    {
                        isIncludeImage() && item.value !== null && getImagePath() === undefined &&
                        <TouchableOpacity style={[styles.imageContainer, {marginLeft:30 }]} onPress={() => { showSelectionDialog() } }>
                            <SvgIcon icon="Add_Image" />   
                        </TouchableOpacity>
                    }
                                        
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
    inputStyle:{                
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius:3,
        padding:10,
    },
    imageContainer: {
        padding:5,
        borderWidth: 1,
        borderColor: whiteLabel().fieldBorder,
        borderRadius: 5,
        width:Dimensions.get("screen").width / 4.5,
        height:Dimensions.get("screen").width / 4.5
    },
    imageStyle:{
        width:80, 
        height:80 , 
        marginBottom : 10 , 
        marginLeft:30
    },
})