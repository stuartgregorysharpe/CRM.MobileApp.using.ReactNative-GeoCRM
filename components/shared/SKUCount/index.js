import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import SKUCountCompletedView from './SKUCompletedView';
import QuestionButton from '../QuestionButton';
import SKUCountFormModal from './modals/SKUCountFormModal';
const SKUCount = props => {
  const {item} = props;
  if (!item) return null;
  const skuCountFormModalRef = useRef();
  const isCompleted =
    item.completed_data != false && item.completed_data != null;
  const onOpenSKUCountModal = () => {
    skuCountFormModalRef.current.showModal();
  };

  const renderContent = formCompleted => {
    if (formCompleted) {
      return <SKUCountCompletedView item={item} />;
    }
    return <QuestionButton title={'SKU Count'} onPress={onOpenSKUCountModal} />;
  };

  return (
    <BaseForm
      item={item}
      style={[styles.container, props.style]}
      onItemAction={props.onFormAction}>
      {renderContent(isCompleted)}
      <SKUCountFormModal
        item={item}
        ref={skuCountFormModalRef}
        onButtonAction={props.onFormAction}
      />
    </BaseForm>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
export default SKUCount;
