import {Constants} from '../../constants';
import SKUFormQuestionDBHelper from './SKUFormQuestionDBHelper';

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
  return {...baseFormData};
}
