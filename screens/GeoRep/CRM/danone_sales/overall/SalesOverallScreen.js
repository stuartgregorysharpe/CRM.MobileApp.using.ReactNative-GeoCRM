import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch } from "react-redux";
import { getApiRequest } from "../../../../../actions/api.action";
import { expireToken } from '../../../../../constants/Helper';
import OverallListItem from './OverallListItem';
import SalesSearchHeader from '../../../Home/DanOneSales/components/SearchHeader';
import OverallSalesMetrics from './overall_sales_metrics.json';
import OverallListHeader from './OverallListHeader';

const SalesOverallScreen = (props) => {
    const [overallList, setOverallList] = useState([]);
    const [period, setPeriod] = useState('MTD');

    const dispatch = useDispatch();

    useEffect(() => {
        _onLoad();
    }, []);

    const _onLoad = (selectedPeriod) => {
        let postData = {
            location_id: props.locationId,
            period: selectedPeriod ? selectedPeriod : period
        };
        console.log(postData);
        getApiRequest('danonedash/sales-store-summary', postData)
            .then(res => {
                let data = [];
                if (typeof res === 'object' && res) {
                    for (let i = 0; i < OverallSalesMetrics.length; i++) {
                        let element = OverallSalesMetrics[i];
                        let item = {
                            sales_metric: element.title,
                            invoice_value: '',
                            py: '',
                            return: ''
                        };
                        if (isKeyExist(res, element.key)) {
                            item['invoice_value'] = res[element.key].hasOwnProperty('current')
                                ? res[element.key]['current'] : '';
                            item['py'] = res[element.key].hasOwnProperty('py') ? res[element.key]['py'] : '';
                            item['return'] = res[element.key].hasOwnProperty('return') ? res[element.key]['return'] : ''
                        }
                        data.push(item);
                    }
                    setOverallList(data);
                }
            })
            .catch(e => {
                expireToken(dispatch, e);
            });
    };

    const isKeyExist = (object, key) => {
        return object.hasOwnProperty(key)
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <SalesSearchHeader
                onDropDown={(value) => {
                    setPeriod(value);
                    _onLoad(value);
                }} />
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={() => <OverallListHeader period={period} />}
                removeClippedSubviews={false}
                initialNumToRender={10}
                data={overallList}
                renderItem={({ item, index }) => {
                    return <OverallListItem data={item} />
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};

export default SalesOverallScreen;