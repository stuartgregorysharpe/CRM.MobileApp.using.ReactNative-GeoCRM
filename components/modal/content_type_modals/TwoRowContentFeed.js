import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../constants";
import { AppText } from "../../common/AppText";
import SvgIcon from "../../SvgIcon";
import { whiteLabel } from "../../../constants/Colors";

const actionIconBackground = whiteLabel().clickButtonBackground;
const TwoRowContent = ({ item, onClose, onImageClick }) => {

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
                        <View pointerEvents="none">
                            <SvgIcon icon={item.icon}
                                height={20}
                                width={20} />
                        </View>
                        <AppText title={item.headertitle}
                            style={{
                                color: actionIconBackground,//item.maincolor,
                                fontSize: 15,
                                marginHorizontal: 5
                            }}
                            type={'big'}
                        />
                    </View>
                    <View style={{ flex: 1, marginVertical: 5 }}>
                        <AppText title={item.title}
                            style={{
                                fontSize: 14,
                                color: Colors.blackColor,
                                marginVertical: 2
                            }}
                            type={'big'}
                        />
                        <AppText title={item.subtitle}
                            style={{
                                fontSize: 12,
                                color: "#60626B",
                            }}
                            type={'big'}
                        />
                    </View>
                </View>
                {(item.card_type === "6" && item.notificationImage) ? <TouchableOpacity onPress={onImageClick}>
                    <Image source={{ uri: item.notificationImage }}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 10,
                            overlayColor: 'white',
                        }}
                        resizeMode="cover" />
                </TouchableOpacity> : <></>}

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
