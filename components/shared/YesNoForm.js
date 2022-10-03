import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image,Dimensions } from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { style } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from './Button';
import SvgIcon from '../SvgIcon';
import PhotoCameraPickerDialog from '../modal/PhotoCameraPickerDialog';
import * as ImagePicker from 'react-native-image-picker'; 

export const YesNoForm = ({item , onTouchStart , onPress , onTakeImage }) => {

    const [isYes, setIsYes] = useState(item.value !== null && item.value !== "" && item.value.toLowerCase() == 'yes' ? true:false);
    const [isNo, setIsNo] = useState(item.value !== null && item.value.toLowerCase() == 'no' ? true:false);
    const [isPicker , setIsPicker] = useState(false);

    const isShowInfoIcon = item.guide_info !== undefined && item.guide_info.length != 0
                
    const showSelectionDialog = () => {        
        setIsPicker(true);      
    }

    const updateImageData = async (path) => {
        setIsPicker(false);                
        if(item.value != null && item.value !== null){
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

    const isIncludeImage = (btnName) => {    
      if( item.include_image && item.include_image.length > 0 ){
        var check = item.include_image.find(item => item === btnName);
        if(check != null &&  check != undefined){
            return true;
        }        
      }
      return false;
    }
    
    const getImagePath = () =>{      
      if(item.value != null && item.value.toLowerCase() === "yes"){        
        return item.yes_image;        
      }else{
        return item.no_image;
      }
    }

    const haveImage = () => {
      if(item && item.value === null || item.value === ""){
        return false;
      }
      if(item && item.value != null && item.value.toLowerCase() === "yes" && item.yes_image){
        return true;
      }
      if(item && item.value != null && item.value.toLowerCase() === "no" && item.no_image){
        return true;
      }
      return false;
    }
    
    const isRequiredImage = isIncludeImage("Yes") || isIncludeImage("No");
    const isQuesionAnswered = isRequiredImage ? item && haveImage() : item != undefined && item.value != null && item.value != ""
    const isCompulsory = !isQuesionAnswered && item && item.rule_compulsory === '1';
    
    const getMarginLeft = () => {
      if(item.value != null && item.value.toLowerCase() === 'no' && !isIncludeImage("No")){
        return 20;
      }else if(item.value != null && item.value.toLowerCase() === "yes" && !isIncludeImage("Yes")){
        return 20;
      }else if(item.value === null || item.value === undefined || item.value === ''){
        return 20;
      }
      return 0;
    }

    return (
        <View style={[style.card, isCompulsory ? style.compulsoryStyle :{}, {marginHorizontal:0 , marginVertical:5 }]}>
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

                    <View style={{flexDirection: isIncludeImage(isYes ? "Yes" : 'No') && item.value !== null ? 'column':'row' , justifyContent:'center'}}>
                        
                          <Button btnStyle={{marginTop:10 }} title={'Yes'} onTaped= {item.value !== null && item.value.toLowerCase() === "yes" ? true:false} 
                            onClick={() => {
                                setIsYes(true);
                                setIsNo(false);
                                if(item.include_image.length == 0){
                                  onPress("yes" , "no_image");
                                }else{
                                  onPress("yes" , "include_image");
                                }                            
                            }} ></Button>
                                                                      
                          <Button btnStyle={{marginTop:10 , 
                            marginLeft: getMarginLeft() }} title={'No'} onTaped={item.value !== null && item.value.toLowerCase() === "no" ? true:false}
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
                        isIncludeImage( isYes ? 'Yes' : 'No' ) && haveImage() && getImagePath() != undefined && getImagePath().map((subItem , index) =>{
                            if(subItem.includes("png") || subItem.includes("jpg")){
                                return (
                                  <TouchableOpacity key={index} onPress={()=> showSelectionDialog()}>
                                    <View key={"image" + index} style={styles.imageStyle}>
                                        <Image style={styles.imageContainer}  source={{uri:subItem}} />                                    
                                    </View>                                    
                                  </TouchableOpacity>                                        
                                );
                            }                                
                        })
                    }

                    {
                        isIncludeImage( isYes ? 'Yes' : 'No') && item.value !== null && getImagePath() === undefined &&
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