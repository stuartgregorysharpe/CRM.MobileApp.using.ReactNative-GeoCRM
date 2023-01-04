
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { style } from '../../../../../constants/Styles'
import SvgIcon from '../../../../../components/SvgIcon'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { PRIMARY_COLOR, TEXT_COLOR, whiteLabel } from '../../../../../constants/Colors';
import CustomProgress from '../CustomProgress';
import { useEffect } from 'react';
import { getApiRequest } from '../../../../../actions/api.action';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import LindtCardsTitleView from './partial/LindtCardsTitleView';
import CircularProgress from 'react-native-circular-progress-indicator';

const Compliance = (props) => {
    const [complianceData, setComplianceData] = useState([]);
    const [graphData, setGraphData] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        // console.log(postData);
        getApiRequest('lindtdash/compliance', postData).then(response => {
            setComplianceData(response.items);
            setGraphData(response.graphs);
        }).catch(e => {
            expireToken(dispatch, e);
        })
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

    const getActualPercentage = (item) => {
        let actual = parseInt(item.actual);
        let target = parseInt(item.target);

        if (actual > target) {
            return 100;
        } else {
            return (actual / target) * 100;
        }
    }

    const getTargetPercentage = (item) => {
        let actual = parseInt(item.actual);
        let target = parseInt(item.target);

        if (target > actual) {
            return 100;
        } else {
            return (target / actual) * 100;
        }
    }

    const renderItem = (item, index) => {
        console.log(item);
        return (
            <View key={index} style={{
                marginHorizontal: 10,
                borderBottomColor: Colors.disabledColor, borderBottomWidth: 1, paddingBottom: 5, marginVertical: 5
            }}>
                <AppText size="medium" title={item.label}
                    type="secondaryBold" style={{ flex: 3 }}
                    color={Colors.disabledColor}></AppText>
                <AppText title={`Launched: ${item.launch_date}`}
                    type="secondaryMedium" style={{ flex: 3 }}
                    color={Colors.disabledColor}></AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        {renderBar('Actual', PRIMARY_COLOR, item?.actual, getActualPercentage(item))}
                        {renderBar('Target', Colors.lightBlueColor, item?.target, getTargetPercentage(item))}
                    </View>
                    <View>
                        {renderProgress(item.percent)}
                    </View>
                </View>
            </View>
        )
    }

    const renderProgress = (percent, size) => {
        return (
            <CircularProgress
                radius={size ? size : Dimensions.get('window').width * 0.08}
                //radius={40}
                value={percent}
                valueSuffix={"%"}
                progressValueStyle={{ fontSize: size ? 14 : 12 }}
                activeStrokeWidth={10}
                progressValueColor={whiteLabel().graphs.primary}
                activeStrokeColor={whiteLabel().graphs.primary}
            />
        )
    }

    const renderFooterHeading = (title) => {
        return (
            <AppText size="medium" title={title}
                type="secondaryBold" style={{ flex: 3, marginVertical: 5 }}
                color={Colors.disabledColor}></AppText>
        )
    }

    const renderFooter = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10 }}>
                <View style={{alignItems:'center'}}>
                    {renderFooterHeading("Prev Week")}
                    {renderProgress(graphData.prev_wk, Dimensions.get('window').width * 0.1)}
                </View>

                <View style={{alignItems:'center'}}>
                    {renderFooterHeading("Achieved")}
                    {renderProgress(graphData.achieved, Dimensions.get('window').width * 0.1)}
                </View>
                <View style={{alignItems:'center'}}>
                    {renderFooterHeading("%Evolution")}
                    {renderProgress(graphData.evolution, Dimensions.get('window').width * 0.1)}
                </View>
            </View>
        )
    }

    return (
        <View style={{ marginTop: 10, flex: 1, flexDirection: 'column' }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
                <LindtCardsTitleView title="Innovation & Compliance" onFilterPress={() => props.onFilterPress()}
                    icon="Compliance_Icon" haveFilter={props.haveFilter} />
                {complianceData.map((x, i) => {
                    return renderItem(x, i);
                })}
                {graphData && renderFooter()}
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
})

export default Compliance;