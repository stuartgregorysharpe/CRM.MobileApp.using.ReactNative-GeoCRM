import React, { useState, useRef, useEffect , createRef} from 'react';
import { Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useSelector,useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';

import SvgIcon from './SvgIcon';
import { TEXT_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';
import CustomPicker from './CustomPicker';
import { postStageOutcomUpdate } from '../actions/location.action';
import CustomLoading from './CustomLoading';

export default function LocationInfoInput() {

  const dispatch = useDispatch();
  const locationInfo = useSelector(state => state.location.locationInfo);

  const dispositionRef = useRef([]);
  const [dispositionValue, setDispositionValue] = useState([]);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateTimeKey, setDateTimeKey] = useState(null);
  const statusStageOutcomeUpdate = useSelector(state => state.location.statusStageOutcomeUpdate);

  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [outComeModalVisible, setOutComeModalVisible] = useState(false);
  const [selectedOutcomeId, setSelectedOutComeId] = useState(locationInfo.outcomes.find(x => x.outcome_id == locationInfo.current_outcome_id).outcome_id);
  const [selectedStageId, setSelectedStageId] = useState( locationInfo.current_stage_id ? locationInfo.stages.find(xx => xx.stage_id == locationInfo.current_stage_id).stage_id : 0);
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [idempotencyKey, setIdempotencyKey] = useState(uuid.v4());


  useEffect(() => {
    if(!locationInfo.disposition_fields) return;
    let items = [];
    console.log("locationInfo.disposition_fields", locationInfo.disposition_fields);

    // if (dispositionRef.current.length !== locationInfo.disposition_fields.length) {    
    //   //dispositionRef.current[i] || 
    //   dispositionRef.current = Array(locationInfo.disposition_fields.length).fill().map((_, i) => createRef());

    //   console.log("dispositionRef", dispositionRef.current);

    // }

    locationInfo.disposition_fields.forEach(element => {
      items.push(element.value)
    });
    setDispositionValue(items);
    setSelectedOutcomes(locationInfo.outcomes.filter(outcome => outcome.linked_stage_id == selectedStageId));
  }, [locationInfo])

  const handleChangeText = (text, field, key) => {

    if (field.field_type == "date" || field.field_type == "datetime") {
      //hide keybard 
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
      console.log("hide keybard");
      if( isEditable == 1){
        setDatePickerMode("datetime");
        setDateTimePickerVisibility(true);
      }      
    }
  };

  handleEmpty = () => {

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



  const stagesModal = () => {
    return (
      <CustomPicker visible={stageModalVisible} onModalClose={() => setStageModalVisible(!stageModalVisible)} renderItems={
        locationInfo.stages.map((stage, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setSelectedStageId(stage.stage_id);
              setSelectedOutComeId(null);
              setSelectedOutcomes(locationInfo.outcomes.filter(outcome => outcome.linked_stage_id == stage.stage_id));
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

  const outComesModal=()=>{
    return (
      <CustomPicker visible={outComeModalVisible} onModalClose={() => setOutComeModalVisible(!outComeModalVisible)} renderItems={
        selectedOutcomes.map((outcome, key) => (
          <View style={styles.pickerItem} key={key}>
            <TouchableOpacity onPress={() => {
              setIdempotencyKey(uuid.v4());
              setSelectedOutComeId(outcome.outcome_id);

              setOutComeModalVisible(!outComeModalVisible);
              let request={
                "location_id": locationInfo.location_id,
                "stage_id": selectedStageId,
                "outcome_id": selectedOutcomeId,
                "campaign_id": 1,
                "indempotency_key":idempotencyKey
              }
              dispatch(postStageOutcomUpdate(request));
            }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.pickerItemText}>{outcome.outcome_name}</Text>
              {outcome.outcome_id == selectedOutcomeId && <SvgIcon icon="Check" width='23px' height='23px' />}
            </TouchableOpacity>

          </View>
        ))
      } />
    )
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Stage</Text>
          <View style={{ flexGrow: 1 }}>

            <TouchableOpacity style={[styles.button, {width: 150}]}>
              {
                locationInfo && locationInfo.stages && locationInfo.current_stage_id &&
                <Text style={styles.buttonText}>
                  {locationInfo.stages.find(x=> x.stage_id ==locationInfo.current_stage_id).stage_name}
                </Text>
              }

            </TouchableOpacity>
          </View>

          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </View>
      </View>

      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Outcome</Text>
          <View style={{ flexGrow: 1 }}>
            <TouchableOpacity style={[styles.button, { width: 120 }]} onPress={()=>setOutComeModalVisible(!outComeModalVisible)}>
              <Text style={styles.buttonText}>
                {selectedOutcomeId ? locationInfo.outcomes.find(x => x.outcome_id == selectedOutcomeId)?.outcome_name:'Select Outcome'}
              </Text>
            </TouchableOpacity>
          </View>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </View>
        <TouchableOpacity>
          <Image style={styles.refreshImage} source={require("../assets/images/Re_Loop_Button.png")} />
        </TouchableOpacity>
      </View>


      <Text style={styles.boldText}>Campaign: Quill Test</Text>

      {
        locationInfo.disposition_fields &&
        <View style={styles.inputBox}>

            {locationInfo.disposition_fields.map((field, key) => (
              <TouchableOpacity
                key={key}
                style={(Number(field.disposition_field_id) >= 5 && Number(field.disposition_field_id) <= 8) ? styles.textInputWidthTwo : styles.textInputWidthOne}
                activeOpacity={1}
                onPress={()=>{     
                  //if (field.rule_editable == 0) return;                  
                }}
              >
                <View>
                  <TextInput
                    type={field.field_type}
                    ref={(element) => { dispositionRef.current[key] = element }}
                    // autoFocus={true}
                    keyboardType={field.field_type === "numeric" ? 'number-pad' : 'default'}
                    returnKeyType={field.field_type === "numeric" ? 'done' : 'next'}
                    style={styles.textInput}
                    label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                    mode="outlined"
                    outlineColor="#133C8B"
                    activeOutlineColor="#9D9FA2"
                    value={dispositionValue[key]}
                    disabled = {getDisableStatus(field.field_type, field.rule_editable)}
                    onChangeText={text => handleChangeText(text, field, key)}
                    //blurOnSubmit={false}
                    onSubmitEditing={()=>{
                      //if(Number(key + 1) <= locationInfo.disposition_fields.length - 1 ){                                                
                        //dispositionRef.current[key + 1].focus();
                        //dispositionRef.current[key + 1].scrollIntoView({block:"start", beavior:"smooth"});
                      //}                      
                    }}
                    onPressIn={field.field_type == "date" || field.field_type == "datetime" ? handleFocus.bind(null, field.field_type, key, field.rule_editable) : this.handleEmpty() }
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
      {stagesModal()}
      {outComesModal()}
      {<CustomLoading closeOnTouchOutside={false} message='Updating please wait.' visible={statusStageOutcomeUpdate=='request'}/>}

    </View>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({

  container:{
    flex:1,
  },
  shadowBox: {
    padding: 8,
    height: 45,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 90,
    color: TEXT_COLOR,
    fontFamily: 'Gilroy-Medium'
  },
  refreshBox: {
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
    backgroundColor: 'rgba(21, 90, 161, 0.31)',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    borderRadius: 7
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
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
}));
