import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React , { useState } from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';
import CardView from '../../../../../components/common/CardView';
import CTextInput from '../../../../../components/common/CTextInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DropdownInput from '../../../../../components/common/DropdownInput/DropdownInput';
import TakePhotoView from '../../../../../components/shared/TakePhotoView';
import { Constants, Strings } from '../../../../../constants';
import { validateMsisdn } from '../../../../../helpers/formatHelpers';
var previousText = Constants.msisdnPrefix;


export default function SwopAtTraderView(props) {
  
  const {item , lists , onReturnDevice, onReason, onPhotos, onSwop} = props;    
  const [reason, setReason] = useState("");
  const [reasonLists , setReasonLists] = useState([{value:'Damaged' , label: 'Damaged'} ,  {value:'Faulty' , label: 'Faulty'} , {value:'Used' , label: 'Used'}])
  const [msisdn, setMsisdn] = useState(Constants.msisdnPrefix);
  const [photos, setPhotos] = useState([]);
  const [enabled, setEnabled] = useState(false)
  const [device, setDevice] = useState('');
  const [hasMsisdnError , setHasMsisdnError] = useState(false)

  const checkEnabled = (device, reason, photos) =>{
    if( validateMsisdn(msisdn) && device != null && reason != '' && photos.length > 0  ){
      setEnabled(true)
    }else{
      setEnabled(false)
    }
  }
  
  return (
    <ScrollView style={styles.container}>
                  
          <AppText title="Return Device" type="secondaryBold" size="medium"></AppText>
            <DropdownInput            
              title="Select Device"            
              lists={lists}              
              onItemSelected={(item) => {                
                onReturnDevice(item);
                setDevice(item)
                checkEnabled(item, reason, photos);
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
                  checkEnabled(device, item.label, photos);
              }}
              containerStyle={{marginTop: 15}}
          /> 
          
          
          <TakePhotoView
              isOptimize={true}
              onUpdatePhotos={photos => {                
                setPhotos(photos);
                onPhotos(photos);
                checkEnabled(device, reason, photos);
              }}
              disabled={false}
              photos={photos}
              style={{marginVertical: 24}}
          />              

          <AppText title={Strings.Stock.Allocate_Device} type="secondaryBold" size="medium"></AppText>

          <CardView style={{ marginTop:10, borderColor:whiteLabel().borderColor, borderWidth:1}}>
              <View style={{padding:5}}>
                  <AppText size="medium" type="secondaryBold" title={item != undefined ? item.description :  ''} color={whiteLabel().mainText}></AppText>
                  <AppText title={item != undefined ? "IMEI: " + item.serial : "IMEI: "} color={whiteLabel().subText}></AppText>
              </View>
          </CardView>


          <CTextInput                 
              label={Strings.Assign_Msisdn}
              value={msisdn}
              returnKeyType={'done'}                                        
              keyboardType={'number-pad'}
              isRequired={true}            
              maxLength={11}
              hasError={hasMsisdnError}
              errorText={Strings.MSISDN_Error_Message}
              onChangeText={text => {
                if(text.length <= 2){
                  setMsisdn(Constants.msisdnPrefix)
                }else{
                  if( text.startsWith(Constants.msisdnPrefix) ){
                      setMsisdn(text)
                      previousText = text;
                  }else{
                      setMsisdn(previousText)
                  }                                    
                }                              
                if(validateMsisdn(text)){
                  setHasMsisdnError(false)
                }
              }}              
              onBlur={() => {
                if(!validateMsisdn(msisdn)){
                  setHasMsisdnError(true);
                }             
              }}
              style={{marginTop:10  , }}
          />
          
          {            
            <SubmitButton title={Strings.Stock.Add_Stock} style={{marginTop:10 , marginBottom:30}} onSubmit={() =>{
              if(!validateMsisdn(msisdn)){
                setHasMsisdnError(true);
                return;
              }
              if( device != null && reason != '' && photos.length > 0  ){
                onSwop();
              }
            }}></SubmitButton>          
          }
          
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      marginTop:8,
      paddingTop: 10,
      marginHorizontal: 20,      
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

