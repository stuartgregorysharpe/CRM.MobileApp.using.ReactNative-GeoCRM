import { View } from 'react-native'
import React , { useState, useEffect} from 'react'
import ViewOfflineSyncItem from '../components/ViewOfflineSyncItem'
import { getAllOfflineSyncItem } from '../../../../../sqlite/OfflineSyncItemsHelper';

const  ViewOfflineSyncItemContainer = props => {

    const { onClosed , onSyncStart , isManual } = props;
    const [count, setCount] = useState(3);

    useEffect(() => {
        getCount();
    },[]);

    const getCount = async() => {
        const items = await getAllOfflineSyncItem();        
        setCount(items.length);  
    }

    const updateCount = (message) => {
        getCount();        
        onSyncStart(message);
        console.log(" ============= on start "  , message);
    }
    
    return (
        <View>
            <ViewOfflineSyncItem 
                changeIsManual={(flag) => {
                    if(props.changeIsManual)   {
                        props.changeIsManual(flag);
                    }
                }}
                count={count} isManual={isManual} onClosed={onClosed} updateCount={(messge) => {
                updateCount(messge);
            }}/>
        </View>
    )
}

export default ViewOfflineSyncItemContainer;