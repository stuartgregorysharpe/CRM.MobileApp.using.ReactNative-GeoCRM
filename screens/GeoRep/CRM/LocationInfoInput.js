import React, { useState, useRef, useEffect , useImperativeHandle, forwardRef} from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useSelector,useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import SvgIcon from '../../../components/SvgIcon';
import { PRIMARY_COLOR, TEXT_COLOR, BG_COLOR, GRAY_COLOR, DISABLED_COLOR } from '../../../constants/Colors';
import { breakPoint } from '../../../constants/Breakpoint';
import CustomPicker from '../../../components/modal/CustomPicker';
import { postStageOutcomUpdate, postDispositionFields } from '../../../actions/location.action';
import CustomLoading from '../../../components/CustomLoading';
import Images from '../../../constants/Images';
import {  LOCATION_CONFIRM_MODAL_VISIBLE, SLIDE_STATUS, CHANGE_LOCATION_ACTION, CHANGE_BOTTOM_TAB_ACTION, STATUS_DISPOSITION_FIELDS_UPDATE } from '../../../actions/actionTypes';
import AlertDialog from '../../../components/modal/AlertDialog';

<<<<<<< HEAD
export default function LocationInfoInput({  navigation, screenProps, statusSubmit, showLoopSlider}) {
=======
export const LocationInfoInput = forwardRef(( props, ref ) => {
>>>>>>> 065097d07426aff0c207a3ceb81c73c2ea1a6a46

  const dispatch = useDispatch();  
  const [locationInfo, setLocationInfo] = useState(props.infoInput);
  const locationConfirmModalVisible = useSelector(state => state.rep.locationConfirmModalVisible);
  const locationAction = useSelector(state => state.rep.locationAction);
  const bottomTabAction = useSelector(state => state.rep.bottomTabAction);
  const dispositionRef = useRef([]);
  const [dispositionValue, setDispositionValue] = useState([]);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateTimeKey, setDateTimeKey] = useState(null);  
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [outComeModalVisible, setOutComeModalVisible] = useState(false);    
<<<<<<< HEAD
  console.log("TEST", locationInfo);
  const [selectedOutcomeId, setSelectedOutComeId] = useState( locationInfo ? locationInfo.outcomes.find(xx => xx.outcome_id != null && xx.outcome_id == locationInfo.current_outcome_id).outcome_id : 0 );
  const [selectedStageId, setSelectedStageId] = useState(locationInfo.stages.find(x => x.stage_id == locationInfo.current_stage_id).stage_id);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [idempotencyKey, setIdempotencyKey] = useState(uuid.v4());
  const [submitKey, setSubmitKey] = useState(false);
  const showItem = 0
=======
  var outcomes = locationInfo.outcomes ? locationInfo.outcomes.find(xx =>  xx.outcome_id != null && locationInfo.current_outcome_id && xx.outcome_id == locationInfo.current_outcome_id ) : false;  
  const [selectedOutcomeId, setSelectedOutComeId] = useState(outcomes ? outcomes.outcome_id : 0);
  const [selectedStageId, setSelectedStageId] = useState(locationInfo.stages ? locationInfo.stages.find(x => x.stage_id == locationInfo.current_stage_id).stage_id : 0);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);  
  const [isLoading ,setIsLoading] = useState(false);
  const [isSuccess , setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      postDispositionData() {
        handleSubmit();
      },
      updateDispositionData(locInfo){        
        var outcomes = locInfo.outcomes ? locInfo.outcomes.find(xx =>  xx.outcome_id != null && locInfo.current_outcome_id && xx.outcome_id == locInfo.current_outcome_id ) : false;  
        setSelectedOutComeId(outcomes ? outcomes.outcome_id : 0);
        setSelectedStageId(locInfo.stages ? locInfo.stages.find(x => x.stage_id == locInfo.current_stage_id).stage_id : 0)              
        setLocationInfo(locInfo)
      }
    }),
    [dispositionValue],
  );
>>>>>>> 065097d07426aff0c207a3ceb81c73c2ea1a6a46

  useEffect(() => {        
    dispatch({type: CHANGE_LOCATION_ACTION, payload: null});
    dispatch({type: CHANGE_BOTTOM_TAB_ACTION, payload: null});
  }, []);

  useEffect(() => {
    if(!locationInfo.disposition_fields) return;
    let items = [];
    locationInfo.disposition_fields.forEach(element => {
      items.push(element.value)
    });
    setDispositionValue(items);
    if(locationInfo.outcomes){
      setSelectedOutcomes(locationInfo.outcomes.filter(outcome => outcome.linked_stage_id == selectedStageId));
    }
    
  }, [locationInfo])
  
  useEffect(() => {
    if (isLoading) {      
      updateOutcomes();
    }   
  }, [isLoading])
  
  const updateOutcomes = () => {
    let request = {
      "location_id": locationInfo.location_id,
      "stage_id": selectedStageId,
      "outcome_id": selectedOutcomeId,
      "campaign_id": 1,
      "indempotency_key":uuid.v4()
    }  
    postStageOutcomUpdate(request)
    .then((res) => {      
      setTimeout(() =>{
        setIsLoading(false);
      }, 500);      
    })
    .catch((e) => {
      setTimeout(() =>{
        setIsLoading(false);
      }, 500);
    })
  }

  const handleSubmit = () => {
    
    let postData = {
      "location_id": locationInfo.location_id,
      "campaign_id": 1,
      "disposition_fields": []
    }

    locationInfo.disposition_fields.forEach((item, key) => {    
      postData.disposition_fields.push({
        "disposition_field_id": item.disposition_field_id,
        "value": dispositionValue[key] !== undefined ? dispositionValue[key] :  ''
      })
    });    

    postDispositionFields(postData, uuid.v4())
    .then((res) =>{
      setMessage(res);
      setIsSuccess(true);      
    })
    .catch((error) => {
      setMessage(error);
      setIsSuccess(true);
    })        
    
  }

  const handleChangeText = (text, field, key) => {    
    if (field.field_type == "date" || field.field_type == "datetime") {      
      Keyboard.dismiss();
    }

    if (field.rule_characters.split(',')[0] == "<" && text.length > Number(field.rule_characters.split(',')[1])) {
      return;
    }
    if (
      (field.field_type == "alphanumeric" && (
        text[text.length - 1].charCodeAt() < 48 ||
        (text[text.length - 1].charCodeAt() > 57 && text[text.length - 1].charCodeAt() < 65) ||
        (text[text.length - 1].charCodeAt() > 90 && text[text.length - 1].charCodeAt() < 97) ||
        text[text.length - 1].charCodeAt() > 122
      )) || (field.field_type == "numeric" && (text[text.length - 1].charCodeAt() < 48 || text[text.length - 1].charCodeAt() > 57))
    ) return;    
    setDispositionValue([...dispositionValue.slice(0, key), text, ...dispositionValue.slice(key + 1, dispositionValue.length)])    
  }

  const handleFocus = (fieldType, key, isEditable) => {
    setDateTimeKey(key);
    if (fieldType == "date") {    
      Keyboard.dismiss();      
      if(isEditable == 1){
        setDatePickerMode("date");      
        setDateTimePickerVisibility(true);
      }      
    }
    if (fieldType == "datetime") {
      Keyboard.dismiss();      
      if( isEditable == 1){
        setDatePickerMode("datetime");
        setDateTimePickerVisibility(true);
      }      
    }
  };

  const handleEmpty = () => {
  }

  getDisableStatus = (filedType, isEditable) =>{
    if(filedType == 'date' || filedType == 'datetime'){
      return true;
    }
    if(isEditable == 0){
      return true;
    }
    return false;
  } 

  const handleConfirm = (date) => {
    
    let datetime = "";
    if (datePickerMode == "date") {
      datetime = String(date.getFullYear()) + "-" + String(date.getMonth() + 1) + "-" + String(date.getDate());
    } else if (datePickerMode == "datetime") {
      datetime = String(date.getFullYear()) + "-" + String(date.getMonth() + 1) + "-" + String(date.getDate()) + " " + String(date.getHours()) + ":" + String(date.getMinutes());
    }
    setDispositionValue([...dispositionValue.slice(0, dateTimeKey), datetime, ...dispositionValue.slice(dateTimeKey + 1, dispositionValue.length)])
    setDateTimePickerVisibility(false)
  };

  const discard = () => {
    dispatch({type: SLIDE_STATUS, payload: false});
    if (locationAction) {
      navigation.navigate(locationAction);
    }
    if (bottomTabAction) {
      if (bottomTabAction == "CRM") {
        screenProps.navigate(bottomTabAction, { screen: 'Root' });
      } else {
        screenProps.navigate(bottomTabAction);
      }
    }
    dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: false});
  }

  const confirmModal = () => {
    return (
      <CustomPicker visible={locationConfirmModalVisible} onModalClose={() => dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: false})} renderItems = {
        <View>
          <Text style={styles.confirmModalTitle}>Please note</Text>
          <Text style={styles.confirmModalDesc}>Returning to previous page will discard any changes made to this location.</Text>
          <View  style={styles.confirmModalButtonBar}>
            <TouchableOpacity style={styles.confirmModalButton} onPress={() => dispatch({type: LOCATION_CONFIRM_MODAL_VISIBLE, payload: false})}>
              <Text styles={styles.confirmModalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmModalButton} onPress={discard}>
              <Text style={styles.confirmModalDiscardButton}>Discard</Text>
            </TouchableOpacity>
          </View>
        </View>
      } />
    )
  }

  
  const stagesModal = () => {
    return (
      <CustomPicker visible={stageModalVisible} onModalClose={() => setStageModalVisible(!stageModalVisible)} renderItems={
        
        locationInfo.stages && locationInfo.stages.map((stage, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedStageId(stage.stage_id);
              setSelectedOutComeId(null);
              if(locationInfo.outcomes){
                setSelectedOutcomes(locationInfo.outcomes.filter(outcome => outcome.linked_stage_id == stage.stage_id));
              }              
              setStageModalVisible(!stageModalVisible);
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.pickerItemText}>{stage.stage_name}</Text>
              {stage.stage_id == selectedStageId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>
          </View>
        ))
      } />
    )
  }

  const outComesModal = () => {
    return (
      <CustomPicker 
        visible={outComeModalVisible}         
        renderItems= {
        selectedOutcomes.map((outcome, key) => (
          <TouchableOpacity style={[styles.pickerItem]} key={key}
          onPress={() => { 
            setSelectedOutComeId(outcome.outcome_id);
            setOutComeModalVisible(!outComeModalVisible);
            setIsLoading(true);
          }}>            
              <Text style={styles.pickerItemText}>{outcome.outcome_name}</Text>
              {outcome.outcome_id == selectedOutcomeId && <SvgIcon icon="Check" width='23px' height='23px' />}           
          </TouchableOpacity>
        ))
      } />
    )
  }
  
  return (
    <View style={styles.container}>
      
      <AlertDialog visible={isSuccess} message={message} onModalClose={() =>{           
          setIsSuccess(false)
      }}></AlertDialog>

      <View style={styles.refreshBox}>
          <TouchableOpacity style={styles.shadowBox} onPress={() => setStageModalVisible(!stageModalVisible)}>
          <Text style={styles.shadowBoxText}>Stage</Text>
          <View>
            <View style={styles.button} onPress={() => setStageModalVisible(!stageModalVisible)}>
              <Text style={styles.buttonText}>
                { locationInfo.stages ? locationInfo.stages.find(x => x.stage_id == selectedStageId).stage_name : ''}
              </Text>
            </View>
          </View>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </TouchableOpacity>
      </View>


      <View style={styles.refreshBox}>
        
        <TouchableOpacity style={styles.shadowBox} onPress={() => {setOutComeModalVisible(!outComeModalVisible)}}>
          <Text style={styles.shadowBoxText}>Outcome</Text>
<<<<<<< HEAD
          <View style={{flexShrink: 1}}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} numberOfLines={5}>
                {selectedOutcomeId ? locationInfo.outcomes.find(x =>  x.outcome_id != null && x.outcome_id == selectedOutcomeId)?.outcome_name:'Select Outcome'}
              </Text>
            </TouchableOpacity>
          </View>
=======
          <View style={{flexShrink: 1 , marginLeft:10, marginRight:10 }}>            
            <View style={styles.button}>
              {
                locationInfo.outcomes && 
                <Text style={styles.buttonText} numberOfLines={5}>
                  {selectedOutcomeId ? locationInfo.outcomes.find(x => x != null && x.outcome_id != null && x.outcome_id == selectedOutcomeId)?.outcome_name:'Select Outcome'}
                </Text>
              }
              
            </View>
          </View>          
>>>>>>> 065097d07426aff0c207a3ceb81c73c2ea1a6a46
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </TouchableOpacity>

        <TouchableOpacity onPress={props.showLoopSlider}>
          <Image style={styles.refreshImage} source={Images.loopButton} />
        </TouchableOpacity>
      </View>

      {
        locationInfo.disposition_fields &&
        <View style={styles.inputBox}>

            {locationInfo.disposition_fields.map((field, key) => (
              <TouchableOpacity
                key={key}
                style={(Number(field.disposition_field_id) >= 5 && Number(field.disposition_field_id) <= 8) ? styles.textInputWidthTwo : styles.textInputWidthOne}
                activeOpacity={1}
                onPress={() => {                       
                  field.field_type == "date" || field.field_type == "datetime" ? handleFocus(field.field_type, key, field.rule_editable) : handleEmpty.bind(null)
                }}
              >
                <View>
                  <TextInput
                    type={field.field_type}
                    ref={(element) => { dispositionRef.current[key] = element }}                    
                    keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                    returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                    style={styles.textInput}
                    label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                    mode="outlined"
                    outlineColor={PRIMARY_COLOR}
                    activeOutlineColor={DISABLED_COLOR}
                    value={dispositionValue[key]}
                    disabled = {getDisableStatus(field.field_type, field.rule_editable)}
                    onChangeText={text => handleChangeText(text, field, key)}                    
                    onSubmitEditing={()=>{                      
                    }}
                    onPressIn={field.field_type == "date" || field.field_type == "datetime" ? handleFocus.bind(null, field.field_type, key, field.rule_editable) : handleEmpty.bind(null) }
                    left={field.add_prefix && <TextInput.Affix textStyle={{marginTop: 8}} text={field.add_prefix} />}
                    right={field.add_suffix && <TextInput.Affix textStyle={{marginTop: 8}} text={field.add_suffix} />}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      }
      
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode={datePickerMode}
        onConfirm={handleConfirm}
        onCancel={() => setDateTimePickerVisibility(false)}
      />

      {
        locationInfo.stages && 
        stagesModal()
      }
      
      {
        locationInfo.outcomes &&
        outComesModal()
      }
      {confirmModal()}
      
      {<CustomLoading closeOnTouchOutside={false} message='Updating please wait.'
        onCompleted={() =>{}}
       visible={isLoading}/>}      
    </View>
  )
});


const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({

  container:{
    flex:1,
  },
  shadowBox: {
    flex:1,
    padding: 8,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#00000014',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: Platform.OS == 'ios' ? 1 : 0.5,
    shadowRadius: 0,
    elevation: 1,
    zIndex: 1,
    borderRadius: 7,
  },
  shadowBoxText: {
    fontSize: 13,    
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium'
  },
  refreshBox: {
    flex:1,
    display: perWidth('none', 'flex'),
    flexDirection: 'row',
    alignItems: 'center',
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
    flexWrap: 'wrap'
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: BG_COLOR,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8
  },
  textInputWidthOne: {
    width: '100%'
  },
  textInputWidthTwo: {
    width: '47%'
  },
  button: {
    backgroundColor: GRAY_COLOR,
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
    display: perWidth('flex', 'none'),
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    color: TEXT_COLOR,
    marginBottom: 8,
    paddingLeft: 10
  },
  pickerItemText: {
    fontSize: 18,
    color: 'black'
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickerContent: {
    backgroundColor: BG_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#00000055'
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: "white",
    borderRadius: 7,
    padding: 20,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  confirmModalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 8
  },
  confirmModalDesc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16
  },
  confirmModalButtonBar: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  confirmModalButton: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  confirmModalCancelButton: {
    color: 'gray',
    fontSize: 16
  },
  confirmModalDiscardButton: {
    color: PRIMARY_COLOR,
    fontSize: 16
  },
}));
