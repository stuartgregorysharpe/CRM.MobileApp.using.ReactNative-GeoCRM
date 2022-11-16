export function constructFormData(data) {
  const value = data.value;
  const formData = {posItems: []};
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer.length > 0;

  if (isInitialAnswerExist) {
    formData.posItems = value.form_answers[0].answer.map((posItem, index) => {
      const product = data.products.find(
        x => x.product_id == posItem.product_id,
      );
      if (!product) return posItem;
      const item = {
        ...posItem,
        ...product,
        id: index + 1,
      };
      if (item.image_index && item.image_index != '') {
        item.image_index = Number(item.image_index);
      }
      return item;
    });
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
  const products = data?.products;
  if (!products) return [];
  const labels = [];
  products.forEach(product => {
    if (!labels.includes(product.product_type)) {
      labels.push(product.product_type);
    }
  });
  return labels.map(label => {
    return {label: label, value: label};
  });
}
export function getBrands(data) {
  const products = data?.products;
  if (!products) return [];
  const labels = [];
  products.forEach(product => {
    if (!labels.includes(product.brand)) {
      labels.push(product.brand);
    }
  });
  return labels.map(label => {
    return {label: label, value: label};
  });
}
export function getTouchpoints(data) {
  return data?.touchpoints;
}

export function getPlacementTypes(data) {
  const placement_areas = data?.placement_areas;
  if (!placement_areas) return [];
  const labels = Object.keys(placement_areas);
  return labels.map(label => {
    return {label: label, value: label};
  });
}
export function getPlacementAreas(data, type) {
  const placement_areas = data?.placement_areas;
  if (!placement_areas || !type || type == '' || !placement_areas[type])
    return [];
  const labels = placement_areas[type];
  return labels.map(label => {
    return {label: label, value: label};
  });
}

export function getValueFromFormData(formData, item, formIndex) {
  const posItems = formData.posItems;
  const answers = [];
  const answerDataArray = [];
  const fileArray = [];

  posItems.forEach((product, index) => {
    const answer = {
      product_id: product.product_id,
      touchpoint: product.touchpoint,
      qty: product.qty,
      placement_type: product.placement_type,
      area: product.area,
      image: product.image,
    };
    if (product.image) {
      fileArray.push(product.image);
      answer.image_index = fileArray.length - 1;
    }
    answerDataArray.push({
      key: `[answer][${index}][product_id]`,
      value: product.product_id,
    });
    answerDataArray.push({
      key: `[answer][${index}][touchpoint]`,
      value: product.touchpoint,
    });
    answerDataArray.push({
      key: `[answer][${index}][qty]`,
      value: product.qty,
    });
    answerDataArray.push({
      key: `[answer][${index}][placement_type]`,
      value: product.placement_type,
    });
    answerDataArray.push({
      key: `[answer][${index}][area]`,
      value: product.area,
    });
    if (answer.image)
      answerDataArray.push({
        key: `[answer][${index}][image_index]`,
        value: answer.image_index + '',
      });

    answers.push(answer);
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
    file_array: fileArray,
  };
}

export function getQuestionTitle(questionType) {
  return 'Point of Sale';
}

export function filterProducts(products, _keyword, _type, _brand) {
  if (!products) return [];

  if (
    (!_keyword || _keyword == '') &&
    (!_type || _type == '') &&
    (!_brand || _brand == '')
  )
    return products;
  const keyword = _keyword.toLowerCase();
  const type = _type.toLowerCase();
  const brand = _brand.toLowerCase();
  const _products = products.filter(
    x =>
      (!keyword ||
        keyword == '' ||
        x.product_name.toLowerCase().includes(keyword) ||
        x.barcode.toLowerCase().includes(keyword) ||
        x.brand.toLowerCase().includes(keyword) ||
        x.product_type.toLowerCase().includes(keyword)) &&
      (!brand || brand == '' || x.brand.toLowerCase() == brand) &&
      (!type || type == '' || x.product_type.toLowerCase() == type),
  );

  return _products;
}
