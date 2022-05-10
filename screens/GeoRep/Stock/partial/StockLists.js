
import { View, Text , FlatList ,TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Searchbar } from 'react-native-paper'
import { AppText } from '../../../../components/common/AppText';
import { getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import Colors, { whiteLabel } from '../../../../constants/Colors';  
import SvgIcon from '../../../../components/SvgIcon';


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
            console.log("ddd");
            setStockLists([...originStockLists]);
        }        
    }

    const renderItems = (item, index) => {
        return (
            <View style={{marginHorizontal:15}}>
                <View style={{flexDirection:'row' , marginTop:15, marginBottom:3, justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:3}}>
                        <AppText size="big" type="secondaryBold" title={item.description} style={{fontSize:12.5}}></AppText>
                        <AppText type="secondaryMedium" title={item.stock_type} color={Colors.disabledColor}  style={{fontSize:10.4}} ></AppText>
                    </View>
                    <View style={{flex:2}}>
                        <AppText type="secondaryMedium" title={item.stock_type} color={Colors.disabledColor} style={{fontSize:10.4}}></AppText>
                    </View>
                    <View style={{flex:2}}>
                        <AppText type="secondaryMedium" title={item.stock_type} color={Colors.disabledColor} style={{fontSize:10.4}}></AppText>
                    </View>
                </View>
                <View style={{height:1,  backgroundColor:Colors.greyColor}}></View>
            </View>
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
                        <View style={{marginHorizontal:15}}>
                            <View style={{flexDirection:'row' , marginTop:15, marginBottom:3, justifyContent:'center', alignItems:'center'}}>
                                <View style={{flex:3}}>                                    
                                    <AppText type="secondaryMedium" title={"Description"} color={whiteLabel().mainText}  style={{fontSize:12}} ></AppText>
                                </View>
                                <View style={{flex:2}}>
                                    <AppText type="secondaryMedium" title={"Type"} color={whiteLabel().mainText} style={{fontSize:12}}></AppText>
                                </View>
                                <View style={{flex:2}}>
                                    <AppText type="secondaryMedium" title={"Added Date"} color={whiteLabel().mainText} style={{fontSize:12}}></AppText>
                                </View>
                            </View>
                            <View style={{height:1,  backgroundColor:Colors.blackColor}}></View>
                        </View>
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