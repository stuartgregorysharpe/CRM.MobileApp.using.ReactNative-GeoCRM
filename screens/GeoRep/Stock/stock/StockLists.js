
import { View, Text , FlatList ,TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { AppText } from '../../../../components/common/AppText';
import { getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import Colors, { whiteLabel } from '../../../../constants/Colors';  
import SvgIcon from '../../../../components/SvgIcon';
import StockListItem from './components/StockListItem';
import StockListHeader from './components/StockListHeader';

export default function StockLists() {

    const [stockLists, setStockLists] = useState([]);
    const [originStockLists, setOriginStockLists] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() =>{
        getApiRequest("https://www.dev.georep.com/local_api_old/stockmodule/stock-list", {}).then((res) => {
            setStockLists(res.stock_items);
            setOriginStockLists(res.stock_items);            
        }).catch((e) => {
            console.log("E",e);
        });
    },[]);

    const onFilter = (text) => {
        if(text !== "" && text !== undefined){
            var tmp = [];
            originStockLists.map((item, index) => {
                if(item.description.toLowerCase().includes(text.toLowerCase())){
                    tmp.push(item);
                }
            });
            setStockLists(tmp);
        }else{  
            
            setStockLists([...originStockLists]);
        }        
    }

    const renderItems = (item, index) => {
        return (
            <StockListItem item={item} key={index}></StockListItem>
        )
    }

    return (
        <View style={{flexDirection:'column', flex:1}}>
            <SearchBar 
              onSearch={(text) =>{                  
                onFilter(text);
                setSearchKeyword(text);
              }} 
              initVal={searchKeyword}
              isFilter={true}
              animation={() => {                
              }} />  
            

            <View style={{flexDirection:'column'}}>
                <FlatList                              
                    ListHeaderComponent={()=>
                        <StockListHeader></StockListHeader>
                    }
                    removeClippedSubviews={false}                
                    initialNumToRender={10}                    
                    data={stockLists}            
                    renderItem={
                        ({ item, index }) => renderItems(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            
            <TouchableOpacity style={{position:'absolute', right:30, bottom:15, }}>
                <View>
                    <SvgIcon icon="Add_Stock" width='55' height='55' />
                </View>
            </TouchableOpacity>
            
        </View>
    )
}