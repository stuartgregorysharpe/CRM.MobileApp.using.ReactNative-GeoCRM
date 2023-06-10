import React from "react";
import { Dimensions, Platform, Text, View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AppText } from "../../../../components/common/AppText";
import { whiteLabel } from '../../../../constants/Colors';
const LearningGradientView = props => {
  const { total_points, courses } = props
  return (
    <View
      style={{
        marginBottom: 50
      }}
    >
      <LinearGradient
        colors={['#286DC9', '#0037A2']}
        style={{
          borderRadius: 10,
          padding: 15,
          paddingBottom: 60,
        }}>
        <AppText type="" color={whiteLabel().headerText} size="big" title="Learning Courses"
          style={{
            fontSize: 20,
            fontWeight: '900'
          }}
        ></AppText>
        <View style={{ padding: 5 }}></View>
        <AppText type="" color={whiteLabel().headerText} size="big" title="The more training courses you complete, the more products you can sell!"
          style={{
            fontSize: 13,
            fontWeight: '600'
          }}
        ></AppText>

      </LinearGradient>
      <View style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: -50,
        left: 10,
        right: 10,
      }}>
        <View style={{ alignItems: 'center' }}>
          <AppText type="" color='black' size="big" title={total_points ?? 0}
            style={{
              fontSize: 20,
              fontWeight: '900'
            }}
          ></AppText>
          <AppText type="" color='black' size="big" title="Points earned"
            style={{
              fontSize: 13,
              fontWeight: '600'
            }}
          ></AppText>
        </View>
        <View style={{ width: 2, height: '100%', backgroundColor: '#133C8B' }}></View>
        <View style={{ alignItems: 'center' }}>
          <AppText type="" color='black' size="big" title={`${courses?.completed ?? 0}/${courses?.total ?? 0}`}
            style={{
              fontSize: 20,
              fontWeight: '900'
            }}
          ></AppText>
          <AppText type="" color='black' size="big" title="Courses completed"
            style={{
              fontSize: 13,
              fontWeight: '600'
            }}
          ></AppText>
        </View>
      </View>
    </View>
  )
}

export default LearningGradientView;