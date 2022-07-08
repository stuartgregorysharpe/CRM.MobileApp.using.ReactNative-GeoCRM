import React, {useRef} from 'react';
import { StyleSheet } from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import SKUSelectFormModal from './modals/ProductSelectFormModal';
import { Constants } from '../../../constants';
const Products = props => {

  const {item, questionType, formIndex} = props;

  if (!item) return null;
  const skuSelectFormModalRef = useRef();
  const onOpenSKUCountModal = () => {
    skuSelectFormModalRef.current.showModal();
  };  
  const questionButtonType = item.value != null ? Constants.questionButtonType.QUESTION_BUTTON_DONE : ''
  const renderContent = () => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={questionType == Constants.questionType.FORM_TYPE_PRODUCTS ? 'Products' : 'Product Issues'}
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
        title={questionType == Constants.questionType.FORM_TYPE_PRODUCTS ? 'Products' : 'Product Issues'}
        formIndex={formIndex}
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

export default Products;
