
import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React , { useState , useEffect } from 'react'
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';
import SvgIcon from '../../../../../components/SvgIcon';
import { useSelector } from 'react-redux';

export default function AddLeadFormFields(props) {

  const { showFormModal , showAllocateModal} = props  
  const features = useSelector(state => state.selection.payload.user_scopes.geo_rep.features);
  const [isAllocateDevices , setIsAllocateDevices] = useState(false);
  
  useEffect(() => {
    let isMount = true;
    if(features.includes("location_specific_devices")){
      setIsAllocateDevices(true)
    }
    return () => {
      isMount = false;
    };
  }, [features])

  return (
    <View style={{ marginBottom: 10 , marginHorizontal:10 }}>
        <View style={{ borderBottomColor: whiteLabel().fieldBorder, borderBottomWidth: 1, marginVertical: 10 }}>
          <Text style={{ fontFamily: Fonts.secondaryBold, color: whiteLabel().mainText }}>Other</Text>
        </View>

        <TouchableOpacity style={styles.btnStyles}
          onPress={() => {
            showFormModal();
          }}>
          <Text style={{ fontSize: 14, fontFamily: Fonts.secondaryBold, color: whiteLabel().fieldBorder }}>Complete Forms</Text>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />          
        </TouchableOpacity> 

        {
          isAllocateDevices &&
          <TouchableOpacity style={[styles.btnStyles , {marginTop:15}]}
            onPress={() => {
              showAllocateModal();
            }}>
            <Text style={{ fontSize: 14, fontFamily: Fonts.secondaryBold, color: whiteLabel().fieldBorder }}>Allocate Devices</Text>
            <SvgIcon icon="Drop_Down" width='23px' height='23px' />          
          </TouchableOpacity> 
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
  btnStyles:{
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: whiteLabel().fieldBorder,
    borderRadius: 5, flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 10,
  }
})