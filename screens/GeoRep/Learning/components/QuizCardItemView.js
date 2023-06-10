import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import ProgressIndicatorView from "./ProgressIndicatorView";
import SvgIcon from "../../../../components/SvgIcon";
const CourseCardItemView = props => {
    const { item} = props;

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                marginVertical: 5,
                alignItems: 'center',
            }}>

                <View style={{ marginHorizontal: 2, flex: 1 }}>
                    <Text style={{
                        fontWeight: '900',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                    }}>Quiz</Text>

                    <Text style={{
                        fontWeight: '600',
                        fontSize: 13,
                        color: 'black',
                        paddingVertical: 5,
                        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                    }}>Ready to test what you have learned?</Text>
                </View>

                <View>
                    {item?.progress.total === item?.progress.completed ? (
                        <TouchableOpacity onPress={() => { }}>
                            <View>
                                <SvgIcon icon="Angle_Left_form_blue" width="40px" height="40px" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.svggreyletter}>
                            <Text style={{color:"white"}}>
                                100 Points
                            </Text>
                            <SvgIcon icon="Pass_Key" width="20px" height="20px" />
                        </View>
                    )}
                </View>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <ProgressIndicatorView total={parseInt(item?.progress.total)} completed={parseInt(item?.progress.completed)}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            flex: 1,
                            height: 5,
                        }} />
                </View>
            </View>

        </View>
    )
}

export default CourseCardItemView

const styles = StyleSheet.create({
    svggreyletter: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 40,
        width: 110,
        padding: 3,
        alignItems: "center",
        paddingLeft: 10,
    }
});