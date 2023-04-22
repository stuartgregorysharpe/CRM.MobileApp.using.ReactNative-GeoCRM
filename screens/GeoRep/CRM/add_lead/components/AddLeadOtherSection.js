import {View, Text} from 'react-native';
import React from 'react';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {Fonts, Strings} from '../../../../../constants';
import {useSelector} from 'react-redux';
import AddLeadButton from './AddLeadButton';

export default function AddLeadOtherSection(props) {

  const {showFormModal, showAllocateModal, showSimViewModal, isValidOtherForms , isValidateAllocateDevice , isValidateRICA} = props;

  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );  
  const isAllocateDevices = features.includes('location_specific_devices');
    
  return (
    <View style={{marginBottom: 10, marginHorizontal: 10}}>
      <View
        style={{
          borderBottomColor: whiteLabel().fieldBorder,
          borderBottomWidth: 1,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: Fonts.secondaryBold,
            color: whiteLabel().mainText,
          }}>
          Other
        </Text>
      </View>

      <AddLeadButton 
        onPress={showFormModal}
        hasData={isValidOtherForms}
        title={Strings.CRM.Complete_Forms} />

      {
        isAllocateDevices && 
        <AddLeadButton 
          onPress={showAllocateModal}
          style={{marginTop:10}}
          hasData={isValidateAllocateDevice}
          title={Strings.Stock.Allocate_Device} />
      }
      
      {
        isAllocateDevices && 
        <AddLeadButton 
          onPress={showSimViewModal}
          style={{marginTop:10}}
          hasData={isValidateRICA}
          title={Strings.CRM.Allocate_RICA} />      
      }

    </View>
  );
}
