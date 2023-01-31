import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux";
import ToggleSwitch from 'toggle-switch-react-native';
import { getApiRequest } from "../../../../../actions/api.action";
import SvgIcon from '../../../../../components/SvgIcon';
import { Colors, Fonts } from '../../../../../constants';
import { whiteLabel } from '../../../../../constants/Colors';
import { expireToken } from '../../../../../constants/Helper';
import Dropdown from '../../../Home/DanOneSales/components/DropDown';
import CategoriesListHeader from './CategoriesListHeader';
import CategoryListItem from './CategoryListItem';

const SalesCategoriesScreen = (props) => {
    const [CategoriesList, setCategoriesList] = useState([]);
    const [period, setPeriod] = useState('MTD');
    const [toggle, setToggle] = useState('value');

    const dispatch = useDispatch();

    useEffect(() => {
        _onLoad();
    }, []);

    const _onLoad = (selectedPeriod) => {
        let postData = {
            location_id:1404,// props.locationId,
            period: selectedPeriod ? selectedPeriod : period
        };
        console.log(postData);
        getApiRequest('danonedash/sales-store-categories', postData)
            .then(res => {
                setCategoriesList(res.categories);
            })
            .catch(e => {
                expireToken(dispatch, e);
            });
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2, height: 45}} />
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <Dropdown onSelect={(item) => {
                        setPeriod(item.value);
                        _onLoad(item.value);
                    }}
                        label={'MTD'}
                        initial={'MTD'} />
                </View>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                    toggle === 'value' ? setToggle('volume') : setToggle('value');
                }}>
                    <SvgIcon
                        color={whiteLabel().actionFullButtonIcon}
                        icon={toggle==='value'?'Sales_Value_Toggle_Icon':'Sales_Volume_Toggle_Icon'}
                        width="90"
                        height="45"
                        onPres={() => { setToggle('volume') }}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={() => <CategoriesListHeader toggle={toggle} />}
                removeClippedSubviews={false}
                initialNumToRender={10}
                data={CategoriesList}
                renderItem={({ item, index }) => {
                    return <CategoryListItem data={item} toggle={toggle} />
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    toggleSwitch: {
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    toggleSwitchLabel: {
        color: '#fff',
        fontSize: 12,
        fontFamily: Fonts.secondaryMedium
    },
})

export default SalesCategoriesScreen;