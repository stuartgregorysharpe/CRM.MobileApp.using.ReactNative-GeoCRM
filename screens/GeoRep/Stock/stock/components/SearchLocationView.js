
import { View, FlatList , StyleSheet, ScrollView} from 'react-native'
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
        <View style={{alignSelf:'stretch'}}>
            <SearchBox 
                style={type === 'setup' ? styles.setUpStyle : styles.normalStyle}
                placeholder="Search Location Name..."
                onSearch={(searchKey) => {
                    onSearch(searchKey);
                }}
                //isFilter={true}
            >
            </SearchBox>
         
            <View style={type === 'setup' ? styles.setUpStyleView : styles.normalStyleView}>
                {/* <ScrollView>
                    {
                        lists.map((item, index) =>{
                            return renderItems(item, index)
                        })
                    }
                </ScrollView> */}

                {
                    lists != undefined && lists.length > 0 &&
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
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}

                    />
                }
                
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

const styles = StyleSheet.create({
    setUpStyle :{
        marginHorizontal: -10,
        marginTop:-10
    },
    normalStyle:{
        marginHorizontal:0,
    },
    setUpStyleView :{
        //flexDirection:'column',         
        // marginHorizontal: -10,
        maxHeight: 380,
    },
    normalStyleView:{
        flexDirection:'column',         
        marginHorizontal: 0,
        maxHeight: 350,
    }
    
})