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
import {Constants} from '../../../../constants';
import FormQuestionView from '../../CRM/add_lead/components/FormQuestionView';
import { getFormQuestionData, getFormQuestionFile, validateFormQuestionData } from './helper';

export const FormQuestions = props => {

  const form = props.route.params.data;
  const location_id = props.route.params.location_id;
  const pageType = props.route.params.pageType;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [formQuestions, setFormQuestions] = useState([]);
  const [modaVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);  
  const [isDateTimeView, setIsDateTimeView] = useState(false);
  const [isSign, setIsSign] = useState(false);  
  const [formSubmitFeedback, setFormSubmitFeedback] = useState(null);
  const formSubmitModalRef = useRef(null);

  const dispatch = useDispatch();
  const isShowCustomNavigationHeader = !props.screenProps;
  useEffect(() => {
    refreshHeader();
    _callFormQuestions();
  }, [form]);

  const showSelectionView = useCallback(() => {
    setModalVisible(true);
  }, [options, selectedOptions]);

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
        console.log("Res", res.questions);
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
    var flag = true;
    flag = validateFormQuestionData(formQuestions);
    if (!flag) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Please complete the compulsory questions and then submit',
          buttonText: 'Okay',
        }),
      );
      return;
    }

    var form_answers = [];    
    form_answers = getFormQuestionData(formQuestions);

    var files = [];
    files = getFormQuestionFile(formQuestions);

    var postData = new FormData();
    postData.append('form_id', form.form_id);
    postData.append('location_id', location_id);
    postData.append('online_offline', 'online');
    form_answers.map(item => {
      if (item.key != undefined && item.value != undefined) {
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

    console.log("PDAta" , JSON.stringify(postData))
    postApiRequestMultipart('forms/forms-submission', postData)
      .then(res => {
        dispatch(
          showNotification({
            type: 'success',
            message: res.message,
            buttonText: 'Okay',
            buttonAction: () => {
              clearAll();
              dispatch(clearNotification());
              onOpenFeedbackModal(res);
            },
          }),
        );
      })
      .catch(e => {});
  };
  const onOpenFeedbackModal = feedbackData => {
    setFormSubmitFeedback(feedbackData);
    if (formSubmitModalRef && formSubmitModalRef.current) {
      formSubmitModalRef.current.showModal();
    }
  };

  const updateFormQuestions = (value) => {    
      setFormQuestions(value)
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
