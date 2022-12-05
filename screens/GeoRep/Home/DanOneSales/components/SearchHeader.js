import React from 'react';
import { View } from 'react-native';
import SearchBar from "../../../../../components/SearchBar"
import Dropdown from './DropDown';

const SalesSearchHeader = ({ onSearch, initVal,onDropDown }) => {
    const data = [
        {
            label: 'MTD',
            value: 'MTD'
        },
        {
            label: 'QTD',
            value: 'QTD'
        }, {
            label: 'YTD',
            value: 'YTD'
        }

    ]
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
                <SearchBar
                    onSearch={(text) => {
                        onSearch(text)
                    }}
                    initVal={initVal}
                    isFilter={false}
                />

            </View>
            <View style={{ flex: 1,marginRight:10 }}>
                <Dropdown data={data} onSelect={(item) => {
                    onDropDown(item.value)
                }} label={'MTD'} />

            </View>
        </View>
    )
}

export default SalesSearchHeader;