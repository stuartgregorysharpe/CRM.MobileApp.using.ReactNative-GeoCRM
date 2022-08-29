export function constructFormData(data) {
  const value = data.value;
  const formData = {products: []};

  console.log(data);
  const brands = data.brands || [];
  const competitors = data.competitors || [];
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer.length > 0;
  const brandItems = constructProducts(
    brands,
    'Brand',
    isInitialAnswerExist ? value.form_answers[0].answer : null,
  );
  const competitorItems = constructProducts(
    competitors,
    'Competitor',
    isInitialAnswerExist ? value.form_answers[0].answer : null,
  );
  formData.products = [...brandItems, ...competitorItems];

  return formData;
}
function constructProducts(itemList, itemType, previousAnswers) {
  return itemList.map(itemName => {
    let previousAnswerItem = null;
    if (previousAnswers) {
      previousAnswerItem = previousAnswers.find(x => {
        return x.name == itemName;
      });
    }
    return constructProduct(itemName, itemType, previousAnswerItem);
  });
}
function constructProduct(itemName, itemType, previousAnswerItem) {
  return {
    name: itemName,
    type: itemType,
    facing: previousAnswerItem ? previousAnswerItem.facing : '',
  };
}

export function getValueFromFormData(formData, item, formIndex) {
  const products = formData.products;
  const answers = [];
  const answerDataArray = [];
  products.forEach((product, index) => {
    if (
      product.facing != '' &&
      product.facing != null &&
      product.facing != undefined &&
      product.facing > 0
    ) {
      const answer = {
        name: product.name,
        type: product.type,
        facing: product.facing,
      };
      answerDataArray.push({
        key: `[answer][${index}][name]`,
        value: product.name,
      });
      answerDataArray.push({
        key: `[answer][${index}][type]`,
        value: product.type,
      });
      answerDataArray.push({
        key: `[answer][${index}][facing]`,
        value: product.facing,
      });
      answers.push(answer);
    }
  });
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

export function filterProducts(products, selectedCategory) {
  if (!products) return [];
  if (selectedCategory) {
    return products.filter(x => x.type == selectedCategory);
  }

  return products;
}
