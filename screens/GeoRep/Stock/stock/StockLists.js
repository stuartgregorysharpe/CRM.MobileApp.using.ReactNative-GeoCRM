
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

import { Constants } from '../../../../constants';
import StockDeviceDetailsModal from './modal/device/StockDeviceDetailsModal';
import StockSignatureModal from './modal/device/StockSignatureModal';
import SwopAtTraderModal from './modal/device/SwopAtTraderModal';
import TraderModal from './modal/device/TraderModal';
import StockConsumableModal from './modal/consumable/StockConsumableModal';
import SellToTraderSignatureModal from './modal/consumable/SellToTraderSignatureModal';
import SimDetailsModal from './modal/sim/SimDetailsModal';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../actions/notification.action';

export default function StockLists() {

    const [stockLists, setStockLists] = useState([]);
    const [originStockLists, setOriginStockLists] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [stockItem, setStockItem] = useState({});
    const addStockModalRef = useRef(null);
    const stockDetailsModalRef = useRef(null)
    const stockSignatureModalRef = useRef(null)
    const swopAtTraderModalRef = useRef(null)
    const traderModalRef = useRef(null)
    const stockConsumableModalRef = useRef(null)
    const consumableSellToTraderModalRef = useRef(null)
    const simDetailsModalRef = useRef(null)
    const [locationId, setLocationId] = useState(0);
    const [iccids, setIccids] = useState([])
    const [selectedCodes, setSelectedCodes] = useState([]);
    const dispatch = useDispatch()


    useEffect(() =>{
        let isMount = true;
        getApiRequest("stockmodule/stock-list", {}).then((res) => {
            if(isMount){
                setStockLists(res.stock_items);
                setOriginStockLists(res.stock_items);
                var sims = res.stock_items.filter(item => item.stock_type === Constants.stockType.SIM);
                var tmp = [];
                sims.forEach((item) => {
                    tmp.push({type: item.description, code: item.serial});
                });
                setIccids(tmp)
            }            
        }).catch((e) => {
            console.log("E",e);
        });
        return () => {
            isMount = false;
        }
    },[]);

    const onFilter = (text) => {
        if(text !== "" && text !== undefined){
            var tmp = [];
            originStockLists.map((item, index) => {
                if(item.description.toLowerCase().includes(text.toLowerCase()) 
                || item.stock_type.toLowerCase().includes(text.toLowerCase()) 
                || item.serial.toLowerCase().includes(text.toLowerCase())){
                    tmp.push(item);
                }
            });
            setStockLists(tmp);
        }else{
            setStockLists([...originStockLists]);
        }        
    }
    
    const onStockItemPressed = (item) => {        
        setStockItem(item)
        if(item.stock_type === Constants.stockType.DEVICE){            
            stockDetailsModalRef.current.showModal();
        }else if(item.stock_type === Constants.stockType.CONSUMABLE){            
            stockConsumableModalRef.current.showModal();
        }else if(item.stock_type === Constants.stockType.SIM){                        
            simDetailsModalRef.current.showModal()
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

    const onStockDetailsModalClosed = async({type, value}) => {
        if(type == Constants.actionType.ACTION_NEXT){
            console.log("final locatin id", value)
            setLocationId(value.locationId);
            if(value.stockType === Constants.stockDeviceType.SELL_TO_TRADER){
                stockSignatureModalRef.current.showModal();
            }else if(value.stockType === Constants.stockDeviceType.SWOP_AT_TRADER){
                swopAtTraderModalRef.current.showModal()
            }else if(value.stockType === Constants.stockDeviceType.TARDER){
                traderModalRef.current.showModal()
            }
        }
    };

    const onStockSignature = async({type, value}) => {

    };

    const onTraderModalClosed = ({type, value}) => {

    };

    const onStockConsumableModalClosed = ({ type, value}) => {        
        if(type == Constants.actionType.ACTION_NEXT){
            if(value === Constants.stockDeviceType.SELL_TO_TRADER){
                console.log("show sell to stock")
                consumableSellToTraderModalRef.current.showModal();
            }else if(value === Constants.stockDeviceType.TRANSFER){
                console.log("show transfer")
                traderModalRef.current.showModal()
            }
        }
    };
    
    const onStockSimDetailsModalClosed = ({ type, value}) => {        
        if(type == Constants.actionType.ACTION_NEXT){
            console.log("final locatin id  in sim details", value)
            setLocationId(value.locationId);
            if(value.stockType === Constants.stockDeviceType.SELL_TO_TRADER){
                stockSignatureModalRef.current.showModal();
            }else if(value.stockType === Constants.stockDeviceType.SELL_TO_TRADER){
                console.log("dfasdfasdfsdf", value)
            }else if(value.stockType === Constants.stockDeviceType.TARDER){
                //traderModalRef.current.showModal()
            }
        }else if(type == Constants.actionType.ACTION_CAPTURE) {
            var check = iccids.filter(item => item.code === value);
            console.log("check" , check)
            if(check.length > 0 && !selectedCodes.includes(value)){
                setSelectedCodes([...selectedCodes, value]);
                console.log("selectedCodes---" ,selectedCodes)
                
            }else{
                dispatch(showNotification({type:'success', message: 'ICCID not found in stock' , buttonText:'Ok'}))
            }
        }
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
            style={{marginHorizontal:20, marginTop:10, marginBottom:10}} title="Add Stock"></SubmitButton>

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

            {/* stock device modal */}
            <StockDeviceDetailsModal
                ref={stockDetailsModalRef}
                title={"Details"}
                item={stockItem}
                onButtonAction={onStockDetailsModalClosed}
            />
            
            <StockSignatureModal
                ref={stockSignatureModalRef}
                title="Please Sign below:"
                locationId={locationId}
                item={stockItem}
                selectedCodes={selectedCodes}
                onButtonAction={onStockSignature}
            />
             
            <SwopAtTraderModal
                ref={swopAtTraderModalRef}
                title="Swop at Trader"
                locationId={locationId}                
                item={stockItem}
                onButtonAction={onStockSignature}
            />
            
            <TraderModal
                ref={traderModalRef}
                title="Trader"
                item={stockItem}
                onButtonAction={onTraderModalClosed}
            /> 
            
            {/* stock consumable modal  */}
            <StockConsumableModal
                ref={stockConsumableModalRef}
                title="Details"
                item={stockItem}
                onButtonAction={onStockConsumableModalClosed}
            />

            <SellToTraderSignatureModal
                ref={consumableSellToTraderModalRef}
                title="Sell To Trader"
                item={stockItem}                
                onButtonAction={onStockConsumableModalClosed}
            />

            {/* stock sim modal  */}

            <SimDetailsModal
                ref={simDetailsModalRef}    
                selectedCodes={selectedCodes}
                codeLists={iccids}
                onButtonAction={onStockSimDetailsModalClosed}
            />

        </View>
    )
}
