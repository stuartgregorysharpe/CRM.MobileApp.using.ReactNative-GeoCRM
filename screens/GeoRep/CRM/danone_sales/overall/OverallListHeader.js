import React from 'react';
import { View, Text } from 'react-native';
import { Strings } from '../../../../../constants';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { AppText } from '../../../../../components/common/AppText';

const OverallListHeader = ({ period = '' }) => {
    return (
        <View style={{ marginHorizontal: 15 }}>
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ flex: 4,justifyContent:'center' }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.SalesMetrics}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12,justifyContent:'center' }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={period}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12, textAlign: 'center' }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={period + " (PY)"}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12, textAlign: 'center' }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.Return}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12, textAlign: 'center' }}></AppText>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: Colors.primaryColor }}></View>
        </View>
    )
}

export default OverallListHeader;