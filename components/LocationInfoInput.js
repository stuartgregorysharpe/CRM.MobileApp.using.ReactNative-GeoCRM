import React, { useState, useRef } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  setWidthBreakpoints,
  parse
} from 'react-native-extended-stylesheet-breakpoints';

import SvgIcon from './SvgIcon';
import { TEXT_COLOR, BG_COLOR } from '../constants/Colors';

export default function LocationInfoInput() {
  const gateKeeperNameRef = useRef();
  const previousStateRef = useRef();
  const furthestOpenStageRef = useRef();
  const notesRef = useRef();
  const workTimeRef = useRef();
  const modifiedDateRef = useRef();
  const retensionWeekRef = useRef();
  const retainedSalesRef = useRef();
  const retainedSalesPercentRef = useRef();
  const quillCashRef = useRef();
  const currentProviderRef = useRef();
  const commonlyPurchasedItemsRef = useRef();

  const [gateKeeperName, setGateKeeperName] = useState('');
  const [previousState, setPreviousStage] = useState('');
  const [furthestOpenStage, setFurthestOpenStage] = useState('');
  const [notes, setNotes] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [retensionWeek, setRetensionWeek] = useState('');
  const [retainedSales, setRetainedSales] = useState('');
  const [retainedSalesPercent, setRetainedSalesPercent] = useState('');
  const [quillCash, setQuillCash] = useState('');
  const [currentProvider, setCurrentProvider] = useState('');
  const [commonlyPurchasedItems, setCommonlyPurchasedItems] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Stage</Text>
          <View style={{flexGrow: 1}}>
            <TouchableOpacity style={[styles.button, {width: 150}]}>
              <Text style={styles.buttonText}>Opportunity</Text>
            </TouchableOpacity>
          </View>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </View>
      </View>
      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Outcome</Text>
          <View style={{flexGrow: 1}}>
            <TouchableOpacity style={[styles.button, {width: 120}]}>
              <Text style={styles.buttonText}>Invalid Lead</Text>
            </TouchableOpacity>
          </View>
          <SvgIcon icon="Drop_Down" width='23px' height='23px' />
        </View>
        <TouchableOpacity>
          <Image style={styles.refreshImage} source={require("../assets/images/Re_Loop_Button.png")} />
        </TouchableOpacity>
      </View>
      <Text style={styles.boldText}>Campaign: Quill Test</Text>
      <View style={styles.inputBox}>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>gateKeeperNameRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {gateKeeperNameRef}
              style={styles.textInput}
              label="GateKeeper Name"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={gateKeeperName}
              onChangeText={text => setGateKeeperName(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>previousStateRef.current.focus()}
        >
          <View>
            <TextInput
              ref = {previousStateRef}
              style={styles.textInput}
              label="Previous Stage and Outcome"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={previousState}
              onChangeText={text => setPreviousStage(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>furthestOpenStageRef.current.focus()}
        >
          <View>
            <TextInput
              ref={furthestOpenStageRef}
              style={styles.textInput}
              label="Furthest Open Stage and Outcome"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={furthestOpenStage}
              onChangeText={text => setFurthestOpenStage(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>notesRef.current.focus()}
        >
          <View>
            <TextInput
              ref={notesRef}
              style={styles.textInput}
              label="Notes"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={notes}
              onChangeText={text => setNotes(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>workTimeRef.current.focus()}
        >
          <View>
            <TextInput
              ref={workTimeRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Date/Time to Work</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={workTime}
              onChangeText={text => setWorkTime(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>modifiedDateRef.current.focus()}
        >
          <View>
            <TextInput
              ref={modifiedDateRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Outcome modified Date</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={modifiedDate}
              onChangeText={text => setModifiedDate(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>retensionWeekRef.current.focus()}
        >
          <View>
            <TextInput
              ref={retensionWeekRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Retension Week</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={retensionWeek}
              onChangeText={text => setRetensionWeek(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>retainedSalesRef.current.focus()}
        >
          <View>
            <TextInput
              ref={retainedSalesRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Retained Sales</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={retainedSales}
              onChangeText={text => setRetainedSales(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>retainedSalesPercentRef.current.focus()}
        >
          <View>
            <TextInput
              ref={retainedSalesPercentRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Retained Sales Percent</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={retainedSalesPercent}
              onChangeText={text => setRetainedSalesPercent(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthTwo}
          activeOpacity={1}
          onPress={()=>quillCashRef.current.focus()}
        >
          <View>
            <TextInput
              ref={quillCashRef}
              style={styles.textInput}
              label={<Text style={{backgroundColor: BG_COLOR}}>Quill Cash Available</Text>}
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={quillCash}
              onChangeText={text => setQuillCash(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>currentProviderRef.current.focus()}
        >
          <View>
            <TextInput
              ref={currentProviderRef}
              style={styles.textInput}
              label="Current Provider"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={currentProvider}
              onChangeText={text => setCurrentProvider(text)}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textInputWidthOne}
          activeOpacity={1}
          onPress={()=>commonlyPurchasedItemsRef.current.focus()}
        >
          <View>
            <TextInput
              ref={commonlyPurchasedItemsRef}
              style={styles.textInput}
              label="Commonly Purchased Items"
              mode="outlined"
              outlineColor="#133C8B"
              activeOutlineColor="#9D9FA2"
              value={commonlyPurchasedItems}
              onChangeText={text => setCommonlyPurchasedItems(text)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const perWidth = setWidthBreakpoints(850);

const styles = EStyleSheet.create(parse({
  shadowBox: {
    padding: 8,
    height: 45,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#00000014',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
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
    display: 'flex',
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
