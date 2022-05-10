import React, { useRef, useState, useEffect , useImperativeHandle } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, TouchableOpacity, Text , Linking} from 'react-native';
import { Modal, Paragraph, Provider, TextInput } from 'react-native-paper';
import {  useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { boxShadow, style } from '../../../constants/Styles';
import Colors, { whiteLabel } from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { Ticket } from './tabs/Ticket';
import Faq from './tabs/Faq';
import { WHATS_APP_LINK } from '../../../constants/Consts';

export default function SupportScreen(props) {

  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [tabIndex, setTabIndex] = useState(1); 
  const ticketRef = useRef();
  
  useEffect(() => {    
    if (props.screenProps) {
      props.screenProps.setOptions({        
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={
              () => {}}>
            <View style={style.headerTitleContainerStyle}>                
              <Text style={style.headerTitle} >Support</Text>
            </View></TouchableOpacity>)
        }
      });
      if (crmStatus) {
        props.navigation.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });
      }    
    }

  });
 
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
            <TouchableOpacity style={styles.tabItem} onPress={() => {
              
              Linking.openURL(WHATS_APP_LINK)
              .then(data => {
                console.log("WhatsApp Opened successfully " + data);  //<---Success
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");  //<---Error
              });

            }}>
            <Text style={[styles.tabText, tabIndex == 3 ? styles.tabActiveText : {}]}>WhatsApp</Text>
            </TouchableOpacity>
          </View>

          
          <View style={{ flexGrow: 1 }}>
            {tabIndex == 1 && <Ticket ref={ticketRef} /> }
            {tabIndex == 2 && <Faq /> }
          </View>

          {
            tabIndex === 1 &&
            <TouchableOpacity style={styles.submitButton} 
                onPress={() => { ticketRef.current.callPostSupport()} } >
              <Text style={[styles.submitButtonText]}>Submit</Text>
              <FontAwesomeIcon style={styles.submitButtonIcon} size={25} color={whiteLabel().actionFullButtonIcon} icon={ faAngleDoubleRight } />
            </TouchableOpacity>
          }
          

        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: 'BG_COLOR',
    padding: 10,
    paddingBottom:50
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
    fontFamily: Fonts.secondaryMedium,
    fontSize: 15,
    color: Colors.disabledColor
  },
  tabActiveText: {
    color: whiteLabel().activeTabText,
    fontFamily: Fonts.secondaryBold,
    borderBottomColor: whiteLabel().activeTabUnderline,
    borderBottomWidth: 2,
    paddingBottom: 2,
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
    borderRadius: 7,
    backgroundColor: whiteLabel().actionFullButtonBackground
  },
  submitButtonText: {
    color: whiteLabel().actionFullButtonText,
    fontSize: 15,
    fontFamily: Fonts.secondaryBold
  },
  submitButtonIcon: {
    position: 'absolute',
    right: 10
  },
  
      
})