import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useState, useEffect, useCallback,  useImperativeHandle} from 'react';
import Colors, {whiteLabel} from '../../../../../constants/Colors';
import {Fonts} from '../../../../../constants';
import {useSelector} from 'react-redux';
import DynamicForm from '../../../../../components/common/DynamicForm';
import {reverseGeocoding} from '../../../../../actions/google.action';
import {checkIfQuestionIsTrigger} from '../../../Forms/questions/helper';

const CustomMasterFields = React.forwardRef((props, ref) => {
  
  const {
    leadForms,
    fieldOptionFilters,
    customMasterFields,
    accuracyUnit,
    useGeoLocation,
    onChangedCustomMasterFields,
  } = props;

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const actionFormRef = useRef();
  const actionFormRef2 = useRef();
  const [formData1, setFormData1] = useState({});
  const [formStructure1, setFormStructure1] = useState([]);
  const [formData2, setFormData2] = useState({});
  const [formStructure2, setFormStructure2] = useState([]);
  const [updatedLeadForm, setUpdatedLeadForm] = useState([]);

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
    if (actionFormRef) {
      if (!actionFormRef.current.validateForm()) {
        isValid = false;
      }
    }
    if (actionFormRef2) {
      if (!actionFormRef2.current.validateForm()) {
        isValid = false;
      }
    }
    return isValid;
  };

  useEffect(() => {
    initData(leadForms, 'first');
    initData(leadForms, 'second');
    setUpdatedLeadForm(leadForms);
  }, [leadForms]);

  const initData = (leadForms, type) => {

    var renderForms = [];
    if (type == 'first') {
      renderForms = leadForms.filter((item, index) => index == 0);
    }else if( type == 'second'){
      renderForms = leadForms.filter((item, index) => index != 0);
    }    
    const tmpFormData = {};

    renderForms.forEach(field => {
      var value = field.value;
      if (field.field_type === 'dropdown_input') {
        if (
          field.value != null &&
          field.value != '' &&
          field.dropdown_value != undefined
        ) {
          value = {value: field.dropdown_value, secondValue: field.value};
        }
      }
      if (
        customMasterFields != undefined &&
        customMasterFields[field.custom_master_field_id] != undefined
      ) {
        tmpFormData[field.custom_master_field_id] =
          customMasterFields[field.custom_master_field_id];
      } else {
        tmpFormData[field.custom_master_field_id] = value;
      }
    });

    if (type == 'first') {
      setFormData1(tmpFormData);
    } else {
      setFormData2(tmpFormData);      
    }

    onChangedCustomMasterFields({...formData1, ...formData2, ...tmpFormData});

    const dynamicFields = renderForms.map((field, index) => {
      var value = field.value;
      if (
        (field.field_type == 'dropdown' ||
          field.field_type == 'dropdown_input' ||
          field.field_type == 'multi_select') &&
        field.preset_options != undefined
      ) {
        
        var items = [];
        var fieldOptions = getFieldOption(field.custom_master_field_id);
        if(fieldOptions != null){
          fieldOptions.forEach(element => {
            items.push({label: element, value: element});
          });
        }else{
          if (field.preset_options != undefined && field.preset_options != '') {
            field.preset_options.forEach(element => {
              items.push({label: element, value: element});
            });
          }
        }
        field = {
          ...field,
          items: items,
        };
      }

      return {
        ...field,
        key: index,
        field_name: field.custom_master_field_id,
        initial_value: field.value,
        editable: field.rule_editable,
        is_required: field.rule_compulsory === '1' || field.rule_compulsory === 1,
        field_label: field.field_name,
        value: value,
      };
    });

    if (type == 'first') {
      setFormStructure1(dynamicFields);
    } else {
      addValue(formData2, dynamicFields);
      let filterTriggerFields = filterTriggerForm(dynamicFields);
      setFormStructure2(filterTriggerFields);
    }
  };

    
  const getFieldOption = useCallback(
    (field_id) => {      
      if(fieldOptionFilters != undefined && fieldOptionFilters != ''){        
        for(let key of Object.keys(fieldOptionFilters)){
          if(field_id == key){
            return fieldOptionFilters[key];
          }
        }    
      }    
      return null;
    },
    [fieldOptionFilters],
  );
  
  const addValue = (formData, formStructure2) => {
    for (let key of Object.keys(formData)) {
      formStructure2.map(element => {
        if (element.field_name == key) {
          element.value = formData[key];
        }
        return element;
      });
    }
  };

  const filterTriggerForm = formStructure2 => {
    let formStructure = [];
    for (let i = 0; i < formStructure2.length; i++) {
      const isShow = checkIfQuestionIsTrigger(
        formStructure2[i],
        formStructure2,
        'form',
      );
      formStructure2[i].isHidden = !isShow;
      formStructure.push(formStructure2[i]);
    }
    return formStructure;    
  };

  const renderUseCurrentLocation = key => {
    return (
      <TouchableOpacity
        style={[
          styles.linkBox,
          {marginTop: 15, marginBottom: 5, justifyContent: 'center'},
        ]}
        key={key + 100}
        onPress={async () => {
          if (currentLocation) {
            var leadForms = addValueToLeadForm(formData1, updatedLeadForm);
            leadForms = addValueToLeadForm(formData2, leadForms);
            var masterFields = await reverseGeocoding(
              currentLocation,
              leadForms,
            );
            if (masterFields.length > 0) {
              initData(masterFields, 'first');
              initData(masterFields, 'second');
              useGeoLocation();
              _validateForm();
            }
          }
        }}>
        <Text style={[styles.linkBoxText, {flex: 1}]}>
          Use Current Geo Location
        </Text>
        <View style={{position: 'absolute', right: 0}}>
          <Text style={{color: Colors.disabledColor, fontSize: 11}}>
            Accuracy{' '}
            {accuracyUnit === 'm'
              ? parseInt(currentLocation.accuracy)
              : parseInt(currentLocation.accuracy * 3.28084)}{' '}
            {accuracyUnit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addValueToLeadForm = (formData, updatedLeadForm) => {
    var leadForms = [...updatedLeadForm];
    for (let key of Object.keys(formData)) {
      leadForms.map(element => {
        if (element.custom_master_field_id == key) {
          element.value = formData[key];
        }
        return element;
      });
    }
    return leadForms;
  };

  return (
    <View>
      <DynamicForm
        ref={actionFormRef}
        formData={formData1}
        isShowRequiredFromBegining={true}
        formStructureData={formStructure1}
        updateFormData={formData => {
          setFormData1(formData);
          onChangedCustomMasterFields({...formData, ...formData2});
        }}
      />

      {renderUseCurrentLocation()}

      <DynamicForm
        ref={actionFormRef2}
        formData={formData2}
        isShowRequiredFromBegining={true}
        formStructureData={formStructure2}
        updateFormData={ (formData , fieldName) => {
          setFormData2(formData);
          addValue(formData, formStructure2);
          let filterTriggerFields = filterTriggerForm(formStructure2);
          setFormStructure2(filterTriggerFields);
          onChangedCustomMasterFields({...formData1, ...formData} , fieldName);
        }}
        updateSecondFormData={formData => {
          setFormData2(formData);
          onChangedCustomMasterFields({...formData1, ...formData});
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    marginBottom: 8,
  },

  linkBox: {
    position: 'relative',
    marginBottom: 8,
  },

  linkBoxText: {
    color: whiteLabel().mainText,
    fontFamily: Fonts.secondaryMedium,
    textDecorationLine: 'underline',
    textDecorationColor: whiteLabel().mainText,
    textAlign: 'center',
  },
});

export default CustomMasterFields;
