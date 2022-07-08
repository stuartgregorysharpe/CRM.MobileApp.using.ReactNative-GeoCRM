
import { View, Text } from 'react-native'
import React from 'react'

export default function AddLeadFormFields() {    
  return (    
    <View style={{ marginBottom: 10 }}>
        <View style={{ borderBottomColor: whiteLabel().fieldBorder, borderBottomWidth: 1, marginVertical: 10 }}>
          <Text style={{ fontFamily: Fonts.secondaryBold, color: whiteLabel().mainText }}>Other</Text>
        </View>
        <TouchableOpacity style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: compulsaryFormExist ? Colors.selectedRedColor : whiteLabel().fieldBorder,
          borderRadius: 5, flexDirection: 'row',
          backgroundColor: Colors.whiteColor,
          paddingHorizontal: 10,
        }}
          onPress={() => {
            isCompulsoryFormExist();
            setCanShowaddLeadForms(!canShowAddLeadForms);
          }}>
          <Text style={{ fontSize: 14, fontFamily: Fonts.secondaryBold, color: whiteLabel().fieldBorder }}>Complete Forms</Text>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </TouchableOpacity>
    </View>
  )
}