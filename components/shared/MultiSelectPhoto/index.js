import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import BaseForm from '../BaseForm';
import QuestionButton from '../QuestionButton';
import { Constants, Strings } from '../../../constants';
import MultiSelectPhotoModal from './modals/MultiSelectPhotoModal';

const MultiSelectPhoto = props => {

  const {item, questionType, formIndex , submissionType} = props;
  if (!item) return null;
  const multiSelectPhotoModalRef = useRef(null);
  const isCompleted =
    item.completed_data != false && item.completed_data != null && item.completed_data != undefined;
  const questionButtonType = item.value != null && item.value != "" ? Constants.questionButtonType.QUESTION_BUTTON_DONE : ''

  const onOpenSKUCountModal = () => {
    if (multiSelectPhotoModalRef && multiSelectPhotoModalRef.current) {
      multiSelectPhotoModalRef.current.showModal();
    }
  };

  const renderContent = formCompleted => {    
    return (
      <QuestionButton
        questionButtonType={questionButtonType}
        title={Strings.Multi_Select_Photo}
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
      <MultiSelectPhotoModal
        item={item}
        questionType={questionType}
        formIndex={formIndex}
        submissionType={submissionType}
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

export default MultiSelectPhoto;
