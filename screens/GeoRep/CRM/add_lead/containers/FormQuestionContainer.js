import {View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {FormQuestionView} from '../components/FormQuestionView';
import {expireToken} from '../../../../../constants/Helper';
import {Constants, Strings} from '../../../../../constants';
import {
  filterTriggeredQuestions,
  getFormQuestionData,
  getFormQuestionFile,
  validateFormQuestionData,
} from '../../../Forms/questions/helper';
import {useDispatch} from 'react-redux';
import {showNotification} from '../../../../../actions/notification.action';
import {GetRequestFormQuestionsDAO} from '../../../../../DAO';
import { downloadFormQuestionImages } from '../../../../../services/DownloadService/ImageDownload';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';

export default function FormQuestionContainer(props) {

  const {form, leadForms, customMasterFields, selectedLists} = props;

  const [formQuestions, setQuestions] = useState([]);
  const loadingBarRef = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    _callFormQuestions();
  }, [form]);

  const _callFormQuestions = () => {
    let param = {};
    if (form.form_id != undefined) {
      param = {
        form_id: form.form_id,
      };
    } else if (form.submission_id != undefined) {
      param = {
        submission_id: form.submission_id,
      };
    }
    console.log('PIST  param', param);
    GetRequestFormQuestionsDAO.find(param)
      .then(res => {
        groupByQuestions(res.questions);
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const getQuestionTagValue = (questionTag, value) => {
    if (leadForms != undefined) {
      var leadFormItem = leadForms.find(item => item.field_tag === questionTag);
      if (leadFormItem != undefined) {
        return customMasterFields[leadFormItem.custom_master_field_id];
      }
    }
    if (selectedLists != undefined) {
      if (questionTag === 'msisdn') {
        return selectedLists.map(item => item.msisdn).join(', ');
      }
    }
    return value;
  };

  const groupByQuestions = data => {
    var newData = [];
    data.forEach(element => {
      // initialize the value with question_tag
      if (element.question_tag != undefined && element.question_tag != '') {
        element.value = getQuestionTagValue(
          element.question_tag,
          element.value,
        );
      }

      // updated value for tired mutiple choice
      if (
        element.question_type ===
        Constants.questionType.FORM_TYPE_TIERED_MULTIPLE_CHOICE
      ) {
        if (element.value != null && element.value != undefined) {
          var dropdownLists = '';
          if (typeof element.value === 'object') {
            for (let key of Object.keys(element.value)) {
              if (dropdownLists == '') {
                dropdownLists = element.value[key];
              } else {
                dropdownLists = dropdownLists + ' - ' + element.value[key];
              }
            }
          }
          element.value = dropdownLists; // Updated Value in Tired Multiple Choice
        }
      }

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
    updateFormQuestionsForDownloading(newData);
  
  };

  const isInNewData = (data, value) => {
    return data.find(item => item.question_group_id === value.question_group_id)
      ? true
      : false;
  };

  const updateFormQuestionsForDownloading = async(formQuestions) => {
    var res = filterTriggeredQuestions(formQuestions);
    if (res != undefined) {
      // start downlod service 
      console.log('newData == ', JSON.stringify(res));
      loadingBarRef.current.showModal();
      var newFormQuestions = await downloadFormQuestionImages(res);
      if(newFormQuestions != undefined){
        console.log("new form questions " , JSON.stringify(newFormQuestions));
        setQuestions(newFormQuestions);
      }
      loadingBarRef.current.hideModal();
      // end download        
    }        
  };

  const updateFormQuestions = (formQuestions) =>{
    var res = filterTriggeredQuestions(formQuestions);
    if (res != undefined) {
      setQuestions(res)
    }
  }

  const onBackPressed = () => {
    props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
  };

  const onSave = () => {
    var error = validateFormQuestionData(formQuestions);
    if (error) {
      dispatch(
        showNotification({
          type: 'success',
          message: error,
          buttonText: Strings.Ok,
        }),
      );
      return;
    } else {
      var form_answers = [];
      form_answers = getFormQuestionData(formQuestions);
      var files = [];
      files = getFormQuestionFile(formQuestions);

      console.log(" post files ========= " , files)
      props.onButtonAction({
        type: Constants.actionType.ACTION_DONE,
        value: {form_answers: form_answers, files: files, form: form},
      });
    }
  };

  return (
    <View style={{alignSelf: 'stretch', flex: 1, marginBottom: 0}}>
      
      <LoadingBar ref={loadingBarRef} description={Strings.Download_Image} />

      

      <FormQuestionView
        formQuestions={formQuestions}
        updateFormQuestions={updateFormQuestions}
        onBackPressed={onBackPressed}
        isShowCustomNavigationHeader={true}
        isModal={true}
        onSubmit={onSave}
        {...props}
      />
    </View>
  );
}
