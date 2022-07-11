import { View, Text, Dimensions ,ScrollView } from 'react-native'
import React from 'react'
import AddLeadMap from './AddLeadMap'
import PrimaryContactFields from './PrimaryContactFields'
import CustomMasterFields from './CustomMasterFields'
import AddLeadFormFields from './AddLeadFormFields'

export default function AddLeadView(props) {
    
    const { leadForms ,customMasterFields ,accuracyUnit ,useGeoLocation ,onChangedCustomMasterFields,onPrimaryContactFields } = props;

    return (
        <ScrollView style={{height:Dimensions.get('screen').height * 0.74 , marginTop:10}}> 
            <View style={{}}>
                <AddLeadMap />
                <View style={{padding:5}}>

                    <CustomMasterFields 
                        leadForms={leadForms}
                        customMasterFields={customMasterFields}
                        accuracyUnit={accuracyUnit}
                        useGeoLocation={useGeoLocation}
                        onChangedCustomMasterFields={onChangedCustomMasterFields}
                    />
                    
                    <PrimaryContactFields 
                    onPrimaryContactFields={onPrimaryContactFields}
                    />

                    <AddLeadFormFields  
                        showFormModal={props.showFormModal}
                        showAllocateModal={props.showAllocateModal}
                        compulsaryFormExist={true}
                    /> 
                </View>
            </View>
        </ScrollView>
    )
}

