import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value, icon }) => (
    <View style={styles.container}>
        {value?.map((tp, idx) => (
            <View style={styles.item} key={idx}>
                <SvgIcon icon = {icon} width = "20" height="20" style={styles.icon} />
                <Text style={styles.text}>{tp}</Text>
            </View>
        ))}
    </View>
);

export default StepView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginVertical: 5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // or however much space you want between items
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: 'black',
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    icon: {
        marginLeft: 10,
        marginRight: 5
    },
});
