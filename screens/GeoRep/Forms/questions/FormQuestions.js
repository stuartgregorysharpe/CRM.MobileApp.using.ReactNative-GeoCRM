import React, { useEffect , useState , useRef } from 'react';
import { Text, View, Dimensions, StyleSheet , TouchableOpacity , Image , Alert, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeadingForm } from '../../../../components/shared/HeadingForm';
import { ParagraphForm } from '../../../../components/shared/ParagraphForm';
import { TextForm } from '../../../../components/shared/TextForm';
import { YesNoForm } from '../../../../components/shared/YesNoForm';
import { SingleSelectForm } from '../../../../components/shared/SingleSelectForm';
import { UploadFileForm } from '../../../../components/shared/UploadFileForm';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Images from '../../../../constants/Images';
import { style } from '../../../../constants/Styles';
import { GroupTitle } from './partial/GroupTitle';
import { MultipleSelectForm } from '../../../../components/shared/MultipleSelectForm';
import { DateForm } from '../../../../components/shared/DateForm';
import TakePhotoForm from '../../../../components/shared/TakePhotoForm';
import { useSelector , useDispatch} from 'react-redux';
import { SLIDE_STATUS } from '../../../../actions/actionTypes';
import { SignatureForm } from '../../../../components/shared/SignatureForm';
import Sign  from './partial/Sign';
import GrayBackground from '../../../../components/GrayBackground';
import { SelectionView } from './partial/SelectionView';
import { DatetimePickerView } from '../../../../components/DatetimePickerView';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import AlertDialog from '../../../../components/modal/AlertDialog';
import { GuideInfoView } from '../partial/GuideInfoView';
import { expireToken, getPostParameter } from '../../../../constants/Consts';
import { Notification } from '../../../../components/modal/Notification';
import { getApiRequest, postApiRequest, postApiRequestMultipart } from '../../../../actions/api.action';
import { showNotification } from '../../../../actions/notification.action';
import * as RNLocalize from "react-native-localize";

export const FormQuestions = (props) =>{

    const form = props.route.params.data;
    const location_id = props.route.params.location_id;
    const currentLocation = useSelector(state => state.rep.currentLocation);
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
      refreshHeader();
      if (crmStatus) {
        console.log(" --------- props , " ,  props.screenProps);
        props.screenProps.setOptions({
          tabBarStyle: {
            height: 0,
            display: 'none',            
          },
        });
      }
      if(!crmStatus){
        setIsDateTimeView(false);        
      }
    }, [crmStatus]);

    useEffect(() => {
      console.log("call api");
      refreshHeader()
        
      if (crmStatus) {
        props.screenProps.setOptions({
          tabBarStyle: {
            display: 'none',
            height: 0,
          },
        });
      }
      _callFormQuestions()
    },[]);
        
    const refreshHeader = () => {
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
    }

    const _callFormQuestions = () => {
      let param = {
        form_id: form.form_id
      }
      getApiRequest("forms/forms-questions" , param ).then((res) => {        
        groupByQuestions(res.questions);        
      }).catch((e) => {
        console.log(e);
        expireToken(dispatch, e);
      });      
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
          if(item.yes_image){
            item.yes_image = undefined;
          }
          if(item.no_image){
            item.no_image = undefined;
          }
        });
      });    
      setFormQuestions(tmp);    
    }

    const _onTouchStart = (e , text) => {            
      // setX(e.pageX);
      // setY(e.pageY);
      // setLocationX(e.locationX);
      // setLocationY(e.locationY);
      setBubleText(text);      
      setIsInfo(true);
      // setTimeout(() =>{        
      // },1000)
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
      console.log("handel signatuere ddd");
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
    const onValueChangedSelectionView = async ( key, index, value) => {      
      var tmp = [...formQuestions];
      tmp[key].questions[index].value = value;            
      setFormQuestions(tmp);
    }
  
    const _onSubmit = async() =>{
      var flag = true;
      formQuestions.forEach(element => {
        element.questions.forEach(item => {
            if(item.rule_compulsory === "1" && (item.value === null || item.value === '' || item.value === undefined  )){
              flag = false;              
            }
        });
      });
      
      if(!flag){
        dispatch(showNotification({type:'success', message: "Please complete the compulsory questions and then submit" , buttonText: "Okay" }));  
        return;
      } 
      var form_answers= [];
      var index  = 0;
      formQuestions.forEach(element => {
        element.questions.forEach(item => {
            var value = item.value;
            //if(value != null && value != undefined){
              form_answers.push({key: `form_answers[${index}][form_question_id]` , value: item.form_question_id })
              form_answers.push({key: `form_answers[${index}][answer]` , value: item.question_type === 'take_photo' ? '' : value })
              index = index + 1;
            //}                 
        });
      });
      
      var files = [];
      formQuestions.map(async (element) => {
        element.questions.map(async (item) => {          
          if(item.question_type === "take_photo" || (item.question_type === "yes_no" && (item.yes_image || item.no_image) ) ){              
            var paths = item.value;
            if(item.yes_image != null  &&  item.yes_image != ""){
              paths = item.yes_image;
            }
            if(item.no_image != null  &&  item.no_image != ""){
              paths = item.no_image;
            }            
            if(paths != null && paths != '' && paths.length > 0){  
              index = 0;
              for (const path of paths) {                 
                files.push( {key: `File[${item.form_question_id}][${index}]` , value: path } );   //, base64:item.base64
                index = index + 1;
              }                                                
            }
          }   
        })          
      })      
      
      var postData = new FormData();
      postData.append("form_id", form.form_id);
      postData.append("location_id", location_id);
      postData.append("online_offline", "online");
      form_answers.map((item) => {
        if(item.key != undefined && item.value != undefined){
          postData.append(item.key, item.value);
        }        
      })
      files.map((item) => {
        console.log("post data item", item);          
        if(item.key != undefined && item.value != undefined){       
          console.log("post data key", item.key);                    
          var words = item.value.split('/');
          var ext = words[words.length - 1].split(".");
          console.log("ext", ext);
          console.log("name", words[words.length - 1] );
          postData.append(item.key, {uri:item.value, type:'image/' + ext[1], name:words[words.length - 1]} ); 
        }           
      })        

      var time_zone = RNLocalize.getTimeZone();  
      postData.append("user_local_data[time_zone]", time_zone );
      postData.append("user_local_data[latitude]", currentLocation ? currentLocation.latitude : "0");
      postData.append("user_local_data[longitude]", currentLocation ? currentLocation.longitude : "0");    

      postApiRequestMultipart("forms/forms-submission", postData).then((res) => {
        console.log("res", res);
        dispatch(showNotification({type:'success' , message: res.message , buttonText:'Okay'}));
      }).catch((e) => {
        console.log("Err" , JSON.stringify(e))
      })

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
          onTakeImage={ async(images , type) => {               
              var tmp = [...formQuestions];      
              if(type === "yes"){
                tmp[key].questions[index].yes_image = images; 
              }else{
                tmp[key].questions[index].no_image = images; 
              }               
              setFormQuestions(tmp);
            }}
          onPress={(value , type) => {            
            onValueChangedSelectionView(key, index, value);            
          }}
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
            dispatch({type: SLIDE_STATUS, payload: true});
            setModalVisible(true);            
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
            dispatch({type: SLIDE_STATUS, payload: true});
            setModalVisible(true);            
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
            dispatch({type: SLIDE_STATUS, payload: true});            
            setKey(key);
            setIndex(index);
            setSelectedDate(item.value);
            setIsDateTimeView(true);
            
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
            onPress={(value) => {
              onValueChangedSelectionView(key, index, value);
            } }
          ></TakePhotoForm>
        );
      }else if(item.question_type === "upload_file"){
        return (
          <UploadFileForm key={"upload_form" + index} item={item}  
          onTouchStart={(e, text) => { _onTouchStart(e, text); } } 
          onPress={() => {                        
          }}></UploadFileForm>
        );
      }
      return <View key={"question" + index} ></View>
    }

    return (      
        <View style={styles.container}  
        //onTouchStart={(e) => { setIsInfo(false); }}
        >
          
            <GrayBackground></GrayBackground>
            <Notification></Notification>
            
            <AlertDialog visible={isAlert} message={message}  onModalClose={() => setIsAlert(false)} ></AlertDialog>          
            <DatetimePickerView 
              visible={isDateTimeView}
              value={selectedDate}
              onModalClose={() =>{                
                closeDateTime();
              }}
              close={(date) => {
                confirmDateTime(date);
                closeDateTime();
              }} ></DatetimePickerView>
            
            <Sign visible={isSign}  signature={signature}  
              onOK={handleSignature}  
              onClear= {() => {
                  console.log("------- on clear called ---------")
                  onValueChangedSelectionView(key, index, null);
              }}
              onClose={() => {                  
                console.log("------- on closed ---------")
                  onValueChangedSelectionView(key, index, null);
                  closeSignView(); 
              }}></Sign>
            
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

              
            <GuideInfoView
                visible={isInfo}
                info={bubbleText}
                onModalClose={() => setIsInfo(false)}
              >
            </GuideInfoView>

            {/* {
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
            }                                                 */}
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

