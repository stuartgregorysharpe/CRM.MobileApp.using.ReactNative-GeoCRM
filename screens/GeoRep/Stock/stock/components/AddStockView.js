

import { View , StyleSheet } from 'react-native'
import React , {  useState} from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DeviceView from './stock_types/DeviceView';
import ConsumableView from './stock_types/ConsumableView';
import SimView from './stock_types/SimView';
import { Constants } from '../../../../../constants';

var vodacom = [];
var cell = [];
var telkom = [];

export default function AddStockView(props) {

    const { deviceTypeLists , stockTypes} = props;

    const [deviceType ,setDeviceType] = useState('');
    const [device, setDevice] = useState("");
    const [productId,setProductId] = useState("");
    const [deviceLists, setDeviceLists] = useState([]);    

    const [codeLists, setCodeLists] = useState([]);
    var details = '';
    var quantity = '';

    const onDataChangedDevice = (det, qua) => {
        details = det;
        quantity = qua;
    }
    const onDataChangedConsumable = (det, qua) => {
        details = det;
        quantity = qua;
    }
    const onDataChangedSim = (value) =>{        
        var tmp = {type: device, code: value};        
        if(device === Constants.networkType.VODACOM){            
            if(!vodacom.includes(value.toString())){
                vodacom.push(value);
                setCodeLists([...codeLists, tmp]);
            }            
        }else if(device === Constants.networkType.CELL){
            if(!cell.includes(value.toString())){                
                cell.push(value);
                setCodeLists([...codeLists, tmp]);
            }
            
        }else if(device ===  Constants.networkType.TELKOM){
            if(!telkom.includes(value.toString())){
                telkom.push(value);
                setCodeLists([...codeLists, tmp]);
            }            
        }
    }

    const removeCode = (value) => {        
        let filteredArray = codeLists.filter(item => item.code !== value.code)
        vodacom = vodacom.filter(item => item !== value.code)
        cell = cell.filter(item => item !== value.code)
        telkom = telkom.filter(item => item !== value.code)
        setCodeLists(filteredArray);       
    }

    const getLabel = () => {
        if(deviceType === Constants.stockType.DEVICE){
            return "Device";
        }
        if(deviceType === Constants.stockType.CONSUMABLE){
            return "Product";
        }
        if(deviceType === Constants.stockType.SIM){
            return "Network";
        }
        return ""
    }

    const onSubmit = () =>{
        var data = {
            stock_type: deviceType,
            device: device,
            details: details,
            quantity: quantity
        }                        
        if(deviceType == Constants.stockType.DEVICE){
            data = {
                stock_type: deviceType,
                product_id: productId,
                description:device,
                details: details,
                device_serial: quantity
            }
        }else if(deviceType == Constants.stockType.CONSUMABLE){
            data = {
                stock_type: deviceType,
                product_id: productId,
                description:device,
                details: details,
                quantity: quantity
            }
        }else if(deviceType == Constants.stockType.SIM){
            
            var simLists = [];
            deviceLists.forEach((item) => {
                var iccids = []; 
                if(item.label == Constants.networkType.VODACOM){
                    iccids = vodacom;
                }else if(item.label == Constants.networkType.CELL){
                    iccids = cell;
                }else if(item.label == Constants.networkType.TELKOM){
                    iccids = telkom;
                }
                if(iccids.length > 0){
                    console.log("ids", iccids)
                    simLists.push({network: item.label, product_id: item.value , iccids:iccids });
                }
            })
            data = {
                stock_type: deviceType,
                sims: simLists           
            }
        }
        console.log("post data", data);
        props.callAddStock(deviceType, data );
    }
    
    return (
            <View style={styles.container}>  
                
                <CSingleSelectInput
                    key={"key"}
                    description={'Stock Type'}
                    placeholder={'Select Stock Type'}
                    checkedValue={deviceType}
                    items={deviceTypeLists}
                    hasError={false}
                    disabled={false}
                    onSelectItem={item => {                        
                        setDeviceType(item.value);                        
                        var tmp = [];
                        stockTypes[item.value].forEach(element => {
                            console.log("XX", element)
                            tmp.push({value: element.product_id, label: element.label})
                        });                      
                        setDeviceLists(tmp);
                    }}
                    containerStyle={{marginTop: 10}}
                />    

                <CSingleSelectInput                    
                    description={getLabel()}
                    placeholder={'Select ' + getLabel()}
                    checkedValue={productId}
                    items={deviceLists}
                    hasError={false}
                    disabled={false}
                    onSelectItem={item => {   
                        console.log("item",item)                                            
                        setDevice(item.label);
                        setProductId(item.value)
                    }}
                    containerStyle={{marginTop: 15}}
                />  

                {
                    deviceType === Constants.stockType.DEVICE && 
                    <DeviceView onDataChanged={onDataChangedDevice} />
                }                

                {
                    deviceType === Constants.stockType.CONSUMABLE &&
                    <ConsumableView  onDataChanged={onDataChangedConsumable} />
                }

                {
                    deviceType === Constants.stockType.SIM &&
                    <SimView  
                        codeLists={codeLists} 
                        removeCode={removeCode}
                        addStock={() => onSubmit()} onDataChangedSim={onDataChangedSim} />
                }
                
                <SubmitButton 
                    onSubmit={() => {
                        onSubmit()
                    }}
                title="Add Stock" style={{marginTop:20}}></SubmitButton>

            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        paddingTop: 10,
        marginHorizontal: 20,
        marginBottom: 30,
    },
})
