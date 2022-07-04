
import { View, FlatList } from 'react-native'
import React , { useState  , useEffect} from 'react'
import SearchBox from '../../../../../components/SearchBar'
import SearchLocationItem from './SearchLocationItem';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function SearchLocationView(props) {

    const {lists , onSearch, onItemPressed , onSubmitLocation} = props;
    const renderItems = (item, index) => {
        return (
            <SearchLocationItem
                onItemPressed={() => onItemPressed(item)}
                item={item} key={index}>                    
            </SearchLocationItem>
        )
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
                    data={lists}            
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