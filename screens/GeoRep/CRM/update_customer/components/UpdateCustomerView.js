import { View, Dimensions ,ScrollView } from 'react-native'
import React from 'react'
import AddLeadMap from '../../add_lead/components/AddLeadMap'
import CustomMasterFields from '../../add_lead/components/CustomMasterFields';

export default function UpdateCustomerView(props) {
    
    const { leadForms ,customMasterFields ,accuracyUnit ,useGeoLocation ,onChangedCustomMasterFields } = props;    

    return (
        <ScrollView style={{height:Dimensions.get('screen').height * 0.72 , marginTop:10}}> 
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
                </View>
            </View>

        </ScrollView>
    )
}

