import { View, StyleSheet } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { useEffect } from 'react';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { style } from '../../../../../constants/Styles';
import LindtCardsTitleView from './partial/LindtCardsTitleView';
import IndicatorDotScroller from '../../../../../components/common/IndicatorDotScroller';

const Tracking = (props) => {
    const [trackingData, setTrackingData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        console.log(postData);
        getApiRequest('lindtdash/tracking', postData).then(response => {
            console.log("tracking", response);
            setTrackingData(response.products);
        }).catch(e => {
            expireToken(dispatch, e);
        })
    }

    const renderBody = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{ flex: 2 }} />
                    <AppText style={{ flex: 1, paddingVertical: 5, marginLeft: 5 }} title="Actual"
                        type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                    <View style={{ flex: 1.1 }}>
                        <AppText style={{ paddingVertical: 5, paddingHorizontal: 10 }}
                            title="Prev Wk" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    </View>

                    <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                    <View style={{ flex: 1.1 }}>
                        <AppText style={{ paddingVertical: 5, paddingHorizontal: 6 }}
                            title="Lindt RSP" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    </View>
                </View>
                {trackingData.map((x, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <View style={{ flex: 2 }}>
                                <AppText style={{ paddingVertical: 5,paddingRight:5 }} title={x.label}
                                    type="secondaryBold"
                                    color={Colors.textColor} />
                            </View>

                            <AppText style={{ flex: 1, paddingVertical: 5, marginLeft: 5 }}
                                title={x.actual} type="secondaryBold"
                                color={Colors.textColor} />
                            <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                            <View style={{ flex: 1.1 }}>
                                <AppText style={{ paddingVertical: 5, paddingHorizontal: 10 }}
                                    title={x.prev_wk} type="secondaryBold"
                                    color={Colors.textColor} />
                            </View>

                            <View style={{ width: 1, backgroundColor: whiteLabel().inactiveTabText }} />
                            <View style={{ flex: 1.1 }}>
                                <AppText style={{ paddingVertical: 5, paddingHorizontal: 6 }}
                                    title={x.rsp} type="secondaryBold"
                                    color={Colors.textColor} />
                            </View>

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
            <IndicatorDotScroller
                total={props.pageCount ? props.pageCount : 0}
                selectedIndex={props.pageIndex}></IndicatorDotScroller>
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