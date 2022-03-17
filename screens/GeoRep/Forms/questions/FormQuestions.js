import React, { useEffect , useState , useRef } from 'react';
import { Text, View, Dimensions, StyleSheet , TouchableOpacity , Image , Alert, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFormQuestions } from '../../../../actions/forms.action';
import { HeadingForm } from '../../../../components/shared/HeadingForm';
import { ParagraphForm } from '../../../../components/shared/ParagraphForm';
import { TextForm } from '../../../../components/shared/TextForm';
import { YesNoForm } from '../../../../components/shared/YesNoForm';
import { SingleSelectForm } from '../../../../components/shared/SingleSelectForm';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Images from '../../../../constants/Images';
import { style } from '../../../../constants/Styles';
import { GroupTitle } from './partial/GroupTitle';
import {  Provider } from 'react-native-paper';
import { MultipleSelectForm } from '../../../../components/shared/MultipleSelectForm';
import { DateForm } from '../../../../components/shared/DateForm';
import TakePhotoForm from '../../../../components/shared/TakePhotoForm';
import { useSelector , useDispatch} from 'react-redux';
import { SLIDE_STATUS } from '../../../../actions/actionTypes';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getTwoDigit } from '../../../../constants/Consts';
import { SignatureForm } from '../../../../components/shared/SignatureForm';
import Sign  from './partial/Sign';
import GrayBackground from '../../../../components/GrayBackground';
import * as ImagePicker from 'react-native-image-picker'; 
import RNFS from 'react-native-fs';
import { SelectionView } from './partial/SelectionView';
import { DatetimePickerView } from './partial/DatetimePickerView';
import { value } from 'react-native-extended-stylesheet';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import AlertDialog from '../../../../components/modal/AlertDialog';

export const FormQuestions = (props) =>{

    const form = props.route.params.data;
    const [formQuestions, setFormQuestions] = useState([]);
    const [modaVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [index, setIndex] = useState(-1);
    const [key, setKey] = useState(-1);
    const [mode, setMode] = useState("single");
    const crmStatus = useSelector(state => state.rep.crmSlideStatus);
    const [isDateTimeView , setIsDateTimeView] = useState(false);
    const [isSign, setIsSign] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
    const [x,setX] = useState(0);
    const [y, setY] = useState(0);
    const [bubbleText, setBubleText] = useState("");
    const [signature, setSignature] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.screenProps) {
          props.screenProps.setOptions({            
            headerTitle:() =>{
              return(<TouchableOpacity                     
                 onPress={
                () =>{
                  if(crmStatus && isDateTimeView){
                    closeDateTime();
                  }else if(crmStatus && modaVisible){
                    closeDateTime();
                  }else if(crmStatus && isSign){
                    closeSignView();
                  }else{
                    if( props.navigation.canGoBack()){
                      props.navigation.goBack();              
                    }
                  }                  
                }}> 
                <View style={style.headerTitleContainerStyle}>                                
                    <Image
                      resizeMethod='resize'
                      style={{width:15,height:20, marginRight:5}}
                      source={Images.backIcon}
                    />
                  <Text style={style.headerTitle} >Forms</Text>
              </View></TouchableOpacity>)
            },
            tabBarStyle: {
              position: 'absolute',
              height: 50,
              paddingBottom: Platform.OS == "android" ? 5 : 0,          
              backgroundColor: Colors.whiteColor,
            },
          });
          if (crmStatus) {
            props.screenProps.setOptions({
              tabBarStyle: {
                display: 'none',
              },
            });
          }
          
        }         
    });

    useEffect(() => {
      _callFormQuestions()
    },[]);
        
    const _callFormQuestions = () => {
      getFormQuestions(form.form_id).then((res) => {                
        groupByQuestions(res);
      }).catch((e) => {
      })
    }

    const groupByQuestions = (data) => {
      var newData = [];      
      data.forEach(element => {        
        if( !isInNewData(newData, element) ){
          var ques = [element];
          newData.push( { question_group_id: element.question_group_id , question_group: element.question_group, questions: ques } );
        }else{
          var tmp = newData.find(item => item.question_group_id === element.question_group_id);          
          var newTmp = [...tmp.questions, element];          
          tmp.questions = [...newTmp];
        }    
      });      
      setFormQuestions(newData);            
    }
    
    const isInNewData = (data, value) =>{
      return data.find(item => item.question_group_id === value.question_group_id) ? true : false
    }

    const clearAll = () =>{             
      var tmp = [...formQuestions];
      tmp.forEach(element => {
        element.questions.forEach(item => {
          item.value = null;
        });
      });      
      setFormQuestions(tmp);    
    }

    const _onTouchStart = (e , text) => {            
      setX(e.pageX);
      setY(e.pageY);
      setLocationX(e.locationX);
      setLocationY(e.locationY);
      setBubleText(text);
      setTimeout(() =>{
        setIsInfo(true);            
      },100)
    }
    const getShift  = () =>{
      if(Platform.OS === 'ios'){
        return 65;
      }
      return 35;
    }

    const confirmDateTime = (datetime) =>{      
      var tmp = [...formQuestions];                  
      tmp[key].questions[index].value = datetime ;
      setFormQuestions(tmp);      
    }
    const closeDateTime = () =>{
      setIsDateTimeView(false);
      dispatch({type: SLIDE_STATUS, payload: false});                
    }
    
    const handleSignature = (signature) => {
      onValueChangedSelectionView(key, index, signature);      
      dispatch({type: SLIDE_STATUS, payload: false});    
      setIsSign(false);
    }    
    const closeSignView = () => {
      dispatch({type: SLIDE_STATUS, payload: false});
      setIsSign(false);
    }

    const onCloseSelectionView = (key, index) => {
      onValueChangedSelectionView(key, index, null);
      setModalVisible(false);
      dispatch({type: SLIDE_STATUS, payload: false});
    }
    const onSaveSelectionView = () => {
      setModalVisible(false);
      dispatch({type: SLIDE_STATUS, payload: false});
    }
    const onValueChangedSelectionView = ( key, index, value) => {      
      var tmp = [...formQuestions];      
      tmp[key].questions[index].value = value;      
      setFormQuestions(tmp);            
    }

    const _onSubmit = () =>{
      var flag = true;
      formQuestions.forEach(element => {
        element.questions.forEach(item => {
            if(item.rule_compulsory === "1" && (item.value === null || item.value === '' || item.value === undefined  )){
              flag = false;              
            }
        });
      });
      if(!flag){
        setMessage("Please complete the compulsory questions and then submit");
        setIsAlert(true);
      }      
    }

    const renderQuestion = (item , key, index) =>{
      if(item.question_type === "text"){
        return (
          <TextForm key={ "text_question" +  index}  
            onTextChanged= { (text) => { onValueChangedSelectionView(key, index, text) ; }}
            item={item} type="text" onTouchStart={(e, text) => {
            _onTouchStart( e, text);
          }}></TextForm>
        );
      }else if(item.question_type === "yes_no"){
        return (
          <YesNoForm
          onPress={(value) => onValueChangedSelectionView(key, index, value) }
          key={ "yes_no_question" +  index} item={item} onTouchStart={(e, text) => { _onTouchStart(e, text); } }   ></YesNoForm>
        );
      }else if(item.question_type === "heading"){
        return (
          <HeadingForm key={ "heading_question" + index} item={item}></HeadingForm>
        );
      }else if(item.question_type === "paragraph"){
        return (
          <ParagraphForm key={ "paragraph_question" +  index} item={item}></ParagraphForm>
        );
      }else if(item.question_type === "multiple"){
        
        return (
          <SingleSelectForm  key={ "multiple_question" +  index}           
          onTouchStart={(e, text) => { _onTouchStart(e, text); } }
          onPress={(item) => {        
            setMode("single");
            setOptions(item.options);
            setSelectedOptions(item.value);
            setModalVisible(true);
            dispatch({type: SLIDE_STATUS, payload: true});            
            setKey(key);
            setIndex(index);            
          }} item={item}></SingleSelectForm>
        );
      }else if(item.question_type === "multi_select"){
        
        return (
          <MultipleSelectForm  key={ "multi_select_question" +  index} 
          onTouchStart={(e, text) => { _onTouchStart(e, text); } }
          onPress={(item) => {        
            setMode("multiple");
            setOptions(item.options);
            setSelectedOptions(item.value);
            setModalVisible(true);
            dispatch({type: SLIDE_STATUS, payload: true});
            setKey(key);
            setIndex(index);
          }} item={item}></MultipleSelectForm>
        );
      }else if(item.question_type === "numbers") {
        return (
          <TextForm 
          onTextChanged= { (text) => { onValueChangedSelectionView(key, index, text) ; }}
          key={ "numbers_question" + index} item={item} type="numeric" onTouchStart={(e, text) => { _onTouchStart(e, text); } } ></TextForm>
        );
      }else if(item.question_type === "date"){
        return (
          <DateForm key={ "date_question" + index} item={item}  
          onTouchStart={(e, text) => { _onTouchStart(e, text); } }
          onPress={() => {
            setKey(key);
            setIndex(index);
            setSelectedDate(item.value);
            setIsDateTimeView(true);
            dispatch({type: SLIDE_STATUS, payload: true});
          }} ></DateForm>
        );
      }else if(item.question_type === "signature"){
        return (
          <SignatureForm key={ "signature_question" + index} item={item}  
          onTouchStart={(e, text) => { _onTouchStart(e, text); } } 
          onPress={() => {            
            setKey(key);
            setIndex(index);
            setSignature( item.value );            
            console.log("signature clicked");
            setIsSign(true);            
            dispatch({type: SLIDE_STATUS, payload: true});
          }} ></SignatureForm>
        );

      }else if(item.question_type === "take_photo"){

        return (
          <TakePhotoForm
            key={ "take_photo_question" + `${key}${index}`} item={item}           
            onTouchStart={(e, text) => { _onTouchStart(e, text); } } 
            onPress={(value) => onValueChangedSelectionView(key, index, value) }
          ></TakePhotoForm>
        );
      }
      return <View key={"question" + index} ></View>
    }

    return (      
        <View style={styles.container}  onTouchStart={(e) => { setIsInfo(false); }}>
            <GrayBackground></GrayBackground>
            <AlertDialog visible={isAlert} message={message}  onModalClose={() => setIsAlert(false)} ></AlertDialog>
            {
              crmStatus && isDateTimeView &&
              <DatetimePickerView 
                value={selectedDate}
                close={(date) => {
                  confirmDateTime(date);
                  closeDateTime();
                }} ></DatetimePickerView>
            }

            {
               crmStatus && isSign &&
              <Sign signature={signature}  onOK={handleSignature}  
              onClear= {() => {
                  onValueChangedSelectionView(key, index, null);
              }}
              onClose={() => {                  
                  onValueChangedSelectionView(key, index, null);
                  closeSignView();      
              }}></Sign>
            }
            {              
              crmStatus && modaVisible  &&
              <SelectionView 
                options={options}  mode={mode} 
                value={selectedOptions}
                onValueChanged = {(value) => {onValueChangedSelectionView( key, index, value); }}
                onClose={() =>{onCloseSelectionView( key  , index )}} 
                onSave={() => { onSaveSelectionView(); }} > </SelectionView>              
            }
            
            <View style={styles.titleContainerStyle}>
              <View style={{flex:1}}>
                <Text style={styles.formTitleStyle}>{form.form_name}</Text>
              </View>              
              <TouchableOpacity style={{alignItems:'flex-end', padding:5}} onPress={ () => clearAll() }>
                <Text style={styles.clearTextStyle}>Clear All Answers</Text>
              </TouchableOpacity>                         
            </View>

                                                
            <ScrollView style={{padding:5}}>
              {
                formQuestions && formQuestions.map((form , key) => {
                  return (
                    <View key={"form" + key}>
                      <GroupTitle title={form.question_group}></GroupTitle>                                                               
                      {
                        form.questions.map((item , index) => {
                          return renderQuestion(item , key, index);
                        })
                      }
                    </View>
                  )
                })
              }
              <View style={{marginTop:10, marginBottom: 70}}>
                {
                  formQuestions && formQuestions.length > 0 &&
                  <SubmitButton title="Submit" onSubmit={() => {_onSubmit()}}></SubmitButton>
                }                
              </View>
            </ScrollView>

            {
              isInfo &&
              <View style={{
                  top: y - locationY - getShift(),
                  position:'absolute',                                
                  borderRadius: 5,         
                  width:Dimensions.get("screen").width,  
                  borderRadius: 20,                
                }} key={1}>
                    
                  <View  style={{ backgroundColor: "#DDD", padding:10, marginLeft:20,marginRight:10,borderRadius:10, fontSize: 16, color: "#fff", }} key={1}><Text>{bubbleText}</Text></View>  
                  <View style={[style.triangle, {marginLeft:x - locationX + 3 }]}></View>                                              
              </View>
            }                                                
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,        
    },

    titleContainerStyle:{
      flexDirection:'row', padding:10 , alignItems:'center'
    },
    
    formTitleStyle:{
      fontSize:16,
      color:Colors.blackColor,
      fontFamily: Fonts.primaryBold
    },

    clearTextStyle:{
      fontSize:14,
      fontFamily:Fonts.primaryRegular,
      color:Colors.selectedRedColor
    }

})

