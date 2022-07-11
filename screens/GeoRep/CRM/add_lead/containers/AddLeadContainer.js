
import { View ,TouchableOpacity } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { Constants } from '../../../../../constants';
import AddLeadView from '../components/AddLeadView';
import { getApiRequest, postApiRequestMultipart } from '../../../../../actions/api.action';
import { SubmitButton } from '../../../../../components/shared/SubmitButton';
import AddLeadForms from '../../popup/AddLeadForms';
import SelectDevicesModal from '../modal/SelectDevicesModal';
import CCircleButton from '../../../../../components/common/CCircleButton';
import ViewListsModal from '../modal/ViewListsModal';
import SvgIcon from '../../../../../components/SvgIcon';
import { useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../../../actions/notification.action';

export default function AddLeadContainer(props) {

    const currentLocation = useSelector(state => state.rep.currentLocation);    
    const [leadForms , setLeadForms] = useState([]);    
    const [accuracyUnit, setAccuracyUnit] = useState('m');    
    const [canShowAddLeadForms, setCanShowaddLeadForms] = useState(false)
    const [formLists, setFormLists] = useState([]);
    const [selectedLists, setSelectedLists] = useState([]);
    const selectDeviceModalRef = useRef(null)
    const viewListsModalRef = useRef(null)
    const [isCurrentLocation, setIsCurrentLocation] = useState('0');
    const [customMasterFields , setCustomMasterFields] = useState({});
    const [primaryData, setPrimaryData] = useState({});
    const dispatch = useDispatch();

    var isMount = true;
    useEffect(() => {        
        getCustomMasterFields();
        return () =>{
            isMount =  false;
        }
    }, []);

    useEffect(() => {
        getFormLists();
    }, [leadForms]);    

    const getCustomMasterFields = () => {
        getApiRequest("leadfields", {}).then((res) => {
            if(isMount){             
                console.log("leadfields", res.custom_master_fields)   
                setLeadForms(res.custom_master_fields);
                setAccuracyUnit(res.accuracy_distance_measure);            
            }            
        }).catch((e) => {
        })
    }

    const getFormLists = async() => {
        var locationTypeItem = leadForms.filter(item => item.core_field_name == 'location_type');
        var groupItem =  leadForms.filter(item => item.core_field_name == 'group');
        var groupSplitItem  = leadForms.filter(item => item.core_field_name == 'group_split');
        var param = {
            add_lead: 1,
            location_type: locationTypeItem ? locationTypeItem.value : '',
            group: groupItem ? groupItem.value : '',
            group_split: groupSplitItem ? groupSplitItem.value : '',
        }
        getApiRequest("forms/forms-list", param).then((res) => {            
            setFormLists(res.forms);
        }).catch((e) => {

        });
    }

    const onAdd = () => {        
        var postData = new FormData();        
                
        postData.append('use_current_geo_location', isCurrentLocation);                
        var time_zone = RNLocalize.getTimeZone();
        postData.append('user_local_data[time_zone]', time_zone);
        postData.append(
          'user_local_data[latitude]',
          currentLocation && currentLocation.latitude != null
            ? currentLocation.latitude
            : '0',
        );
        postData.append(
          'user_local_data[longitude]',
          currentLocation && currentLocation.longitude != null
            ? currentLocation.longitude
            : '0',
        );
        postData.append( 'coordinates[latitude]', currentLocation && currentLocation.latitude != null ? currentLocation.latitude : '0');
        postData.append( 'coordinates[longitude]', currentLocation && currentLocation.longitude != null ? currentLocation.longitude : '0');

        getCustomMasterParameterData(postData);
        getAllocateDeviceParameterData(postData);
        selectedLists.forEach((item, index) => {
            postData.append(`allocated_devices[${index}][stock_item_id]`, item.stock_item_id);
            postData.append(`allocated_devices[${index}][assigned_msisdn]`, item.msisdn);
            postData.append(`allocated_devices[${index}][received_by]`, item.received);        
            postData.append(`allocated_devices_signature[${item.stock_item_id}]`, { uri: item.signature, type:'image/png' , name:'sign.png' } );            
        })

        postApiRequestMultipart("leadfields", postData).then((res) => {        
            if(res.status == "success"){
                dispatch(showNotification({type:'success', message:res.message, buttonText:'Ok'}));
            }
        }).catch((e) => {
            console.log("e", e)
        })
    }
    const getCustomMasterParameterData = (postData) => {
        Object.keys(customMasterFields).forEach((key , index) => {
            if( key != undefined && key != ''){            
                var check = leadForms.find(item => item.custom_master_field_id == key );
                if(check != null && check != undefined){
                    postData.append(`custom_master_fields[${index}][custom_master_field_id]`, key);
                    if(check.field_type == "dropdown_input"){
                        postData.append(`custom_master_fields[${index}][dropdown_value]`, customMasterFields[key].value);
                        postData.append(`custom_master_fields[${index}][value]`, customMasterFields[key].secondValue);
                    }else{
                        postData.append(`custom_master_fields[${index}][value]`, customMasterFields[key]);
                    }
                }
            }
        })      
    }

    const  getAllocateDeviceParameterData = (postData) => {

        Object.keys(primaryData).forEach((key , index) => {
            if( key != undefined && key != ''){
                postData.append(`contact[${key}]`, primaryData[key]);
            }
        })            
    }


    const onButtonAction = (value) => {
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }

    const showFormModal = () => {
        setCanShowaddLeadForms(true)
    }
    
    const showAllocateModal = () => {        
        if(selectDeviceModalRef.current)
            selectDeviceModalRef.current.showModal()
    }
        
    const renderViewLists = () => {        
        return <CCircleButton onClick={() => viewLists() } title="View List" icon="Check_List_Active"></CCircleButton>
    }
    
    const viewLists = () => {        
        if(viewListsModalRef){
            viewListsModalRef.current.showModal();
        }
    }

    const onSelectDeviceModalClosed = ({type, value}) => {
        console.log("Value ---- " , type)
        if(type == Constants.actionType.ACTION_VIEW){
            setSelectedLists(value);            
        }
        if(type == Constants.actionType.ACTION_CLOSE){
            props.onButtonAction({type : Constants.actionType.ACTION_NEXT , value: value});
            selectDeviceModalRef.current.hideModal();
        }
    }

    const onViewListsModal = ({type, value}) => {
        if(type == Constants.actionType.ACTION_REMOVE){
            const tmp = selectedLists.filter(item =>  item.stock_item_id != value.stock_item_id );
            setSelectedLists(tmp);
        }
    }

    const renderRightPart = () => {        
        return <TouchableOpacity onPress={() => {
            console.log("pressed")
            viewListsModalRef.current.hideModal() 
        }}>
            <SvgIcon icon="Close" width='20' height='20' />
        </TouchableOpacity>
    }

    const useGeoLocation = () => {
        setIsCurrentLocation("1");
    }
    const onChangedCustomMasterFields = (value) => {
        console.log("onChangedCustomMasterFields--", value);
        setCustomMasterFields(value);
    }
    const onPrimaryContactFields = (value) => {
        console.log("onPrimaryContactFields", value)
        setPrimaryData(value);
    }

    return (
        <View style={{alignSelf:'stretch' , flex:1}}>
            <AddLeadView                             
                onButtonAction={onButtonAction}                
                leadForms={leadForms}
                accuracyUnit={accuracyUnit}
                useGeoLocation={useGeoLocation}
                onChangedCustomMasterFields={onChangedCustomMasterFields}
                onPrimaryContactFields={onPrimaryContactFields}
                showFormModal={showFormModal}
                showAllocateModal={showAllocateModal}
                {...props}
            />

            <AddLeadForms
                onClose={() => {
                    setCanShowaddLeadForms(!canShowAddLeadForms);
                    props.onButtonAction({type:  Constants.actionType.ACTION_CLOSE})
                }}
                visible={canShowAddLeadForms}
                formLists={formLists}      
            />

            <SelectDevicesModal
                ref={selectDeviceModalRef}
                hideClear={true}
                selLists={selectedLists}
                customRightHeaderView={renderViewLists()}
                title = "Select Devices"
                onButtonAction={onSelectDeviceModalClosed}
            />
                        
            <ViewListsModal
                ref={viewListsModalRef}
                hideClear={true}
                selectedLists={selectedLists}
                customRightHeaderView={renderRightPart()}
                title = {"Allocated Devices " + selectedLists.length}
                onButtonAction={onViewListsModal}
            />

            <SubmitButton style={{marginHorizontal:10}} title={"Add"} onSubmit={onAdd}/>
        </View>
    )
}