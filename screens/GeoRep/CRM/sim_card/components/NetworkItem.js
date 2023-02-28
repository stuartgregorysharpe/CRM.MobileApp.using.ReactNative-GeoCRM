import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

const NetworkItem = (props) => {

    const {index, selectedIndex} = props;
    const { logo , name ,  } = props.item;        

    const onItemSelected = () => {
        if(props.onItemSelected){
            props.onItemSelected(index);
        }
    }

    return (
        <View
            style={{
                flex:1,						
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity 
                onPress={onItemSelected}
                style={[styles.container , {height: index == selectedIndex ? 40 : 30 }]}>
                <FastImage
                    style={[styles.imageContainer, { height: '100%' }]}
                    source={{ uri: logo }}
                />
            </TouchableOpacity>
        </View>

        
    )
}

export default NetworkItem

const styles = StyleSheet.create({
    container: {
        alignSelf:'stretch',         
        marginRight: 5, 
    },
    imageContainer :{
        flex:1,
        //width: (Dimensions.get('screen').width - 40 ) / 4
    }
})