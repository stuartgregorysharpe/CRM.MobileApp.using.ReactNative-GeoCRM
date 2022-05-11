import {Constants} from '../../../constants';

export function constructFormData(data) {
  const categories = data.categories;
  const value = data.value;
  const formData = {};

  return formData;
}

export function getValueFromFormData(formData, item) {
  const answerData = {};
  return {
    form_answers: [
      {
        form_question_id: item.form_question_id,
        answer: answerData,
      },
    ],
  };
}

export function getQuestionTitle(questionType) {
  return 'Select SKU';
}
