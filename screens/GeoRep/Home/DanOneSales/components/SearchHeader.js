import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import SearchBar from "../../../../../components/SearchBar"
import Dropdown from './DropDown';

const SalesSearchHeader = ({ onSearch, initVal, onDropDown, canShowSearch }) => {
    const [pickerData, setPickerData] = useState([
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

    ])

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
                {canShowSearch ?
                    <SearchBar
                        onSearch={(text) => {
                            onSearch(text)
                        }}
                        initVal={initVal}
                        isFilter={false}
                    />:<View style={{ height: 45, margin: 10}}/>}

            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Dropdown data={pickerData} onSelect={(item, data) => {
                    onDropDown(item.value)
                    setPickerData(data);
                }} label={'MTD'}
                    initial={pickerData[0]} />

            </View>
        </View>
    )
}

export default SalesSearchHeader;