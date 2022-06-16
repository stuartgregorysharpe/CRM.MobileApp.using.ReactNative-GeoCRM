import { View, Text ,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React , { useState } from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';
import SvgIcon from '../../../../../components/SvgIcon';
import CardView from '../../../../../components/common/CardView';
import CTextInput from '../../../../../components/common/CTextInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';

export default function SwopAtTraderView(props) {
  
  const {item , lists , onReturnDevice, onReason, onPhotos, onSwop} = props;    
  const [deviceType ,setDeviceType] = useState('');
  const [reason, setReason] = useState("");
  const [deviceTypeLists, setDeviceTypeLists] = useState([])
  const [reasonLists , setReasonLists] = useState([{value:'Damaged' , label: 'Damaged'} ,  {value:'Faulty' , label: 'Faulty'} , {value:'Used' , label: 'Used'}])
  const [msisdn, setMsisdn] = useState("");
  const [isShown,setIsShown] = useState(false);
  const [photos, setPhotos] = useState([]);
  return (
    <ScrollView style={styles.container}>
                  
          <AppText title="Return Device" type="secondaryBold" size="medium"></AppText>

            <DropdownInput            
              title="Select Device"            
              lists={lists}
              onItemSelected={(item) => {
                onReturnDevice(item);
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
                  onReason(item.label);

              }}
              containerStyle={{marginTop: 15}}
          /> 
          
          
          <TakePhotoView
              isOptimize={true}
              onUpdatePhotos={photos => {
                //updateFormData(field_name, photos);
                setPhotos(photos);
                onPhotos(photos);
              }}
              disabled={false}
              photos={photos}
              style={{marginVertical: 24}}
          />              

          <AppText title="Allocate Device" type="secondaryBold" size="medium"></AppText>

          <CardView style={{ marginTop:10, borderColor:whiteLabel().borderColor, borderWidth:1}}>
              <View style={{padding:5}}>
                  <AppText size="medium" type="secondaryBold" title={item != undefined ? item.description :  ''} color={whiteLabel().mainText}></AppText>
                  <AppText title={item != undefined ? "IMEI: " + item.serial : "IMEI: "} color={whiteLabel().subText}></AppText>
              </View>
          </CardView>

          <CTextInput                    
              label="Assign MSISDN"                    
              value={msisdn}
              returnKeyType={'done'}                                        
              keyboardType={'number-pad'}
              isRequired={true}
              onChangeText={text => {
                setMsisdn(text)
                  // setDetails(text);
                  // onDataChanged(text, quantity);
              }}
              style={{marginTop:10}}
          />
          <SubmitButton title="Swop" style={{marginTop:10 , marginBottom:30}} onSubmit={onSwop}></SubmitButton>          
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      paddingTop: 10,
      marginHorizontal: 20,
      //marginBottom: 30,
      paddingBottom:0,
      height:Dimensions.get("window").height * 0.6
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

