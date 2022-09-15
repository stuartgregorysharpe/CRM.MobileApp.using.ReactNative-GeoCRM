import {Constants} from '../../../../constants';

export function filterTriggeredQuestions(formQuestionGroups) {
  console.log('filterTriggeredQuestions');
  const questions = [];
  formQuestionGroups.forEach(formQuestionGroup => {
    questions.push(...formQuestionGroup.questions);
  });
  for (let i = 0; i < questions.length; i++) {
    const isShow = checkIfQuestionIsTrigger(questions[i], questions , 'question');
    questions[i].isHidden = !isShow;
    if (questions[i].isHidden) {
      console.log('Hidden:', questions[i].question_text);
    }
  }
  return formQuestionGroups;
}


export function checkIfQuestionIsTrigger(question, questions , type) {

  if (!question) return false;
  if (!question.trigger || question.trigger == []) {
    return true;
  }
  
  const triggerSetting = question.trigger;    
  let conditionQuestion = null;

  if(type == 'question'){
    if (triggerSetting.question_id) {    
      conditionQuestion = questions.find(
        x => x.form_question_id == triggerSetting.question_id,
      );
    }
  }else if(type == 'form'){    
    if (triggerSetting.trigger_field_id) {        
      conditionQuestion = questions.find(
        x => x.custom_master_field_id == triggerSetting.trigger_field_id,
      );
    }
  }
    
  if (!conditionQuestion) {      
    return true;
  }
  
  const result = checkTriggerCondition(
    question,
    conditionQuestion,
    triggerSetting,
    type
  );
  
  console.log('question: id', question.form_question_id);
  console.log('question: title', question.question_text);
  console.log('conditionQuestion: type', conditionQuestion.question_type);
  console.log('conditionQuestion: value', conditionQuestion.value);
  console.log('conditionQuestion: title', conditionQuestion.question_text);
  console.log('triggerSetting', triggerSetting);
  console.log('conditionResult', result);
  return result;
}

function checkTriggerCondition(question, conditionQuestion, triggerSetting , formType) {
  if (!question || !conditionQuestion || !triggerSetting) {
    return true;
  }
  let condition = triggerSetting.condition;  
  let answer = triggerSetting.answer;
  let type = triggerSetting.type;
  let value = conditionQuestion.value;

  if(formType == 'form'){
    condition = triggerSetting.trigger_condition;    
  }

  if (type == 'text') {
    return checkTextTriggerCondition(condition, answer, value);
  } else if (type == 'numbers') {
    return checkNumbersTriggerCondition(condition, answer, value);
  } else if (type == 'dropdown') {    
    return checkDropdownTriggerCondition(condition, answer, value , formType);
  }

  return true;
}

function checkDropdownTriggerCondition(condition, answerList, valueList ,formType) {
  console.log('checkDropdownTriggerCondition -condition', condition);
  console.log('checkDropdownTriggerCondition -answer', answerList);
  console.log('checkDropdownTriggerCondition -value', valueList);

  if(formType == 'form'){
    return checkTextTriggerCondition(condition, answerList, valueList);    
  }


  if ( condition != 'ANY' && (!Array.isArray(answerList) || !Array.isArray(valueList)))
    return false;
  if (condition == 'ANY') {
    if (valueList && valueList.length > 0) {
      return true;
    } else {
      return false;
    }
  } else if (condition == 'AND') {
    let isConditionApproved = true;
    if (answerList && answerList.length > 0) {
      answerList.forEach(answer => {
        isConditionApproved = isConditionApproved && valueList.includes(answer);
      });
    }
    return isConditionApproved;
  } else if (condition == 'OR') {
    if (answerList.length == 0) {
      return true;
    }
    let isConditionApproved = false;
    if (answerList && answerList.length > 0) {
      answerList.forEach(answer => {
        isConditionApproved = isConditionApproved || valueList.includes(answer);
      });
    }
    return isConditionApproved;
  } else if (condition == '=') {    
    let isConditionApproved = answerList.length == valueList.length;    
    if (answerList && answerList.length > 0) {
      answerList.forEach(answer => {
        isConditionApproved = isConditionApproved && valueList.includes(answer);
      });
    }
    return isConditionApproved;
  }
  return true;
}

function checkNumbersTriggerCondition(condition, _answer, _value) {
  console.log('checkNumbersTriggerCondition -condition', condition);
  console.log('checkNumbersTriggerCondition -answer', _answer);
  console.log('checkNumbersTriggerCondition -value', _value);
  let answer = Number(_answer);
  let value = Number(_value);
  if (condition == 'ANY') {
    if (
      value == null ||
      value == '' ||
      value == undefined ||
      !value ||
      isNaN(value)
    ) {
      return false;
    }
  }

  if (condition == '=') {
    if (answer !== value) return false;
  } else if (condition == '>') {
    if (value <= answer) return false;
  } else if (condition == '>=') {
    if (value < answer) return false;
  } else if (condition == '<') {
    if (value >= answer) return false;
  } else if (condition == '<=') {
    if (value > answer) return false;
  }
  return true;
}

function checkTextTriggerCondition(condition, answer, value) {
  console.log('checkTextTriggerCondition -condition', condition);
  console.log('checkTextTriggerCondition -answer', answer);
  console.log('checkTextTriggerCondition -value', value);
  if (condition == '=') {
    const lowercaseAnswer = answer ? answer.toLowerCase() : '';
    const lowercaseValue = value ? value.toLowerCase() : '';
    if (lowercaseAnswer != lowercaseValue) return false;
  } else if (condition == 'ANY') {
    if (value == null || value == '' || value == undefined || !value) {
      return false;
    }
  }
  return true;
}

export function validateFormQuestionData(formQuestions) {
  var flag = true;
  formQuestions.forEach(element => {
    element.questions.forEach(item => {
      if (
        item.rule_compulsory === '1' &&
        (item.value === null || item.value === '' || item.value === undefined)
      ) {
        flag = false;
      }
    });
  });
  return flag;
}

export function getFormQuestionData(formQuestions) {
  var form_answers = [];
  var index = 0;

  formQuestions.forEach(element => {
    element.questions.forEach(item => {
      if (item.isHidden) {
        index++;
      } else {
        var value = item.value;

        if (
          item.question_type === 'multiple' ||
          item.question_type === 'multi_select'
        ) {
          if (item.value && item.value.length > 0) {
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });

            var j = 0;
            item.value.forEach(subElement => {
              form_answers.push({
                key: `form_answers[${index}][answer][${j}]`,
                value: item.question_type === 'take_photo' ? '' : subElement,
              });
              j = j + 1;
            });
            index = index + 1;
          }
        } else if (
          item.question_type === Constants.questionType.FORM_TYPE_SKU_COUNT ||
          item.question_type ===
            Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE ||
          item.question_type === Constants.questionType.FORM_TYPE_SKU_SELECT ||
          item.question_type ===
            Constants.questionType.FORM_TYPE_FORMAT_PRICE ||
          item.question_type ===
            Constants.questionType.FORM_TYPE_BRAND_COMPETITOR_FACING ||
          item.question_type === Constants.questionType.FORM_TYPE_FSU_CAMPAIGN
        ) {
          if (value && value.form_answers_array) {
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });

            value.form_answers_array.forEach(itemValue => {
              form_answers.push({
                ...itemValue,
                key: `form_answers[${index}]` + itemValue.key,
              });
            });
            index = index + 1;
          }
        } else if (
          item.question_type === 'take_photo' ||
          item.question_type === 'upload_file'
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          form_answers.push({
            key: `form_answers[${index}][answer]`,
            value: '',
          });
          index = index + 1;
        } else if (
          item.question_type === Constants.questionType.FORM_TYPE_EMAIL_PDF
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          form_answers.push({
            key: `form_answers[${index}][answer]`,
            value: JSON.stringify(item.value),
          });
          index = index + 1;
        } else if (
          item.question_type === Constants.questionType.FORM_TYPE_PRODUCTS &&
          item.value
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          item.value.forEach((element, k) => {
            form_answers.push({
              key: `form_answers[${index}][answer][selected_product_ids][${k}]`,
              value: element.product_id,
            });
          });
          index = index + 1;
        } else if (
          item.question_type ===
            Constants.questionType.FORM_TYPE_PRODUCT_ISSUES &&
          item.value
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          var productIssues = [];
          item.value.forEach(element => {
            var check = productIssues.find(
              item => item === element.productIssue,
            );
            if (check === null || check === undefined)
              productIssues.push(element.productIssue);
          });
          productIssues.forEach((topElement, i) => {
            var subIndex = 0;
            item.value.forEach((element, k) => {
              if (topElement === element.productIssue) {
                form_answers.push({
                  key: `form_answers[${index}][answer][${topElement}][${subIndex}]`,
                  value: element.product_id,
                });
                subIndex = subIndex + 1;
              }
            });
          });
          index = index + 1;
        } else if (
          item.question_type ===
            Constants.questionType.FORM_TYPE_PRODUCT_RETURN &&
          item.value
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          var productReturns = [];
          item.value.forEach(element => {
            var check = productReturns.find(
              item => item === element.productReturn,
            );
            if (check === null || check === undefined)
              productReturns.push(element.productReturn);
          });

          productReturns.forEach((topElement, i) => {
            item.value.forEach((element, k) => {
              if (topElement === element.productReturn) {
                form_answers.push({
                  key: `form_answers[${index}][answer][${topElement}][${element.product_id}]`,
                  value: element.value.toString(),
                });
              }
            });
          });
          index = index + 1;
        } else if (
          item.question_type ===
            Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO &&
          item.value
        ) {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          item.value.forEach((element, k) => {
            form_answers.push({
              key: `form_answers[${index}][answer][${k}]`,
              value: element.name,
            });
          });
          index = index + 1;
        } else if (value != undefined && value != null && value != '') {
          form_answers.push({
            key: `form_answers[${index}][form_question_id]`,
            value: item.form_question_id,
          });
          form_answers.push({
            key: `form_answers[${index}][answer]`,
            value: value,
          });
          index = index + 1;
        }
      }
    });
  });
  return form_answers;
}

export function getFormQuestionFile(formQuestions) {
  var files = [];
  var index = 0;
  formQuestions.map(async element => {
    element.questions.map(async item => {
      if (
        item.question_type === 'upload_file' ||
        item.question_type === 'take_photo' ||
        (item.question_type === 'yes_no' && (item.yes_image || item.no_image))
      ) {
        var paths = item.value;
        if (item.yes_image != null && item.yes_image != '') {
          paths = item.yes_image;
        }
        if (item.no_image != null && item.no_image != '') {
          paths = item.no_image;
        }
        if (paths != null && paths != '' && paths.length > 0) {
          index = 0;
          for (const path of paths) {
            if (item.question_type === 'upload_file') {
              files.push({
                key: `File[${item.form_question_id}][${index}]`,
                value: path,
                type: 'upload_file',
              });
            } else {
              files.push({
                key: `File[${item.form_question_id}][${index}]`,
                value: path,
                type: 'image',
              }); //, base64:item.base64
            }
            index = index + 1;
          }
        }
      } else if (
        item.question_type ===
        Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO
      ) {
        if (item.value) {
          item.value.forEach((element, index) => {
            files.push({
              key: `File[${item.form_question_id}][${element.name}]`,
              value: element.path,
              type: Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO,
            });
          });
        }
      }
    });
  });
  return files;
}
