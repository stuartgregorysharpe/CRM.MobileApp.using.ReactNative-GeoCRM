import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import SKUSelectFormModal from './modals/SKUSelectFormModal';
import {getQuestionTitle} from './helper';
const SKUSelect = props => {
  const {item, questionType} = props;

  if (!item) return null;
  const skuSelectFormModalRef = useRef();
  const onOpenSKUCountModal = () => {
    skuSelectFormModalRef.current.showModal();
  };

  const renderContent = () => {
    return (
      <QuestionButton
        title={getQuestionTitle(questionType)}
        onPress={onOpenSKUCountModal}
      />
    );
  };

  return (
    <BaseForm
      item={item}
      style={[styles.container, props.style]}
      onItemAction={props.onFormAction}>
      {renderContent()}
      <SKUSelectFormModal
        item={item}
        questionType={questionType}
        ref={skuSelectFormModalRef}
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
export default SKUSelect;
