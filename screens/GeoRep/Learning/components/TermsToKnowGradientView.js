import React, { useEffect, useState } from "react";
import { Dimensions, Platform, Text, View, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppText } from "../../../../components/common/AppText";
import { whiteLabel } from '../../../../constants/Colors';

const TermsGradientView = (props) => {

  const { course_title, course_description } = props

  const [linearGradientHeight, setLinearGradientHeight] = useState(180);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setLinearGradientHeight(height);
  };

  return (
    <View style={styles.marginbottom50}>
      <LinearGradient
        colors={['#286DC9', '#0037A2']}
        style={{
            borderRadius: 10,
            padding: 15,
            height: linearGradientHeight,
        }}
        onLayout={handleLayout}
        >
        <AppText type="" color={whiteLabel().headerText} size="big" title={course_title}
          style={{
            fontSize: 30,
            fontWeight: '900'
          }}
        ></AppText>
        <View style={{ padding: 5 }}></View>
        <AppText type="" color={whiteLabel().headerText} size="big" title={course_description}
          style={{
            fontSize: 15,
            fontWeight: '600'
          }}
        ></AppText>
      </LinearGradient>
    </View>
  )
}

export default TermsGradientView;

const styles = StyleSheet.create({
  marginbottom50: {
    marginBottom: 50,
  },

});