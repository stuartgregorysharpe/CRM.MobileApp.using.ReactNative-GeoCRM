import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import SKUCountCompletedView from './SKUCompletedView';
import dummyData from './dummyData.json';
import QuestionButton from '../QuestionButton';
import SKUCountFormModal from './modals/SKUCountFormModal';
import {Constants} from '../../../constants';
export const SKUCount = props => {
  const skuCountFormModalRef = useRef();
  const isCompleted = false;
  const onOpenSKUCountModal = () => {
    skuCountFormModalRef.current.showModal();
  };
  const renderContent = formCompleted => {
    if (formCompleted) {
      return <SKUCountCompletedView {...props} />;
    }
    return <QuestionButton title={'SKU Count'} onPress={onOpenSKUCountModal} />;
  };
  const item = dummyData;
  return (
    <BaseForm item={item} style={[styles.container, props.style]}>
      {renderContent(isCompleted)}
      <SKUCountFormModal ref={skuCountFormModalRef} />
    </BaseForm>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
