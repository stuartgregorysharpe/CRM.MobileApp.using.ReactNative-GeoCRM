import { View } from 'react-native'
import React , { useState, useEffect} from 'react'
import ViewOfflineSyncItem from '../components/ViewOfflineSyncItem'
import { getAllOfflineSyncItem } from '../../../../../sqlite/OfflineSyncItemsHelper';

const  ViewOfflineSyncItemContainer = props => {

    const { onClosed , onSyncStart } = props;
    const [count, setCount] = useState(3);

    useEffect(() => {
        getCount();
    },[]);

    const getCount = async() => {
        const items = await getAllOfflineSyncItem();
        console.log("items",items)
        setCount(items.length);  
    }

    const updateCount = (message) => {
        getCount();        
        onSyncStart(message);
    }
    
    return (
        <View>
            <ViewOfflineSyncItem count={count} onClosed={onClosed} updateCount={updateCount}/>
        </View>
    )
}

export default ViewOfflineSyncItemContainer;