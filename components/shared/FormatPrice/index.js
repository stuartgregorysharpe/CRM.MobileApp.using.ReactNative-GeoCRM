import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import {Constants, Strings} from '../../../constants';
import FormatPriceModal from './modals/FormatPriceModal';

const FormatPrice = props => {
  const {item, questionType, formIndex} = props;
  if (!item) return null;
  const modalRef = useRef(null);
  const questionButtonType =
    item.value != null && item.value != ''
      ? Constants.questionButtonType.QUESTION_BUTTON_DONE
      : '';

  const onOpenModal = () => {
    if (modalRef && modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const renderContent = () => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={Strings.Format_Price}
        onPress={onOpenModal}
      />
    );
  };

  return (
    <BaseForm
      item={item}
      style={[styles.container, props.style]}
      onItemAction={props.onFormAction}>
      {renderContent()}

      <FormatPriceModal
        item={item}
        questionType={questionType}
        formIndex={formIndex}
        ref={modalRef}
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

export default FormatPrice;
