import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {HeadingForm} from '../../../../components/shared/HeadingForm';
import {ParagraphForm} from '../../../../components/shared/ParagraphForm';
import {TextForm} from '../../../../components/shared/TextForm';
import {YesNoForm} from '../../../../components/shared/YesNoForm';
import {SingleSelectForm} from '../../../../components/shared/SingleSelectForm';
import {UploadFileForm} from '../../../../components/shared/UploadFileForm';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Images from '../../../../constants/Images';
import {style} from '../../../../constants/Styles';
import {GroupTitle} from './partial/GroupTitle';
import {MultipleSelectForm} from '../../../../components/shared/MultipleSelectForm';
import {DateForm} from '../../../../components/shared/DateForm';
import TakePhotoForm from '../../../../components/shared/TakePhotoForm';
import {useSelector, useDispatch} from 'react-redux';
import {SignatureForm} from '../../../../components/shared/SignatureForm';
import SKUCountForm from '../../../../components/shared/SKUCount';
import Sign from './partial/Sign';
import {SelectionView} from './partial/SelectionView';
import {DatetimePickerView} from '../../../../components/DatetimePickerView';
import {SubmitButton} from '../../../../components/shared/SubmitButton';
import {GuideInfoView} from '../partial/GuideInfoView';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import {Notification} from '../../../../components/modal/Notification';
import NavigationHeader from '../../../../components/Header/NavigationHeader';
import {
  getApiRequest,
  postApiRequest,
  postApiRequestMultipart,
} from '../../../../actions/api.action';
import {
  clearNotification,
  showNotification,
} from '../../../../actions/notification.action';
import * as RNLocalize from 'react-native-localize';
import UploadFileView from './partial/UploadFileView';
import {Constants} from '../../../../constants';
import SKUSelect from '../../../../components/shared/SKUSelect';
import FormSubmitFeedbackModal from '../../../../components/shared/FormSubmitFeedback/modals/FormSubmitFeedbackModal';

export const FormQuestions = props => {
  const form = props.route.params.data;
  const location_id = props.route.params.location_id;
  const pageType = props.route.params.pageType;

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [formQuestions, setFormQuestions] = useState([]);
  const [modaVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [index, setIndex] = useState(-1);
  const [key, setKey] = useState(-1);
  const [mode, setMode] = useState('single');
  const [isDateTimeView, setIsDateTimeView] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [bubbleText, setBubleText] = useState('');
  const [signature, setSignature] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isUploadFileView, setIsUploadFileView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const _onTouchStart = (e, text) => {
    setBubleText(text);
    setIsInfo(true);
  };

  const confirmDateTime = datetime => {
    var tmp = [...formQuestions];
    tmp[key].questions[index].value = datetime;
    setFormQuestions(tmp);
  };

  const closeDateTime = () => {
    setIsDateTimeView(false);
  };

  const handleSignature = signature => {
    onValueChangedSelectionView(key, index, signature);
    setIsSign(false);
  };

  const closeSignView = () => {
    setIsSign(false);
  };

  const onCloseSelectionView = (key, index) => {
    //onValueChangedSelectionView(key, index, null);
    setModalVisible(false);
  };
  const onSaveSelectionView = () => {
    setModalVisible(false);
  };
  const onValueChangedSelectionView = async (key, index, value) => {
    var tmp = [...formQuestions];
    tmp[key].questions[index].value = value;
    setFormQuestions(tmp);
  };

  const _onSubmit = async () => {
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
    var index = 0;
    formQuestions.forEach(element => {
      element.questions.forEach(item => {
        var value = item.value;
        form_answers.push({
          key: `form_answers[${index}][form_question_id]`,
          value: item.form_question_id,
        });

        if (
          item.question_type === 'multiple' ||
          item.question_type === 'multi_select'
        ) {
          if (item.value && item.value.length > 0) {
            var j = 0;
            item.value.forEach(subElement => {
              form_answers.push({
                key: `form_answers[${index}][answer][${j}]`,
                value: item.question_type === 'take_photo' ? '' : subElement,
              });
              j = j + 1;
            });
          }
        } else if (
          item.question_type === Constants.questionType.FORM_TYPE_SKU_COUNT ||
          item.question_type ===
            Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE ||
          item.question_type === Constants.questionType.FORM_TYPE_SKU_SELECT
        ) {
          if (value && value.form_answers_array) {
            value.form_answers_array.forEach(itemValue => {
              form_answers.push({
                ...itemValue,
                key: `form_answers[${index}]` + itemValue.key,
              });
            });
          }
        } else {
          form_answers.push({
            key: `form_answers[${index}][answer]`,
            value:
              item.question_type === 'take_photo' ||
              item.question_type === 'upload_file'
                ? ''
                : value,
          });
        }
        index = index + 1;
        //}
      });
    });

    var files = [];
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
        }
      });
    });

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
    formSubmitModalRef.current.showModal();
  };
  const renderQuestion = (item, key, index) => {
    if (item.question_type === 'text') {
      return (
        <TextForm
          key={'text_question' + index}
          onTextChanged={text => {
            onValueChangedSelectionView(key, index, text);
          }}
          item={item}
          type="text"
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}></TextForm>
      );
    } else if (item.question_type === 'yes_no') {
      return (
        <YesNoForm
          onTakeImage={async (images, type) => {
            var tmp = [...formQuestions];
            if (type === 'yes') {
              tmp[key].questions[index].yes_image = images;
            } else {
              tmp[key].questions[index].no_image = images;
            }
            setFormQuestions(tmp);
          }}
          onPress={(value, type) => {
            onValueChangedSelectionView(key, index, value);
          }}
          key={'yes_no_question' + index}
          item={item}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}></YesNoForm>
      );
    } else if (item.question_type === 'heading') {
      return (
        <HeadingForm key={'heading_question' + index} item={item}></HeadingForm>
      );
    } else if (item.question_type === 'paragraph') {
      return (
        <ParagraphForm
          key={'paragraph_question' + index}
          item={item}></ParagraphForm>
      );
    } else if (item.question_type === 'multiple') {
      return (
        <SingleSelectForm
          key={'multiple_question' + index}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={item => {
            setMode('single');
            setOptions(item.options);
            setSelectedOptions(item.value);
            setKey(key);
            setIndex(index);
            showSelectionView();
          }}
          item={item}></SingleSelectForm>
      );
    } else if (item.question_type === 'multi_select') {
      return (
        <MultipleSelectForm
          key={'multi_select_question' + index}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={item => {
            setMode('multiple');
            setOptions(item.options);
            setSelectedOptions(item.value);
            setKey(key);
            setIndex(index);
            showSelectionView();
          }}
          item={item}></MultipleSelectForm>
      );
    } else if (item.question_type === 'numbers') {
      return (
        <TextForm
          onTextChanged={text => {
            onValueChangedSelectionView(key, index, text);
          }}
          key={'numbers_question' + index}
          item={item}
          type="numeric"
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}></TextForm>
      );
    } else if (item.question_type === 'date') {
      return (
        <DateForm
          key={'date_question' + index}
          item={item}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={() => {
            setKey(key);
            setIndex(index);
            setSelectedDate(item.value);
            setIsDateTimeView(true);
          }}></DateForm>
      );
    } else if (item.question_type === 'signature') {
      return (
        <SignatureForm
          key={'signature_question' + index}
          item={item}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={() => {
            setKey(key);
            setIndex(index);
            setSignature(item.value);

            setIsSign(true);
          }}></SignatureForm>
      );
    } else if (item.question_type === 'take_photo') {
      return (
        <TakePhotoForm
          key={'take_photo_question' + `${key}${index}`}
          item={item}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={value => {
            onValueChangedSelectionView(key, index, value);
          }}></TakePhotoForm>
      );
    } else if (item.question_type === 'upload_file') {
      return (
        <UploadFileForm
          key={'upload_form' + index}
          item={item}
          onTouchStart={(e, text) => {
            _onTouchStart(e, text);
          }}
          onPress={() => {
            setKey(key);
            setIndex(index);
            setIsUploadFileView(true);
            setSelectedItem(item);
          }}></UploadFileForm>
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_SKU_COUNT
    ) {
      return (
        <SKUCountForm
          key={'sku_count_form' + index}
          questionType={item.question_type}
          item={item}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
              _onTouchStart(null, item.guide_info);
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_SKU_SHELF_SHARE
    ) {
      return (
        <SKUCountForm
          key={'sku_self_share_form' + index}
          questionType={item.question_type}
          item={item}
          formIndex={index}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
              _onTouchStart(null, item.guide_info);
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_SKU_SELECT
    ) {
      return (
        <SKUSelect
          key={'sku_select_form' + index}
          questionType={item.question_type}
          item={item}
          formIndex={index}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
              _onTouchStart(null, item.guide_info);
            }
          }}
        />
      );
    }
    return <View key={'question' + index}></View>;
  };

  return (
    <View style={styles.container}>
      {isShowCustomNavigationHeader && (
        <NavigationHeader
          showIcon={true}
          title={'Forms'}
          onBackPressed={() => {
            props.navigation.goBack();
          }}
        />
      )}
      <Notification></Notification>
      <DatetimePickerView
        visible={isDateTimeView}
        value={selectedDate}
        onModalClose={() => {
          closeDateTime();
        }}
        close={date => {
          confirmDateTime(date);
          closeDateTime();
        }}></DatetimePickerView>
      <Sign
        visible={isSign}
        signature={signature}
        onOK={handleSignature}
        onClear={() => {
          onValueChangedSelectionView(key, index, null);
        }}
        onClose={() => {
          onValueChangedSelectionView(key, index, null);
          closeSignView();
        }}></Sign>
      <SelectionView
        visible={modaVisible}
        options={options}
        mode={mode}
        selectedVals={selectedOptions}
        onValueChanged={value => {
          onValueChangedSelectionView(key, index, value);
        }}
        onClose={() => {
          onCloseSelectionView(key, index);
        }}
        onSave={() => {
          // setOptions([]);
          // setSelectedOptions([]);
          onSaveSelectionView();
        }}>
        {' '}
      </SelectionView>
      <UploadFileView
        visible={isUploadFileView}
        item={selectedItem}
        onClose={() => {
          setIsUploadFileView(false);
        }}
        onValueChanged={value => {
          onValueChangedSelectionView(key, index, value);
        }}></UploadFileView>
      <View style={styles.titleContainerStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.formTitleStyle}>{form.form_name}</Text>
        </View>
        <TouchableOpacity
          style={{alignItems: 'flex-end', padding: 5}}
          onPress={() => clearAll()}>
          <Text style={styles.clearTextStyle}>Clear All Answers</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding: 5}}>
        {formQuestions &&
          formQuestions.map((form, key) => {
            return (
              <View key={'form' + key}>
                <GroupTitle title={form.question_group}></GroupTitle>
                {form.questions.map((item, index) => {
                  return renderQuestion(item, key, index);
                })}
              </View>
            );
          })}
        <View style={{marginTop: 10, marginBottom: 70}}>
          {formQuestions && formQuestions.length > 0 && (
            <SubmitButton
              title="Submit"
              onSubmit={() => {
                _onSubmit();
              }}></SubmitButton>
          )}
        </View>
      </ScrollView>
      <GuideInfoView
        visible={isInfo}
        info={bubbleText}
        onModalClose={() => setIsInfo(false)}></GuideInfoView>
      <FormSubmitFeedbackModal
        data={formSubmitFeedback}
        ref={formSubmitModalRef}
        onButtonAction={({type}) => {
          if (
            type == Constants.actionType.ACTION_DONE ||
            type == Constants.actionType.ACTION_CLOSE
          ) {
            if (pageType === 'CRM') {
              props.navigation.navigate('CRM', {screen: 'Root'});
            }
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainerStyle: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },

  formTitleStyle: {
    fontSize: 16,
    color: Colors.blackColor,
    fontFamily: Fonts.primaryBold,
  },

  clearTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Colors.selectedRedColor,
  },
});
