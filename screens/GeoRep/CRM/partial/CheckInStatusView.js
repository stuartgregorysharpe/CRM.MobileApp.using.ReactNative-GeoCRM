import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React from 'react';
import {AppText} from '../../../../components/common/AppText';
import {whiteLabel} from '../../../../constants/Colors';
import Constants from '../../../../services/Constants';
import { Strings } from '../../../../constants';

export default function CheckInStatusView({onGo, page}) {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          onGo();
        }}>
        <View
          style={[
            styles.checkinBubble,
            {marginBottom: page === 'map' ? 60 : 150},
          ]}>
          <AppText
            size="medium"
            color={whiteLabel().headerText}
            title={Strings.You_Are_Currenly_Checkedin} ></AppText>
          <AppText
            size="medium"
            color={whiteLabel().headerText}
            title="Tap here to continue"></AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  checkinBubble: {
    width: '92%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    // backgroundColor: 'rgba(255,255,255,0.9)',
    backgroundColor: whiteLabel().headerBackground,
    alignItems: 'center',
  },
});
