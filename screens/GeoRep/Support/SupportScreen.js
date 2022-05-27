import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {Provider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import { style} from '../../../constants/Styles';
import {Ticket} from './tabs/Ticket';
import Faq from './tabs/Faq';
import {WHATS_APP_LINK} from '../../../constants/Helper';
import TopThreeTab from '../../../components/common/TopThreeTab';
import { SubmitButton } from '../../../components/shared/SubmitButton';

export default function SupportScreen(props) {

  const headers = ["Ticket" , "FAQ", "WhatsApp"];  
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const [tabIndex, setTabIndex] = useState(1);
  const ticketRef = useRef();

  useEffect(() => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={style.headerTitleContainerStyle}>
                <Text style={style.headerTitle}>Support</Text>
              </View>
            </TouchableOpacity>
          );
        },
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


  const openWhatsApp = () => {
    Linking.openURL(WHATS_APP_LINK)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
    });
  }

  return (
    <Provider>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            height: '100%',
            justifyContent: 'space-between',
          }}>
            
            <TopThreeTab headers={headers} tabIndex={tabIndex}  setTabIndex={(index) => {
                if(index == 3){
                  openWhatsApp();
                }else{
                  setTabIndex(index);
                }                
            }}></TopThreeTab>

        
          <View style={{flexGrow: 1 , marginHorizontal:10}}>
            {tabIndex == 1 && <Ticket ref={ticketRef} />}
            {tabIndex == 2 && <Faq />}

        
          </View>

          {
            tabIndex == 1 &&
            <SubmitButton style={{marginHorizontal:10}} title="Submit" onSubmit={() => {
              ticketRef.current.callPostSupport();
            }}></SubmitButton>
          }

        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'BG_COLOR',    
    paddingBottom: 50,
  }, 
});
