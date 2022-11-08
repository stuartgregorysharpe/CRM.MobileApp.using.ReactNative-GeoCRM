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
    item.value != null ? Constants.questionButtonType.QUESTION_BUTTON_DONE : '';
  const renderContent = () => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={getQuestionTitle(questionType)}
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
