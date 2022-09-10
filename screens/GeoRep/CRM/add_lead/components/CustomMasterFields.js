import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React , { useRef , useState ,useEffect} from 'react'
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';
import { useSelector } from 'react-redux';
import DynamicForm from '../../../../../components/common/DynamicForm';
import { reverseGeocoding } from '../../../../../actions/google.action';

export default function CustomMasterFields(props) {

    const { leadForms , accuracyUnit , useGeoLocation , onChangedCustomMasterFields } = props;    
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const actionFormRef = useRef();    
    const [formData1, setFormData1] = useState({});
    const [formStructure1, setFormStructure1] = useState([]);
    const [formData2, setFormData2] = useState({});
    const [formStructure2, setFormStructure2] = useState([]);    
    useEffect(() => {      
      initData(leadForms, "first");
      initData(leadForms, "second");
    }, [leadForms])
    
    const initData = (leadForms, type) => {      
      var renderForms  = leadForms.filter((item , index) => index != 0);
      if(type == "first"){
        renderForms  = leadForms.filter((item , index) => index == 0);
      }     
      const tmpFormData = {}; 
      renderForms.forEach(field => {
        var value = field.value;
        if(field.field_type === "dropdown_input"){
          if(field.value != null && field.value != '' && field.dropdown_value != undefined){
            value = {value: field.dropdown_value, secondValue: field.value};          
          }
        }
        tmpFormData[field.custom_master_field_id] = value;
      });
      if(type == "first"){
        setFormData1(tmpFormData);
        onChangedCustomMasterFields({...tmpFormData});
      }else{
        setFormData2(tmpFormData);
        onChangedCustomMasterFields({...tmpFormData});
      }      
      const dynamicFields = renderForms.map((field, index) => {
        var value = field.value;
        if( (field.field_type == "dropdown" || field.field_type == "dropdown_input") && field.preset_options != undefined ){
          var items = [];         
          if(field.preset_options != undefined && field.preset_options != ''){
            field.preset_options.forEach((element) => {
              items.push({label: element, value: element});
            })
          }
          field = {
            ...field,
            items: items
          }          
        }       
                
        return {
          ...field,
          key:index,
          field_name: field.custom_master_field_id,
          initial_value: field.value, 
          editable: field.rule_editable,     
          is_required: true,
          field_label:field.field_name,    
          value: value
        };
      });      
      if(type == "first"){
        setFormStructure1(dynamicFields)
      }else{        
        setFormStructure2(dynamicFields)
      }
      
    }

    const renderUseCurrentLocation = key => {
      return (
        <TouchableOpacity
          style={[
            styles.linkBox,
            {marginTop: 15, marginBottom: 5, justifyContent: 'center'},
          ]}
          key={key + 100}
          onPress={async () => {
            if (currentLocation) {                            
              var masterFields = await reverseGeocoding(currentLocation, leadForms );              
              if (masterFields.length > 0) {                
                initData(masterFields, "first");
                initData(masterFields, "second");                
                useGeoLocation();
              }
            }
          }}>
          <Text style={[styles.linkBoxText, {flex: 1}]}>
            Use Current Geo Location
          </Text>
          <View style={{position: 'absolute', right: 0}}>
            <Text style={{color: Colors.disabledColor, fontSize: 11}}>
              Accuracy{' '}
              {accuracyUnit === 'm'
                ? parseInt(currentLocation.accuracy)
                : parseInt(currentLocation.accuracy * 3.28084)}{' '}
              {accuracyUnit}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
        <View>

          <DynamicForm
            ref={actionFormRef}
            formData={formData1}
            formStructureData={formStructure1}
            updateFormData={formData => {
              console.log("form data" , formData)
              setFormData1(formData);
              onChangedCustomMasterFields({...formData1, ...formData2});
            }}
          />

          {renderUseCurrentLocation()}

          <DynamicForm
            ref={actionFormRef}
            formData={formData2}
            formStructureData={formStructure2}
            updateFormData={formData => {              
              setFormData2(formData);
              onChangedCustomMasterFields({...formData2, ...formData});
            }}
            updateSecondFormData={formData => {              
              setFormData2(formData);              
              onChangedCustomMasterFields({...formData2, ...formData});
            }}            
          />

        </View>
        
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        fontSize: 14,
        lineHeight: 30,
        backgroundColor: Colors.bgColor,
        marginBottom: 8,
    },
    
    linkBox: {
        position: 'relative',
        marginBottom: 8,
    },
    
    linkBoxText: {
        color: whiteLabel().mainText,
        fontFamily: Fonts.secondaryMedium,
        textDecorationLine: 'underline',
        textDecorationColor: whiteLabel().mainText,
        textAlign: 'center',
    },
})