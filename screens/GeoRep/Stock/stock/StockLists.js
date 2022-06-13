
import { View, Text , FlatList ,TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import Colors, { whiteLabel } from '../../../../constants/Colors';  
import SvgIcon from '../../../../components/SvgIcon';
import StockListItem from './components/StockListItem';
import StockListHeader from './components/StockListHeader';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import AddStockModal from './modal/AddStockModal';
import StockDetailsModal from './modal/StockDetailsModal';
import StockSignatureModal from './modal/StockSignatureModal';
import { Constants } from '../../../../constants';

export default function StockLists() {

    const [stockLists, setStockLists] = useState([]);
    const [originStockLists, setOriginStockLists] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [item, setItem] = useState({});
    const addStockModalRef = useRef(null);
    const stockDetailsModalRef = useRef(null)
    const stockSignatureModalRef = useRef(null)

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

    const onStockItemPressed = (item) => {
        if(item.stock_type === "Device"){
            setItem(item);
            stockDetailsModalRef.current.showModal();
        }
    }

    const renderItems = (item, index) => {
        return (
            <StockListItem
                onItemPressed={() => onStockItemPressed(item)}
                item={item} key={index}></StockListItem>
        )
    }

    const onCaptureAction = async({type, value}) => {

    };

    const onStockModalDetails = async({type, value}) => {
        if(type == Constants.actionType.ACTION_NEXT){
            stockSignatureModalRef.current.showModal();
        }
    };

    const onStockSignature = async({type, value}) => {

    };
    
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

            <View style={{flexDirection:'column', flex:1}}>
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

            <SubmitButton 
                onSubmit={() => {
                if(addStockModalRef.current){
                    addStockModalRef.current.showModal();
                }
            }}
            style={{marginHorizontal:20, marginBottom:10}} title="Add Stock"></SubmitButton>

            <TouchableOpacity style={{position:'absolute', right:30, bottom:55, }}>
                <View>
                    <SvgIcon icon="Add_Stock" width='55' height='55' />
                </View>
            </TouchableOpacity>

            <AddStockModal
              ref={addStockModalRef}
              title={"Add Stock"}              
              onButtonAction={onCaptureAction}
            />

            <StockDetailsModal
                ref={stockDetailsModalRef}
                title={"Details"}
                item={item}
                onButtonAction={onStockModalDetails}
            />

            <StockSignatureModal
                ref={stockSignatureModalRef}
                title="Please Sign below:"
                onButtonAction={onStockSignature}
            />
            
        </View>
    )
}
