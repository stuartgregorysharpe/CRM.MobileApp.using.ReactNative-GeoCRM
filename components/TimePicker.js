import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Button, Title, Portal, TextInput} from 'react-native-paper';
import Colors, {whiteLabel} from '../constants/Colors';
import {getTwoDigit} from '../constants/Helper';
import {boxShadow, style} from '../constants/Styles';
import SvgIcon from './SvgIcon';

export const TimePicker = props => {
  const {title, initHour, initMin, initAP, onChanged} = props;
  const [ap, setAP] = useState(initAP);
  const [hour, setHour] = useState(initHour);
  const [min, setMin] = useState(initMin);
  const hourRef = useRef();
  const minRef = useRef();

  return (
    <View
      style={[
        style.card,
        boxShadow,
        {flex: 1, marginRight: 5, paddingTop: 3, paddingBottom: 3},
      ]}>
      <Text style={styles.timeTitleStyle}>{title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TextInput
          ref={hourRef}
          spellCheck={false}
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          value={initHour}
          onChangeText={value => {
            if (value.length <= 2) {
              setHour(value);
              onChanged(value, initMin, ap);
            } else if (value.length > 0) {
              minRef.current.focus();
            }
          }}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          style={styles.textInput}></TextInput>
        <Text style={{marginRight: 5}}>:</Text>
        <TextInput
          ref={minRef}
          spellCheck={false}
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          value={initMin}
          onChangeText={value => {
            if (value.length <= 2) {
              setMin(value);
              onChanged(initHour, value, ap);
            } else if (value.length == 0) {
              //hourRef.current.focus();
            }
          }}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          style={styles.textInput}></TextInput>
        {initAP !== '' && (
          <TouchableOpacity
            onPress={() => {
              if (ap === 'AM') {
                setAP('PM');
                onChanged(hour, min, 'PM');
              } else {
                setAP('AM');
                onChanged(hour, min, 'AM');
              }
            }}>
            <Text style={styles.timeTitleStyle}>{ap}</Text>
          </TouchableOpacity>
        )}

        <View style={{marginLeft: 6}}>
          <TouchableOpacity
            style={{
              width: 23,
              height: 23,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (parseInt(initMin) + 15 < 60) {
                onChanged(initHour, getTwoDigit(parseInt(initMin) + 15), ap);
              } else {
                onChanged(
                  getTwoDigit(parseInt(initHour) + 1),
                  getTwoDigit(parseInt(initMin) + 15 - 60),
                  ap,
                );
              }
            }}>
            <SvgIcon icon="Time_Up" width="20px" height="20px" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 23,
              height: 23,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (parseInt(initMin) - 15 >= 0) {
                onChanged(initHour, getTwoDigit(parseInt(initMin) - 15), ap);
              } else {
                onChanged(
                  getTwoDigit(parseInt(initHour) - 1),
                  getTwoDigit(60 + parseInt(initMin) - 15),
                  ap,
                );
              }
            }}>
            <SvgIcon icon="Time_Down" width="20px" height="20px" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeTitleStyle: {
    fontSize: 14,
    color: Colors.blackColor,
  },
  textInput: {
    height: 30,
    fontSize: 14,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 0,
  },
});
