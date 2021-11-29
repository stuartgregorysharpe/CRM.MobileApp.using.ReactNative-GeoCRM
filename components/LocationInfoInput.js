import React, { useState } from 'react';
import { 
  Text, 
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { PRIMARY_COLOR } from '../constants/Colors';

export default function LocationInfoInput() {
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
      <View style={styles.shadowBox}>
        <Text style={styles.shadowBoxText}>Stage</Text>
        <View style={{flexGrow: 1}}>
          <TouchableOpacity style={[styles.button, {width: 180}]}>
            <Text style={styles.buttonText}>Opportunity</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.dropdownImage} source={require("../assets/images/Drop_Down.png")} />
      </View>
      <View style={styles.refreshBox}>
        <View style={styles.shadowBox}>
          <Text style={styles.shadowBoxText}>Outcome</Text>
          <View style={{flexGrow: 1}}>
            <TouchableOpacity style={[styles.button, {width: 140}]}>
              <Text style={styles.buttonText}>Invalid Lead</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.dropdownImage} source={require("../assets/images/Drop_Down.png")} />
        </View>
        <TouchableOpacity>
          <Image style={styles.refreshImage} source={require("../assets/images/Re_Loop_Button.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="GateKeeper Name"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={gateKeeperName}
          onChangeText={text => setGateKeeperName(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="Previous Stage and Outcome"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={previousState}
          onChangeText={text => setPreviousStage(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="Furthest Open Stage and Outcome"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={furthestOpenStage}
          onChangeText={text => setFurthestOpenStage(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="Notes"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={notes}
          onChangeText={text => setNotes(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Date/Time to Work"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={workTime}
          onChangeText={text => setWorkTime(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Outcome modified Date"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={modifiedDate}
          onChangeText={text => setModifiedDate(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Retension Week"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={retensionWeek}
          onChangeText={text => setRetensionWeek(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Retained Sales"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={retainedSales}
          onChangeText={text => setRetainedSales(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Retained Sales Percent"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={retainedSalesPercent}
          onChangeText={text => setRetainedSalesPercent(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthTwo]}
          label="Quill Cash Available"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={quillCash}
          onChangeText={text => setQuillCash(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="Current Provider"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={currentProvider}
          onChangeText={text => setCurrentProvider(text)}
        />
        <TextInput
          style={[styles.textInput, styles.textInputWidthOne]}
          label="Commonly Purchased Items"
          mode="outlined"
          outlineColor="#133C8B"
          activeOutlineColor="#9D9FA2"
          value={commonlyPurchasedItems}
          onChangeText={text => setCommonlyPurchasedItems(text)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // height: 100
  },
  shadowBox: {
    padding: 10,
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
    marginBottom: 10,
  },
  shadowBoxText: {
    width: 80,
    color: '#23282D',
    fontFamily: 'Gilroy-Medium'
  },
  dropdownImage: {
    width: 30,
    height: 30
  },
  refreshBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  refreshImage: {
    width: 55,
    height: 55,
    marginLeft: 10,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textInput: {
    height: 50,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 10
    
  },
  textInputWidthOne: {
    width: '100%'
  },
  textInputWidthTwo: {
    width: '47%'
  },
  button: {
    backgroundColor: 'rgba(21, 90, 161, 0.31)',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    borderRadius: 7
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.2,
  }
});
