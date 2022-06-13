
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest } from '../../../../../actions/api.action';
import SearchLocationView from '../components/SearchLocationView';

export default function SearchLocationContainer(props) {
         
    const [lists, setLists] = useState([]);

    useEffect(() => {
        let param = {
            search_text: ''
        };
        getApiRequest("locations/customer-search", param ).then((res) => {            
            setLists(res.items);
        }).catch((e) => {

        })
    },[]);  

    const onItemPressed = (item) => {
        console.log("on item prssere", item)
    }

    const onSubmit = () => {
        props.onSubmit();
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <SearchLocationView                
                lists = {lists}
                onItemPressed = {onItemPressed}
                onSubmit = {onSubmit}
                {...props}
            />

        </View>
    )
}