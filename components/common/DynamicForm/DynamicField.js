import React from 'react';
import {View} from 'react-native';
import TakePhotoView from '../../shared/TakePhotoView';
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
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 5}}
      />
    );
  };

  const renderDropdown = () => {
    return (
      <CSingleSelectInput
        key={index}
        description={field_label}
        placeholder={'Select ' + field_label}
        checkedValue={value}
        items={items}
        hasError={hasError}
        disabled={disabled}
        onSelectItem={item => {
          updateFormData(field_name, item.value);
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
          hasError={hasError}
          disabled={disabled}
          onSelectItem={item => {
            updateSecondFormData(field_name, item.value, value.secondValue);
          }}
          containerStyle={{marginTop: isFirst ? 0 : 10}}
        />

        {value != '' && (
          <CTextInput
            label={field_label + ' Number & Details'}
            key={'text' + index}
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
  if (!field_type) return null;
  if (field_type == 'text') {
    return renderText();
  }
  if (field_type == 'numbers') {
    return renderNumber();
  }
  if (field_type == 'dropdown') {
    return renderDropdown();
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
  return null;
};

export default DynamicField;
