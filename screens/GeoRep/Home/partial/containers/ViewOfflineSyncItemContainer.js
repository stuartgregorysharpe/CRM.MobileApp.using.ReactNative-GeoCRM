import { View } from 'react-native'
import React , { useState, useEffect} from 'react'
import ViewOfflineSyncItem from '../components/ViewOfflineSyncItem'
import { getAllOfflineSyncItem } from '../../../../../sqlite/OfflineSyncItemsHelper';

const  ViewOfflineSyncItemContainer = props => {

    const { onClosed } = props;
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
            <ViewOfflineSyncItem count={count} onClosed={onClosed}/>
        </View>
    )
}

export default ViewOfflineSyncItemContainer;