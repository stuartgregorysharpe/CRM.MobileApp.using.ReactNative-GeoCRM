import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, Constants, Fonts, Strings, Values} from '../../../constants';
import {style} from '../../../constants/Styles';

import {SubmitButton} from '../SubmitButton';

const FormatPriceView = props => {
  const dispatch = useDispatch();
  const {item, questionType, formIndex} = props;
  const [formData, setFormData] = useState({});

  const validateForm = () => {};

  const onSubmit = () => {
    if (!validateForm()) {
      return;
    }
    /*const submitValueData = getValueFromFormData(formData, item, formIndex);
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_FORM_SUBMIT,
        value: submitValueData,
      });
    }*/
  };
  useEffect(() => {
    /*const formData = constructFormData(item);
    setFormData(formData);*/
  }, [item]);

  return (
    <View style={[styles.container, props.style]}>
      <SubmitButton
        title={'Submit'}
        style={{marginVertical: 16}}
        onSubmit={() => {
          onSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: Fonts.primaryMedium,
    fontSize: Values.fontSize.xSmall,
    color: Colors.textColor,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  boxContainer: {
    marginTop: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
  },
});

export default FormatPriceView;
