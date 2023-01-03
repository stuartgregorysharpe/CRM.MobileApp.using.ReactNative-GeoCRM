
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { style } from '../../../../../constants/Styles'
import SvgIcon from '../../../../../components/SvgIcon'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { PRIMARY_COLOR, TEXT_COLOR } from '../../../../../constants/Colors';
import CustomProgress from '../CustomProgress';
import { useEffect } from 'react';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SellIn = (props) => {
    const [mth, setMth] = useState(null);
    const [meridian, setMeridian] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        // console.log(postData);
        getApiRequest('lindtdash/sellin', postData).then(response => {
            setMth(calculatePercentage('mth', response?.mth));
            setMeridian(calculatePercentage('meridian', response?.meridian));
        }).catch(e => {
            expireToken(dispatch, e);
        })
    }

    const calculatePercentage = (type, data) => {
        let actual = parseInt(data?.actual);
        let projected = parseInt(data?.projected);
        let target = parseInt(data?.target);

        if (actual === 0 && projected === 0 && target === 0) {
            data[`${type}_actual_percentage`] = 0;
            data[`${type}_projected_percentage`] = 0;
            data[`${type}_target_percentage`] = 0;
            return data;
        }

        if (actual > projected && actual > target) {
            data[`${type}_actual_percentage`] = 100;
            data[`${type}_projected_percentage`] = actual > 0 ? (projected * 100 / actual) : 0;
            data[`${type}_target_percentage`] = actual > 0 ? (target * 100 / actual) : 0;
        } else if (projected > actual && projected > target) {
            data[`${type}_actual_percentage`] = projected > 0 ? (actual * 100 / projected) : 0;
            data[`${type}_projected_percentage`] = 100;
            data[`${type}_target_percentage`] = projected > 0 ? (target * 100 / projected) : 0;
        } else {
            data[`${type}_actual_percentage`] = target > 0 ? (actual * 100 / target) : 0;
            data[`${type}_projected_percentage`] = target > 0 ? (projected * 100 / target) : 0;
            data[`${type}_target_percentage`] = 100;
        }
        return data;
    }

    const renderBar = (title, color, value, percentage) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText size="medium" title={title}
                    type="secondaryBold" style={{ flex: 1, textAlign: 'right' }}
                    color={TEXT_COLOR}></AppText>
                <View style={{ flex: 3, marginHorizontal: 10 }}>
                    <CustomProgress color={color} count={value} percentage={percentage ? parseInt(percentage) : 0} height={12} ></CustomProgress>
                </View>
            </View>
        )
    }

    const renderMth = () => {
        return (
            <View style={{ marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }} />
                    <AppText size="medium" title={'MTH Target Value'}
                        type="secondaryBold" style={{ flex: 3 }}
                        color={Colors.disabledColor}></AppText>
                </View>
                {mth && renderBar('Actual', PRIMARY_COLOR, mth?.actual, mth?.mth_actual_percentage)}
                {mth && renderBar('Projected', Colors.lightBlueColor, mth?.projected, mth?.mth_projected_percentage)}
                {mth && renderBar('Target', Colors.redColor, mth?.target, mth?.mth_target_percentage)}
            </View>

        )
    }
    const renderMeridian = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }} />
                    <AppText size="medium" title={'Meridian Target Value'}
                        type="secondaryBold" style={{ flex: 3 }}
                        color={Colors.disabledColor}></AppText>
                </View>
                {meridian && renderBar('Actual', PRIMARY_COLOR, meridian?.actual, meridian?.meridian_actual_percentage)}
                {meridian && renderBar('Projected', Colors.lightBlueColor, meridian?.projected, meridian?.meridian_projected_percentage)}
                {meridian && renderBar('Target', Colors.redColor, meridian?.target, meridian?.meridian_target_percentage)}
            </View>
        )
    }
    return (
        <View style={{ marginTop: 10, flex: 1, flexDirection: 'column' }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                    <SvgIcon icon="Sell_In_Icon" width='15px' height='15px' />
                    <AppText size="medium" title="Value (Sell In)" type="secondaryBold" style={{ marginLeft: 5, flex: 1 }} color={PRIMARY_COLOR}></AppText>
                    <TouchableOpacity onPress={() => props.onFilterPress()} >
                        <SvgIcon icon="Filter" width='25px' height='25px' style={{ marginHorizontal: 10 }} />
                        {props.haveFilter && props.haveFilter.length > 0 && (
                            <View
                                style={styles.filterIndicator}></View>
                        )}
                    </TouchableOpacity>

                </View>
                {renderMth()}
                {renderMeridian()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default SellIn;