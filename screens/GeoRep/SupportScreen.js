import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Animated, Easing, Dimensions, TouchableOpacity, Text, TextInput } from 'react-native';
import { Title, Modal, Portal, Button, Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import OutsideView from 'react-native-detect-press-outside';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import Card from '../../components/Card';
import Divider from '../../components/Divider';
import SvgIcon from '../../components/SvgIcon';
import { SLIDE_STATUS } from '../../actions/actionTypes';
import { PRIMARY_COLOR, BG_COLOR } from '../../constants/Colors';

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
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    
    <ScrollView style={styles.sliderContainer}>
      
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <TouchableOpacity style={{padding: 6}} onPress={closeSlider}>
        <Divider />
      </TouchableOpacity>
      <View style={styles.sliderHeader}>
        <Title style={{fontFamily: 'Product Sans-Bold'}}>Create a ticket</Title>
        <Button 
          labelStyle={{
            fontFamily: 'Product Sans-Regular', 
            letterSpacing: 0.2
          }}
          color="#DC143C" 
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
          <TextInput placeholder='Select Issue' disabled style={styles.textField} />
          {/* <View style={[styles.textField, styles.picker]}>
            <Text>Select Issue</Text>
            <SvgIcon icon="Drop_Down" width='23px' height='23px' />
          </View>
            <Button style={{marginTop: 30}} onPress={showModal}>
              Show
            </Button> */}
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

export default function SupportScreen({screenProps}) {
  const dispatch = useDispatch();
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);

  const itemRef = useRef(null);
  const itemAnimatedValue = useRef(new Animated.Value(1)).current;
  const itemStartAnimation = (toValue) => {
    Animated.timing(itemAnimatedValue, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const itemTranslateY = itemAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height + 100],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        title: "Support",
        tabBarStyle: {
          display: 'flex',
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
  
  useEffect(() => {
    if (!crmStatus) {
      itemStartAnimation(1);
    }
  }, [crmStatus]);

  const showSlider = (index) => {
    switch(index) {
      case 0:
        itemStartAnimation(0);
        dispatch({type: SLIDE_STATUS, payload: true});
        return;
      case 1:
        dispatch({type: SLIDE_STATUS, payload: false});
        return;
      case 2:
        dispatch({type: SLIDE_STATUS, payload: false});
        return;
      default:
        return;
    }
  }

  return (
    <Provider>
      <SafeAreaView>
        <OutsideView 
          childRef={itemRef}
          onPressOutside={() => {
            dispatch({type: SLIDE_STATUS, payload: false});
          }}
        >
        <Animated.View
            ref={itemRef}
            style={[styles.transitionView, { transform: [{ translateY: itemTranslateY }] }]}
          >
            <CreateTicket 
              closeSlider={() => {
                dispatch({type: SLIDE_STATUS, payload: false});
              }} 
            />
          </Animated.View>
          <ScrollView style={styles.container}>
            {lists.map((item, index) => (
              <Card icon={item.icon} title={item.title} subtitle={item.subtitle} key={index} showSlider={showSlider.bind(null, index)} />
            ))}
          </ScrollView>
        </OutsideView>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: BG_COLOR,
    padding: 10
  },
  transitionView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BG_COLOR,
    elevation: 2,
    zIndex: 2,
    padding: 10,
  },
  sliderContainer: {
    // maxHeight: Dimensions.get('window').height - 100,
    height: 300
  },
  sliderHeader: {
    display: 'flex',
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
    borderColor: PRIMARY_COLOR,
    borderRadius: 7,
    backgroundColor: PRIMARY_COLOR
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
  textFieldBox: {
    marginBottom: 12
  },
  textFieldItem: {
    marginBottom: 10
  },
  textField: {
    backgroundColor: '#fff',
    borderRadius: 7,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    height: 40
  },
  pickerBox: {
    borderColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    height: 40
  },
  downloadButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: PRIMARY_COLOR,
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
    fontFamily: 'Product Sans-Medium',
    color: PRIMARY_COLOR
  },
  description: {
    fontSize: 14,
    fontFamily: 'Product Sans-Bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 100
  }
})