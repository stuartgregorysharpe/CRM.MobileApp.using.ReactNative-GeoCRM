
import { View , TouchableOpacity} from 'react-native'
import React , {useEffect, useState , useRef ,useImperativeHandle} from 'react'
import SelectDevicesView from '../components/SelectDevicesView';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import StockSignatureModal from '../../../Stock/stock/modal/device/StockSignatureModal';
import { Constants, Strings } from '../../../../../constants';
import { GetRequestStockListsDAO } from '../../../../../DAO';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';
import ViewListsModal from '../modal/ViewListsModal';
import SvgIcon from '../../../../../components/SvgIcon';
var isMount = true;

const SelectDevicesContainer = React.forwardRef((props, ref) => {

    const { selLists } = props;    

    const [stockItems, setStockItems] = useState([]);
    const stockSignatureModalRef = useRef(null);
    const viewListsModalRef = useRef();
    const [stockItem, setStockItem] = useState();
    const [selectedLists, setSelectedLists] = useState([]);
    const [showStockItems, setShowStockItems] = useState([]);

    const dispatch = useDispatch(); 

    useImperativeHandle(
        ref,
        () => ({
          showViewLists() {          
            if(viewListsModalRef.current){
                viewListsModalRef.current.showModal();
            }        
          },
          
        }),
        [],
    );

    useEffect(() => {
        setSelectedLists(selLists);        
        callSelectDevices();
        return () =>{
            isMount =  false;
        }
    }, [selLists]);

    const callSelectDevices = () => {
        var postData = {
            stock_type : 'Device'
        }
        GetRequestStockListsDAO.find(postData).then((res) => {            
            setStockItems(res.stock_items);
            updateLists( res.stock_items, selLists);                       
        }).catch((e) => {
            expireToken(dispatch , e);
        })        
    }

    const allocateDevices = () => {        
        console.log("selected lists" , selectedLists);
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
                    var tmpSelectedLists = [...selectedLists];
                    if(value.primary_device === '1'){ // Allow Only One Primary Device
                        tmpSelectedLists = tmpSelectedLists.map((element) => {
                            element.primary_device = "0";
                            return element;
                        })
                    }                    
                   setSelectedLists([...tmpSelectedLists, {...value, ...stockItem}]);
                   updateLists( stockItems, [...tmpSelectedLists, {...value, ...stockItem}]);
                   props.onButtonAction({type: Constants.actionType.ACTION_VIEW , value: [...tmpSelectedLists, {...value, ...stockItem}] });
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
        props.onButtonAction({type: Constants.actionType.ACTION_NEXT , value: tmp.length });

    }

    const renderRightPart = () => {
        return (
          <TouchableOpacity
            onPress={() => {
              viewListsModalRef.current.hideModal();
            }}>
            <SvgIcon icon="Close" width="20" height="20" />
          </TouchableOpacity>
        );
    };

    const onViewListsModal = ({type, value}) => {
        if (type == Constants.actionType.ACTION_REMOVE) {
            props.onButtonAction({type: Constants.actionType.ACTION_REMOVE , value: value });            
        }
    };


    return (
        <View style={{alignSelf:'stretch' , flex:1}}>

            <SelectDevicesView 
                stockItems={showStockItems}
                onItemSelected={(item) =>onItemSelected(item)}
                {...props}
            />

            <SubmitButton style={{marginHorizontal:10}} title={Strings.Stock.Allocate_Device} onSubmit={allocateDevices}/>
            
            <StockSignatureModal
                isKeyboardManager={false}            
                ref={stockSignatureModalRef}
                title={Strings.Stock.Please_Sign}
                locationId={0}
                item={stockItem}
                signatureModalType="save"
                selectedCodes={[]}                
                onButtonAction={onStockSignature}
            />

            <ViewListsModal
                ref={viewListsModalRef}
                hideClear={true}
                selectedLists={selectedLists}
                customRightHeaderView={renderRightPart()}
                allocateDevices={allocateDevices}
                title={'Allocated Devices: ' + selectedLists.length}
                onButtonAction={onViewListsModal}
            />
                

        </View>
    )
}); 

export default SelectDevicesContainer;
