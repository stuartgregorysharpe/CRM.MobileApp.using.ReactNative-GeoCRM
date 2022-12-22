import {Constants} from '../../constants';
import FSUCampaignDBHelper from './FSUCampaignDBHelper';
import POSCaptureQuestionDBHelper from './POSCaptureQuestionDBHelper';
import SKUFormQuestionDBHelper from './SKUFormQuestionDBHelper';
import SKUSelectFormQuestionDBHelper from './SKUSelectFormQuestionDBHelper';

export async function getFormQuestionData(
  baseFormData,
  business_unit_id,
  client_id,
  postData,
  questionBody,
) {
  if (!baseFormData) return null;
  const questionType = baseFormData.question_type;
  if (
    questionType == Constants.questionType.FORM_TYPE_SKU_COUNT ||
    questionType == Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE
  ) {
    return await SKUFormQuestionDBHelper.getFormQuestionData(
      baseFormData,
      business_unit_id,
      client_id,
      postData,
      questionBody,
    );
  }
  if (questionType == Constants.questionType.FORM_TYPE_SKU_SELECT) {
    return await SKUSelectFormQuestionDBHelper.getFormQuestionData(
      baseFormData,
      business_unit_id,
      client_id,
      postData,
      questionBody,
    );
  }

  if (questionType == Constants.questionType.FORM_TYPE_POS_CAPTURE) {
    return await POSCaptureQuestionDBHelper.getFormQuestionData(
      baseFormData,
      business_unit_id,
      client_id,
      postData,
      questionBody,
    );
  }

  if (questionType == Constants.questionType.FORM_TYPE_FSU_CAMPAIGN) {
    
    return await FSUCampaignDBHelper.getFSUFormData(
      baseFormData,
      business_unit_id,
      client_id,
      postData,
      questionBody,
    );
  }


  return {...baseFormData};
}
