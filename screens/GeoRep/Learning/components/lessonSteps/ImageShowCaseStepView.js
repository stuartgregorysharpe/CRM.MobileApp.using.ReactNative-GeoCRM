import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const StepView = ({value}) => (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={{ uri: value }}
        />
    </View>
);

export default StepView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: 'auto',
        aspectRatio: 1.2,
    }
});



