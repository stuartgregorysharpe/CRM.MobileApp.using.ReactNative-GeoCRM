import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import SKUCountCompletedView from './SKUCompletedView';
import dummyData from './dummyData.json';
import QuestionButton from '../QuestionButton';
export const SKUCount = props => {
  const isCompleted = false;
  const onOpenSKUCountModal = () => {};
  const renderContent = formCompleted => {
    if (formCompleted) {
      return <SKUCountCompletedView {...props} />;
    }
    return (
      <QuestionButton title={'SKU Count'} onSubmit={onOpenSKUCountModal} />
    );
  };
  const item = dummyData;
  return (
    <BaseForm item={item} style={[styles.container, props.style]}>
      {renderContent(isCompleted)}
    </BaseForm>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
