import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react';
import {View, StyleSheet} from 'react-native';
import DynamicField from './DynamicField';

const DynamicForm = React.forwardRef((props, ref) => {
  const {formData, formStructureData} = props;
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const initialErrors = {};
    formStructureData.forEach(fieldStructure => {
      if (fieldStructure.is_required) {
        initialErrors[fieldStructure.field_name] = false;
      }
    });
    setErrors(initialErrors);
  }, [formStructureData]);
  useImperativeHandle(ref, () => ({
    validateForm: () => {
      return _validateForm();
    },
  }));
  const updateFormData = (fieldName, value) => {
    if (props.updateFormData) {
      const _formData = {...formData};
      _formData[fieldName] = value;
      props.updateFormData(_formData);

      if (fieldName) {
        checkFormFieldValid([fieldName], _formData);
      }
    }
  };
  const checkFormFieldValid = (
    fieldNames,
    _formData,
    validateType = 'require',
  ) => {
    let valid = true;
    const data = _formData || formData;
    const _errors = {...errors};
    fieldNames.forEach(fieldName => {
      if (fieldName) {
        if (data[fieldName] == '' || data[fieldName] == null) {
          _errors[fieldName] = true;
          valid = false;
        } else {
          _errors[fieldName] = false;
        }
      }
    });
    setErrors(_errors);
    return valid;
  };
  const _validateForm = () => {
    const requiredFields = [];
    formStructureData.forEach(fieldStructure => {
      if (fieldStructure.is_required) {
        requiredFields.push(fieldStructure.field_name);
      }
    });
    console.log('requiredFields', requiredFields);
    const valid = checkFormFieldValid(requiredFields, null, 'require');
    return valid;
  };
  const renderFields = () => {
    return formStructureData.map((fieldStructure, index) => {
      return (
        <DynamicField
          {...fieldStructure}
          key={index + 'field'}
          updateFormData={updateFormData}
          value={formData[fieldStructure.field_name]}
          hasError={errors[fieldStructure.field_name]}
          isFirst={index == 0}
        />
      );
    });
  };
  return <View style={[styles.container, props.style]}>{renderFields()}</View>;
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
});

export default DynamicForm;
