import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import PosCaptureFormModal from './modals/PosCaptureFormModal';
import {getQuestionTitle} from './helper';
import {Constants} from '../../../constants';
const PosCapture = props => {
  const {item, questionType, formIndex} = props;

  if (!item) return null;
  const posCaptureModalRef = useRef();
  const onOpenPosCaptureModal = () => {
    posCaptureModalRef.current.showModal();
  };

  const questionButtonType =
    item.value != null && item.value != ''
      ? Constants.questionButtonType.QUESTION_BUTTON_DONE
      : '';
  const questionButtonTitle =
    questionButtonType == Constants.questionButtonType.QUESTION_BUTTON_DONE
      ? 'Captured'
      : 'Capture';
  const renderContent = () => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={questionButtonTitle}
        onPress={onOpenPosCaptureModal}
      />
    );
  };

  return (
    <BaseForm
      item={item}
      style={[styles.container, props.style]}
      onItemAction={props.onFormAction}>
      {renderContent()}
      <PosCaptureFormModal
        item={item}
        title={getQuestionTitle(questionType)}
        formIndex={formIndex}
        questionType={questionType}
        ref={posCaptureModalRef}
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
export default PosCapture;
