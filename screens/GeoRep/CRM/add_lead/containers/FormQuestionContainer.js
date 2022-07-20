
import { View } from 'react-native'
import React , {useEffect, useState} from 'react'
import { FormQuestionView } from '../components/FormQuestionView';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { Constants } from '../../../../../constants';
import { getFormQuestionData, getFormQuestionFile, validateFormQuestionData } from '../../../Forms/questions/helper';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function FormQuestionContainer(props) {

    const { form } = props;
    const [formQuestions, setQuestions] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {        
        _callFormQuestions();
    }, [form]);

    const _callFormQuestions = () => {
        let param = {
          form_id: form.form_id,
        };                
        getApiRequest('forms/forms-questions', param)
        .then(res => {            
            groupByQuestions(res.questions);
        })
        .catch(e => {
            expireToken(dispatch, e);
        });
    };
    
    const groupByQuestions = data => {
        var newData = [];
        data.forEach(element => {
          if (!isInNewData(newData, element)) {
            var ques = [element];
            newData.push({
              question_group_id: element.question_group_id,
              question_group: element.question_group,
              questions: ques,
            });
          } else {
            var tmp = newData.find(
              item => item.question_group_id === element.question_group_id,
            );
            var newTmp = [...tmp.questions, element];
            tmp.questions = [...newTmp];
          }
        });
        setQuestions(newData);
    };
    
    const isInNewData = (data, value) => {
        return data.find(item => item.question_group_id === value.question_group_id)
          ? true
          : false;
    };

    const updateFormQuestions = (value) => {
        console.log("updated vale", value)
        setQuestions(value);
    }

    const onBackPressed = () => {
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
    }

    const onSave = () => {
      var flag = validateFormQuestionData(formQuestions);
      if (!flag) {        
        dispatch(
          showNotification({
            type: 'success',
            message: 'Please complete the compulsory questions and then submit',
            buttonText: 'Okay',
          }),
        );
        return;
      }else{
        var form_answers = [];    
        form_answers = getFormQuestionData(formQuestions);        
        var files = [];
        files = getFormQuestionFile(formQuestions);             
        props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: {form_answers: form_answers, files: files} });        
      }      

    }

    return (
        <View style={{alignSelf:'stretch' , flex:1 , marginBottom:0}}>            
            <FormQuestionView
                formQuestions={formQuestions}        
                updateFormQuestions={updateFormQuestions}               
                onBackPressed={onBackPressed}       
                isShowCustomNavigationHeader={true}
                onSubmit={onSave}
                {...props}
            />            
        </View>
    )
}