
import { View } from 'react-native'
import React , {useEffect, useState , useRef} from 'react'
import { Constants } from '../../../../../constants';
import AddLeadView from '../components/AddLeadView';
import { getApiRequest } from '../../../../../actions/api.action';

export default function AddLeadContainer(props) {

    const [leadForms , setLeadForms] = useState([]);    
    const [accuracyUnit, setAccuracyUnit] = useState('m');
    const [customMasterFields, setCustomMasterFields] = useState([]);

    var isMount = true;
    useEffect(() => {        
        getCustomMasterFields();
        return () =>{
            isMount =  false;
        }
    }, []);

    const getCustomMasterFields = () => {
        getApiRequest("leadfields", {}).then((res) => {
            if(isMount){
                //console.log("lead form", res)
                initPostData(res.custom_master_fields);
                setLeadForms(res.custom_master_fields);
                setAccuracyUnit(res.accuracy_distance_measure);            
            }            
        }).catch((e) => {
        })
    }

    const initPostData = res => {
        var tmp = [];
        res.forEach(element => {
          if (element.field_type === 'dropdown_input') {
            tmp.push({
              custom_master_field_id: element.custom_master_field_id,
              value: '',
              field_name: element.field_name,
              core_field_name: element.core_field_name,
              field_type: element.field_type,
              dropdown_value: '',
            });
          } else {
            tmp.push({
              custom_master_field_id: element.custom_master_field_id,
              value: '',
              field_name: element.field_name,
              core_field_name: element.core_field_name,
              field_type: element.field_type,
            });
          }
        });
        setCustomMasterFields(tmp);
    };


    const onButtonAction = (value) => {        
        props.onButtonAction({type: Constants.actionType.ACTION_CAPTURE, value: value});
    }    
    return (
        
        <View style={{alignSelf:'stretch' , flex:1}}>
            <AddLeadView                             
                onButtonAction={onButtonAction}                
                leadForms={leadForms}
                customMasterFields={customMasterFields}
                accuracyUnit={accuracyUnit}
                {...props}
            />
        </View>
    )
}