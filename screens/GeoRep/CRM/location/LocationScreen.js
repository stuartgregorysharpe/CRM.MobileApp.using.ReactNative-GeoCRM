import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Provider} from 'react-native-paper';
import GrayBackground from '../../../../components/GrayBackground';
import {Notification} from '../../../../components/modal/Notification';
import {Colors} from '../../../../constants';
import {style} from '../../../../constants/Styles';
import LocationContainer from './components/LocationContainer';

const LocationScreen = props => {
  const navigation = props.navigation;
  useEffect(() => {
    refreshHeader();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {      
      refreshHeader();      
    });
    return unsubscribe;
  }, [navigation]);

  const refreshHeader = () => {
    props.screenProps.setOptions({
      headerTitle: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <View style={style.headerTitleContainerStyle}>
              <Text style={style.headerTitle}>CRM</Text>
            </View>
          </TouchableOpacity>
        );
      },

      headerLeft: () => (
        <TouchableOpacity
          style={style.headerLeftStyle}
          activeOpacity={1}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}></TouchableOpacity>
      ),

      // tabBarStyle: {
      //   position: 'absolute',
      //   height: 50,
      //   paddingBottom: Platform.OS == 'android' ? 5 : 0,
      //   backgroundColor: Colors.whiteColor,
      // },
    });
  };
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Notification />
        <GrayBackground />
        <LocationContainer />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationScreen;
