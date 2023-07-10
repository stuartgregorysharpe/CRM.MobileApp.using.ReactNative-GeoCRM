import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value, prefix_icon, suffix_icon, background_color }) => (
    <View style = {{ borderRadius: 10, paddingTop:10, paddingLeft:1, paddingRight: 10, backgroundColor: background_color, flexDirection: 'column', marginVertical: 5,}}>
        <View style={styles.item}>
            <SvgIcon icon={prefix_icon} width="30" height="30" style={styles.icon} />
            <Text style={styles.text}>{value}</Text>
            <SvgIcon icon={suffix_icon} width="30" height="30" style={styles.icon} />
        </View>
    </View>
);

export default StepView;

const styles = StyleSheet.create({
    container: {

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
        marginLeft: 10, // or however much space you want between the text and the icon
    },
});
