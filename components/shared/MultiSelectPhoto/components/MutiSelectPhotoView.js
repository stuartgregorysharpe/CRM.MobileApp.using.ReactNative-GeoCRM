
import { View, Text , FlatList } from 'react-native'
import React , { useState ,useEffect } from 'react'
import OptionItem from './OptionItem';
import PhotoCameraPickerDialog from '../../../modal/PhotoCameraPickerDialog';
import { SubmitButton } from '../../SubmitButton';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../actions/notification.action';
import { Constants } from '../../../../constants';

export default function MutiSelectPhotoView(props) {
     
    const { item } = props;
    const [checkedLists , setCheckedLists] = useState([]);
    const [isPicker, setIsPicker] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
      if(item.value != null && item.value != ''){
        setCheckedLists(item.value);
      }
    }, [item.value , item])

    const renderItem = (item, index) => {
      return (
        <OptionItem 
          item={item}
          index={index}
          checkedLists={checkedLists}
          onTapItem ={(item) => {
              var check = checkedLists.find(element => element.name === item);
              if(check  != undefined){
                var tmp = checkedLists.filter(element => element.name != item);
                setCheckedLists(tmp);
              }else{
                setCheckedLists([...checkedLists, {name:item, path:''} ]);
              }              
          }}

          onPickUpImage={(item) => {
              setIsPicker(true);
              setSelectedItem(item);
          }}

         />
      )
    }

    const isValidate = () => {
      var flag = true;
      checkedLists.forEach(element => {
        console.log("ee", element)
        if(element.path === "" || element.path === undefined){
            console.log("false")
            flag = false;
        }
      });
      return flag;
    }
    const onSubmit = () => {
      console.log("sss" ,isValidate())
        if(isValidate()){            
            props.onButtonAction({
              type:  Constants.actionType.ACTION_FORM_SUBMIT,
              value: checkedLists,
            });

        }else{
            dispatch(showNotification({type: 'success', message: 'Please capture an image for each selected option' , buttonText:'Ok'}));
        }
    }


      
  return (
    <View style={{ alignSelf:'stretch' , marginHorizontal:10, marginTop:10}}>
        <FlatList
            data={item.options}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={10}
            extraData={this.props}
        />

        <SubmitButton title="Save"  onSubmit={onSubmit} style={{marginBottom:20}} />
        
        <PhotoCameraPickerDialog
          visible={isPicker}
          message={'Choose Image'}
          updateImageData={(path) => {
              var tmp = [];
              checkedLists.forEach((item) => {
                if(item.name === selectedItem){
                  tmp.push({name: selectedItem, path: path });
                }else{
                  tmp.push(item);
                }
              })
              setCheckedLists(tmp);
              setIsPicker(false);
          }}
          onModalClose={() => {
              setIsPicker(false);
          }}></PhotoCameraPickerDialog>

    </View>
  )
}
