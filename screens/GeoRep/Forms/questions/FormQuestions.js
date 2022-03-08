import React, { useEffect , useState } from 'react';
import { SafeAreaView, Text, View, Dimensions, StyleSheet ,FlatList ,TouchableOpacity , Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import { getFormQuestions } from '../../../../actions/forms.action';
import { TextForm } from '../../../../components/shared/TextForm';
import { YesNoForm } from '../../../../components/shared/YesNoForm';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Images from '../../../../constants/Images';
import { style } from '../../../../constants/Styles';
import { GroupTitle } from './partial/GroupTitle';

export const FormQuestions = (props) =>{

    const form = props.route.params.data;
    const [formQuestions, setFormQuestions] = useState(null);

    useEffect(() => {    
        if (props.screenProps) {
          props.screenProps.setOptions({            
            headerTitle:() =>{
              return(<TouchableOpacity                     
                 onPress={
                () =>{
                  if(props.navigation.canGoBack()){              
                    props.navigation.goBack();              
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
            }
          });
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

    const renderQuestion = (item) =>{
      if(item.question_type === "text"){
        return (
          <TextForm item={item}></TextForm>
        );
      }else if(item.question_type === "yes_no"){
        return (
          <YesNoForm item={item}></YesNoForm>
        );
      }
      return <View><Text>{item.question_type}</Text></View>
    }

    return (
        <View style={styles.container}>
            {/* header title */}
            <View style={{flexDirection:'row', padding:10}}>
              <View style={{flex:1}}>
                <Text style={styles.formTitleStyle}>{form.form_name}</Text>
              </View>
              <TouchableOpacity style={{alignItems:'flex-end', padding:5}}>
                <Text style={styles.clearTextStyle}>Clear All Answers</Text>
              </TouchableOpacity>                            
            </View>

            <ScrollView>
              {
                formQuestions && formQuestions.map((form) => {
                  return (
                    <View>
                      <GroupTitle title={form.question_group}></GroupTitle>                      
                      {
                        form.questions.map((item) => {
                          return renderQuestion(item);
                        })
                      }
                    </View>
                  )
                })
              }
            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:3,
    },

    formTitleStyle:{
      fontSize:16,
      color:Colors.blackColor,
      fontFamily: Fonts.primaryBold      
    },

    clearTextStyle:{
      fontSize:14,
      fontFamily:Fonts.secondaryMedium,
      color:Colors.selectedRedColor
    }

})

