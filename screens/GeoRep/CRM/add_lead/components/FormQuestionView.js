import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import NavigationHeader from '../../../../../components/Header/NavigationHeader';
import {DatetimePickerView} from '../../../../../components/DatetimePickerView';
import Sign from '../../../Forms/questions/partial/Sign';
import {SelectionView} from '../../../Forms/questions/partial/SelectionView';
import UploadFileView from '../../../Forms/questions/partial/UploadFileView';
import {SubmitButton} from '../../../../../components/shared/SubmitButton';
import {GuideInfoView} from '../../../Forms/partial/GuideInfoView';
import FormSubmitFeedbackModal from '../../../../../components/shared/FormSubmitFeedback/modals/FormSubmitFeedbackModal';
import {Constants, Fonts} from '../../../../../constants';
import {TextForm} from '../../../../../components/shared/TextForm';
import {YesNoForm} from '../../../../../components/shared/YesNoForm';
import {HeadingForm} from '../../../../../components/shared/HeadingForm';
import {ParagraphForm} from '../../../../../components/shared/ParagraphForm';
import {SingleSelectForm} from '../../../../../components/shared/SingleSelectForm';
import {MultipleSelectForm} from '../../../../../components/shared/MultipleSelectForm';
import {DateForm} from '../../../../../components/shared/DateForm';
import {SignatureForm} from '../../../../../components/shared/SignatureForm';
import TakePhotoForm from '../../../../../components/shared/TakePhotoForm';
import {UploadFileForm} from '../../../../../components/shared/UploadFileForm';
import SKUSelect from '../../../../../components/shared/SKUSelect';
import FormatPrice from '../../../../../components/shared/FormatPrice';
import Products from '../../../../../components/shared/Products';
import {Notification} from '../../../../../components/modal/Notification';
import {GroupTitle} from '../../../Forms/questions/partial/GroupTitle';
import EmailPdf from '../../../../../components/shared/EmailPdf';
import SKUCountForm from '../../../../../components/shared/SKUCount';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MultiSelectPhoto from '../../../../../components/shared/MultiSelectPhoto';
import TieredMultipleChoice from '../../../../../components/shared/TieredMultipleChoice';
import BrandFacing from '../../../../../components/shared/BrandFacing';
import FSUCampaign from '../../../../../components/shared/FSUCampaign';

//export default function FormQuestionView(props) {
export const FormQuestionView = forwardRef((props, ref) => {
  const {
    isShowCustomNavigationHeader,
    form,
    formQuestions,
    pageType,
    updateFormQuestions,
    onBackPressed,
    onSubmit,
  } = props;
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
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal(data) {
        onOpenFeedbackModal(data);
      },
      changeLoadingStatus(val) {
        setIsLoading(val);
      },
    }),
    [],
  );

  const showSelectionView = useCallback(() => {
    setModalVisible(true);
  }, [options, selectedOptions]);

  const handleSignature = signature => {
    onValueChangedSelectionView(key, index, signature);
    setIsSign(false);
  };

  const onOpenFeedbackModal = feedbackData => {
    setFormSubmitFeedback(feedbackData);
    if (formSubmitModalRef && formSubmitModalRef.current) {
      formSubmitModalRef.current.showModal();
    }
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
  };

  const _onTouchStart = (e, text) => {
    setBubleText(text);
    setIsInfo(true);
  };
  const closeSignView = () => {
    setIsSign(false);
  };

  const confirmDateTime = datetime => {
    var tmp = [...formQuestions];
    tmp[key].questions[index].value = datetime;
    updateFormQuestions(tmp);
  };

  const closeDateTime = () => {
    setIsDateTimeView(false);
  };

  const onCloseSelectionView = (key, index) => {
    setModalVisible(false);
  };
  const onSaveSelectionView = () => {
    setModalVisible(false);
  };
  const onValueChangedSelectionView = async (key, index, value) => {
    let _formQuestions = [...formQuestions];
    _formQuestions[key].questions[index].value = value;
    updateFormQuestions(_formQuestions);
  };

  const renderQuestion = (item, key, index) => {
    if (item.isHidden) return null;
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
            updateFormQuestions(tmp);
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
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
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
            console.log('print', type);
            console.log('print', value);
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
              _onTouchStart(null, item.guide_info);
            }
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_FORMAT_PRICE
    ) {
      return (
        <FormatPrice
          key={'format_price' + index}
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
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
            }
          }}
        />
      );
    } else if (
      item.question_type ===
      Constants.questionType.FORM_TYPE_BRAND_COMPETITOR_FACING
    ) {
      return (
        <BrandFacing
          key={'brand_competitor_facings' + index}
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
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_FSU_CAMPAIGN
    ) {
      return (
        <FSUCampaign
          key={'fsu_campaign' + index}
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
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_EMAIL_PDF
    ) {
      return (
        <EmailPdf
          key={'email_pdf' + index}
          questionType={item.question_type}
          item={item}
          fromIndex={index}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
            }
          }}
        />
      );
    } else if (
      item.question_type === Constants.questionType.FORM_TYPE_PRODUCTS ||
      item.question_type === Constants.questionType.FORM_TYPE_PRODUCT_ISSUES ||
      item.question_type === Constants.questionType.FORM_TYPE_PRODUCT_RETURN
    ) {
      return (
        <Products
          key={'products' + index}
          questionType={item.question_type}
          item={item}
          fromIndex={index}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              if (value.length > 0) {
                onValueChangedSelectionView(key, index, value);
              } else {
                onValueChangedSelectionView(key, index, null);
              }
            }
            if (type == Constants.actionType.ACTION_INFO) {
            }
          }}
        />
      );
    } else if (
      item.question_type ===
      Constants.questionType.FORM_TYPE_MULTI_SELECT_WITH_THOTO
    ) {
      return (
        <MultiSelectPhoto
          key={'multiple_select_form' + index}
          questionType={item.question_type}
          item={item}
          fromIndex={index}
          onFormAction={({type, value, item}) => {
            if (type == Constants.actionType.ACTION_FORM_SUBMIT) {
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_INFO) {
            }
          }}
        />
      );
    } else if (
      item.question_type ===
      Constants.questionType.FORM_TYPE_TIERED_MULTIPLE_CHOICE
    ) {
      return (
        <TieredMultipleChoice
          key={'tiered_multiple_choice' + index}
          questionType={item.question_type}
          item={item}
          fromIndex={index}
          onFormAction={({type, value, item}) => {
            if (
              value != '' &&
              type == Constants.actionType.ACTION_FORM_SUBMIT
            ) {
              console.log('multi select form', value);
              onValueChangedSelectionView(key, index, value);
            }
            if (type == Constants.actionType.ACTION_FORM_CLEAR) {
              onValueChangedSelectionView(key, index, null);
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
            onBackPressed();
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
          <Text style={styles.clearTextStyle}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{padding: 5}}>
        {formQuestions &&
          formQuestions.map((form, key) => {
            if (form.isHidden) return null;
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
              isLoading={isLoading}
              enabled={!isLoading}
              title="Submit"
              onSubmit={() => {
                if (!isLoading) {
                  onSubmit();
                }
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
            if (pageType != undefined && pageType === 'CRM') {
              props.navigation.navigate('CRM', {screen: 'Root'});
            }
          }
        }}
      />
    </View>
  );
});

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
