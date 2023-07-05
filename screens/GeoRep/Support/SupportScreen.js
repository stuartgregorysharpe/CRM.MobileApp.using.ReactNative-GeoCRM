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
import {style} from '../../../constants/Styles';
import {Ticket} from './tabs/Ticket';
import Faq from './tabs/Faq';
import {showOfflineDialog, WHATS_APP_LINK} from '../../../constants/Helper';
import TopThreeTab from '../../../components/common/TopThreeTab';
import {SubmitButton} from '../../../components/shared/SubmitButton';
import {checkConnectivity} from '../../../DAO/helper';
import {useDispatch} from 'react-redux';
import { Colors } from '../../../constants';


export default function SupportScreen(props, {screenProps}) {

  const navigation = props.navigation;

  const headers = ['Ticket', 'FAQ', 'WhatsApp'];
  const [tabIndex, setTabIndex] = useState(1);
  const ticketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    refreshHeader();
  }, []);

  useEffect(() => {
    if (screenProps) {
       screenProps.setOptions({
        title: 'Support'
      });
    }
  },[]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshHeader();
    });
    return unsubscribe;
  }, [navigation]);

  const refreshHeader = () => {
    if (props.screenProps) {
      setTimeout(() => {

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
      }, 0)      
    }
  }  

  const openWhatsApp = () => {
    Linking.openURL(WHATS_APP_LINK)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };

  return (
    <Provider>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <TopThreeTab
            headers={headers}
            tabIndex={tabIndex}
            setTabIndex={index => {
              if (index == 3) {
                openWhatsApp();
              } else {
                setTabIndex(index);
              }
            }}></TopThreeTab>

          <View style={{flexGrow: 1, marginHorizontal: 10}}>
            {tabIndex == 1 && <Ticket ref={ticketRef} />}
            {tabIndex == 2 && <Faq />}
          </View>

          {tabIndex == 1 && (
            <SubmitButton
              style={{marginHorizontal: 10}}
              title="Submit"
              onSubmit={() => {
                checkConnectivity().then(isConnected => {
                  if (isConnected) {
                    if (ticketRef.current) {
                      ticketRef.current.callPostSupport();
                    }
                  } else {
                    showOfflineDialog(dispatch);
                  }
                });
              }}></SubmitButton>
          )}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    paddingBottom: 50,
  },
});
