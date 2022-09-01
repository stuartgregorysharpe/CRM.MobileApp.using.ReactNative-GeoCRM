export function constructFormData(data) {
  const value = data.value;
  const formData = {campaigns: []};

  const campaigns = data.campaigns || [];
  const isInitialAnswerExist =
    value &&
    value.form_answers &&
    value.form_answers.length > 0 &&
    value.form_answers[0].answer &&
    value.form_answers[0].answer.length > 0;

  const campaignItems = constructCampaigns(
    campaigns,
    isInitialAnswerExist ? value.form_answers[0].answer : null,
  );
  formData.campaigns = campaignItems;

  return formData;
}
function constructCampaigns(itemList, previousAnswers) {
  return itemList.map(item => {
    let previousAnswerItem = null;
    if (previousAnswers) {
      previousAnswerItem = previousAnswers.find(x => {
        return x.fsu_campaign_id == item.fsu_campaign_id;
      });
    }
    return constructCampaign(item, previousAnswerItem);
  });
}
function constructCampaign(item, previousAnswerItem) {
  return {
    ...item,
    placed: previousAnswerItem ? previousAnswerItem.placed : '',
  };
}

export function getValueFromFormData(formData, item, formIndex) {
  const campaigns = formData.campaigns;
  const answers = [];
  const answerDataArray = [];
  campaigns.forEach((campaign, index) => {
    if (
      campaign.placed != '' &&
      campaign.placed != null &&
      campaign.placed != undefined &&
      campaign.placed > 0
    ) {
      const answer = {
        fsu_campaign_id: campaign.fsu_campaign_id,
        placed: campaign.placed,
      };
      answerDataArray.push({
        key: `[answer][${index}][fsu_campaign_id]`,
        value: campaign.fsu_campaign_id,
      });
      answerDataArray.push({
        key: `[answer][${index}][placed]`,
        value: campaign.placed,
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
