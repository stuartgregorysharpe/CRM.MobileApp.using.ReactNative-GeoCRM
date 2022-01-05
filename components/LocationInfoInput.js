import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EStyleSheet from 'react-native-extended-stylesheet';
import { setWidthBreakpoints, parse } from 'react-native-extended-stylesheet-breakpoints';
import { useSelector } from 'react-redux';

import SvgIcon from './SvgIcon';
import { TEXT_COLOR, BG_COLOR } from '../constants/Colors';
import { breakPoint } from '../constants/Breakpoint';

export default function LocationInfoInput() {
  const locationInfo = useSelector(state => state.location.locationInfo);  
  const dispositionRef = useRef();
  const [dispositionValue, setDispositionValue] = useState([]);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [dateTimeKey, setDateTimeKey] = useState(null);

  useEffect(() => {
    if(!locationInfo.disposition_fields) return;
    let items = [];
    locationInfo.disposition_fields.forEach(element => {
      items.push(element.value)
    });
    setDispositionValue(items);
  }, [locationInfo])

  const handleChangeText = (text, field, key) => {
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

  const handleFocus = (fieldType, key) => {
    setDateTimeKey(key);
    if (fieldType == "date") {
      //hide keybard 
      setDatePickerMode("date");
      setDateTimePickerVisibility(true);
    }
    if (fieldType == "datetime") {
      setDatePickerMode("datetime");
      setDateTimePickerVisibility(true);
    }
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

  return (
    <View style={styles.container}>
      
      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Stage</Text>
          <View style={{ flexGrow: 1 }}>
            <TouchableOpacity style={[styles.button, {width: 150}]}>
              {
                locationInfo &&
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
            <TouchableOpacity style={[styles.button, {width: 120}]}>
              <Text style={styles.buttonText}>
                {locationInfo.outcomes.find(x=> x.outcome_id ==locationInfo.current_outcome_id).outcome_name}
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
                // if (field.field_type == 'date' || field.field_type == 'datetime'){
                //   console.log("dismiss");
                //   Keyboard.dismiss();
                // }
                if (field.rule_editable == 0) return;
                dispositionRef.current.focus();
              }}
            >
              <View>
                <TextInput
                  type={field.field_type}
                  ref={dispositionRef}
                  keyboardType={field.field_type === "alphanumeric" ? 'numeric' : 'default'}
                  style={styles.textInput}
                  label={<Text style={{ backgroundColor: BG_COLOR }}>{field.field_name}</Text>}
                  mode="outlined"
                  outlineColor="#133C8B"
                  activeOutlineColor="#9D9FA2"
                  value={dispositionValue[key]}
                  disabled={field.rule_editable == 0}
                  onChangeText={text => handleChangeText(text, field, key)}
                  onPressIn={handleFocus.bind(null, field.field_type, key)}
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
    </View>
  )
}

const perWidth = setWidthBreakpoints(breakPoint);

const styles = EStyleSheet.create(parse({
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
  }
}));
