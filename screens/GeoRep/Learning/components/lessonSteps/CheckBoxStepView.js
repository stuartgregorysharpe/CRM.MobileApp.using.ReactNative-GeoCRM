import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value }) => (
    <View style={styles.container}>
        {value?.map((tp, idx) => (
            <View style={styles.item} key={idx}>
                <Text style={styles.text}>{tp}</Text>
                { idx === 1 && <SvgIcon icon = "CheckSelectedBox" width = "20" height="20" style={styles.icon} />}
                { idx === 0 && <SvgIcon icon = "CheckBox" width = "25" height="25" style={styles.icon} />}
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
        fontWeight: '900',
        fontSize: 16,
        color: 'black',
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    icon: {
        marginLeft: 10, // or however much space you want between the text and the icon
    },
});
