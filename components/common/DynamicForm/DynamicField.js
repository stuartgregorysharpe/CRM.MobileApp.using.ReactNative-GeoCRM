import React from 'react';
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
    hasError,
    isFirst,
    key,
  } = props;

  const disabled = editable && editable == '0';
  const renderText = () => {
    return (
      <CTextInput
        label={field_label}
        key={key}
        isRequired={is_required}
        value={value}
        hasError={hasError}
        disabled={disabled}
        onChangeText={text => {
          updateFormData(field_name, text);
        }}
        style={{marginTop: isFirst ? 0 : 10}}
      />
    );
  };
  const renderDropdown = () => {
    return (
      <CSingleSelectInput
        key={key}
        placeholder={field_label}
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
  const renderDatePicker = () => {
    return (
      <CDateTimePickerInput
        key={key}
        placeholder={field_label}
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
  if (field_type == 'dropdown') {
    return renderDropdown();
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
