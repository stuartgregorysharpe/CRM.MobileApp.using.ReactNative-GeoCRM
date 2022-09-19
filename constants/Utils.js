
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export const  requestCameraPermission = async ( onCallBack ) => {
        
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission given');            
            onCallBack(true)
        } else {
            console.log('Camera permission denied');
            onCallBack(false)
        }
    } catch (err) {
        console.warn(err);
        onCallBack(false)
    }          
}

export const launchCamera = ( onCallBack ) => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        //alert(response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
            onCallBack(response.assets[0].uri)            
        }
      }
    });
};



export const launchImageLibrary = ( onCallBack ) => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets != null && response.assets.length > 0) {
            onCallBack(response.assets[0].uri)            
        }
      }
    });
};

