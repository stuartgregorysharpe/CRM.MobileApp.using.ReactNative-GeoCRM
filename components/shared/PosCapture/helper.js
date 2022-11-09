export function constructFormData(data) {
  const value = data.value;
  const formData = {products: []};
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer.length > 0;

  if (isInitialAnswerExist) {
    formData.products = [...value.form_answers[0].answer];
  }
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

export function getTypes(data) {
  const placement_areas = data?.placement_areas;
  if (!placement_areas) return [];
  const labels = Object.keys(placement_areas);
  return labels.map(label => {
    return {label: label, value: label};
  });
}
export function getBrands(data, type) {
  const placement_areas = data?.placement_areas;
  if (!placement_areas || !type || type == '' || !placement_areas[type])
    return [];
  const labels = placement_areas[type];
  return labels.map(label => {
    return {label: label, value: label};
  });
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
  return 'Point of Sale';
}

export function filterProducts(products, keyword, type, brand) {
  if (!products) return [];

  if (
    (!keyword || keyword == '') &&
    (!type || type == '') &&
    (!brand || brand == '')
  )
    return products;
  const _products = products.filter(
    x =>
      (!keyword ||
        keyword == '' ||
        x.product_name.includes(keyword) ||
        x.barcode.includes(keyword) ||
        x.brand.includes(keyword) ||
        x.product_type.includes(keyword)) &&
      (!brand || brand == '' || x.brand == brand) &&
      (!type || type == '' || x.product_type == type),
  );

  return _products;
}
