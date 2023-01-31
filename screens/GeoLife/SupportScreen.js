import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import { Title, Modal, Portal, Button, Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Card from '../../screens/GeoRep/ContentLibrary/partial/Card';
import Divider from '../../components/Divider';
import SvgIcon from '../../components/SvgIcon';
import GrayBackground from '../../components/GrayBackground';
import { SLIDE_STATUS } from '../../actions/actionTypes';
import Colors, {  } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const lists = [
  {
    icon: "Contact_Mail",
    title: "Create Support Ticket"
  },
  {
    icon: "Quiz",
    title: "FAQ"
  },
  {
    icon: "WhatsApp",
    title: "Contact WhatsApp Support"
  },
];

function CreateTicket({closeSlider}) {
  const [modaVisible, setModalVisible] = useState(false);
  const [picker, setPicker] = useState('');

  const selectItem = (text) => {
    setModalVisible(false);
    setPicker(text);
  }

  return (
    <ScrollView style={styles.sliderContainer}>
      <TouchableOpacity style={{ padding: 6 }} onPress={closeSlider}>
        <Divider />
      </TouchableOpacity>
      <View style={styles.sliderHeader}>
        <Title style={{ fontFamily: Fonts.primaryBold }}>Create a ticket</Title>
        <Button 
          labelStyle={{
            fontFamily: Fonts.primaryRegular, 
            letterSpacing: 0.2
          }}
          color={Colors.selectedRedColor}
          uppercase={false} 
          onPress={() => console.log('Pressed')}
        >
          Clear
        </Button>
      </View>
      <View style={styles.textFieldBox}>
        <View style={styles.textFieldItem}>
          <TextInput placeholder='Contact Details' style={styles.textField} />
        </View>
        <View style={styles.textFieldItem}>
          <TouchableOpacity style={[styles.textField, styles.picker]} onPress={() => setModalVisible(true)}>
            {picker == '' && <Text>Select Issue</Text>}
            <Text>{picker}</Text>
            <SvgIcon icon="Drop_Down" width='23px' height='23px' />
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
        <View style={styles.textFieldItem}>
          <TextInput placeholder='Issue details can be entered here' style={styles.textField} />
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Upload Image</Text>
        <SvgIcon icon="File_Download" width='18px' height='18px' />
      </TouchableOpacity>
      <Text style={styles.description}>
        Please fill in the above fields and upload any relevant screenshots that could help identify the problem your experiencing.
      </Text>

      <TouchableOpacity style={styles.submitButton} onPress={() => console.log("pressed")}>
        <Text style={[styles.submitButtonText]}>Submit</Text>
        <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
      </TouchableOpacity>
    </ScrollView>
  )
}

export default function SupportScreen({navigation, screenProps}) {
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [showItem, setShowItem] = useState(0);

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
  });
  
  const showSlider = (index) => {
    switch(index) {
      case 0:
        setShowItem(1);
        dispatch({type: SLIDE_STATUS, payload: true});
        return;
      case 1:
        setShowItem(2);
        return;
      case 2:
        setShowItem(3);
        return;
      default:
        return;
    }
  }

  return (
    <Provider>
      <SafeAreaView>
        <GrayBackground />
        {crmStatus && <View
          style={[styles.transitionView, showItem == 0 ? { transform: [{ translateY: Dimensions.get('window').height + 100 }] } : { transform: [{ translateY: 0 }] } ]}
        >
          {showItem == 1 && <CreateTicket 
            closeSlider={() => {
              dispatch({type: SLIDE_STATUS, payload: false});
            }} 
          />}
        </View>}
        <ScrollView style={styles.container}>
          {lists.map((item, index) => (
            <Card icon={item.icon} title={item.title} subtitle={item.subtitle} key={index} onPress={showSlider.bind(null, index)} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: Colors.bgColor,
    padding: 10
  },
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgColor,
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
  sliderContainer: {
    maxHeight: Dimensions.get('window').height - 100,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
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
    fontFamily: Fonts.secondaryBold
  },
  submitButtonIcon: {
    position: 'absolute',
    right: 10
  },
  textFieldBox: {
    marginBottom: 12
  },
  textFieldItem: {
    marginBottom: 10
  },
  textField: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    height: 40
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerItemBox: {
    backgroundColor: Colors.bgColor, 
    padding: 10
  },
  pickerItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: 8
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: Fonts.secondaryMedium
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
  description: {
    fontSize: 14,
    fontFamily: Fonts.primaryBold,
    textAlign: 'center',
    color: '#000',
    marginBottom: 100
  }
})