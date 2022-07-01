import { View, Text ,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React , { useState } from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';

export default function ReturnDeviceDetailView(props) {
  
  const {lists , onReturnDevice, onPhotos, onReturnStock} = props;    
  const [reason, setReason] = useState("");
  const [reasonLists , setReasonLists] = useState([{value:'Damaged' , label: 'Damaged'} ,  {value:'Faulty' , label: 'Faulty'} , {value:'Used' , label: 'Used'}])
  const [photos, setPhotos] = useState([]);
  const [device, setDevice] = useState(null)

  return (
    <ScrollView style={styles.container}>
                  
          
          <AppText title="Return Device" type="secondaryBold" size="medium"></AppText>
            <DropdownInput
              title="Select Device"            
              lists={lists}
              onItemSelected={(item) => {                
                onReturnDevice({location_device_id: item.location_device_id, return_reason: reason});
                setDevice(item);

              }}
            >
          </DropdownInput>

          <CSingleSelectInput                    
              description={'Reason'}
              placeholder={'Select ' + "Reason"}
              checkedValue={reason}
              items={reasonLists}
              hasError={false}
              disabled={false}
              onSelectItem={item => {                                               
                  setReason(item.label);
                  console.log("selected reason", item)
                  //onReason(item.label);
                  onReturnDevice({location_device_id: device.location_device_id, return_reason: item.label});
              }}
              containerStyle={{marginTop: 15}}
          /> 
          
          <TakePhotoView
              isOptimize={true}
              onUpdatePhotos={photos => {                
                setPhotos(photos);
                onPhotos(photos);
              }}
              disabled={false}
              photos={photos}
              style={{marginVertical: 24}}
          />              

          <SubmitButton title="Return Stock" style={{marginTop:10 , marginBottom:30}} onSubmit={onReturnStock}></SubmitButton>          
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      paddingTop: 10,
      marginHorizontal: 20,      
      paddingBottom:0,
      //height:Dimensions.get("window").height * 0.6
  },

  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 4.5 + 7,
    height: Dimensions.get('screen').width / 4.5,
  },

})

