import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch } from "react-redux";
import { getApiRequest } from "../../../../actions/api.action";
import SearchBar from '../../../../components/SearchBar';
import { Colors } from '../../../../constants';
import SalesListHeader from './components/SalesListHeader';
import SalesListItem from './components/SalesListItem';
import SalesSearchHeader from './components/SearchHeader';

const DanOneSales = () => {
    const [salesList, setSalesList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [period, setPeriod] = useState('MTD');

    const dispatch = useDispatch();
    useEffect(() => {
        _onLoad();
    }, []);

    const _onLoad = (searchText, selectedPeriod) => {
        let postData = { period: selectedPeriod ? selectedPeriod : period };
        if (searchText) {
            postData['search_text'] = searchText
        }
        console.log(postData);
        getApiRequest('danonedash/sales-stores', postData)
            .then(res => {
                setSalesList(res.items);
            })
            .catch(e => {
                expireToken(dispatch, e);
            });
    };

    return (

        <View style={{ flex: 1, flexDirection: 'column' }}>
            <SalesSearchHeader canShowSearch initVal={searchKeyword} onSearch={(text) => {
                setSearchKeyword(text);
                _onLoad(text)
            }}
                onDropDown={(value) => {
                    setPeriod(value);
                    _onLoad(searchKeyword, value);
                }} />
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={() => <SalesListHeader />}
                removeClippedSubviews={false}
                initialNumToRender={10}
                data={salesList}
                renderItem={({ item, index }) => {
                    return <SalesListItem data={item} index={index} />
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};

export default DanOneSales;