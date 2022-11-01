import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import DynamicField from './DynamicField';

const DynamicForm = React.forwardRef((props, ref) => {
  const {formData, formStructureData, isShowRequiredFromBegining} = props;
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const dynamicFieldRef = useRef([]);
  useEffect(() => {
    const initialErrors = {};
    formStructureData.forEach(fieldStructure => {
      if (fieldStructure.is_required) {
        initialErrors[fieldStructure.field_name] = false;
      }
    });
    setErrors(initialErrors);
    if (isShowRequiredFromBegining) {
      _validateForm();
    }
  }, [formStructureData]);
  useImperativeHandle(ref, () => ({
    validateForm: () => {
      return _validateForm();
    },
    getErrorMessages: () => {
      return errorMessages;
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

  const updateSecondFormData = (fieldName, value, secondValue) => {
    if (props.updateSecondFormData) {
      const _formData = {...formData};
      _formData[fieldName] = {value: value, secondValue: secondValue};
      props.updateSecondFormData(_formData);
      if (fieldName) {
        checkFormFieldValid([fieldName], _formData);
      }
    }
  };

  const checkValidRequiredField = value => {
    if (value == '' || value == null) {
      return false;
    }
    return true;
  };
  const getFieldStructureData = fieldName => {
    if (!formStructureData) return null;
    return formStructureData.find(x => x.field_name == fieldName);
  };
  const checkValidRuleCharactersField = (fieldName, value, _errorMessages) => {
    const fieldStructureData = getFieldStructureData(fieldName);

    if (!fieldStructureData) return true;
    const rule_characters = fieldStructureData.rule_characters;
    const questionText = fieldStructureData.field_label;
    console.log('rule_characters', rule_characters);
    console.log('fieldStructureData', fieldStructureData);
    let isValid = true;
    let errorMessage = null;
    if (!rule_characters || rule_characters == '') return true;

    if (rule_characters.includes(',')) {
      const splited = rule_characters.split(',');
      if (splited.length > 1) {
        const characterLengthString = splited[1].trim();
        const operator = splited[0];
        console.log('rule_characters', rule_characters);
        console.log('operator', operator);
        console.log('characterLengthString', characterLengthString);
        if (characterLengthString != '') {
          const characterLength = Number(characterLengthString);
          if (operator == '=') {
            if (
              value &&
              typeof value == 'string' &&
              value.length != characterLength
            ) {
              errorMessage = `${questionText} must have ${characterLength} characters`;
              isValid = false;
              _errorMessages[fieldName] = errorMessage;
            }
          } else if (operator == '>') {
            if (
              value &&
              typeof value == 'string' &&
              value.length <= characterLength
            ) {
              errorMessage = `${questionText} must have longer than ${characterLength} characters`;
              _errorMessages[fieldName] = errorMessage;
              isValid = false;
            }
          } else if (operator == '<') {
            if (
              value &&
              typeof value == 'string' &&
              value.length >= characterLength
            ) {
              errorMessage = `${questionText} must have shorter than ${characterLength} characters`;
              _errorMessages[fieldName] = errorMessage;
              isValid = false;
            }
          }
        }
      }
    }
    console.log('errorMessage', errorMessage);
    console.log('isValid', isValid);
    return isValid;
  };
  const checkFormFieldValid = (fieldNames, _formData) => {
    let valid = true;
    const _errors = {...errors};
    const _errorMessages = {...errorMessages};
    const data = _formData || formData;
    fieldNames.forEach(fieldName => {
      if (fieldName) {
        if (checkValidRequiredField(data[fieldName])) {
          _errors[fieldName] = false;
        } else {
          _errors[fieldName] = true;
          valid = false;
        }
        if (
          !checkValidRuleCharactersField(
            fieldName,
            data[fieldName],
            _errorMessages,
          )
        ) {
          _errors[fieldName] = true;
        } else {
          if (valid) {
            _errors[fieldName] = false;
          }
        }
      }
    });
    setErrors(_errors);
    setErrorMessages(_errorMessages);
    return valid;
  };
  const checkAllowedFieldType = fieldType => {
    const allowedFieldTypes = [
      'text',
      'email',
      'numbers',
      'dropdown',
      'dropdown_input',
      'date',
      'take_photo',
      'yes_no',
      'dropdown_text',
      'multi_select',
    ];
    if (!fieldType) return false;
    return allowedFieldTypes.includes(fieldType);
  };
  const checkFieldNeedToValidate = fieldStructure => {
    const isAllowedField = checkAllowedFieldType(fieldStructure.field_type);
    const isRuleCharacter =
      fieldStructure.rule_characters != '' &&
      fieldStructure.rule_characters != undefined;
    return (
      (fieldStructure.is_required || isRuleCharacter) &&
      fieldStructure.isHidden !== true &&
      isAllowedField
    );
  };
  const _validateForm = () => {
    const validateFields = [];
    formStructureData.forEach(fieldStructure => {
      const isAllowedField = checkAllowedFieldType(fieldStructure.field_type);
      if (checkFieldNeedToValidate(fieldStructure)) {
        validateFields.push(fieldStructure.field_name);
      }
    });

    const valid = checkFormFieldValid(validateFields, null);
    return valid;
  };

  const renderFields = () => {
    if (props.isClickable) {
      return formStructureData.map((fieldStructure, index) => {
        return (
          <TouchableOpacity
            key={'form' + index}
            onPress={() => {
              props.onPress(fieldStructure);
            }}>
            <DynamicField
              {...fieldStructure}
              key={index + 'field'}
              updateFormData={updateFormData}
              updateSecondFormData={updateSecondFormData}
              value={formData[fieldStructure.field_name]}
              hasError={errors[fieldStructure.field_name]}
              isFirst={index == 0}
              isClickable={fieldStructure.isClickable}
              onPress={() => {
                props.onPress();
              }}
              index={index}
              dynamicFieldRef={dynamicFieldRef}
            />
          </TouchableOpacity>
        );
      });
    }

    return formStructureData.map((fieldStructure, index) => {
      return (
        <DynamicField
          {...fieldStructure}
          key={index + 'field'}
          updateFormData={updateFormData}
          updateSecondFormData={updateSecondFormData}
          value={formData[fieldStructure.field_name]}
          hasError={errors[fieldStructure.field_name]}
          isFirst={index == 0}
          index={index}
          dynamicFieldRef={dynamicFieldRef}
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
