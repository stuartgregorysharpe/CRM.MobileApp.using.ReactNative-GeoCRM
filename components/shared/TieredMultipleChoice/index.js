import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import {Constants, Strings} from '../../../constants';
import TieredMultipleChoiceModal from './modals/TieredMultipleChoiceModal';

const TieredMultipleChoice = props => {
  const {item, questionType, formIndex} = props;
  if (!item) return null;
  const multiSelectPhotoModalRef = useRef(null);
  const isCompleted =
    item.completed_data != false &&
    item.completed_data != null &&
    item.completed_data != undefined;
  const questionButtonType =
    item.value != null && item.value != '' ? Constants.questionButtonType.QUESTION_BUTTON_DONE : '';

  const onOpenSKUCountModal = () => {
    if (multiSelectPhotoModalRef && multiSelectPhotoModalRef.current) {
      multiSelectPhotoModalRef.current.showModal();
    }
  };

  const renderContent = formCompleted => {
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={Strings.Tiered_Multiple_Choice}
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

      <TieredMultipleChoiceModal
        item={item}
        title={Strings.Select_Your_Option}
        questionType={questionType}
        formIndex={formIndex}
        ref={multiSelectPhotoModalRef}
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

export default TieredMultipleChoice;
