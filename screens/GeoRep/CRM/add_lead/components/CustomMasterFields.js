import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React , { useRef , useState ,useEffect} from 'react'
import {TextInput, Button, Title} from 'react-native-paper';
import Colors, { whiteLabel } from '../../../../../constants/Colors';
import { Fonts } from '../../../../../constants';
import { useSelector } from 'react-redux';
import SvgIcon from '../../../../../components/SvgIcon';
import DynamicForm from '../../../../../components/common/DynamicForm';
import { reverseGeocoding } from '../../../../../actions/google.action';

export default function CustomMasterFields(props) {

    const { leadForms , customMasterFields ,accuracyUnit } = props;    
    const currentLocation = useSelector(state => state.rep.currentLocation);
    const actionFormRef = useRef();
    const dispositionRef = useRef([]);
    const [options, setDropdownItems] = useState([]);
    const [formData1, setFormData1] = useState({});
    const [formStructure1, setFormStructure1] = useState([]);
    const [formData2, setFormData2] = useState({});
    const [formStructure2, setFormStructure2] = useState([]);

    useEffect(() => {
      var isMount = true;      
      initData(leadForms, "first");
      initData(leadForms, "second");
      return () => {
        isMount = false;
      };
    }, [leadForms])
    
    const initData = (leadForms, type) => {      
      var renderForms  = leadForms.filter((item , index) => index != 0);
      if(type == "first"){
        renderForms  = leadForms.filter((item , index) => index == 0);
      }     
      const tmpFormData = {}; 
      renderForms.forEach(item => {
        tmpFormData[item.core_field_name] = item.initial_value;
      });

      if(type == "first"){
        setFormData1(tmpFormData);
      }else{
        setFormData2(tmpFormData);
      }      
      const dynamicFields = renderForms.map((field, index) => {
        return {
          ...field,
          key:index,
          field_name: field.core_field_name,
          initial_value: field.value, 
          editable: field.rule_editable,     
          is_required: true,
          field_label:field.field_name,          
        };
      });      
      if(type == "first"){
        setFormStructure1(dynamicFields)
      }else{
        console.log("TEST",dynamicFields)
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
              console.log("master fields" , masterFields)
              if (masterFields.length > 0) {                
                initData(masterFields, "first");
                initData(masterFields, "second");
                //setIsCurrentLocation('1');
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
            }}
          />

          {renderUseCurrentLocation()}

          <DynamicForm
            ref={actionFormRef}
            formData={formData2}
            formStructureData={formStructure2}
            updateFormData={formData => {
              setFormData2(formData);
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