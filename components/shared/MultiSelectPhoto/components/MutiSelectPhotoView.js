import {View, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import OptionItem from './OptionItem';
import PhotoCameraPickerDialog from '../../../modal/PhotoCameraPickerDialog';
import {SubmitButton} from '../../SubmitButton';
import {useDispatch} from 'react-redux';
import {clearNotification, showNotification} from '../../../../actions/notification.action';
import {Constants, Strings} from '../../../../constants';


export default function MutiSelectPhotoView(props) {

  const {item , submissionType} = props;
  const [checkedLists, setCheckedLists] = useState([]);
  const [isPicker, setIsPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const dispatch = useDispatch();  
  const image_gallery = item.image_gallery;
  const image_capture = item.image_capture;
  const photoCameraPickDialogRef = useRef(null);
  

  useEffect(() => {
    if (item.value != null && item.value != '') {
      setCheckedLists(item.value);
      console.log("checkedLists ====xx ", item.value)
    }
  }, [item.value, item]);

  const renderItem = (item, index) => {
    return (
      <OptionItem
        item={item}
        index={index}
        checkedLists={checkedLists}
        onTapItem={item => {
          var check = checkedLists.find(element => element.value === item);
          if (check != undefined) {
            var tmp = checkedLists.filter(element => element.value != item);
            setCheckedLists(tmp);
          } else {
            setCheckedLists([...checkedLists, {value: item, image: ''}]);
          }
        }}
        onPickUpImage={imageItem => {
          
          setSelectedItem(imageItem);          

          if(image_capture != undefined && image_capture == "1" && image_gallery != undefined && image_gallery == "1"){
            setIsPicker(true);            
          }
      
          if(image_capture != undefined && image_capture == "1" && (image_gallery == undefined || image_gallery != "1" )){
            if(photoCameraPickDialogRef.current){
              photoCameraPickDialogRef.current.openCamera();              
            }                    
          }
          
          if( (image_capture == undefined || image_capture != "1" ) && image_gallery != undefined && image_gallery == "1"){
            if(photoCameraPickDialogRef.current){
              photoCameraPickDialogRef.current.openGallery();              
            }
          }    

        }}
      />
    );
  };

  const isValidate = () => {
    var flag = true;
    console.log("checkedLists",checkedLists);
    checkedLists.forEach(element => {
      console.log('ee', element);
      if (element.image === '' || element.image === undefined) {
        console.log('false');
        flag = false;
      }
    });
    return flag;
  };
  const onSubmit = () => {
    console.log('sss', isValidate());
    if (isValidate()) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: checkedLists,
      });
    } else {
      dispatch(
        showNotification({
          type: 'success',
          message: Strings.Please_Capture_Image,
          buttonText: 'Ok',
        }),
      );
    }
  };

  return (
    <View style={{alignSelf: 'stretch', marginHorizontal: 10, marginTop: 10}}>      
      
      <FlatList
        data={item.options}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        extraData={this.props}
      />

      <SubmitButton
        title="Save"
        onSubmit={onSubmit}
        style={{marginBottom: 20}}
      />

      <PhotoCameraPickerDialog
        ref={photoCameraPickDialogRef}
        visible={isPicker}
        message={'Choose Image'}
        updateImageData={path => {
          console.log("updated ddd", path)
          const changedLists = [];
          checkedLists.forEach(item => {
            if (item.value != selectedItem) {
              changedLists.push(item);              
            }
          });
          changedLists.push({value: selectedItem, image: path});
          setCheckedLists(changedLists);
          setIsPicker(false);
        }}
        onModalClose={() => {
          setIsPicker(false);
        }}></PhotoCameraPickerDialog>
    </View>
  );
}
