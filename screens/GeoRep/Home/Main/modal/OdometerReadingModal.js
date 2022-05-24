import React  , {useState} from 'react';
import { View ,StyleSheet , TouchableOpacity, Dimensions , Image}  from 'react-native';
import { TextInput } from 'react-native-paper';
import { postApiRequest } from '../../../../../actions/api.action';
import { AppText } from '../../../../../components/common/AppText';
import CModal from '../../../../../components/common/CModal';
import CTextInput from '../../../../../components/common/CTextInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import SvgIcon from '../../../../../components/SvgIcon';
import { Constants } from '../../../../../constants';
import { whiteLabel } from '../../../../../constants/Colors';
import { getPostParameter, selectPicker } from '../../../../../constants/Helper';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import PhotoCameraPickerDialog from '../../../../../components/modal/PhotoCameraPickerDialog';

const OdometerReadingModal = React.forwardRef((props, ref) => {

  const {title , isStart , currentLocation} = props;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [image, setImage] = useState(null);
  const [isPicker, setIsPicker] = useState(false);

  const onButtonAction = data => {
    if (props.onButtonAction) {
      props.onButtonAction(data);
    }
    if (ref) {
      ref.current.hideModal();
    }
  };  

  const _callOdometer = () => {
    var userParam = getPostParameter(currentLocation);
    var postData = {
      reading_type : isStart ? "start_reading" : "end_reading",
      reading : "1367",
      user_local_data: userParam.user_local_data
    }
    postApiRequest("home/odometer", postData).then((res) => {

    }).catch((error) => {

    });
  }

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      setIsPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
           setImage(response.assets[0].uri);
          // updateLocationImage(response.assets[0].uri);
        }
      }
    });
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
      setIsPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
          setImage(response.assets[0].uri);
          // updateLocationImage(response.assets[0].uri);
        }
      }
    });
  };

  return (      
    <CModal
      ref={ref}
      title={title}
      closableWithOutsideTouch
      modalType={Constants.modalType.MODAL_TYPE_BOTTOM}
      onClear={() => {
        onButtonAction({
          type: Constants.actionType.ACTION_FORM_CLEAR,
        });  
      }}
      {...props}>

      <View style={styles.container}>
          <CTextInput                  
            label="Start Reading"
            disabled={!isStart}
            value={start}
            right={              
                <TextInput.Affix
                  textStyle={{marginTop: 8}}
                  text={"km"}
                />              
            }
            onChangeText={text => {
              setStart( text);
            }}
          />

          {
            !isStart && 
            <CTextInput                  
              label="End Reading"
              value={end}
              style={{marginTop:10}}
              right={        
                <TextInput.Affix
                  textStyle={{marginTop: 8}}
                  text={"km"}
                />             
              }
              onChangeText={text => {
                setEnd(text)
              }}
            />
          }
          
          <View style={{marginBottom:10,marginTop:10, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:1}}>
                <AppText title="Please take a photo of your vehicles starting odometer reading">                            
                </AppText>
              </View>                                              
                  {
                      image && 
                      <TouchableOpacity style={[ {marginLeft:10 , marginRight:20 }]} onPress={() => { setIsPicker(true) }}>
                        <Image style={styles.imageContainer}  source={{uri:image}} />
                      </TouchableOpacity>                      
                  }                  
                  {
                    image === null &&
                    <TouchableOpacity style={[ styles.imageContainer , {marginLeft:10 , marginRight:20 }]} onPress={() => { setIsPicker(true) }}>
                      <SvgIcon icon="Add_Image" />
                    </TouchableOpacity>
                  }                  
                                                        
          </View>
          <SubmitButton title="Submit" onSubmit={() =>{
            onButtonAction({
              type: Constants.actionType.ACTION_FORM_CLEAR,
            }); 
          }}></SubmitButton>
          
          <PhotoCameraPickerDialog visible={isPicker} message={"Choose Image"} 
              onCamera={launchCamera}
              onGallery={launchImageLibrary}
              onModalClose={() => {                        
                  setIsPicker(false);                
              }}
          ></PhotoCameraPickerDialog>

      </View>
       
                    
    </CModal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop:10,
    marginHorizontal:20,
    marginBottom:50
  },
  imageContainer: {
    padding:5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width:Dimensions.get("screen").width / 4.5,
    height:Dimensions.get("screen").width / 4.5
  },
});


export default OdometerReadingModal;
