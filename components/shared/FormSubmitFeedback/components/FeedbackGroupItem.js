import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GroupTitle} from '../../../../screens/GeoRep/Forms/questions/partial/GroupTitle';
import FeedbackItem from './FeedbackItem';

const FeedbackGroupItem = props => {
  const {data} = props;
  if (!data) return null;
  const feedbacks = data.data;
  return (
    <View style={[styles.container, props.style]}>
      <GroupTitle
        title={data.title}
        style={{
          paddingHorizontal: 0,
          paddingVertical: 5,
        }}
      />
      {feedbacks.map((feedback, index) => {
        const isLast = index == feedbacks.length - 1;
        return (
          <FeedbackItem
            key={index + 'feedback'}
            data={feedback}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});

export default FeedbackGroupItem;
