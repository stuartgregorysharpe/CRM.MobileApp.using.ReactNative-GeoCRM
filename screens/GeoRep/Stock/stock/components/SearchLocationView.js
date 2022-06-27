
import { View, FlatList } from 'react-native'
import React , { useState  , useEffect} from 'react'
import SearchBox from '../../../../../components/SearchBar'
import SearchLocationItem from './SearchLocationItem';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function SearchLocationView(props) {

    const {lists , onItemPressed , onSubmitLocation} = props;
    const [showLists, setShowLists] = useState(lists);

    useEffect(() => {
        let isMount = true;
        setShowLists(lists);        
        return () => {
            isMount = false;
        };
    }, [lists]);

    const renderItems = (item, index) => {
        return (
            <SearchLocationItem
                onItemPressed={() => onItemPressed(item)}
                item={item} key={index}>                    
            </SearchLocationItem>
        )
    }
    
    const onSearch = (searchKey) => {        
        var tmp = [];
        lists.forEach(element => {
            if(element.address.toLowerCase().includes(searchKey.toLowerCase())  || element.name.toLowerCase().includes(searchKey.toLowerCase()) ){
                tmp.push(element);
            }
            tmp.push()
        });
        setShowLists(tmp);
        console.log("tm0",tmp)
    }
    

    return (
        <View>      
            <SearchBox 
            onSearch={(searchKey) => {
                onSearch(searchKey);
            }}
            isFilter={true}></SearchBox>

            <View style={{flexDirection:'column', flex:1 , maxHeight:250}}>
                <FlatList                              
                    ListHeaderComponent={()=>
                        <View></View>
                    }
                    removeClippedSubviews={false}                
                    initialNumToRender={10}
                    data={showLists}            
                    renderItem={
                        ({ item, index }) => renderItems(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                />                
            </View>

            <View style={{marginHorizontal:10, marginTop:20, marginBottom:10}}>
                <SubmitButton title="Submit" onSubmit={onSubmitLocation} ></SubmitButton>
            </View>


        </View>
    )
}