import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import Images from '../../../../constants/Images';
import {style} from '../../../../constants/Styles';
import {useSelector, useDispatch} from 'react-redux';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import {
  getApiRequest,  
  postApiRequestMultipart,
} from '../../../../actions/api.action';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import * as RNLocalize from 'react-native-localize';
import FormQuestionView from '../../CRM/add_lead/components/FormQuestionView';
import { getFormQuestionData, getFormQuestionFile, validateFormQuestionData } from './helper';
import { createTable, deleteAllFormTable, deleteFormTable, getFormTableData, insertTable } from '../../../../sqlite/FormDBHelper';
import { getDBConnection } from '../../../../sqlite/DBHelper';
import uuid from 'react-native-uuid';

var indempotencyKey;

export const FormQuestions = props => {

  const form = props.route.params.data;
  const location_id = props.route.params.location_id;
  const pageType = props.route.params.pageType;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [formQuestions, setFormQuestions] = useState([]);
  const [modaVisible, setModalVisible] = useState(false);    
  const [isDateTimeView, setIsDateTimeView] = useState(false);
  const [isSign, setIsSign] = useState(false);  
  const [formSubmitFeedback, setFormSubmitFeedback] = useState(null);
  const formSubmitModalRef = useRef(null);

  const dispatch = useDispatch();
  const isShowCustomNavigationHeader = !props.screenProps;

  useEffect(() => {
    refreshHeader();
    loadFromDB(form.form_id)  
  }, [form]);
  
  const loadFromDB = async (formId) =>{
    const db = await getDBConnection();      
    //await deleteAllFormTable(db)
    const res = await getFormTableData(db , formId);
    if(res.length > 0){
      
      console.log("from db" , JSON.stringify(res.item(0)))
      // console.log("indempotencyKey db" ,JSON.parse(res.item(0).indempotencyKey))
      setFormQuestions(JSON.parse(res.item(0).formQuestions));      
      indempotencyKey = res.item(0).indempotencyKey;
      console.log("indempotencyKey",indempotencyKey);
    }else{
      console.log("from server")
      _callFormQuestions();
    }
  }

  const saveDb = async(formQuestions , indempotencyKey) =>{
    const db = await getDBConnection();  
    await insertTable(db, form.form_id, formQuestions ,indempotencyKey)        
  }
  
  const refreshHeader = () => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (isDateTimeView) {
                  closeDateTime();
                } else if (modaVisible) {
                  closeDateTime();
                } else if (isSign) {
                  closeSignView();
                } else {
                  if (pageType === 'CRM') {
                    props.navigation.navigate('CRM', {screen: 'Root'});
                  } else {
                    if (props.navigation.canGoBack()) {
                      console.log("back btn")                      
                      props.navigation.goBack();
                    }
                  }
                }
              }}>
              <View style={style.headerTitleContainerStyle}>
                <Image
                  resizeMethod="resize"
                  style={{width: 15, height: 20, marginRight: 5}}
                  source={Images.backIcon}
                />
                <Text style={style.headerTitle}>Forms</Text>
              </View>
            </TouchableOpacity>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          height: 50,
          paddingBottom: Platform.OS == 'android' ? 5 : 0,
          backgroundColor: Colors.whiteColor,
        },
      });
    }
  };

  const _callFormQuestions = () => {
    let param = {
      form_id: form.form_id,
    };
    console.log("param", param)
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
    setFormQuestions(newData);
  };


  const isInNewData = (data, value) => {
    return data.find(item => item.question_group_id === value.question_group_id)
      ? true
      : false;
  };


  const clearAll = () => {
    var tmp = [...formQuestions];
    tmp.forEach(element => {
      element.questions.forEach(item => {
        item.value = null;
        if (item.yes_image) {
          item.yes_image = undefined;
        }
        if (item.no_image) {
          item.no_image = undefined;
        }
      });
    });
    setFormQuestions(tmp);
  };

  const closeDateTime = () => {
    setIsDateTimeView(false);
  };

  const closeSignView = () => {
    setIsSign(false);
  };

  const _onSubmit = async () => {

    if(indempotencyKey === null || indempotencyKey === undefined || indempotencyKey.trim() === ""){
      indempotencyKey = uuid.v4();
    }    
    saveDb(formQuestions , indempotencyKey);

    var flag = true;
    flag = validateFormQuestionData(formQuestions);
    // if (!flag) {
    //   dispatch(
    //     showNotification({
    //       type: 'success',
    //       message: 'Please complete the compulsory questions and then submit',
    //       buttonText: 'Okay',
    //     }),
    //   );
    //   return;
    // }

    var form_answers = [];    
    form_answers = getFormQuestionData(formQuestions);

    var files = [];
    files = getFormQuestionFile(formQuestions);

    var postData = new FormData();
    postData.append('form_id', form.form_id);
    postData.append('location_id', location_id);
    postData.append('online_offline', 'online');
    form_answers.map(item => {
      if (item.key != undefined && item.value != undefined && item.value != null && item.valuel != '') {
        postData.append(item.key, item.value);
      }
    });
    files.map(item => {
      if (item.key != undefined && item.value != undefined) {
        if (item.type === 'upload_file') {
          postData.append(item.key, {
            uri: item.value.uri,
            type: item.value.type,
            name: item.value.name,
          });
        } else {
          var words = item.value.split('/');
          var ext = words[words.length - 1].split('.');
          postData.append(item.key, {
            uri: item.value,
            type: 'image/' + ext[1],
            name: words[words.length - 1],
          });
        }
      }
    });

    var time_zone = RNLocalize.getTimeZone();
    postData.append('user_local_data[time_zone]', time_zone);
    postData.append(
      'user_local_data[latitude]',
      currentLocation && currentLocation.latitude != null
        ? currentLocation.latitude
        : '0',
    );
    postData.append(
      'user_local_data[longitude]',
      currentLocation && currentLocation.longitude != null
        ? currentLocation.longitude
        : '0',
    );
    
    console.log('post Data' , postData)
    return;
    postApiRequestMultipart('forms/forms-submission', postData , indempotencyKey)
      .then(res => {
        dispatch(
          showNotification({
            type: 'success',
            message: res.message,
            buttonText: 'Okay',
            buttonAction: async() => {
              const db = await getDBConnection();
              await deleteFormTable(db, form.form_id);
              clearAll();
              dispatch(clearNotification());
              onOpenFeedbackModal(res);
            },
          }),
        );
      })
      .catch(e => {console.log(e)});
  };

  const onOpenFeedbackModal = feedbackData => {
    setFormSubmitFeedback(feedbackData);
    if (formSubmitModalRef && formSubmitModalRef.current) {
      formSubmitModalRef.current.showModal();
    }
  };

  const updateFormQuestions = (value) => {    
      setFormQuestions(value)
      saveDb(value , '');
  }

  const onBackPressed = (value) => {
      props.navigation.goBack();
  }

  return (
    <FormQuestionView 
      isShowCustomNavigationHeader={isShowCustomNavigationHeader}
      form={form}
      formQuestions={formQuestions}        
      updateFormQuestions={updateFormQuestions}               
      onBackPressed={onBackPressed}       
      onSubmit={_onSubmit}
    />

  );
};

const styles = StyleSheet.create({
  
});
