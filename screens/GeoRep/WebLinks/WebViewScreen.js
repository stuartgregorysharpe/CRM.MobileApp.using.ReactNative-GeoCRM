import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import React, {useEffect, useState, Fragment} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import NavigationHeader from '../../../components/Header/NavigationHeader';
import {style} from '../../../constants/Styles';

export default function WebViewScreen(props) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <NavigationHeader
        showIcon={true}
        title={props.route.params.data.weblink_name}
        onBackPressed={() => {
          props.navigation.goBack();
        }}></NavigationHeader>
      <WebView
        style={styles.webviewContainerStyle}
        source={{uri: props.route.params.data.web_url}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewContainerStyle: {
    flex: 1,
    // position:'absolute'
  },
});
