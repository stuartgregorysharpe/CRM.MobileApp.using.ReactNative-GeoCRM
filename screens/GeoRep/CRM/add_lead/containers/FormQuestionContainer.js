import {Platform, View} from 'react-native';
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
import {GetRequestFormQuestionsDAO} from '../../../../../DAO';
import {downloadFormQuestionImages} from '../../../../../services/DownloadService/ImageDownload';
import LoadingBar from '../../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../../components/modal/AlertModal';



export default function FormQuestionContainer(props) {

  const {form, leadForms, customMasterFields, selectedLists} = props;

  const [formQuestions, setQuestions] = useState([]);
  const loadingBarRef = useRef(null);
  const alertModalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    _callFormQuestions();
  }, [form]);

  const _callFormQuestions = () => {

    loadingBarRef.current.showModal();
    
    let param = {};
    if (form.form_id != undefined) {
      param = {
        form_id: form.form_id,
        location_id : form?.location_id
      };
    } else if (form.submission_id != undefined) {
      param = {
        submission_id: form.submission_id,
        location_id : form?.location_id
      };
    }    
    
    GetRequestFormQuestionsDAO.find(param)
      .then(res => {
        groupByQuestions(res.questions);
      })
      .catch(e => {
        hideLoadingBar();
        var delay = Platform.OS == 'android' ? 0 : 800;
        setTimeout(() => {
          expireToken(dispatch, e, alertModalRef);
        }, delay);
        
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
        var primaryDevice = selectedLists.find(
          element => element.primary_device === '1',
        );
        if (primaryDevice != undefined) {
          return primaryDevice.msisdn;
        }
        return '';
      }
    }
    return value;
  };

  const hideLoadingBar = () => {
    var delay = Platform.OS == 'ios' ? 800 : 0;    
    setTimeout(() => {
      if(loadingBarRef.current){
        loadingBarRef.current.hideModal();
      }
    }, delay);
  }

  const groupByQuestions = data => {

    try{
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

    }catch(e) {
      hideLoadingBar();
    }
    
  };

  const isInNewData = (data, value) => {
    return data.find(item => item.question_group_id === value.question_group_id)
      ? true
      : false;
  };

  const updateFormQuestionsForDownloading = async formQuestions => {
    var res = filterTriggeredQuestions(formQuestions);
    if (res != undefined) {
      // start downlod service
      console.log('newData == ', JSON.stringify(res));      
      var newFormQuestions = await downloadFormQuestionImages(res);
      if (newFormQuestions != undefined) {
        setQuestions(newFormQuestions);
      }
      hideLoadingBar();      
    }else{
      hideLoadingBar();      
    }
  };

  const updateFormQuestions = formQuestions => {
    var res = filterTriggeredQuestions(formQuestions);
    if (res != undefined) {
      setQuestions(res);
    }
  };

  const onBackPressed = () => {
    props.onButtonAction({type: Constants.actionType.ACTION_CLOSE});
  };

  const onSave = () => {
    var error = validateFormQuestionData(formQuestions);
    if (error) {
      if(alertModalRef.current){
        alertModalRef.current.alert(error);
      }      
      return;
    } else {
      var form_answers = [];
      form_answers = getFormQuestionData(formQuestions);
      var files = [];
      files = getFormQuestionFile(formQuestions);
      props.onButtonAction({
        type: Constants.actionType.ACTION_DONE,
        value: {form_answers: form_answers, files: files, form: form},
      });
    }
  };

  return (
    <View style={{alignSelf: 'stretch', flex: 1, marginBottom: 0}}>

      <LoadingBar
        backButtonDisabled={true}
        ref={loadingBarRef}
        description={Strings.Download_Image}
      />

      <AlertModal ref={alertModalRef} />      

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
