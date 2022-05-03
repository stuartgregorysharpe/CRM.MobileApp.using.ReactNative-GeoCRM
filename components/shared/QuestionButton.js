import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Constants, Fonts} from '../../constants';
import {whiteLabel} from '../../constants/Colors';
import SvgIcon from '../SvgIcon';

const QuestionButton = props => {
  const {questionButtonType, title} = props;
  const isDone =
    questionButtonType == Constants.questionButtonType.QUESTION_BUTTON_DONE;
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
        props.style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          isDone && {color: whiteLabel().actionFullButtonText},
        ]}>
        {title}
      </Text>
      {isDone ? (
        <SvgIcon icon="Question_Btn_Done" width="20px" height="20px" />
      ) : (
        <SvgIcon icon="Signature_Btn_Right_Arrow" width="13px" height="13px" />
      )}
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
