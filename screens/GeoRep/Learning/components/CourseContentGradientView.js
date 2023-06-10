import React, { useEffect, useState } from "react";
import { Dimensions, Platform, Text, View, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppText } from "../../../../components/common/AppText";
import { whiteLabel } from '../../../../constants/Colors';
import ProgressIndicatorView from "./ProgressIndicatorView";

const LearningGradientView = (props) => {

  const { content } = props

  return (
    <View style={styles.marginbottom50}>
      <LinearGradient
        colors={['#286DC9', '#0037A2']}
        style={{
          borderRadius: 10,
          padding: 15,
          paddingBottom: 60,
        }}>
        <AppText type="" color={whiteLabel().headerText} size="big" title={content.course_title}
          style={{
            fontSize: 30,
            fontWeight: '900'
          }}
        ></AppText>
        <View style={{ padding: 5 }}></View>
        <AppText type="" color={whiteLabel().headerText} size="big" title={content.course_description}
          style={{
            fontSize: 15,
            fontWeight: '600'
          }}
        ></AppText>

      </LinearGradient>
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        paddingLeft: 40,
        paddingRight: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: -50,
        left: 10,
        right: 10,
      }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{
            fontSize: 30,
            fontWeight: "bold",
            color: whiteLabel().mainText,
            fontFamily: (Platform.OS === 'ios') ? "Gilroy-Bold" : "Radomir Tinkov - Gilroy-Bold",
          }}>{content?.progress?.completed ?? 0}/{content?.progress?.total ?? 0}</Text>
          <Text style={{
            fontSize: 17,
            color: '#b8b8b8',
            fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
          }}>Lessons completed</Text>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <ProgressIndicatorView total={parseInt(content?.progress?.total)} completed={parseInt(content?.progress?.completed)}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                flex: 1,
                height: 8,
              }} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default LearningGradientView;

const styles = StyleSheet.create({
  marginbottom50: {
    marginBottom: 50,
  },

});