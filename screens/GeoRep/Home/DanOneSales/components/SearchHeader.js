import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import SearchBar from "../../../../../components/SearchBar"
import Dropdown from './DropDown';

const SalesSearchHeader = ({ onSearch, initVal, onDropDown, canShowSearch }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginTop:-8 }}>
            <View style={{ flex: 3 }}>
                {canShowSearch ?
                    <SearchBar
                        onSearch={(text) => {
                            onSearch(text)
                        }}
                        initVal={initVal}
                        isFilter={false}
                    /> : <View style={{ height: 45, margin: 10 }} />}

            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Dropdown onSelect={(item) => {
                    onDropDown(item.value);
                    // setPickerData(data);
                }}
                    label={'MTD'}
                    initial={'MTD'} />

            </View>
        </View>
    )
}

export default SalesSearchHeader;