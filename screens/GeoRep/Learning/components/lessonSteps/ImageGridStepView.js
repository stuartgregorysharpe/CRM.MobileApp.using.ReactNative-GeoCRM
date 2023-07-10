import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const StepView = ({ value }) => {
    return (
        <View style={styles.container}>
            {value?.map((tp, idx) => (
                <View style={styles.view} key={idx}>
                    <Image
                        style={styles.image}
                        source={{ uri: tp }}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    view: {
        width: '46%',
        height: 150,
        margin: 5,
        padding:2,
        backgroundColor: "blue",
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default StepView;
