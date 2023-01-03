import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../components/SvgIcon'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { PRIMARY_COLOR, whiteLabel } from '../../../../../constants/Colors';
import { useEffect } from 'react';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { style } from '../../../../../constants/Styles';
import LindtCardsTitleView from './partial/LindtCardsTitleView';

const Tracking = (props) => {
    const [mobilityData, setMobilityData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        console.log(postData);
        getApiRequest('lindtdash/tracking', postData).then(response => {
            console.log("tracking", response);
            setMobilityData(response.products);
        }).catch(e => {
            expireToken(dispatch, e);
        })
    }

    const renderBody = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{ flex: 2 }} />
                    <AppText style={{ flex: 1, paddingVertical: 5,marginLeft:5 }} title="Actual" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText style={{ flex: 1, textAlign: 'center', paddingVertical: 5 }} title="Prev Wk" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText style={{ flex: 1, textAlign: 'center', paddingVertical: 5 }} title="Lindt RSP" type="secondaryBold" color={whiteLabel().inactiveTabText} />


                </View>
                {mobilityData.map((x, i) => {
                    return (
                        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <AppText style={{ flex: 2, paddingVertical: 5 }} title={x.label} type="secondaryBold"
                                color={Colors.textColor} />
                            <AppText style={{ flex: 1, paddingVertical: 5,marginLeft:5 }} title={x.actual} type="secondaryBold"
                                color={Colors.textColor} />
                            <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                            <AppText style={{ flex: 1, textAlign: 'center', paddingVertical: 5 }} title={x.prev_wk} type="secondaryBold"
                                color={Colors.textColor} />
                            <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                            <AppText style={{ flex: 1, textAlign: 'center', paddingVertical: 5 }} title={x.rsp} type="secondaryBold"
                                color={Colors.textColor} />


                        </View>
                    )
                })}

            </View>
        )
    }

    return (
        <View style={{ marginTop: 10, flex: 1 }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
                <LindtCardsTitleView haveFilter={props.haveFilter}
                    onFilterPress={() => { props.onFilterPress() }}
                    title="Pricing Tracking" icon="Tracking_Icon" />
                {renderBody()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
    },
    actionItemLegend: {
        width: 12,
        height: 12,
        borderRadius: 2
    },
})

export default Tracking;