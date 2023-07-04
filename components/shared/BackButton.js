import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';
import Colors, { whiteLabel } from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from '../SvgIcon';

export const BackButton = ({
    title,
    onSubmit,
    style,
    titleStyle = {},
    bgStyle,
    svgIcon,
    enabled,
    isLoading,
    haveNextIcon = true,
    theme = 'dark'
}) => {
    return (
        <TouchableOpacity
            //enabled != undefined && !enabled ? {backgroundColor:Colors.disabledColor} : {}
            disabled={isLoading}
            style={[styles.submitButton, style, bgStyle]}
            onPress={() => {
                if (onSubmit && (enabled || enabled == undefined)) {
                    onSubmit();
                }
            }}>
            {haveNextIcon && !isLoading && svgIcon == undefined && (
                <FontAwesomeIcon
                    style={styles.submitButtonIcon}
                    size={25}
                    color={theme == 'light' ? whiteLabel().actionFullButtonBackground : whiteLabel().actionFullButtonIcon}
                    icon={faAngleDoubleLeft}
                />
            )}
            <Text style={[styles.submitButtonText, titleStyle]}>{title}</Text>

            {!isLoading && svgIcon != undefined && (
                <SvgIcon
                    icon={svgIcon}
                    width="20"
                    height="20"
                    style={styles.submitButtonIcon}
                />
            )}

            {isLoading && (
                <ActivityIndicator color={'#FFF'} style={styles.indicatorStyle} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 3,
    },
    submitButtonText: {
        color: "white",
        fontSize: 15,
        fontFamily: Fonts.secondaryBold,
        marginRight: 15,
    },

    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 7,
        backgroundColor: "black",
    },

    submitButtonIcon: {
        position: 'absolute',
        left: 10,
    },
    indicatorStyle: {
        position: 'absolute',
        left: 10,
    },
});
