import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Constants, Fonts} from '../../constants';
import Colors, {whiteLabel} from '../../constants/Colors';
import SvgIcon from '../SvgIcon';

const QuestionButton = props => {
  const {questionButtonType, title} = props;
  const isDone =  questionButtonType == Constants.questionButtonType.QUESTION_BUTTON_DONE ;
  const isDisabled = questionButtonType == Constants.questionButtonType.QUESTION_BUTTON_DISABLED;
  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.inputStyle,
        isDone && {backgroundColor: whiteLabel().actionFullButtonBackground},
        isDisabled && {backgroundColor: Colors.disabledColor},
        props.style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          isDone && {color: whiteLabel().actionFullButtonText},
          isDisabled && {color: Colors.whiteColor},
        ]}>
        { isDisabled ? 'No FSUs to record' : title}
      </Text>

      {
        isDone  && !isDisabled && 
        <SvgIcon icon="Question_Btn_Done" width="20px" height="20px" />
      }
      {
        !isDone && !isDisabled &&
        <SvgIcon icon="Signature_Btn_Right_Arrow" width="13px" height="13px" />
      }

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: whiteLabel().actionOutlineButtonBorder,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  textStyle: {
    marginHorizontal: 10,
    color: whiteLabel().actionOutlineButtonText,
    fontFamily: Fonts.primaryRegular,
  },
});

export default QuestionButton;
