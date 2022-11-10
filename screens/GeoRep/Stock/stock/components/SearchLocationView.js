
import { View, FlatList } from 'react-native'
import React , { useState} from 'react'
import SearchBox from '../../../../../components/SearchBar'
import SearchLocationItem from './SearchLocationItem';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';

export default function SearchLocationView(props) {

    const {lists , onSearch, onItemPressed , onSubmitLocation , type} = props;

    const renderItems = (item, index) => {
        return (
            <SearchLocationItem
                onItemPressed={() => {
                    onItemPressed(item);
                }}
                item={item} key={index}>                    
            </SearchLocationItem>
        )
    }
    
    return (
        <View>      
            <SearchBox 
                style={{marginHorizontal: type === 'setup' ? -10 : 0}}
                placeholder="Search Location Name..."
                onSearch={(searchKey) => {
                    onSearch(searchKey);
                }}
            //isFilter={true}
            >

            </SearchBox>

         
            <View style={{flexDirection:'column', flex:1 , marginHorizontal: type === 'setup' ? -10 : 0, maxHeight: type != "setup" ? 250 : 350}}>
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
            
            

            {
                type != "setup" &&
                <View style={{marginHorizontal:10, marginTop:20, marginBottom:10}}>
                    <SubmitButton title="Submit" onSubmit={onSubmitLocation} ></SubmitButton>
                </View>
            }
            


        </View>
    )
}