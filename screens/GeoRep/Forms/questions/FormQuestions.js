import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Images from '../../../../constants/Images';
import {style} from '../../../../constants/Styles';
import {useSelector, useDispatch} from 'react-redux';
import {expireToken} from '../../../../constants/Helper';
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
import AlertModal from '../../../../components/modal/AlertModal';
var indempotencyKey;

export const FormQuestions = props => {

  const navigation = props.navigation;
  const form = props.route.params.data;
  const location_id = props.route.params.location_id;
  const pageType = props.route.params.pageType;
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [formQuestions, setFormQuestions] = useState([]);
  const [isDateTimeView, setIsDateTimeView] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formQuestionViewRef = useRef();
  const loadingBarRef = useRef();
  const alertModalRef = useRef();
  
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
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        refreshHeader();
      }, 500);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("forms question screen focussed");
      refreshHeader();      
    });
    return unsubscribe;
  }, [navigation]);


  const loadFromDB = async formId => {
    _callFormQuestions();
  };

  const saveDb = async (formQuestions, indempotencyKey) => {
    const db = await getDBConnection();
    if (db != null)
      await insertTable(db, form.form_id, formQuestions, indempotencyKey);
  };

  const refreshHeader = () => {
    console.log("render header ==============> ");
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
        // tabBarStyle: {
        //   height: 50,
        //   paddingBottom: Platform.OS == 'android' ? 5 : 0,
        //   backgroundColor: Colors.whiteColor,
        // },
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
        groupByQuestions(res.questions);
      })
      .catch(e => {        
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const groupByQuestions = async data => {
    const savedQuestionValueMap = await loadFormValuesFromDB(form.form_id);
    var newData = [];    
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
      if(formQuestionViewRef.current){
        if(Platform.OS == 'android'){
          formQuestionViewRef.current.openModal(res);
        }else{
          setTimeout(() => {
            formQuestionViewRef.current.openModal(res);
          }, 500)
        }
      }            
    } else {
      onBackPressed();
    }
  };

  const showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }

  const hideLoadingBar = () => {
    var period = 0;
    if(Platform.OS == 'ios'){
      period = 500;
    }
    setTimeout(() => {
      if(loadingBarRef.current){
        loadingBarRef.current.hideModal();
      }
    }, 500)
  }
  const showConfirmModal = (res) => {
    var period = 0;
    if(Platform.OS == 'ios'){
      period = 500;
    }
    setTimeout(() => {
      if(alertModalRef.current){
        alertModalRef.current.alert(res.message , Strings.Ok , false ,  res);
      }                         
    }, period);        
  }

  const _onSubmit = async () => {
    if (
      indempotencyKey === null ||
      indempotencyKey === undefined ||
      indempotencyKey.trim() === ''
    ) {
      indempotencyKey = generateKey();
    }

    if(isLoading) return;
    
    var error = true;
    error = validateFormQuestionData(formQuestions);
    if (error) {
      if(alertModalRef.current){
        alertModalRef.current.alert(error , Strings.Ok);
      }      
      return;
    }    
    showLoadingBar();
    saveDb(formQuestions, indempotencyKey);

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
      null
    )
      .then(async res => {
        setIsLoading(false);
        hideLoadingBar();
        showConfirmModal(res);
      })
      .catch(e => {
        setIsLoading(false);
        hideLoadingBar();
        expireToken(dispatch, e , alertModalRef);
      });
  };

  const onSubmitSuccess = async (res) => {
      try{
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
      }catch(e) {
        console.log("error in form question clean after form post => ", e);
      }      
      onOpenFormFeedbackModal(res);
      
  }

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

      <AlertModal ref={alertModalRef} 
        onModalClose={(res) => {          
          if(res && res != ''){
            onSubmitSuccess(res);
          }          
        }}
      />
      
      <LoadingBar ref={loadingBarRef} />

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
