import {View, Dimensions, ScrollView} from 'react-native';
import React, {useImperativeHandle, useRef} from 'react';
import AddLeadMap from './AddLeadMap';
import PrimaryContactFields from './PrimaryContactFields';
import CustomMasterFields from './CustomMasterFields';
import AddLeadFormFields from './AddLeadFormFields';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';

const AddLeadView = React.forwardRef((props, ref) => {
  const {
    leadForms,
    customMasterFields,
    accuracyUnit,
    useGeoLocation,
    onChangedCustomMasterFields,
    onPrimaryContactFields,
    isValidOtherForms,
    isValidateAllocateDevice,
  } = props;

  console.log("customMasterFields",leadForms )
  const customMasterFieldsFormRef = useRef(null);
  const primaryContactFieldsRef = useRef(null);
  useImperativeHandle(
    ref,
    () => ({
      validateForm: async () => {
        return await _validateForm();
      },
    }),
    [],
  );
  const _validateForm = async () => {
    let isValid = true;
    if (customMasterFieldsFormRef) {
      if (!customMasterFieldsFormRef.current.validateForm()) {
        isValid = false;
      }
    }
    if (primaryContactFieldsRef) {
      console.log('primaryContactFieldsRef');
      const isPrimaryValid =
        await primaryContactFieldsRef.current.validateForm();
      console.log('primaryContactFieldsRef Valid', isPrimaryValid);
      if (!isPrimaryValid) {
        isValid = false;
      }
    }
    return isValid;
  };
  return (
    <ScrollView
      style={{height: Dimensions.get('screen').height * 0.7, marginTop: 10}}>
      <View style={{}}>
        <AddLeadMap />
        <View style={{padding: 5}}>
          
          <CustomMasterFields
            ref={customMasterFieldsFormRef}
            leadForms={leadForms}
            customMasterFields={customMasterFields}
            accuracyUnit={accuracyUnit}
            useGeoLocation={useGeoLocation}
            onChangedCustomMasterFields={onChangedCustomMasterFields}
          />

          <PrimaryContactFields
            ref={primaryContactFieldsRef}
            onPrimaryContactFields={onPrimaryContactFields}
          />

          <AddLeadFormFields
            showFormModal={props.showFormModal}
            showAllocateModal={props.showAllocateModal}
            isValidOtherForms={isValidOtherForms}
            isValidateAllocateDevice={isValidateAllocateDevice}
          />
        </View>
      </View>
    </ScrollView>
  );
});

export default AddLeadView;
