import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AppText } from "../../../../../../components/common/AppText";
import SvgIcon from "../../../../../../components/SvgIcon";
import Colors from "../../../../../../constants/Colors";

export default function LindtCardsTitleView({ title, onFilterPress, icon, haveFilter }) {
    return (
        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
            <SvgIcon icon={icon} width='15px' height='15px' />
            <AppText size="medium" title={title} type="secondaryBold" style={{ marginLeft: 5, flex: 1 }} color={Colors.primaryColor}></AppText>
            <TouchableOpacity onPress={onFilterPress}>
                <SvgIcon icon="Filter" width='25px' height='25px' style={{ marginHorizontal: 10 }} />
                {haveFilter && (
                    <View
                        style={styles.filterIndicator}></View>
                )}
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    filterIndicator: {
        width: 15,
        height: 15,
        backgroundColor: Colors.redColor,
        borderRadius: 15,
        position: 'absolute',
        left: 5,
        top: -5,
        zIndex:1
    },
})