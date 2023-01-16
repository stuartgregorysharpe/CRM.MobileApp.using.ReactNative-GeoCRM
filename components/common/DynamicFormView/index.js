import {StyleSheet, Text, View, Keyboard, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getFormData, getFormStructureData} from './helper';
import {SubmitButton} from '../../shared/SubmitButton';
import DynamicForm from '../DynamicForm';

const DynamicFormView = props => {
  const {page, buttonTitle, fields, isClear} = props;
  if (!fields) return null;

  const addProductRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [formStructure, setFormStructure] = useState([]);
  const [hasTextInput, setKeyboardVisible] = useState(false);
  const [scrollEnabled, setScrollViewEnabled] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('show');
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('hide');
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isClear) {
      setFormData(getFormData(fields, page));
      if (props.updateClear) {
        props.updateClear();
      }
    }
  }, [isClear]);

  useEffect(() => {
    if (!props.value) {
      setFormData(getFormData(fields, page));
    } else {
      setFormData(props.value);
    }

    setFormStructure(getFormStructureData(fields, page));
  }, [fields]);

  const onAdd = () => {
    if (addProductRef.current.validateForm()) {
      if (props.onAdd) {
        props.onAdd(formData);
      }
    } else {
      console.log('not validated');
    }
  };

  return (
    <ScrollView style={[hasTextInput ? {height: 300} : {}]} scrollEnabled={scrollEnabled}>

      <DynamicForm
        ref={addProductRef}
        formData={formData}
        formStructureData={formStructure}
        updateFormData={formData => {
          console.log("form dat => ", formData);
          console.log("form formStructure => ", formStructure);
          setFormData(formData);
        }}
        
        setScrollEnabled={(flag) => {
          setScrollViewEnabled(flag);
        }}

      />

      <SubmitButton
        title={buttonTitle}
        onSubmit={onAdd}
        style={{marginTop: 20}}
      />
    </ScrollView>
  );
};

export default DynamicFormView;

const styles = StyleSheet.create({});
