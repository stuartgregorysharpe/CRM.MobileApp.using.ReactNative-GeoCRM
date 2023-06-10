import React from "react";
import { Dimensions, Platform, Text, View, ScrollView, Image } from "react-native";
import ProgressIndicatorView from "./ProgressIndicatorView";
import { whiteLabel } from "../../../../constants/Colors";
const CourseCardItemView = props => {
  const { item } = props;

  return (
    <View style={{
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'center',
    }}>
      <View pointerEvents="none" >
        <Image source={{uri:item.course_icon}} style={{width:50,height:50, borderRadius: 50, borderWidth: 2, borderColor: whiteLabel().mainText}} />
      </View>
      <View style={{ marginHorizontal: 10, flex: 1 }}>
          <Text style={{
              fontSize: 14,
              color: 'black',
              fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
          }}>{item.course_name}</Text>

          <Text style={{
              fontSize: 11,
              color: 'black',
              paddingVertical:5,
              fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
          }}>Value {parseInt(item.points)} points</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{
              fontSize: 18,
              color: whiteLabel().mainText,
              fontFamily: (Platform.OS === 'ios') ? "Gilroy-Bold" : "Radomir Tinkov - Gilroy-Bold",
          }}>{item?.lessons?.completed ?? 0}/{item?.lessons?.total ?? 0}</Text>
          <Text style={{
              fontSize: 11,
              color: '#b8b8b8',
              fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
          }}>Lessons completed</Text>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <ProgressIndicatorView total={parseInt(item.lessons.total)} completed={parseInt(item.lessons.completed)}
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                flex: 1,
                height: 5,
            }}/>
          </View>
      </View>
  </View>
  )
}

export default CourseCardItemView