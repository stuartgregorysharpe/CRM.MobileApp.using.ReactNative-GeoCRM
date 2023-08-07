import React, { useState } from "react";
import { Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";

const StepView = ({ label, correct_answer }) => {

    const [selected, setSelected] = useState(null);

    const handlePress = (value) => {
        value ? correct_answer("true") : correct_answer("false");
        setSelected(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selected === true ? styles.selected : styles.notSelected]}
                        onPress={() => handlePress(true)}
                    >
                        <Text style={selected === true ? styles.selectedText : styles.notSelectedText}>True</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, selected === false ? styles.selected : styles.notSelected]}
                        onPress={() => handlePress(false)}
                    >
                        <Text style={selected === false ? styles.selectedText : styles.notSelectedText}>False</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default StepView;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    text: {
        marginHorizontal: 2,
        flex: 1,
        fontWeight: '100',
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 4,
        margin: 10,
        borderRadius: 20,
        borderColor: "gray",
        width: 100,
        height: 25,
        padding: 0,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    selected: {
        backgroundColor: '#133c8b', // or whatever color you want for selected
    },
    notSelected: {
        backgroundColor: 'white', // or whatever color you want for not selected
    },
    selectedText: {
        color: 'white', // or whatever text color you want for selected
    },
    notSelectedText: {
        color: 'black', // or whatever text color you want for not selected
    },
});
