//starter-code
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors, Constants, Fonts} from '../../../../constants';
import MultipleAnswerFeedbackView from './MultipleAnswerFeedbackView';
import SingleAnswerFeedbackView from './SingleAnswerFeedbackView';
import SKUCountFeedbackView from './SKUCountFeedbackView';
import SKUSelectFeedbackView from './SKUSelectFeedbackView';
import YesNoFeedbackView from './YesNoFeedbackView';

const FeedbackItem = props => {
  const {data, isLast} = props;
  if (!data) return null;
  const title = data.question_text;

  const renderFeedBack = () => {
    if (
      data.question_type == Constants.questionType.FORM_TYPE_SKU_COUNT ||
      data.question_type == Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE
    ) {
      return <SKUCountFeedbackView data={data} />;
    }
    if (data.question_type == Constants.questionType.FORM_TYPE_SKU_SELECT) {
      return <SKUSelectFeedbackView data={data} />;
    }
    if (data.question_type == Constants.questionType.FORM_TYPE_YES_NO) {
      return <YesNoFeedbackView data={data} />;
    }
    if (
      data.question_type == Constants.questionType.FORM_TYPE_TEXT ||
      data.question_type == Constants.questionType.FORM_TYPE_MULTIPLE ||
      data.question_type == Constants.questionType.FORM_TYPE_NUMBERS
    ) {
      return <SingleAnswerFeedbackView data={data} />;
    }
    if (data.question_type == Constants.questionType.FORM_TYPE_MULTI_SELECT) {
      return <MultipleAnswerFeedbackView data={data} />;
    }
    return null;
  };
  return (
    <View
      style={[
        styles.container,
        props.style,
        !isLast && {
          borderBottomColor: Colors.lightGreyColor,
          borderBottomWidth: 1,
        },
      ]}>
      <Text style={styles.title}>{title}</Text>
      {renderFeedBack()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 4,
    paddingVertical: 12,
  },
  title: {
    color: Colors.blackColor,
    fontFamily: Fonts.secondaryBold,
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 14,
  },
});

export default FeedbackItem;
