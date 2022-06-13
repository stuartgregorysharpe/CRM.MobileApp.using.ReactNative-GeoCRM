import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Constants, Values} from '../../../../constants';
import {style} from '../../../../constants/Styles';
import {SubmitButton} from '../../SubmitButton';
import FeedbackGroupItem from '../components/FeedbackGroupItem';
import OverallScoreView from '../components/OverallScoreView';
import {groupByFeedbacksWithQuestionGroup} from '../helper';

const FormSubmitFeedbackContainer = props => {
  const {data, isShowInScreen} = props;
  if (!data) return null;
  const feedbackGroups = useMemo(() => {
    return groupByFeedbacksWithQuestionGroup(data.feedback);
  }, [data]);
  const overallScore = Number(data.overall_score);
  const renderFeedbacks = feedbackGroupData => {
    if (!feedbackGroupData) return null;
    return feedbackGroupData.map((feedbackGroup, index) => {
      return (
        <FeedbackGroupItem
          key={index + 'feedback-group'}
          data={feedbackGroup}
        />
      );
    });
  };

  const onSubmit = () => {
    if (props.onButtonAction) {
      props.onButtonAction({
        type: Constants.actionType.ACTION_DONE,
      });
    }
  };
  if (isShowInScreen) {
    return (
      <View style={[styles.container, props.style]}>
        <View
          style={[
            style.cardContainer,
            {paddingBottom: 24, marginHorizontal: 8},
          ]}>
          <OverallScoreView overallScore={overallScore} />
          {renderFeedbacks(feedbackGroups)}
        </View>
        <SubmitButton
          title={'Back'}
          style={{marginTop: 16, marginBottom: 30, marginHorizontal: 8}}
          onSubmit={() => {
            onSubmit();
          }}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[style.cardContainer, {paddingBottom: 24, marginHorizontal: 8}]}>
        <ScrollView
          style={{
            maxHeight: Values.deviceHeight * 0.65,
            alignSelf: 'stretch',
          }}>
          <OverallScoreView overallScore={overallScore} />

          {renderFeedbacks(feedbackGroups)}
        </ScrollView>
      </View>

      <SubmitButton
        title={'Done'}
        style={{marginTop: 16, marginBottom: 30, marginHorizontal: 8}}
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
  },
});

export default FormSubmitFeedbackContainer;
