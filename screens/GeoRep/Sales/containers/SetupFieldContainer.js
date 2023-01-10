
import { View , Platform } from 'react-native'
import React , { useState , useEffect } from 'react'
import SetupFieldView from '../components/SetupFieldView';
import { GetRequestSetupFieldDAO } from '../../../../DAO';
import { expireToken } from '../../../../constants/Helper';
import {  useSelector, useDispatch } from 'react-redux';
import { Constants } from '../../../../constants';
import { getBottomTabs } from '../../../../components/helper';
import BottomTabItem from '../../../../components/common/BottomTabItem';
import { getJsonData, getLocalData } from '../../../../constants/Storage';

const  SetupFieldContainer = (props) => {
    
    const [transaction_types , setTransactinTypes] = useState(null);
    const [warehouse , setWarehouse] = useState(null);
    const [currency , setCurrency] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [bottomTabs, setBottomTabs] = useState([]);
    
    const payload = useSelector(state => state.selection.payload);
    const selectProject = useSelector(state => state.selection.selectProject);
    
    const dispatch = useDispatch()
    let isMount = true;

    useEffect(() => {
        initBottomTab();        
        callDefineSetUp();
        return () => {
            isMount = false;
        }
    }, []);

    const callDefineSetUp = async () => {                
        var defineSetup = await getJsonData('@setup');
        if(defineSetup != null ){
            console.log("defineSetup ->" ,defineSetup.location)
            if(defineSetup.location != undefined && defineSetup.location.location_id){
                console.log("defineSetup.location.location_id", defineSetup.location.location_id)
                callSetupFieldOptions( defineSetup.location.location_id );
            }
        }else{
            const location_id = await getLocalData("@specific_location_id");
            callSetupFieldOptions( location_id );
        }
    }

    const callSetupFieldOptions = (location_id) => {
        if(!isLoading){
            setIsLoading(true);
            var param = {};        
            if(location_id  != undefined && location_id != ''){
                param = {
                    location_id: location_id
                }
            }  
            console.log("setup-fields param =>", param)      
            GetRequestSetupFieldDAO.find(param).then((res) => {
                console.log("res.warehouse", res.warehouse)
                setTransactinTypes(res.transaction_types);
                setWarehouse(res.warehouse);
                setCurrency(res.currency);
                setIsLoading(false)
            }).catch((e) => {
                expireToken(dispatch, e);
                setIsLoading(false)
            });
        }        
    }

    const initBottomTab = () => {
        const tabs = getBottomTabs(payload, selectProject);
        setBottomTabs(tabs)
    }
 
    const onContinue = (data) => {             
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: data});
    }

    const onChangeLocation = (location) => {        
        if(location)
            callSetupFieldOptions(location.location_id)
    }
    
    const getPadding = () => {
        if(Platform.OS == 'android'){
            return 0;
        }else{
            const majorVersionIOS = parseInt(Platform.Version, 10);
            if(majorVersionIOS == 7){
                return 25
            }else{
                return 34;
            }
        }

    }

    return (
        <View style={{
            alignSelf:'stretch' , 
            flex:1 ,            
            flexDirection:'column',            
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
                onChangeLocation={onChangeLocation}
                {...props} />
            
            <View style={{
                    backgroundColor:'white', 
                    position:'absolute' ,
                    bottom:0, 
                    width:'100%', 
                    flexDirection:'row' , 
                    paddingBottom: getPadding()
                }}>

                {
                    bottomTabs.map((item, index) =>{
                        return (
                            <BottomTabItem  
                                onItemPressed={() => {                                    
                                    props.onButtonAction({type: Constants.actionType.ACTION_DONE, value: item});
                                    
                                }}
                                key={index} item={item} 
                            />
                        )
                    })
                }                                            
            </View>
        </View>
    )
}
export default SetupFieldContainer;