import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../constants";
import { AppText } from "../../common/AppText";
const TwoRowContent = ({ item, onClose }) => {

    return (
        <View style={{
            backgroundColor: Colors.whiteColor,
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
        }}>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image source={require('../../../assets/images/info_png.png')}
                            style={{
                                height: 20,
                                width: 20
                            }} />
                        <AppText title={item.card_headline}
                            style={{
                                color: Colors.primaryColor,
                                fontSize: 15,
                                marginHorizontal: 5
                            }}
                            type={'big'}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <AppText title={item.card_name}
                            style={{
                                fontSize: 14,
                                color: Colors.blackColor,
                                marginVertical: 2
                            }}
                            type={'big'}
                        />
                        <AppText title={item.card_sub_text}
                            style={{
                                fontSize: 12,
                                color: Colors.blackColor
                            }}
                            type={'big'}
                        />
                    </View>
                </View>
                {(item.card_type === "6" && item.card_image) ? <Image source={{ uri: item.card_image }}
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 10,
                        overlayColor: 'white',
                    }}
                    resizeMode="cover" /> : <></>}

            </View>

            <TouchableOpacity onPress={onClose} style={{
                height: 25,
                width: 25,
                position: 'absolute',
                right: 3,
                top: 3,
                bottom: 0
            }}>
                <Image source={require('../../../assets/images/cancel_png.png')}
                    style={{
                        height: 25,
                        width: 25,
                    }} />
            </TouchableOpacity>
        </View>
    );
};

export default TwoRowContent;
