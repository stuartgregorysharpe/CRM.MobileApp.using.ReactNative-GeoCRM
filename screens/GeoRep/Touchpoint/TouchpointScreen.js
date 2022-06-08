import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Images} from '../../../constants';
import {style} from '../../../constants/Styles';
import TouchpointContainer from './containers/TouchpointContainer';
export default function TouchpointScreen({screenProps}) {
  const navigation = useNavigation();
  useEffect(() => {
    if (screenProps) {
      screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={style.headerTitleContainerStyle}>
                <Image
                  resizeMethod="resize"
                  style={{width: 15, height: 20, marginRight: 5}}
                  source={Images.backIcon}
                />
                <Text style={style.headerTitle}>Touchpoints</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TouchpointContainer style={{flex: 1}} />
    </SafeAreaView>
  );
}
