import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import ProgressIndicatorView from "./ProgressIndicatorView";
import SvgIcon from "../../../../components/SvgIcon";
const CourseCardItemView = props => {
    const { item, idx } = props;

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                marginVertical: 3,
                alignItems: 'center',
            }}>

                <View style={{ marginHorizontal: 2, flex: 1 }}>
                    <Text style={{
                        fontWeight: '900',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                    }}>{idx == 0 ? "UP NEXT: Lesson " : "Lesson "}{idx + 1}</Text>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 13,
                        color: 'black',
                        paddingVertical: 5,
                        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                    }}>{item.lesson_name}</Text>
                </View>

                <View>
                    {item.progress.total === item.progress.completed ? (
                        <TouchableOpacity onPress={() => { }}>
                            <View>
                                <SvgIcon icon="Angle_Left_form_blue" width="40px" height="40px" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.svggrey}>
                            <SvgIcon icon="Pass_Key" width="25px" height="25px" />
                        </View>
                    )}
                </View>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    <ProgressIndicatorView total={parseInt(item.progress.total)} completed={parseInt(item.progress.completed)}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 0,
                            flex: 1,
                            height: 4,
                        }} />
                </View>
            </View>

        </View>
    )
}

export default CourseCardItemView

const styles = StyleSheet.create({
    svggrey: {
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 40,
        width: 40,
        padding: 7,
        alignItems: "center",
        paddingLeft: 2,
    }
});