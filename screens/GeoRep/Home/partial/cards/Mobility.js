import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SvgIcon from '../../../../../components/SvgIcon'
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

const Mobility = (props) => {
    const [mobilityData, setMobilityData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        console.log(postData);
        getApiRequest('lindtdash/mobility', postData).then(response => {
            console.log("mobility", response);
            setMobilityData(response.items);
        }).catch(e => {
            expireToken(dispatch, e);
        })
    }

    const renderBody = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                    <AppText style={{ flex: 2, paddingVertical: 5 }} title="Previous Week Mon - Fri" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                    <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText style={{ flex: 1, textAlign: 'center' }} title="Actual SR" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                </View>
                {mobilityData.map((x, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                            <AppText style={{ flex: 2, paddingVertical: 3 }} title={x.label} type="secondaryBold" />
                            <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                            <AppText style={{ flex: 1, textAlign: 'center' }} title={`${x.sr}%`} type="secondaryBold" />
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
                    title="Mobility" icon="Mobility_Icon" />
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

export default Mobility;