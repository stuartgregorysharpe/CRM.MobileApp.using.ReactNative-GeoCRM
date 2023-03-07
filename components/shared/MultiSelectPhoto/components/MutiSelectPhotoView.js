import {View, FlatList} from 'react-native';
import React, {useState, useEffect, useRef ,useCallback} from 'react';
import OptionItem from './OptionItem';
import PhotoCameraPickerDialog from '../../../modal/PhotoCameraPickerDialog';
import {SubmitButton} from '../../SubmitButton';
import {useDispatch} from 'react-redux';
import {clearNotification, showNotification} from '../../../../actions/notification.action';
import {Constants, Strings} from '../../../../constants';

var selectedOption = '';

export default function MutiSelectPhotoView(props) {

  const {item , submissionType} = props;
  const [checkedLists, setCheckedLists] = useState([]);
  const [isPicker, setIsPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const dispatch = useDispatch();  
  const image_gallery = item.image_gallery;
  const image_capture = item.image_capture;
  const photoCameraPickDialogRef = useRef(null);
  const isOptimize = item.optimize && item.optimize == '1' ? true : false;  
  const image_timestamp = item.image_timestamp;

  useEffect(() => {
    if (item.value != null && item.value != '') {
      setCheckedLists(item.value);      
    }
  }, [item.value, item]);

  const updateList = (path) => {

    const changedLists = [];
    
    checkedLists.forEach(item => {
      if (item.value != selectedOption) {
        changedLists.push(item);              
      }
    });
    changedLists.push({value: selectedOption, image: path});
    setCheckedLists(changedLists);
    
  };


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
          
          console.log("selected item",imageItem)
          setSelectedItem(imageItem);     
          selectedOption = imageItem;     

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
      if (element.image === '' || element.image === undefined) {        
        flag = false;
      }
    });
    return flag;
  };
  const onSubmit = () => {
    
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
        isOptimize={isOptimize}
        image_timestamp={image_timestamp}
        updateImageData={path => {
          console.log("updated ddd", path)
          updateList(path);
          setIsPicker(false);
        }}
        onModalClose={() => {
          setIsPicker(false);
        }}></PhotoCameraPickerDialog>
    </View>
  );
}
