

import { View , StyleSheet } from 'react-native'
import React , { useRef , useState} from 'react'
import CSingleSelectInput from '../../../../../components/common/SelectInput/CSingleSelectInput';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import DeviceView from './stock_types/DeviceView';
import ConsumableView from './stock_types/ConsumableView';
import SimView from './stock_types/SimView';

export default function AddStockView(props) {

    const { deviceTypeLists , stockTypes} = props;

    const [deviceType ,setDeviceType] = useState('');
    const [device, setDevice] = useState("");
    const [deviceLists, setDeviceLists] = useState([]);    

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

    const getLabel = () => {
        if(deviceType === "Device"){
            return "Device";
        }
        if(deviceType === "Consumables"){
            return "Product";
        }
        if(deviceType === "Sim"){
            return "Network";
        }
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
                            tmp.push({value: element.label, label: element.label})
                        });
                        console.log("tmp",tmp)
                        setDeviceLists(tmp);
                    }}
                    containerStyle={{marginTop: 10}}
                />    

                <CSingleSelectInput                    
                    description={getLabel()}
                    placeholder={'Select ' + getLabel()}
                    checkedValue={device}
                    items={deviceLists}
                    hasError={false}
                    disabled={false}
                    onSelectItem={item => {                                               
                        setDevice(item.label);
                    }}
                    containerStyle={{marginTop: 15}}
                />  

                {
                    deviceType === "Device" && 
                    <DeviceView onDataChanged={onDataChangedDevice} />
                }                

                {
                    deviceType === "Consumables" &&
                    <ConsumableView  onDataChanged={onDataChangedConsumable} />
                }

                {
                    deviceType === "Sim" &&
                    <SimView />
                }
                
                <SubmitButton 
                    onSubmit={() => {
                        var data = {
                            deviceType: deviceType,
                            device: device,
                            details: details, 
                            quantity: quantity
                        }
                        props.callAddStock(deviceType, data );
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
