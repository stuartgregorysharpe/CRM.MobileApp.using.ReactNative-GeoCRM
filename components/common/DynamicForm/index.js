import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import DynamicField from './DynamicField';
import { checkRuleCharactersAddLead } from './helper';

const DynamicForm = React.forwardRef((props, ref) => {

  const {formData, formStructureData, isShowRequiredFromBegining} = props;
  const [errors, setErrors] = useState({});
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
  }));
  const updateFormData = (fieldName, value) => {
    if (props.updateFormData) {
      const _formData = {...formData};
      _formData[fieldName] = value;
      props.updateFormData(_formData , fieldName );
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

  const checkFormFieldValid = (
    fieldNames,
    _formData,
    validateType = 'require',
  ) => {
    let valid = true;
    const data = _formData || formData;
    const _errors = {...errors};

    console.log("field names", fieldNames);
    console.log("form data", _formData);

    fieldNames.forEach(fieldName => {
      if (fieldName) {
        const objData = data[fieldName];
        if(typeof(data[fieldName]) != 'string' && objData != undefined && objData.secondValue != undefined){ // Object          
          if(objData.secondValue != undefined && objData.secondValue != '' && objData.secondValue != null 
          && objData.value != undefined && objData.value != '' && objData.value != null) {            
          }else{
            _errors[fieldName] = true;
            valid = false;
          }          
        }else if (data[fieldName] == '' || data[fieldName] == null || (fieldName == 'price' && (data[fieldName].value == '' || data[fieldName].type == '')  ) ) {
          _errors[fieldName] = true;
          valid = false;
          console.log('Error fieldName', fieldName);
        } else {
          const item = formStructureData.find(element => element.custom_master_field_id == fieldName);
          if(item != undefined){            
            const error = checkRuleCharactersAddLead(item, data[fieldName]);            
            if(error){
              _errors[fieldName] = true; 
              _errors[fieldName] = {status: true, errorText: error};
              valid = false;
            }else{              
              _errors[fieldName] = false;              
            }
          }else{
            _errors[fieldName] = false;            
          }
          
        }
      }
    });

    // check rule character       
    setErrors(_errors);    
    return valid;        
  };

  const checkAllowedFieldType = fieldType => {

    const allowedFieldTypes = [
      'text',
      'textarea',
      'textarea',
      'email',
      'numbers',
      'dropdown',
      'dropdown_input',
      'date',
      'take_photo',
      'yes_no',
      'dropdown_text',
      'multi_select',
      'contact_email',
      'contact_select',
      'email_input',
      'multiple',
      'signature',
      'price'
    ];
    if (!fieldType) return false;
    return allowedFieldTypes.includes(fieldType);
  };

  const _validateForm = () => {
    const requiredFields = [];    
    formStructureData.forEach(fieldStructure => {
      const isAlowedField = checkAllowedFieldType(fieldStructure.field_type);
      
      if (
        (fieldStructure.rule_compulsory == undefined || (fieldStructure.rule_compulsory != undefined && fieldStructure.rule_compulsory == '1') )  &&
        fieldStructure.is_required &&
        fieldStructure.isHidden != true &&
        isAlowedField
      ) {
        
        requiredFields.push(fieldStructure.field_name);
      }
    });

    const valid = checkFormFieldValid(requiredFields, null, 'require');
    return valid;
  };

  const renderFields = () => {

    if (props.isClickable) {
      return formStructureData.map((fieldStructure, index) => {
        return (
          <TouchableOpacity
            key={'form' + index}
            onPress={() => {
              if(props.onPress){
                props.onPress(fieldStructure);
              }              
            }}>
            <DynamicField
              {...fieldStructure}
              key={index + 'field'}
              updateFormData={updateFormData}
              updateSecondFormData={updateSecondFormData}
              value={formData[fieldStructure.field_name]}              
              hasError={ errors[fieldStructure.field_name] != undefined && errors[fieldStructure.field_name].status != undefined ? errors[fieldStructure.field_name].status : errors[fieldStructure.field_name]}
              errorText={errors[fieldStructure.field_name] ? errors[fieldStructure.field_name].errorText : null}
              add_prefix={fieldStructure.add_prefix}
              add_suffix={fieldStructure.add_suffix}
              rule_compulsory={fieldStructure.rule_compulsory}
              isFirst={index == 0}
              isClickable={fieldStructure.isClickable}
              onPress={() => {
                console.log("trig")
                if(props.onPress){
                  props.onPress(fieldStructure);
                }                
              }}
              index={index}
              dynamicFieldRef={dynamicFieldRef}
              setScrollEnabled={(flag) => {
                if(props.setScrollEnabled){
                  props.setScrollEnabled(flag);
                } 
              }}
              onNoData={(item) => {
                if(props.onNoData){
                  props.onNoData(item);
                }
              }}
              
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
          hasError={ errors[fieldStructure.field_name] != undefined && errors[fieldStructure.field_name].status != undefined ? errors[fieldStructure.field_name].status : errors[fieldStructure.field_name]}
          errorText={errors[fieldStructure.field_name] ? errors[fieldStructure.field_name].errorText : null}
          add_prefix={fieldStructure.add_prefix}
          add_suffix={fieldStructure.add_suffix}
          rule_compulsory={fieldStructure.rule_compulsory}
          isFirst={index == 0}
          index={index}
          dynamicFieldRef={dynamicFieldRef}
          setScrollEnabled={(flag) => {
            if(props.setScrollEnabled){
              props.setScrollEnabled(flag);
            } 
          }}
          onPress={() => {
            if(props.onPress){
              props.onPress(fieldStructure);
            }                
          }}
          onNoData={(item) => {
            if(props.onNoData){
              props.onNoData(item);
            }
          }}
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
