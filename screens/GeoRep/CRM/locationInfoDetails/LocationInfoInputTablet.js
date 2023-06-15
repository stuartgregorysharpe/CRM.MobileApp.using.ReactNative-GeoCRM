import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSelector, useDispatch} from 'react-redux';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, {    
  whiteLabel,
} from '../../../../constants/Colors';
import CustomPicker from '../../../../components/modal/CustomPicker';
import {  
  postDispositionFields,
} from '../../../../actions/location.action';
import {
  CHANGE_DISPOSITION_INFO,
  LOCATION_CONFIRM_MODAL_VISIBLE,
  SLIDE_STATUS,
  CHANGE_LOCATION_ACTION,
  CHANGE_BOTTOM_TAB_ACTION,
  STATUS_DISPOSITION_FIELDS_UPDATE,
} from '../../../../actions/actionTypes';
import Fonts from '../../../../constants/Fonts';
import AlertDialog from '../../../../components/modal/AlertDialog';
import {expireToken, getPostParameter} from '../../../../constants/Helper';
import { PostRequestDAO } from '../../../../DAO';
import { generateKey } from '../../../../constants/Utils';

var selected_outcome_id = '';
var stage_outcome_indempotency = '';
var disposition_fields_idempotency = '';

export const LocationInfoInputTablet = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [locationInfo, setLocationInfo] = useState(props.infoInput);
  const locationConfirmModalVisible = useSelector(
    state => state.rep.locationConfirmModalVisible,
  );
  const currentLocation = useSelector(state => state.rep.currentLocation);
  const locationAction = useSelector(state => state.rep.locationAction);
  const bottomTabAction = useSelector(state => state.rep.bottomTabAction);
  const dispositionFiledUpdated = useSelector(
    state => state.location.statusLocationInfoUpdate,
  );
  const dispositionRef = useRef([]);
  const [dispositionValue, setDispositionValue] = useState([]);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [isDateTimePickerVisible, setDateTimePickerVisibility] =
    useState(false);
  const [dateTimeKey, setDateTimeKey] = useState(null);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [outComeModalVisible, setOutComeModalVisible] = useState(false);
  var outcomes =
    locationInfo !== undefined &&
    locationInfo.outcomes.find(
      xx =>
        xx.outcome_id != null &&
        locationInfo.current_outcome_id &&
        xx.outcome_id == locationInfo.current_outcome_id,
    );
  const [selectedOutcomeId, setSelectedOutComeId] = useState(
    outcomes ? outcomes.outcome_id : 0,
  );
  const [selectedStageId, setSelectedStageId] = useState(
    locationInfo.stages.find(x => x.stage_id == locationInfo.current_stage_id)
      .stage_id,
  );
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  var isBelowStage = false;
  const features = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.features,
  );
  const isDisposition = features.includes('disposition_fields')


  useImperativeHandle(
    ref,
    () => ({
      postDispositionData() {
        handleSubmit();
      },
      updateDispositionData(locInfo) {
        var outcomes = locInfo.outcomes
          ? locInfo.outcomes.find(
              xx =>
                xx.outcome_id != null &&
                locInfo.current_outcome_id &&
                xx.outcome_id == locInfo.current_outcome_id,
            )
          : false;
        setSelectedOutComeId(outcomes ? outcomes.outcome_id : 0);
        setSelectedStageId(
          locInfo.stages
            ? locInfo.stages.find(x => x.stage_id == locInfo.current_stage_id)
                .stage_id
            : 0,
        );
        setLocationInfo(locInfo);
      },
    }),
    [dispositionValue],
  );

  useEffect(() => {
    dispatch({type: CHANGE_DISPOSITION_INFO, payload: false});
    dispatch({type: CHANGE_LOCATION_ACTION, payload: null});
    dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: null});
  }, []);

  useEffect(() => {
    if (!locationInfo.disposition_fields) return;
    let items = [];
    locationInfo.disposition_fields.forEach(element => {
      items.push(element.value);
    });
    setDispositionValue(items);
    setSelectedOutcomes(
      locationInfo.outcomes.filter(
        outcome => outcome.linked_stage_id == selectedStageId,
      ),
    );
  }, [locationInfo]);

  useEffect(() => {
    if (dispositionFiledUpdated == 'success') {
      setIsSuccess(true);
      dispatch({type: STATUS_DISPOSITION_FIELDS_UPDATE, payload: 'init'});
    }
  }, [dispositionFiledUpdated]);

  useEffect(() => {
    if(!outComeModalVisible && selected_outcome_id != ''){
      updateOutcomes(selected_outcome_id);
    }
  }, [outComeModalVisible]);

 
  const updateOutcomes = (outcome_id) => {
      
    if(!isLoading){
            
      setIsLoading(true);      
      var userParam = getPostParameter(currentLocation);
      let postData = {
        location_id: locationInfo.location_id,
        stage_id: selectedStageId,
        outcome_id: outcome_id,
        campaign_id: 1,
        user_local_data: userParam.user_local_data,
      };
      
      PostRequestDAO.find(0, postData, 'update-stage-outcome' , 'location-info/updateStageOutcome', '', '' ,stage_outcome_indempotency , dispatch).then((res) => {
        console.log("response => ", res)
        if(res.status == Strings.Success){
          stage_outcome_indempotency = generateKey();
        } 
        props.onOutcome(true);
        selected_outcome_id = '';      
        setIsLoading(false);
      }).catch((e) => {
        setIsLoading(false);        
        expireToken(dispatch, e);

      });      
    }

  };


  const handleSubmit = () => {
    
    var userParam = getPostParameter(currentLocation);
    let postData = {
      location_id: locationInfo.location_id,
      campaign_id: 1,
      disposition_fields: [],
      user_local_data: userParam.user_local_data,
    };

    locationInfo.disposition_fields.forEach((item, key) => {
      postData.disposition_fields.push({
        disposition_field_id: item.disposition_field_id,
        value: dispositionValue[key] !== undefined ? dispositionValue[key] : '',
      });
    });

     PostRequestDAO.find(0, postData, 'update-disposition-fields', 'location-info/updateDispositionFields', '', '', disposition_fields_idempotency, dispatch ).then((res) => {
      console.log("response ->" , res);
      if(res.status == Strings.Success){
        dispatch(showNotification({type: Strings.Success , message: res.message, buttonText: Strings.Ok }));
      }      
    }).catch((e) => {
      dispatch(showNotification({type: Strings.Success , message: e.response, buttonText: Strings.Ok}));
      expireToken(dispatch, e);
    });
 
  };

  const handleChangeText = (text, field, key) => {
    dispatch({type: CHANGE_DISPOSITION_INFO, payload: true});
    if (field.field_type == 'date' || field.field_type == 'datetime') {
      Keyboard.dismiss();
    }

    if (
      field.rule_characters.split(',')[0] == '<' &&
      text.length > Number(field.rule_characters.split(',')[1])
    ) {
      return;
    }
    if (
      (field.field_type == 'alphanumeric' &&
        (text[text.length - 1].charCodeAt() < 48 ||
          (text[text.length - 1].charCodeAt() > 57 &&
            text[text.length - 1].charCodeAt() < 65) ||
          (text[text.length - 1].charCodeAt() > 90 &&
            text[text.length - 1].charCodeAt() < 97) ||
          text[text.length - 1].charCodeAt() > 122)) ||
      (field.field_type == 'numeric' &&
        (text[text.length - 1].charCodeAt() < 48 ||
          text[text.length - 1].charCodeAt() > 57))
    )
      return;
    setDispositionValue([
      ...dispositionValue.slice(0, key),
      text,
      ...dispositionValue.slice(key + 1, dispositionValue.length),
    ]);
  };

  const handleFocus = (fieldType, key, isEditable) => {
    setDateTimeKey(key);
    if (fieldType == 'date') {
      Keyboard.dismiss();
      if (isEditable == 1) {
        setDatePickerMode('date');
        setDateTimePickerVisibility(true);
      }
    }
    if (fieldType == 'datetime') {
      Keyboard.dismiss();
      console.log('hide keybard');
      if (isEditable == 1) {
        setDatePickerMode('datetime');
        setDateTimePickerVisibility(true);
      }
    }
  };

  const handleEmpty = () => {};

  getDisableStatus = (filedType, isEditable) => {
    if (filedType == 'date' || filedType == 'datetime') {
      return true;
    }
    if (isEditable == 0) {
      return true;
    }
    return false;
  };

  const handleConfirm = date => {
    setChangeValue(true);
    let datetime = '';
    if (datePickerMode == 'date') {
      datetime =
        String(date.getFullYear()) +
        '-' +
        String(date.getMonth() + 1) +
        '-' +
        String(date.getDate());
    } else if (datePickerMode == 'datetime') {
      datetime =
        String(date.getFullYear()) +
        '-' +
        String(date.getMonth() + 1) +
        '-' +
        String(date.getDate()) +
        ' ' +
        String(date.getHours()) +
        ':' +
        String(date.getMinutes());
    }
    setDispositionValue([
      ...dispositionValue.slice(0, dateTimeKey),
      datetime,
      ...dispositionValue.slice(dateTimeKey + 1, dispositionValue.length),
    ]);
    setDateTimePickerVisibility(false);
  };

  const discard = () => {
    dispatch({type: SLIDE_STATUS, payload: false});
    if (locationAction) {
      navigation.navigate(locationAction);
    }
    if (bottomTabAction) {
      if (bottomTabAction == 'CRM') {
        screenProps.navigate(bottomTabAction, {screen: 'Root'});
      } else {
        screenProps.navigate(bottomTabAction);
      }
    }
    dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: false});
  };

  const confirmModal = () => {
    return (
      <CustomPicker
        visible={locationConfirmModalVisible}
        onModalClose={() =>
          dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: false})
        }
        renderItems={
          <View>
            <Text style={styles.confirmModalTitle}>Please note</Text>
            <Text style={styles.confirmModalDesc}>
              Returning to previous page will discard any changes made to this
              location.
            </Text>
            <View style={styles.confirmModalButtonBar}>
              <TouchableOpacity
                style={styles.confirmModalButton}
                onPress={() =>
                  dispatch({
                    type: LOCATION_CONFIRM_MODAL_VISIBLE,
                    payload: false,
                  })
                }>
                <Text styles={styles.confirmModalCancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmModalButton}
                onPress={discard}>
                <Text style={styles.confirmModalDiscardButton}>Discard</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    );
  };

  const outComesModal = () => {
    return (
      <CustomPicker
        visible={outComeModalVisible}
        renderItems={selectedOutcomes.map((outcome, key) => (
          <TouchableOpacity
            style={[styles.pickerItem]}
            key={key}
            onPress={() => {
              selected_outcome_id = outcome.outcome_id;
              setSelectedOutComeId(outcome.outcome_id);              
              setOutComeModalVisible(!outComeModalVisible);
              //setIsLoading(true);
            }}>
            <Text style={styles.pickerItemText}>{outcome.outcome_name}</Text>
            {outcome.outcome_id == selectedOutcomeId && (
              <SvgIcon icon="Check" width="23px" height="23px" />
            )}
          </TouchableOpacity>
        ))}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AlertDialog
        visible={isSuccess}
        message={'Disposition fields updated successfully'}
        onModalClose={() => {
          setIsSuccess(false);
        }}></AlertDialog>

      <View style={styles.stageContainer}>
        <View style={styles.refreshBox}>
          <Text style={styles.stageTitle}> Stage </Text>
          {locationInfo.stages.map((stage, index) => {
            if (stage.stage_id == selectedStageId) {
              isBelowStage = true;
            }
            return (
              <TouchableOpacity
                style={
                  stage.stage_id == selectedStageId
                    ? styles.selectedStageBox
                    : isBelowStage
                    ? styles.belowStageBox
                    : styles.stageBox
                }
                onPress={() => {
                  setSelectedStageId(stage.stage_id);
                  setSelectedOutComeId(null);
                  setSelectedOutcomes(
                    locationInfo.outcomes.filter(
                      outcome => outcome.linked_stage_id == stage.stage_id,
                    ),
                  );
                }}>
                <Text style={styles.stageText}>{stage.stage_name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.formContainer}>
        <ScrollView behavior="padding" style={{flex: 1}}>
          <View style={[styles.refreshBox, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <Text style={styles.stageTitle}> Outcome </Text>
              <View style={styles.outcomesBoxRow}>
                {locationInfo !== undefined &&
                  locationInfo.outcomes.map((item, index) => {
                    if (item.linked_stage_id == selectedStageId) {
                      return (
                        <TouchableOpacity
                          style={
                            item.outcome_id == selectedOutcomeId
                              ? styles.selectedOutcomesColumn
                              : styles.outcomesColumn
                          }
                          onPress={() => {
                            setSelectedOutComeId(item.outcome_id);
                            setIsLoading(true);
                          }}>
                          <Text style={styles.stageText}>
                            {item.outcome_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
              </View>
            </View>

            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={props.showLoopSlider}>
                <SvgIcon icon="Re_loop" width="45px" height="45px" />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text style={styles.boldText}>Campaign: Quill Test</Text> */}
          {locationInfo !== undefined && locationInfo.disposition_fields && (
            <View style={styles.inputBox}>
              {locationInfo.disposition_fields.map((field, key) => (
                <TouchableOpacity
                  key={key}
                  style={
                    Number(field.disposition_field_id) >= 5 &&
                    Number(field.disposition_field_id) <= 8
                      ? styles.textInputWidthTwo
                      : styles.textInputWidthOne
                  }
                  activeOpacity={1}
                  onPress={() => {}}>
                  <View>
                    <TextInput
                      theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
                      key={key}
                      type={field.field_type}
                      ref={element => {
                        dispositionRef.current[key] = element;
                      }}
                      keyboardType={
                        field.field_type === 'numeric'
                          ? 'number-pad'
                          : 'default'
                      }
                      returnKeyType={
                        field.field_type === 'numeric' ? 'done' : 'next'
                      }
                      style={styles.textInput}
                      label={
                        <Text style={{backgroundColor: Colors.bgColor}}>
                          {field.field_name}
                        </Text>
                      }
                      mode="outlined"
                      outlineColor={whiteLabel().fieldBorder}
                      activeOutlineColor={Colors.disabledColor}
                      value={dispositionValue[key]}
                      disabled={getDisableStatus(
                        field.field_type,
                        field.rule_editable,
                      )}
                      onChangeText={text => handleChangeText(text, field, key)}
                      onSubmitEditing={() => {}}
                      onPressIn={
                        field.field_type == 'date' ||
                        field.field_type == 'datetime'
                          ? handleFocus.bind(
                              null,
                              field.field_type,
                              key,
                              field.rule_editable,
                            )
                          : handleEmpty.bind(null)
                      }
                      left={
                        field.add_prefix && (
                          <TextInput.Affix
                            textStyle={{marginTop: 8}}
                            text={field.add_prefix}
                          />
                        )
                      }
                      right={
                        field.add_suffix && (
                          <TextInput.Affix
                            textStyle={{marginTop: 8}}
                            text={field.add_suffix}
                          />
                        )
                      }
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode={datePickerMode}
        onConfirm={handleConfirm}
        onCancel={() => setDateTimePickerVisibility(false)}
      />

      {locationInfo !== undefined && locationInfo.outcomes && outComesModal()}

      {outComesModal()}
      {confirmModal()}

      
    </View>
  );
});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  stageContainer: {
    flex: 2,
  },
  formContainer: {
    flex: 5,
  },

  stageTitle: {
    fontSize: 18,
    color: Colors.textColor,
    fontFamily: Fonts.secondaryBold,
    marginBottom: 8,
  },

  stageBox: {
    padding: 8,
    backgroundColor: Colors.greenColor,
    shadowColor: '#00000014',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 10,
  },

  selectedStageBox: {
    padding: 8,
    backgroundColor: Colors.blueColor,
    shadowColor: '#00000014',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 10,
  },

  belowStageBox: {
    padding: 8,
    backgroundColor: '#FFF',
    shadowColor: '#00000014',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 10,
  },

  stageText: {
    fontSize: 13,
    color: Colors.textColor,
    fontFamily: Fonts.secondaryMedium,
  },

  outcomesBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // width:'100%'
  },

  outcomesColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 8,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 10,  
  },

  selectedOutcomesColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: Colors.blueColor,
    padding: 8,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 10,    
  },

  refreshBox: {
    flex: 1,
    marginBottom: 8,
  },
  refreshImage: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8,
  },
  textInputWidthOne: {
    width: '100%',
  },
  textInputWidthTwo: {
    width: '47%',
  },
  button: {
    backgroundColor: whiteLabel().itemSelectedBackground + '31',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    minWidth: 60,
    textAlign: 'center',
    borderRadius: 7,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.2,
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    color: Colors.textColor,
    marginBottom: 8,
    paddingLeft: 10,
  },
  pickerItemText: {
    fontSize: 18,
    color: 'black',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickerContent: {
    backgroundColor: Colors.bgColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#00000055',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 20,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmModalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: whiteLabel().mainText,
    marginBottom: 8,
  },
  confirmModalDesc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  confirmModalButtonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmModalButton: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  confirmModalCancelButton: {
    color: 'gray',
    fontSize: 16,
  },
  confirmModalDiscardButton: {
    color: whiteLabel().mainText,
    fontSize: 16,
  },
});
