import React from 'react';
import { View, Text } from 'react-native';
import { Strings } from '../../../../../constants';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import {AppText} from '../../../../../components/common/AppText';

const SalesListHeader = () => {
    return (
        <View style={{ marginHorizontal: 15 }}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{ flex: 4 }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.Customer}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12 }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.NSV}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12,textAlign:'center' }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.Vol}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12,textAlign:'center' }}></AppText>
                </View>
                <View style={{ flex: 2 }}>
                    <AppText
                        type="secondaryMedium"
                        title={Strings.DanOnesSales.Return}
                        color={whiteLabel().mainText}
                        style={{ fontSize: 12,textAlign:'center' }}></AppText>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: Colors.blackColor }}></View>
        </View>
    )
}

export default SalesListHeader;