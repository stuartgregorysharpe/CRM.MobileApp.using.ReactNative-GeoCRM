
import { View } from 'react-native'
import React , {useEffect, useState } from 'react'
import { getApiRequest } from '../../../../../actions/api.action';
import SearchLocationView from '../components/SearchLocationView';

export default function SearchLocationContainer(props) {
         
    const { stockType } = props;
    const [lists, setLists] = useState([]);
    const [originLists, setOriginLists] = useState([]);
    const [locationId, setLocationId] = useState(0);
    const [isLoading , setIsLoading] = useState(false);
    var searchKey = '';
    var changedSearchKey = ''    

    useEffect(() => {
        callSearch("")
    },[]);

    useEffect(() => {
        if(changedSearchKey != searchKey){
            onSearch(changedSearchKey);
        }
    },[lists]);


    const onItemPressed = (item) => {
        console.log("on item prssere", item)        
        setLocationId(item.location_id)
    }

    const onSubmitLocation = () => {                
        if(locationId != 0){
            props.onSubmit(stockType , locationId);
        }        
    }

    const onSearch = (key) => {        
        changedSearchKey = key;

        if(key == ''){
            setLists(originLists);
        }else if(key.length > 1 && !isLoading){
            searchKey = key;
            callSearch(key);
        }          
    }

    const callSearch = (key) => {
        setIsLoading(true);
        let param = {
            search_text: key
        };        
        getApiRequest("locations/customer-search", param ).then((res) => {            

            setLists(res.items);
            if(key == ""){
                setOriginLists(res.items);
            }
            setIsLoading(false);

        }).catch((e) => {
            setIsLoading(false);
        })
    }

    return (
        <View style={{alignSelf:'stretch'}}>
            <SearchLocationView                
                lists = {lists}
                onItemPressed = {onItemPressed}
                onSubmitLocation = {onSubmitLocation}
                onSearch={onSearch}
                {...props}
            />

        </View>
    )
}