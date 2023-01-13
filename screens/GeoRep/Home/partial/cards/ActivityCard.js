
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { style } from '../../../../../constants/Styles'
import SvgIcon from '../../../../../components/SvgIcon'
import { AppText } from '../../../../../components/common/AppText';
import ProgressBar from '../ProgressBar';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import Legend from '../../../../../components/common/Legend';
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import IndicatorDotScroller from '../../../../../components/common/IndicatorDotScroller';


export default function ActivityCard({ activityCard,pageCount,pageIndex }) {

    const colors = [whiteLabel().graphs.primary, whiteLabel().graphs.color_1, whiteLabel().graphs.color_3];
    const barTypes = [
        { color: whiteLabel().graphs.primary, name: 'Forms' },
        { color: whiteLabel().graphs.color_1, name: 'Quotes' },
        { color: whiteLabel().graphs.color_3, name: 'Orders' },
    ];

    return (
        <View style={{ marginTop: 10, flex: 1, flexDirection: 'column' }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>

                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                    <SvgIcon icon="Activity" width='15px' height='15px' />
                    <AppText size="medium" title="Activity" type="title" style={{ marginLeft: 5 }} ></AppText>
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    {
                        activityCard &&
                        <View style={{ marginTop: 20, marginLeft: 10, marginBottom: 10, }}>
                            <ProgressBar colors={colors} steps={[parseInt(activityCard.activity.forms), parseInt(activityCard.activity.quotes)
                                , parseInt(activityCard.activity.orders)]} height={30} ></ProgressBar>
                        </View>
                    }
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <Legend types={barTypes} ></Legend>
                </View>

                <View style={{ height: 1, backgroundColor: Colors.greenColor, marginTop: 20, marginHorizontal: 10 }}></View>
                <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', marginTop: 10 }}>
                    <SvgIcon icon="Activity_Items" width='15px' height='15px' />
                    <AppText size="medium" title="Action Items" type="title" style={{ marginLeft: 5 }} ></AppText>
                </View>

                <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>

                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 3 }}>
                                <View style={[styles.actionItemLegend, { backgroundColor: whiteLabel().graphs.color_1, marginLeft: 20 }]}></View>
                                <AppText title="Current  " style={{ marginLeft: 10 }}></AppText>
                            </View>
                            <View style={{ flex: 2 }}>
                                <AppText title={activityCard.action_items.current} ></AppText>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', flex: 3 }}>
                                <View style={[styles.actionItemLegend, { backgroundColor: whiteLabel().graphs.color_2, marginLeft: 20 }]}></View>
                                <AppText title="Overdue" style={{ marginLeft: 10 }}></AppText>
                            </View>
                            <View style={{ flex: 2 }}>
                                <AppText title={activityCard.action_items.overdue} ></AppText>
                            </View>
                        </View>
                    </View>

                    {
                        activityCard.action_items.overdue != "0" && activityCard.action_items.total != "0" && activityCard.action_items.total != "0" &&
                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <CircularProgressBase
                                radius={42}
                                value={100 * parseInt(activityCard.action_items.current) / parseInt(activityCard.action_items.total) - 5}
                                activeStrokeColor={whiteLabel().graphs.color_1}
                                inActiveStrokeColor={"transparent"}
                            >
                                <CircularProgressBase
                                    value={100 * parseInt(activityCard.action_items.overdue) / parseInt(activityCard.action_items.total) - 5}
                                    rotation={360 * parseInt(activityCard.action_items.current) / parseInt(activityCard.action_items.total)}
                                    radius={42}
                                    activeStrokeColor={whiteLabel().graphs.color_2}
                                    inActiveStrokeColor={"transparent"}
                                >
                                    <CircularProgress
                                        radius={31}
                                        value={activityCard.action_items.total}
                                        circleBackgroundColor={whiteLabel().graphs.primary}
                                        progressValueColor={Colors.whiteColor}
                                        progressValueFontSize={20}
                                        activeStrokeColor={whiteLabel().graphs.primary}
                                        inActiveStrokeColor={whiteLabel().graphs.primary}
                                    />
                                </CircularProgressBase>
                            </CircularProgressBase>
                        </View>
                    }

                </View>

            </View>
            <IndicatorDotScroller
                total={pageCount}
                selectedIndex={pageIndex}></IndicatorDotScroller>
        </View>
    )
}

const styles = StyleSheet.create({
    actionItemLegend: {
        width: 12,
        height: 12,
        borderRadius: 2
    }
})