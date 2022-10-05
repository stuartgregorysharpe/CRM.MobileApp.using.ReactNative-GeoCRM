import {View, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import AddLeadMap from './AddLeadMap';
import PrimaryContactFields from './PrimaryContactFields';
import CustomMasterFields from './CustomMasterFields';
import AddLeadFormFields from './AddLeadFormFields';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function AddLeadView(props) {
  const {
    leadForms,
    customMasterFields,
    accuracyUnit,
    useGeoLocation,
    onChangedCustomMasterFields,
    onPrimaryContactFields,
  } = props;

  const onAdd = () => {

  }

  return (
    <ScrollView
      style={{height: Dimensions.get('screen').height * 0.7, marginTop: 10}}>
      <View style={{}}>
        <AddLeadMap />
        <View style={{padding: 5}}>

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
      
          {/* <SubmitButton
            style={{marginHorizontal: 10, marginBottom: Platform.OS == 'android' ? 10 : 20, marginTop:10 }}
            title={'Add'}
            onSubmit={onAdd}
          /> */}
          
        </View>
      </View>
    </ScrollView>
  );
}
