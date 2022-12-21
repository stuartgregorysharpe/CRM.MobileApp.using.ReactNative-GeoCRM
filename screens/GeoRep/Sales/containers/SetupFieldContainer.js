
import { View , Text, BackHandler } from 'react-native'
import React , { useState , useEffect } from 'react'
import SetupFieldView from '../components/SetupFieldView';
import { GetRequestSetupFieldDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import {  useSelector, useDispatch } from 'react-redux';
import { Constants } from '../../../../constants';
import { isLandscape } from 'react-native-device-info';
import { getBottomTabs } from '../../../../components/helper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { whiteLabel } from '../../../../constants/Colors';
import DeviceInfo from 'react-native-device-info';
import { style } from '../../../../constants/Styles';
import BottomTabItem from '../../../../components/common/BottomTabItem';
const BottomTab = createBottomTabNavigator();


const  SetupFieldContainer = (props) => {
    
    const [transaction_types , setTransactinTypes] = useState(null);
    const [warehouse , setWarehouse] = useState(null);
    const [currency , setCurrency] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const payload = useSelector(state => state.selection.payload);
    const selectProject = useSelector(state => state.selection.selectProject);
    const [bottomTabs, setBottomTabs] = useState([]);

    const dispatch = useDispatch() 
    let isMount = true;

    useEffect(() => {

        initBottomTab();
        setIsLoading(true);
        GetRequestSetupFieldDAO.find({}).then((res) => {            
            setTransactinTypes(res.transaction_types);
            setWarehouse(res.warehouse);
            setCurrency(res.currency);
            setIsLoading(false)
        }).catch((e) => {
            expireToken(dispatch, e);
            setIsLoading(false)
        });
    
    }, []);

    const initBottomTab = () => {
        const tabs = getBottomTabs(payload, selectProject);
        setBottomTabs(tabs)
    }
 
    const onContinue = (data) => {             
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: data});
    }
        
    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 , 
            flexDirection:'column',
            // marginHorizontal:10, 
            // marginBottom:10,  
            alignItems:'center',
            justifyContent:'center',            
            minHeight:250
        }}>               
           
            <SetupFieldView 
                transaction_types={transaction_types} 
                currency={currency}
                warehouse={warehouse}  
                isLoading={isLoading}
                onContinue={onContinue}
                {...props} />
            
            <View style={{backgroundColor:'white', position:'absolute' ,bottom:0, width:'100%', flexDirection:'row'}}>

                {
                    bottomTabs.map((item, index) =>{
                        return (
                            <BottomTabItem  
                                onItemPressed={() => {                                    
                                    props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: item});
                                    
                                }}
                                key={index} item={item} />
                        )
                    })
                }                                            
            </View>
        </View>
    )
}
export default SetupFieldContainer;