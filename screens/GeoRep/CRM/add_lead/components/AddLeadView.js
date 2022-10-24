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
  } = props;
  const customMasterFieldsFormRef = useRef(null);
  useImperativeHandle(
    ref,
    () => ({
      validateForm: () => {
        return _validateForm();
      },
    }),
    [],
  );
  const _validateForm = () => {
    let isValid = true;
    if (customMasterFieldsFormRef) {
      if (!customMasterFieldsFormRef.current.validateForm()) {
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
  );
});

export default AddLeadView;
