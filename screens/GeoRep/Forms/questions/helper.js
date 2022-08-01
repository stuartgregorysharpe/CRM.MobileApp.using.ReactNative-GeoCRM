
import { Constants } from "../../../../constants";

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

          var value = item.value;               
          if ( item.question_type === 'multiple' || item.question_type === 'multi_select') {            
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
            item.question_type === Constants.questionType.FORM_TYPE_SKU_SELECT
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

          } else if(item.question_type === 'take_photo' || item.question_type === 'upload_file') {
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });
            form_answers.push({
              key: `form_answers[${index}][answer]`,
              value:''
            });
            index = index + 1;

          }
          else if(item.question_type ===  Constants.questionType.FORM_TYPE_EMAIL_PDF  ){            
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });
            form_answers.push({
              key: `form_answers[${index}][answer]`,
              value: JSON.stringify(item.value)
            });
            index = index + 1;
          }

          else if(item.question_type ===  Constants.questionType.FORM_TYPE_PRODUCTS && item.value ){ 
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });            
            item.value.forEach((element , k) =>{
              form_answers.push({
                key: `form_answers[${index}][answer][selected_product_ids][${k}]`,
                value: element.product_id
              });                
            });                  
            index = index +1 ;
          }

          else if(item.question_type ===  Constants.questionType.FORM_TYPE_PRODUCT_ISSUES && item.value ){            
            
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });                        
            var productIssues = [];
            item.value.forEach((element) => {
              var check = productIssues.find(item => item === element.productIssue);
              if(check === null || check === undefined)
                productIssues.push(element.productIssue);
            })
            productIssues.forEach((topElement , i) => {
              var subIndex = 0;
              item.value.forEach((element , k) =>{
                if(topElement === element.productIssue){
                  form_answers.push({
                    key: `form_answers[${index}][answer][${topElement}][${subIndex}]`,
                    value: element.product_id
                  });                
                  subIndex = subIndex + 1;
                }                
              });                  
            });                      
            index = index +1 ;
          }          

          else if(item.question_type ===  Constants.questionType.FORM_TYPE_PRODUCT_RETURN && item.value ){            
            
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });                        
            var productReturns = [];
            item.value.forEach((element) => {
              var check = productReturns.find(item => item === element.productReturn);
              if(check === null || check === undefined)
              productReturns.push(element.productReturn);
            })
            
            productReturns.forEach((topElement , i) => {              
              item.value.forEach((element , k) =>{
                if(topElement === element.productReturn){                  
                  form_answers.push({
                    key: `form_answers[${index}][answer][${topElement}][${element.product_id}]`,
                    value: element.value.toString()
                  });                  
                }                
              });              
            });                            
            index = index +1 ;
          }          

          else if(item.question_type ===  Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO && item.value ){            
            
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });                                    
            item.value.forEach((element, k) => {
              form_answers.push({
                key: `form_answers[${index}][answer][${k}]`,
                value: element.name
              });                          
            })                      
            index = index +1 ;
          }          


          else if(value != undefined &&  value != null && value != '') {
            form_answers.push({
              key: `form_answers[${index}][form_question_id]`,
              value: item.form_question_id,
            });
            form_answers.push({
              key: `form_answers[${index}][answer]`,
              value:value
            });
            index = index + 1;
          }          
          //}
        });
    });
    return form_answers;
}



export function getFormQuestionFile(formQuestions) {

    var files = [];
    var index  = 0;
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
          }else if( item.question_type === Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO) {
              if(item.value){
                item.value.forEach((element , index) => {
                  files.push({
                    key: `File[${item.form_question_id}][${element.name}]`,
                    value: element.path,
                    type: Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO,
                  });
                })
              }
              
          }          
          
        });
    });
    return files;
      
}
