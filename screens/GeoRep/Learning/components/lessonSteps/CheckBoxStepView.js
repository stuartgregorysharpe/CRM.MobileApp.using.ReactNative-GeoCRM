import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../../../../../components/SvgIcon";

const StepView = ({ value }) => {
    const [checked, setChecked] = useState(Array(value.length).fill(false));

    const handlePress = (index) => {
        const newChecked = Array(value.length).fill(false);
        // only allow checking an item, disallow unchecking
        if (!checked[index]) newChecked[index] = true;
        setChecked(newChecked);
    };

    return (
        <View style={styles.container}>
            {value?.map((tp, idx) => (
                <TouchableOpacity onPress={() => handlePress(idx)} key={idx}>
                    <View style={styles.item}>
                        <Text style={styles.text}>{tp}</Text>
                        <SvgIcon 
                            icon={checked[idx] ? "CheckBox" : "CheckSelectedBox"} 
                            width={checked[idx] ? "25" : "20"} 
                            height={checked[idx] ? "25" : "20"} 
                            style={styles.icon} 
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

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
    },
});
