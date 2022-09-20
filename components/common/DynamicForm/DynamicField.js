import { RuleTester } from 'eslint';
import React from 'react';
import {View} from 'react-native';
import DropdownText from '../../shared/DropdownText';
import TakePhotoView from '../../shared/TakePhotoView';
import { YesNoForm } from '../../shared/YesNoForm';
import CTextInput from '../CTextInput';
import CDateTimePickerInput from '../SelectInput/CDateTimePickerInput';
import CSingleSelectInput from '../SelectInput/CSingleSelectInput';

const DynamicField = props => {
  const {
    field_name,
    field_label,
    field_type,
    is_required,
    editable,
    items,
    value,
    updateFormData,
    updateSecondFormData,
    hasError,
    isFirst,
    index,
    dynamicFieldRef,
    preset_options,
    isClickable,
    isHidden,
    input_label
  } = props;

  const disabled = editable && editable == '0';  

  const renderNumber = () => {
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        hasError={hasError}
        disabled={disabled}
        keyboardType={'decimal-pad'}
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 10}}
      />
    );
  };

  const renderText = () => {
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        hasError={hasError}
        disabled={disabled}
        pointerEvents={disabled ? "none" : "auto"}
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5}}
      />
    );
  };

  const renderEmailText = () => {
    return (
      <CTextInput
        label={field_label}
        key={index}
        dynamicFieldRef={dynamicFieldRef}
        index={index}
        isRequired={is_required}
        value={value}
        keyboardType="email-address"
        hasError={hasError}
        disabled={disabled}
        pointerEvents={disabled ? "none" : "auto"}
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5}}
      />
    );
  };

  const renderDropdown = (mode = 'single') => {
    
    return (
      <CSingleSelectInput
        key={index}
        description={field_label}
        placeholder={'Select ' + field_label}
        checkedValue={value}
        items={items}
        hasError={hasError}
        disabled={disabled}
        isClickable={isClickable}
        mode={mode}
        onPress={() => {
          if (isClickable) {
            props.onPress();
          }
        }}
        onSelectItem={item => {
          
          if(mode === "single"){
            updateFormData(field_name, item.value);
          }else if(mode === "multi"){

            var isData = false;
            if(value != undefined &&  value != '' &&  value != null){
              var check = value.find(element => element === item.value );
              if(check != undefined){
                isData = true;
              }  
            }else{
              isData = false;
            }

            if(isData){
              updateFormData(field_name, value.filter(element => element != item.value));
            }else{
              updateFormData(field_name, [...value, item.value]);
            }
                   
          }
          
        }}
        containerStyle={{marginTop: isFirst ? 0 : 10}}
      />
    );
  };


  const renderDropdownInput = () => {
    return (
      <View>
        <CSingleSelectInput
          key={index}
          description={field_label}
          placeholder={'Select ' + field_label}
          checkedValue={value.value}
          items={items}
          mode={'single'}
          hasError={hasError}
          disabled={disabled}
          isClickable={isClickable}
          onPress={() => {
            if (isClickable) {
              props.onPress();
            }
          }}
          onSelectItem={item => {
            updateSecondFormData(field_name, item.value, value.secondValue);
          }}
          containerStyle={{marginTop: isFirst ? 0 : 10}}
        />

        {value != '' && (
          <CTextInput
            label={field_label + ' Number & Details'}
            key={"dropdown_input" + index}
            dynamicFieldRef={dynamicFieldRef}
            index={index}
            isRequired={true}
            value={value.secondValue}
            hasError={hasError}
            disabled={disabled}
            onChangeText={text => {
              updateSecondFormData(field_name, value.value, text);
            }}
            style={{marginTop: 10}}
          />
        )}
      </View>
    );
  };

  const renderDatePicker = () => {
    return (
      <CDateTimePickerInput
        key={index}
        description={field_label}
        placeholder={'Select ' + field_label}
        value={value}
        hasError={hasError}
        disabled={disabled}
        onSelectDate={date => {
          updateFormData(field_name, date);
        }}
        containerStyle={{marginTop: isFirst ? 0 : 10}}
      />
    );
  };
  const renderTakePhotoView = () => {
    return (
      <TakePhotoView
        key={index}
        isOptimize={true}
        onUpdatePhotos={photos => {
          updateFormData(field_name, photos);
        }}
        disabled={disabled}
        photos={value}
        style={{marginVertical: 24}}
      />
    );
  };

  const renderYesNoView = () =>{

    return (<YesNoForm
          onTakeImage={async (images, type) => {
            if (type === 'yes') {
              
            } else {

            }
          }}
          onPress={(value, type) => {
            updateFormData(field_name, value);
          }}
          key={index}
          item={{question_text:field_label, include_image:[], value:value}}
          >    
    </YesNoForm>)
  }

  const renderDropdownText = () => {
    return (
      <DropdownText
        questionType={field_type}
        item={{question_text:field_label + "s", field_label:field_label,  field_name:field_name, value:value , input_label:input_label}}
        options={preset_options}
        style={{marginHorizontal:0}}
        onFormAction={({type, value}) => {          
          updateFormData(field_name, value);
        }}
      />
    )
  }

  if (!field_type) return null;
  
  if(isHidden != undefined && isHidden == true) return null;
  
  if (field_type == 'text') {
    return renderText();
  }
  if (field_type == 'email'){
    return renderEmailText();
  }
  if (field_type == 'numbers') {
    return renderNumber();
  }
  if (field_type == 'dropdown') {
    return renderDropdown("single");
  }

  if (field_type == 'dropdown_input') {
    return renderDropdownInput();
  }

  if (field_type == 'date') {
    return renderDatePicker();
  }
  if (field_type == 'take_photo') {
    return renderTakePhotoView();
  }
  if (field_type == 'yes_no') {
    return renderYesNoView();
  }

  if(field_type == 'dropdown_text') {
    return renderDropdownText();
  }

  if(field_type == 'multi_select'){
    return renderDropdown("multi");
  }


  return null;
};

export default DynamicField;
