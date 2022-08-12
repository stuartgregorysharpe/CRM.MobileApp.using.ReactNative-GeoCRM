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
    label: productItem.product_name,
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
    competitor: competitorName,
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

export function getValueFromFormData(formData, item, formIndex) {
  const products = formData.products;
  const answers = [];
  const answerDataArray = [];
  products.forEach((product, index) => {
    if (
      product.price != '' &&
      product.price != null &&
      product.price != undefined &&
      product.price > 0
    ) {
      const answer = {
        selected_product_id: product.product_id,
        price_type: product.price_type,
        price: product.price,
      };
      answerDataArray.push({
        key: `[answer][${index}][selected_product_id]`,
        value: product.product_id,
      });
      answerDataArray.push({
        key: `[answer][${index}][price_type]`,
        value: product.price_type,
      });
      answerDataArray.push({
        key: `[answer][${index}][price]`,
        value: product.price,
      });
      const competitors = [];
      if (product.competitors && product.competitors.length > 0) {
        product.competitors.forEach((competitor, competitorIndex) => {
          if (
            competitor.price != '' &&
            competitor.price != null &&
            competitor.price != undefined &&
            competitor.price > 0
          ) {
            competitors.push({...competitor});
            answerDataArray.push({
              key: `[answer][${index}][competitors][${competitorIndex}][competitor]`,
              value: competitor.competitor,
            });
            answerDataArray.push({
              key: `[answer][${index}][competitors][${competitorIndex}][price_type]`,
              value: competitor.price_type,
            });
            answerDataArray.push({
              key: `[answer][${index}][competitors][${competitorIndex}][price]`,
              value: competitor.price,
            });
          }
        });
      }
      answer.competitors = competitors;
      answers.push(answer);
    }
  });
  console.log('answers', answers);
  return {
    form_answers: [
      {
        form_question_id: item.form_question_id,
        answer: answers,
      },
    ],
    form_answers_array: answerDataArray,
  };
}

export function getQuestionTitle(questionType) {
  return 'Select SKU';
}

export function filterProducts(products, keyword, selectedFormat) {
  if (!products) return [];
  if (selectedFormat) {
    return products.filter(x => x.product_id == selectedFormat);
  }
  if (!keyword) return products;
  const _products = products.filter(
    x => x.label.includes(keyword) || x.price_type.includes(keyword),
  );

  return _products;
}
