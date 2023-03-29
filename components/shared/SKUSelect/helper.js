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

function getProductForBarcode(products, barcode) {
  for (sectionName in products) {
    const foundProduct = products[sectionName].find(
      product => product.barcode == barcode,
    );
    if (foundProduct) return foundProduct;
  }
  return null;
}

export function getProductForId(products, productId) {
  for (sectionName in products) {
    const foundProduct = products[sectionName].find(
      product => product.product_id == productId,
    );
    if (foundProduct) return foundProduct;
  }
  return null;
}
export function captureProductBarcode(formData, item, barcode) {
  console.log('captured', barcode);
  const capturedProduct = getProductForBarcode(item.products, barcode);
  if (!capturedProduct) {
    return formData;
  }
  const _formData = {...formData};
  let _selectedProductIds = _formData.selectedProductIds;

  const foundId = _selectedProductIds.find(
    x => x == capturedProduct.product_id,
  );
  if (!foundId) {
    _selectedProductIds.push(capturedProduct.product_id);
  }
  _formData.selectedProductIds = _selectedProductIds;
  return _formData;
}

export function getValueFromFormData(formData, item, formIndex) {
  const answerData = {
    selected_product_ids: formData.selectedProductIds,
  };
  const answerDataArray = [];
  formData.selectedProductIds.forEach((productId, index) => {
    answerDataArray.push({
      key: `[answer][selected_product_ids][${index}]`,
      value: productId,
    });
  });
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
  return 'Select SKU';
}

export function filterProducts(products, keyword) {
  if (!keyword) return products;
  const _products = {...products};
  for (sectionName in _products) {
    _products[sectionName] = _products[sectionName].filter(
      product =>
        product?.label?.toLowerCase().includes(keyword.toLowerCase()) ||
        product?.barcode?.toLowerCase().includes(keyword.toLowerCase()) ||
        product?.product_code?.toLowerCase().includes(keyword.toLowerCase()),
    );
  }
  return _products;
}
