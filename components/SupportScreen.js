import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Modal , Portal , Provider , TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from '../../components/SvgIcon';
import { boxShadow } from '../../constants/Styles';
import Fonts from '../../constants/Fonts';
import Colors, { whiteLabel } from '../constants/Colors';

const Ticket = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [modaVisible, setModalVisible] = useState(false);
  const [picker, setPicker] = useState('');

  const selectItem = (text) => {
    setModalVisible(false);
    setPicker(text);
  }

  return (
    <View>
      <Text style={styles.description}>
        Please fill in the above fields and upload any relevant screenshots that could help identify the problem your experiencing.
      </Text>
      <TouchableOpacity
        style={{ width: '100%' }}
        activeOpacity={1}
        onPress={() => emailRef.current.focus()}
      >
        <View>
          <TextInput
            theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor} }}
            ref = {emailRef}
            style={styles.textInput}
            label="Email"
            mode="outlined"
            outlineColor={Colors.primaryColor}
            activeOutlineColor={Colors.disabledColor}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: '100%' }}
        activeOpacity={1}
        onPress={() => setModalVisible(true)}
      >
        <View pointerEvents="none">
          <TextInput
            theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor } }}
            style={styles.textInput}
            label={picker == '' ? "Select Issue" : picker}
            mode="outlined"
            outlineColor={Colors.primaryColor}
            activeOutlineColor={Colors.disabledColor}
          />
          <SvgIcon style={styles.pickerIcon} icon="Drop_Down" width='23px' height='23px' />
        </View>
      </TouchableOpacity>


      <TextInput
        theme={{ colors: { text: 'black'  , placeholder: whiteLabel().disabledColor} }}
        style={styles.textArea}
        mode="outlined"
        outlineColor={Colors.primaryColor}
        activeOutlineColor={Colors.disabledColor}
        placeholder="Issue details can be entered here..."
        multiline={true}
        numberOfLines={4}
      />
      
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Upload Image</Text>
        <SvgIcon icon="File_Download" width='18px' height='18px' />
      </TouchableOpacity>
      <Portal>
        <Modal visible={modaVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.pickerItemBox}>
          <TouchableOpacity style={styles.pickerItem} onPress={selectItem.bind(null, "Issue 1")}>
            <Text style={styles.pickerItemText}>Issue 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerItem} onPress={selectItem.bind(null, "Issue 2")}>
            <Text style={styles.pickerItemText}>Issue 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerItem} onPress={selectItem.bind(null, "Issue 3")}>
            <Text style={styles.pickerItemText}>Issue 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerItem} onPress={selectItem.bind(null, "Issue 4")}>
            <Text style={styles.pickerItemText}>Issue 4</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  )
}

export default function SupportScreen({navigation, screenProps}) {
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [tabIndex, setTabIndex] = useState(1);
  

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff",
      },
    });
    if (crmStatus) {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }
    if (screenProps) {
      screenProps.setOptions({
        title: "Support",
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#fff",
        },
      });
      if (crmStatus) {
        screenProps.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      }
    }
  },);

  return (
    <Provider>
      <SafeAreaView>
        <ScrollView style={styles.container} contentContainerStyle={{ height: '100%', justifyContent: 'space-between' }}>
          <View style={[styles.tabContainer, boxShadow]}>
            <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(1)}>
            <Text style={[styles.tabText, tabIndex == 1 ? styles.tabActiveText : {}]}>Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(2)}>
              <Text style={[styles.tabText, tabIndex == 2 ? styles.tabActiveText : {}]}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => setTabIndex(3)}>
            <Text style={[styles.tabText, tabIndex == 3 ? styles.tabActiveText : {}]}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexGrow: 1 }}>
            {tabIndex == 1 && <Ticket />}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={() => console.log("pressed")}>
            <Text style={[styles.submitButtonText]}>Submit</Text>
            <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: Colors.bgColor,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginBottom: 8
  },
  tabText: {
    fontFamily: Fonts,
    fontSize: 15,
    color: Colors.disabledColor
  },
  tabActiveText: {
    color: Colors.primaryColor,
    fontFamily: 'Gilroy-Bold',
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  textInput: {
    height: 40,
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 8
  },
  textArea: {
    fontSize: 14,
    lineHeight: 30,
    backgroundColor: Colors.bgColor,
    fontFamily: 'Gilroy-Medium',
    marginBottom: 20,
  },
  submitButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 7,
    backgroundColor: Colors.primaryColor
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Gilroy-Bold'
  },
  submitButtonIcon: {
    position: 'absolute',
    right: 10
  },
  pickerItemBox: {
    backgroundColor: Colors.bgColor, 
    padding: 10
  },
  pickerItem: {
    padding: 10,
    borderRadius: 7,
    marginBottom: 8
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Medium'
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    width: 140,
    padding: 4,
    borderRadius: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 12
  },
  downloadText: {
    fontSize: 13,
    fontFamily: Fonts.primaryMedium,
    color: Colors.primaryColor
  },
  pickerIcon: {
    position: 'absolute',
    top: 15,
    right: 8
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    color: '#000',
    paddingTop: 12,
    marginBottom: 20
  }
})