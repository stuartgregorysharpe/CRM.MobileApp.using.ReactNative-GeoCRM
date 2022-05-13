import {Constants} from '../../../constants';

export function constructFormData(data) {
  const value = data.value;
  const formData = {};
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer['selected_product_ids'];
  let selectedProductIds = [];
  if (isInitialAnswerExist) {
    selectedProductIds = value.form_answers[0].answer['selected_product_ids'];
  }
  formData['selectedProductIds'] = selectedProductIds;
  return formData;
}

export function getValueFromFormData(formData, item) {
  const answerData = {
    selected_product_ids: formData.selectedProductIds,
  };
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

export function filterProducts(products, keyword) {
  if (!keyword) return products;
  const _products = {...products};
  for (sectionName in _products) {
    _products[sectionName] = _products[sectionName].filter(
      product =>
        product.label.includes(keyword) ||
        product.barcode.includes(keyword) ||
        product.product_code.includes(keyword),
    );
  }
  return _products;
}
