import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import SvgIcon from '../../../../components/SvgIcon';
import Colors, { whiteLabel } from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';

export function FeatureCard({ icon = '', title = '', actionTitle = '', onAction }) {
    return (
        <View style={{ backgroundColor: Colors.whiteColor, borderRadius: 5, elevation: 2, padding: 5, width: '49%', marginVertical: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: whiteLabel().feature_card_icon_background, padding: 5 }}>
                    <SvgIcon icon={icon} width='10px' height='10px' />

                </View>
                <Text style={{
                    fontFamily: 'Gilroy-Bold',
                    fontSize: 12,
                    marginHorizontal: 5,
                    color: Colors.blackColor
                }}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onAction}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{
                        fontFamily: 'Gilroy-Medium',
                        fontSize: 11,
                        color: whiteLabel().helpText, alignContent: 'center', alignItems: 'baseline'
                    }}>{actionTitle} </Text>
                    <SvgIcon icon={'Arrow_feature_Card'} width='15px' height='15px' />
                </View>
            </TouchableOpacity>

        </View>
    )

}