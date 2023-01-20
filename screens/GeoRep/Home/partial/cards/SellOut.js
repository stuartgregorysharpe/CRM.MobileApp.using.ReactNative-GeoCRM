
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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

const SellOut = (props) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [tabData, setTabData] = useState(null);
    const dispatch = useDispatch();
    const tabs = [
        { title: 'Chocolate', id: 0 },
        { title: 'Pralines', id: 1 },
        { title: 'Tablets', id: 2 },
        { title: 'Countlines', id: 3 },
    ];

    useEffect(() => {
        loadData();
    }, [props.haveFilter]);

    const loadData = () => {
        let postData = props.haveFilter ? props.haveFilter : {};
        // console.log(postData);
        getApiRequest('lindtdash/sellout', postData).then(response => {
            // console.log("sellout", response);
            setTabData(response.tabs);
        }).catch(e => {
            expireToken(dispatch, e);
        })
    }


    const renderTabs = () => {
        return (
            <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                {tabs.map((x, i) => {
                    return (
                        <TouchableOpacity 
                        key={i}
                        onPress={() => {
                            setTabIndex(i);
                        }}>
                            <AppText size="medium" title={x.title}
                                type={tabIndex === i ? "secondaryBold" : "secondaryMedium"}
                                color={tabIndex === i ? Colors.primaryColor : whiteLabel().inactiveTabText}>
                            </AppText>
                            <View
                                style={[
                                    styles.bottomBar,
                                    tabIndex === i && {
                                        backgroundColor: whiteLabel().activeTabUnderline,
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }} />
                    <AppText title={`Total ${tabData ? tabData[tabs[tabIndex].title].lindt_segment_text : ''}`}
                        style={{ flex: 1, textAlign: 'center', paddingBottom: 15, paddingHorizontal: 2 }}
                        type={"secondaryBold"}
                        color={whiteLabel().inactiveTabText}>
                    </AppText>
                    <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText title={`Total ${tabs[tabIndex].title}`}
                        style={{ flex: 1, textAlign: 'center' }}
                        type={"secondaryBold"}
                        color={whiteLabel().inactiveTabText}>
                    </AppText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AppText title="Market Share"
                        style={{ flex: 1, textAlign: 'right' }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                    <AppText title={`${tabData ? tabData[tabs[tabIndex].title][tabs[tabIndex].title.toLowerCase() + '_market_share'] : '0%'}`}
                        style={{ flex: 1, textAlign: 'center', paddingHorizontal: 2 }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                    <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText title={`${tabData ? tabData[tabs[tabIndex].title]['total_market_share'] : '0%'}`}
                        style={{ flex: 1, textAlign: 'center' }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <AppText title="Value Growth"
                        style={{ flex: 1, textAlign: 'right', paddingVertical: 10 }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                    <AppText title={`${tabData ? tabData[tabs[tabIndex].title][tabs[tabIndex].title.toLowerCase() + '_value_growth'] : '0%'}`}
                        style={{ flex: 1, textAlign: 'center', paddingVertical: 10, paddingHorizontal: 2 }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                    <View style={{ width: 2, backgroundColor: whiteLabel().inactiveTabText }} />
                    <AppText title={`${tabData ? tabData[tabs[tabIndex].title]['total_value_growth'] : '0%'}`}
                        style={{ flex: 1, textAlign: 'center', paddingVertical: 10 }}
                        type={"secondaryBold"}
                        color={Colors.textColor}>
                    </AppText>
                </View>
            </View>
        )
    }

    return (
        <View style={{ marginTop: 10, flex: 1 }}>
            <View style={[style.scrollTabCard, { flexDirection: 'column' }]}>
                <LindtCardsTitleView title="Value (Sell Out)" onFilterPress={() => props.onFilterPress()}
                    icon="Sell_In_Icon" haveFilter={props.haveFilter} />

                {renderTabs()}
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
    bottomBar: {
        height: 2,
        borderRadius: 1,
        alignSelf: 'stretch',
        marginTop: 2,
    },
})

export default SellOut;