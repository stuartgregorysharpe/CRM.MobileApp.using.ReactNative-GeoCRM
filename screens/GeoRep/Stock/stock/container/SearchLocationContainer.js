
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest } from '../../../../../actions/api.action';
import SearchLocationView from '../components/SearchLocationView';

export default function SearchLocationContainer(props) {
         
    const { stockType } = props;
    const [lists, setLists] = useState([]);
    const [locationId, setLocationId] = useState(0);

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
        setLocationId(item.location_id)
    }

    const onSubmitLocation = () => {                
        if(locationId != 0){
            props.onSubmit(stockType , locationId);
        }        
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <SearchLocationView                
                lists = {lists}
                onItemPressed = {onItemPressed}
                onSubmitLocation = {onSubmitLocation}
                {...props}
            />

        </View>
    )
}