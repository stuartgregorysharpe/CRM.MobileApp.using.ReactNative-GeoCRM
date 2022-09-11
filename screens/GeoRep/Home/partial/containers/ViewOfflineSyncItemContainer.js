import { View, Text } from 'react-native'
import React , { useState, useEffect} from 'react'
import ViewOfflineSyncItem from '../components/ViewOfflineSyncItem'
import { getAllOfflineSyncItem } from '../../../../../sqlite/OfflineSyncItemsHelper';

export default function ViewOfflineSyncItemContainer() {


    const [count, setCount] = useState(3);

    useEffect(() => {
        getCount();
    },[]);

    const getCount = async() => {
        const items = await getAllOfflineSyncItem();
        setCount(items.length);        
    }
    return (
        <View>
            <ViewOfflineSyncItem count={count}/>
        </View>
    )
}