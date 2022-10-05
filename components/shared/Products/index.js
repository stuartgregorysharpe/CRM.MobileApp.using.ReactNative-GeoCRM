import React, {useRef} from 'react';
import { StyleSheet } from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import ProductSelectFormModal from './modals/ProductSelectFormModal';
import { Constants } from '../../../constants';
import ProductReturnFormModal from './modals/ProductReturnFormModal';

const Products = props => {

  const {item, questionType, formIndex} = props;
  if (!item) return null;
  const productSelectFormModalRef = useRef();
  const productReturnFormModalRef = useRef();

  const onOpenSKUCountModal = () => {

    if(questionType == Constants.questionType.FORM_TYPE_PRODUCTS || questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES){
      productSelectFormModalRef.current.showModal();
    }else if(questionType == Constants.questionType.FORM_TYPE_PRODUCT_RETURN){
      productReturnFormModalRef.current.showModal();
    }        
  };

  const questionButtonType = item.value != null && item.value != "" ? Constants.questionButtonType.QUESTION_BUTTON_DONE : ''

  const renderTitle = () =>{
    if(questionType == Constants.questionType.FORM_TYPE_PRODUCTS ){
      return "Products";
    }else if(questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES ){
      return "Product Issues";
    }else if(questionType == Constants.questionType.FORM_TYPE_PRODUCT_RETURN){
      return "Product Returns";      
    }
  }
  
  const renderContent = () => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={renderTitle()}
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

      <ProductSelectFormModal
        item={item}
        title={questionType == Constants.questionType.FORM_TYPE_PRODUCTS ? 'Products' : 'Product Issues'}
        formIndex={formIndex}
        questionType={questionType}
        ref={productSelectFormModalRef}
        onButtonAction={props.onFormAction}
      />

      <ProductReturnFormModal
        item={item}
        title={'Product Returns'}
        formIndex={formIndex}
        questionType={questionType}
        ref={productReturnFormModalRef}
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
