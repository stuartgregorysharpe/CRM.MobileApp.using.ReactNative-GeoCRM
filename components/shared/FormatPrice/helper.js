import Constants from './constants';

export function constructFormData(data) {
  const value = data.value;
  const formData = {products: []};
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer.length > 0;
  const formats = data.formats;
  if (!formats) return formData;

  formData.products = formats.map(productFormat => {
    let previousAnswerItem = null;
    if (isInitialAnswerExist) {
      previousAnswerItem = value.form_answers[0].answer.find(x => {
        return x.selected_product_id == productFormat.product_id;
      });
    }
    return constructProduct(productFormat, previousAnswerItem);
  });
  return formData;
}
function constructProduct(productItem, previousAnswerItem) {
  let competitorsItems = [];
  if (productItem.competitors) {
    competitorsItems = productItem.competitors.map(competitorName => {
      return constructCompetitor(competitorName, previousAnswerItem);
    });
  }
  return {
    ...productItem,
    price_type: previousAnswerItem
      ? previousAnswerItem.price_type
      : Constants.priceType.PRICE_TYPE_NORMAL,
    price: previousAnswerItem ? previousAnswerItem.price : '',
    competitors: competitorsItems,
  };
}
function constructCompetitor(competitorName, previousAnswerItem) {
  let foundCompetitor = null;
  if (previousAnswerItem && previousAnswerItem.competitors) {
    foundCompetitor = previousAnswerItem.competitors.find(x => {
      return (x.competitor = competitorName);
    });
  }
  return {
    competitor: 'Competitor 1',
    price_type: foundCompetitor
      ? foundCompetitor.price_type
      : Constants.priceType.PRICE_TYPE_NORMAL,
    price: foundCompetitor ? foundCompetitor.price : '',
  };
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
  if (!products) return [];
  if (!keyword) return products;
  const _products = products.filter(
    x => x.label.includes(keyword) || x.price_type.includes(keyword),
  );
  return _products;
}
