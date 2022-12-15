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
import {useSelector} from 'react-redux';
import {Images} from '../../../constants';
import {style} from '../../../constants/Styles';
import TouchpointContainer from './containers/TouchpointContainer';
export default function TouchpointScreen(props) {
  const {screenProps} = props;
  const locationId = props.route.params.locationId;
  const custom_feature_names = useSelector(
    state => state.selection.payload.user_scopes.geo_rep.custom_feature_names,
  );
  const navigation = useNavigation();
  useEffect(() => {
    if (screenProps) {
      let title = 'Touchpoints';
      if (
        custom_feature_names &&
        custom_feature_names['location_specific_touchpoints']
      ) {
        title = custom_feature_names['location_specific_touchpoints'];
      }
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
                <Text style={style.headerTitle}>{title}</Text>
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
      <TouchpointContainer style={{flex: 1}} locationId={locationId} />
    </SafeAreaView>
  );
}
