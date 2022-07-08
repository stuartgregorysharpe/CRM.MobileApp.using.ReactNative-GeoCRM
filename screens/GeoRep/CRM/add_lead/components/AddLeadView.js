import { View, Text, Dimensions ,ScrollView } from 'react-native'
import React from 'react'
import AddLeadMap from './AddLeadMap'
import PrimaryContactFields from './PrimaryContactFields'
import CustomMasterFields from './CustomMasterFields'
import AddLeadFormFields from './AddLeadFormFields'


export default function AddLeadView(props) {
    const { leadForms ,customMasterFields ,accuracyUnit } = props;
    console.log("Changed eee", leadForms);    
    return (
        <ScrollView style={{height:Dimensions.get('screen').height * 0.8}}> 
            <View style={{}}>
                <AddLeadMap />
                <View style={{padding:5}}>
                    <CustomMasterFields 
                        leadForms={leadForms}
                        customMasterFields={customMasterFields}
                        accuracyUnit={accuracyUnit}
                    />
                    {/* <PrimaryContactFields />
                    <AddLeadFormFields />  */}
                </View>
            </View>            
        </ScrollView>
    )
}

