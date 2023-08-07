import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ label, options, correct_answer }) => {
    const [checkedStates, setCheckedStates] = useState(Array(label.length).fill(false));

    const handlePress = (index, label) => {
        correct_answer(label)
        const newCheckedStates = Array(checkedStates.length).fill(false);
        newCheckedStates[index] = true;
        setCheckedStates(newCheckedStates);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text_label}>{label}</Text>
            {options?.map((tp, idx) => (
                <TouchableOpacity onPress={() => handlePress(idx, tp.label)} key={idx}>
                    <View style={styles.image_container}>
                        <View style={styles.view} >
                            <Image
                                style={styles.image}
                                source={{ uri: tp.image }}
                            />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <SvgIcon
                            icon={checkedStates[idx] ? "CheckBox" : "CheckSelectedBox"}
                            width={checkedStates[idx] ? "24" : "20.5"}
                            height={checkedStates[idx] ? "24" : "20.5"}
                            style={styles.icon}
                        />
                        <Text style={styles.text} >{tp.label}</Text>
                    </View>
                    {
                        idx != options.length - 1 && <View style={{ backgroundColor: "grey", height: 1 }} />
                    }
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default StepView;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginVertical: 5,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        marginTop: 8,
        marginLeft: 5,
    },
    text_label: {
        marginTop: 10,
        marginLeft: 0,
        marginBottom: 5,
        flex: 1,
        fontWeight: "bold",
        fontSize: 15,
        color: "black",
        fontFamily: Platform.OS === "ios" ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    text: {
        marginTop: 10,
        marginLeft: 8,
        marginBottom: 5,
        flex: 1,
        fontSize: 13,
        color: "black",
        fontFamily: Platform.OS === "ios" ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    image_container: {
        marginTop: 10,
        backgroundColor: "lightgrey",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    view: {
        width: '46%',
        height: 150,
        margin: 5,
        padding: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
});
