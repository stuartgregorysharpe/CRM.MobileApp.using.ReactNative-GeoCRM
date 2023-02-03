import React, {useEffect, useState, useRef} from 'react';
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
import {expireToken, getFileFormat} from '../../../../constants/Helper';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import {FormQuestionView} from '../../CRM/add_lead/components/FormQuestionView';
import {
  filterTriggeredQuestions,
  getFormQuestionData,
  getFormQuestionFile,
  getFormSubmissionPostJsonData,
  loadFormValuesFromDB,
  validateFormQuestionData,
} from './helper';
import {deleteFormTable, insertTable} from '../../../../sqlite/FormDBHelper';
import {getDBConnection} from '../../../../sqlite/DBHelper';
import {
  getJsonData,
  getLocalData,
  storeJsonData,
} from '../../../../constants/Storage';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import {Constants, Strings} from '../../../../constants';
import {GetRequestFormQuestionsDAO, PostRequestDAO} from '../../../../DAO';
import {generateKey} from '../../../../constants/Utils';
import {Notification} from '../../../../components/modal/Notification';
var indempotencyKey;

//export default function FormQuestions(props) {
export const FormQuestions = props => {
  const form = props.route.params.data;
  const location_id = props.route.params.location_id;
  const pageType = props.route.params.pageType;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [formQuestions, setFormQuestions] = useState([]);
  const [isDateTimeView, setIsDateTimeView] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formQuestionViewRef = useRef();
  
  const dispatch = useDispatch();
  const isShowCustomNavigationHeader = !props.screenProps;
  let isMount = true;

  useEffect(() => {
    isMount = true;
    refreshHeader();
    loadFromDB(form.form_id);
    return () => {
      isMount = false;
    };
  }, [form]);

  const loadFromDB = async formId => {
    _callFormQuestions();
  };

  const saveDb = async (formQuestions, indempotencyKey) => {
    const db = await getDBConnection();
    if (db != null)
      await insertTable(db, form.form_id, formQuestions, indempotencyKey);
  };

  const refreshHeader = () => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (isDateTimeView) {
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
    if (location_id) {
      param.location_id = location_id;
    }

    GetRequestFormQuestionsDAO.find(param)
      .then(res => {
        if (isMount) {
          groupByQuestions(res.questions);
        }
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const groupByQuestions = async data => {
    const savedQuestionValueMap = await loadFormValuesFromDB(form.form_id);
    var newData = [];
    console.log('savedQuestionValueMap', savedQuestionValueMap);
    data.forEach(_element => {
      let element = {..._element};
      if (savedQuestionValueMap[element.form_question_id]) {
        element.value = savedQuestionValueMap[element.form_question_id];
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
    updateFormQuestions(newData);
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
    updateFormQuestions(tmp);
    indempotencyKey = null;
  };

  const closeDateTime = () => {
    setIsDateTimeView(false);
  };

  const closeSignView = () => {
    setIsSign(false);
  };
  const onOpenFormFeedbackModal = res => {
    if (res?.areas_form_improvement_feedback == '1') {
      formQuestionViewRef.current.openModal(res);
    } else {
      onBackPressed();
    }
  };

  const _onSubmit = async () => {
    if (
      indempotencyKey === null ||
      indempotencyKey === undefined ||
      indempotencyKey.trim() === ''
    ) {
      indempotencyKey = generateKey();
    }

    if(isLoading) return;
    

    saveDb(formQuestions, indempotencyKey);
    var error = true;
    error = validateFormQuestionData(formQuestions);
    if (error) {
      dispatch(
        showNotification({
          type: 'success',
          message: error,
          buttonText: Strings.Ok,
        }),
      );
      return;
    }
    

    var form_answers = [];
    form_answers = getFormQuestionData(formQuestions);
    var files = [];
    files = getFormQuestionFile(formQuestions);

    let locationId = await getLocalData('@specific_location_id');
    if (location_id && location_id != '') {
      locationId = location_id;
    }
    const postDataJson = await getFormSubmissionPostJsonData(
      form.form_id,
      locationId,
      currentLocation,
      form_answers,
      files,
    );

    setIsLoading(true);

    PostRequestDAO.find(
      locationId,
      postDataJson,
      'form_submission',
      'forms/forms-submission',
      form.form_name,
      '',
      null,
      dispatch
    )
      .then(async res => {
        
        console.log('respnose => ', res);
        // setTimeout(() => {
        //   console.log('called time out');
          dispatch(
            showNotification({
              type: 'success',
              message: res.message,
              buttonText: Strings.Ok,
              buttonAction: async () => {
                const db = await getDBConnection();
                if (db != null) await deleteFormTable(db, form.form_id);
                clearAll();
                const formIds = await getJsonData('@form_ids');
                var formIdLists = [];
                if (formIds != null) {
                  formIds.forEach(id => {
                    formIdLists.push(id);
                  });
                  formIdLists.push(form.form_id);
                  await storeJsonData('@form_ids', formIdLists);
                } else {
                  formIdLists.push(form.form_id);
                  await storeJsonData('@form_ids', formIdLists);
                }

                dispatch(clearNotification());
                onOpenFormFeedbackModal(res);
              },
            }),
          );
        //}, 700);

        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        expireToken(dispatch, e);
      });
  };

  const updateFormQuestionsAndClearDB = value => {
    updateFormQuestions(value);
    saveDb(value, '');
  };

  const updateFormQuestions = formQuestionGroups => {
    const res = filterTriggeredQuestions(formQuestionGroups);
    if (res != undefined) {
      setFormQuestions(res);
    }
  };

  const onBackPressed = value => {
    props.navigation.goBack();
  };

  return (
    <View style={{flexDirection: 'column', alignSelf: 'stretch', flex: 1}}>
      <Notification />

      <FormQuestionView
        ref={formQuestionViewRef}
        isShowCustomNavigationHeader={isShowCustomNavigationHeader}
        form={form}
        navigation={props.navigation}
        formQuestions={formQuestions}
        pageType={pageType}
        updateFormQuestions={updateFormQuestionsAndClearDB}
        onBackPressed={onBackPressed}
        onSubmit={_onSubmit}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({});
