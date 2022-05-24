import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from 'react';
import {View, StyleSheet} from 'react-native';
import CTextInput from '../../../../../components/common/CTextInput';
import CDateTimePickerInput from '../../../../../components/common/SelectInput/CDateTimePickerInput';
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';

const ActionForm = React.forwardRef((props, ref) => {
  const {users, formData} = props;
  const descriptionRef = useRef(null);
  const [errors, setErrors] = useState({
    description: false,
    selected_user_id: false,
    due_date: false,
  });
  useEffect(() => {
    setErrors({
      description: false,
      selected_user_id: false,
      due_date: false,
    });
  }, []);
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
  const checkFormFieldValid = (fieldNames, _formData) => {
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
    console.log(_errors);
    console.log(formData);
    setErrors(_errors);
    return valid;
  };
  const _validateForm = () => {
    const valid = checkFormFieldValid([
      'description',
      'selected_user_id',
      'due_date',
    ]);
    return valid;
  };
  const userList = useMemo(() => {
    return users.map(user => {
      return {
        ...user,
        label: user.user_name,
        value: user.user_id,
      };
    });
  });
  return (
    <View style={[styles.container, props.style]}>
      <CTextInput
        ref={descriptionRef}
        label="Details"
        value={formData.description}
        hasError={errors.description}
        onChangeText={text => {
          updateFormData('description', text);
        }}
      />
      <CSingleSelectInput
        placeholder="Select User"
        checkedValue={formData.selected_user_id}
        items={userList}
        hasError={errors.selected_user_id}
        onSelectItem={item => {
          updateFormData('selected_user_id', item.value);
        }}
        containerStyle={{marginTop: 10}}
      />
      <CDateTimePickerInput
        placeholder="Select Due Date"
        value={formData.due_date}
        hasError={errors.due_date}
        onSelectDate={date => {
          updateFormData('due_date', date);
        }}
        containerStyle={{marginTop: 10}}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
});

export default ActionForm;
