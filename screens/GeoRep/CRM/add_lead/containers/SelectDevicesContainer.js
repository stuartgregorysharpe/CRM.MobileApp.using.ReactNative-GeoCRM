
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import SelectDevicesView from '../components/SelectDevicesView';
import { getApiRequest } from '../../../../../actions/api.action';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import StockSignatureModal from '../../../Stock/stock/modal/device/StockSignatureModal';
import { Constants } from '../../../../../constants';

const SelectDevicesContainer = React.forwardRef((props, ref) => {

    const { selLists } = props;
    const [stockItems, setStockItems] = useState([]);
    const stockSignatureModalRef = useRef(null);
    const [stockItem, setStockItem] = useState();
    const [selectedLists, setSelectedLists] = useState([]);
    const [showStockItems, setShowStockItems] = useState([]);

    var isMount = true;
    useEffect(() => {
        setSelectedLists(selLists);        
        callSelectDevices();
        return () =>{
            isMount =  false;
        }
    }, [selLists]);

    const callSelectDevices = () => {
        getApiRequest("stockmodule/stock-list?stock_type=Device" , {}).then((res) => {            
            if(isMount){
                setStockItems(res.stock_items);
                updateLists( res.stock_items, selLists);
            }            
        }).catch((e) => {
        });
    }

    const allocateDevices = () => {
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE , value: selectedLists});
    }

    const onItemSelected = (item) => {
        setStockItem(item)
        stockSignatureModalRef.current.showModal()
    }

    const onStockSignature = ({type , value}) => {
        if(type == Constants.actionType.ACTION_DONE){
            if(value.signature != null && value.signature != undefined){
                const check = selectedLists.filter(element =>  element.stock_item_id === stockItem.stock_item_id);
                if(check.length == 0){
                   setSelectedLists([...selectedLists, {...value, ...stockItem}]);
                   updateLists( stockItems, [...selectedLists, {...value, ...stockItem}]);
                   props.onButtonAction({type: Constants.actionType.ACTION_VIEW , value: [...selectedLists, {...value, ...stockItem}] });
                }            
            }            
            stockSignatureModalRef.current.hideModal();
        }
    }
    
    const updateLists = (stockItems, selectedLists) => {        
        var tmp = [];
        stockItems.forEach((item) => {
            const check = selectedLists.filter(element =>  element.stock_item_id === item.stock_item_id);            
            if(check.length == 0){
                tmp.push(item);
            }        
        });
        setShowStockItems(tmp);
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            
            <SelectDevicesView 
                stockItems={showStockItems}
                onItemSelected={(item) =>onItemSelected(item)}
                {...props}
            />

            <SubmitButton style={{marginHorizontal:10}} title={"Allocate Devices"} onSubmit={allocateDevices}/>
            
            <StockSignatureModal
                ref={stockSignatureModalRef}
                title="Please Sign below:"
                locationId={0}
                item={stockItem}
                signatureModalType="save"
                selectedCodes={[]}                
                onButtonAction={onStockSignature}
            />

        </View>
    )
});
export default SelectDevicesContainer;
