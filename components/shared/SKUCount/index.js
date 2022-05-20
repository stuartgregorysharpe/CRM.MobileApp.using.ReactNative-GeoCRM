import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import SKUCountCompletedView from './SKUCompletedView';
import QuestionButton from '../QuestionButton';
import SKUCountFormModal from './modals/SKUCountFormModal';
import {getQuestionTitle} from './helper';
const SKUCount = props => {
  const {item, questionType, formIndex} = props;
  if (!item) return null;
  const skuCountFormModalRef = useRef(null);
  const isCompleted =
    item.completed_data != false && item.completed_data != null;
  const onOpenSKUCountModal = () => {
    console.log("onOpenSKUCountModal",skuCountFormModalRef)
    skuCountFormModalRef.current.showModal();
  };

  const renderContent = formCompleted => {
    if (formCompleted) {
      return <SKUCountCompletedView item={item} />;
    }
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
      {renderContent(isCompleted)}
      <SKUCountFormModal
        item={item}
        questionType={questionType}
        formIndex={formIndex}
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
