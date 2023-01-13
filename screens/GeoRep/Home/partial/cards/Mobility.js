
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
                <View style={{ flexDirection: 'row',marginHorizontal:10,marginTop:10 }}>
                    <AppText style={{ flex: 2,paddingVertical:5 }} title="Previous Week Mon - Fri" type="secondaryBold" color={whiteLabel().inactiveTabText}/>
                    <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText style={{ flex: 1,textAlign:'center' }} title="Actual SR" type="secondaryBold" color={whiteLabel().inactiveTabText} />
                </View>
                {mobilityData.map((x, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row',marginHorizontal:10 }}>
                            <AppText style={{ flex: 2,paddingVertical:3 }} title={x.label} type="secondaryBold" />
                            <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                            <AppText style={{ flex: 1,textAlign:'center' }} title={`${x.sr}%`} type="secondaryBold" />
                        </View>
                    )
                })}

            </View>
        )
    }

    const renderTitleContainer = () => {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                <SvgIcon icon="Mobility_Icon" width='15px' height='15px' />
                <AppText size="medium" title="Mobility" type="secondaryBold" style={{ marginLeft: 5, flex: 1 }} color={PRIMARY_COLOR}></AppText>
                <TouchableOpacity onPress={() => props.onFilterPress()}>
                    <SvgIcon icon="Filter" width='25px' height='25px' style={{ marginHorizontal: 10 }} />
                    {props.haveFilter && props.haveFilter.length > 0 && (
                        <View
                            style={styles.filterIndicator}></View>
                    )}
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={{ marginTop: 10, flex: 1 }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
                {renderTitleContainer()}
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
    filterIndicator: {
        width: 15,
        height: 15,
        backgroundColor: Colors.redColor,
        borderRadius: 15,
        position: 'absolute',
        left: 5,
        top: -5,
    },
})

export default Mobility;