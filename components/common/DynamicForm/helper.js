

export function checkRuleCharactersAddLead(formQuestionItem , inputtedValue) {
  

  //console.log("formQuestionItem => rule" ,formQuestionItem)

    const rule_characters = formQuestionItem.rule_characters;
    if (!rule_characters || rule_characters == '') return null;
    let errorMessage = null;
    const questionText = formQuestionItem.field_label; // formQuestionItem.question_text;
    const value = inputtedValue;
    let hasError = false;
  
    if (rule_characters.includes(',')) {
      const splited = rule_characters.split(',');
      if (splited.length > 1) {
        const characterLengthString = splited[1].trim();
        const operator = splited[0];
        console.log('rule_characters', rule_characters);
        console.log('operator', operator);
        console.log('characterLengthString', characterLengthString);
        if (characterLengthString != '') {
          const characterLength = Number(characterLengthString);
          if (operator == '=') {
            if (
              value &&
              typeof value == 'string' &&
              value.length != characterLength
            ) {
              errorMessage = `${questionText} must have ${characterLength} characters`;
              hasError = true;
            }
          } else if (operator == '>') {
            if (
              value &&
              typeof value == 'string' &&
              value.length <= characterLength
            ) {
              errorMessage = `${questionText} must have more than ${characterLength} characters`;
              hasError = true;
            }  
          } else if (operator == '<') {
            if (
              value &&
              typeof value == 'string' &&
              value.length >= characterLength
            ) {
              errorMessage = `${questionText} must have less than ${characterLength} characters`;              
              hasError = true;
            }

            // else if( value  &&  isNaN(value) == false && formQuestionItem.field_type == 'numbers' ){                
            //     if(Number(value) >= characterLength){
            //         hasError  = true;
            //         errorMessage = `${questionText} must have less than ${characterLength} characters`;              
            //     }                
            // }

          }
        }
      }
    }
    console.log('errorMessage', errorMessage);
    return errorMessage;
    //return hasError;
  }
