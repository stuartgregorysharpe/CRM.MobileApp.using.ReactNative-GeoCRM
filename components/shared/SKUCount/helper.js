import {Constants} from '../../../constants';

export function constructFormData(data) {
  const categories = data.categories || [];
  const value = data.value;
  const formData = {};
  categories.forEach(category => {
    const competitorData = data.competitors[category];
    let competitorAnswerData = {};
    const isInitialAnswerExist =
      value &&
      value.form_answers &&
      value.form_answers.length > 0 &&
      value.form_answers[0].answer &&
      value.form_answers[0].answer[category];

    if (isInitialAnswerExist) {
      competitorAnswerData = value.form_answers[0].answer[category];
    }
    formData[category] = constructCategoryFormData(
      category,
      data.brand,
      competitorData,
      competitorAnswerData,
    );
  });
  return formData;
}

const constructCategoryFormData = (
  category,
  brand,
  competitorData,
  competitorAnswerData,
) => {
  const items = [];
  items.push({
    name: brand,
    count: competitorAnswerData[brand]
      ? Number(competitorAnswerData[brand])
      : 0,
  });
  if (competitorData) {
    competitorData.forEach(item => {
      items.push({
        name: item,
        count: competitorAnswerData[item]
          ? Number(competitorAnswerData[item])
          : 0,
      });
    });
  }
  return {
    category: category,
    competitors: items,
    noSegment: competitorAnswerData.no_segment == '1',
  };
};

export function getValueFromFormData(formData, item, formIndex) {
  const answerData = {};
  const answerDataArray = [];
  for (let category in formData) {
    const categoryFormData = formData[category];
    const categoryAnswerData = {};
    if (categoryFormData.noSegment) {
      answerData[category] = {no_segment: '1'};
      answerDataArray.push({
        key: `[answer][${category}][no_segment]`,
        value: '1',
      });
    } else {
      categoryFormData.competitors.forEach(item => {
        if (item.count > 0) {
          categoryAnswerData[item.name] = item.count + '';
          answerDataArray.push({
            key: `[answer][${category}][${item.name}]`,
            value: item.count + '',
          });
        }
      });
      answerData[category] = categoryAnswerData;
    }
  }

  return {
    form_answers: [
      {
        form_question_id: item.form_question_id,
        answer: answerData,
      },
    ],
    form_answers_array: answerDataArray,
  };
}

export function getQuestionTitle(questionType) {
  if (questionType == Constants.questionType.FORM_TYPE_SKU_COUNT) {
    return 'SKU Count';
  } else if (questionType == Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE) {
    return 'SKU Shelf Share';
  }
  return 'SKU Count';
}
