import React, { useEffect, useState, Fragment } from 'react';
import {  View, StyleSheet, ScrollView ,TouchableOpacity , Text } from 'react-native';
import Searchbar from '../../../components/SearchBar';
import Card from '../../../screens/GeoRep/ContentLibrary/partial/Card';
import Colors from '../../../constants/Colors';
import { getWebLinks } from '../../../actions/weblinks.action';
import { getBaseUrl, getToken } from '../../../constants/Storage';
import { style } from '../../../constants/Styles';
import { expireToken } from '../../../constants/Helper';
import { useDispatch } from 'react-redux';

export default function WebLinksScreen(props) {

  const [lists, setLists] = useState([]);
  const [searchLists, setSearchLists] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    var screenProps = props.screenProps;    
    if(screenProps === undefined){
      screenProps = props.navigation;
    }
    if (screenProps) {
      screenProps.setOptions({        
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={
              () => {}}>
            <View style={style.headerTitleContainerStyle}>                
              <Text style={style.headerTitle} >Web Links</Text>
            </View></TouchableOpacity>)
        }
      });      
    }
  });

  useEffect(() => {             
    loadList();
  }, []);

  loadList = async() => {
    var base_url = await getBaseUrl();
    var token = await getToken();
    if(base_url != null && token != null){
      let params = {};      
      getWebLinks( token,  params)
      .then(res => {        
        setLists(res);
        setSearchLists(res);
      })
      .catch(error=>{
        setLists([]);
        expireToken(dispatch,error);
      });
    }    
  }
    
  return (   
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

        <Searchbar 
        initVal=""
        onSearch={(text) =>{
          var tmp = [];
          lists.forEach(element => {
            if(element.weblink_name.toLowerCase().includes(text.toLowerCase())){
              tmp.push(element);
            }
          });
          setSearchLists(tmp);
        }} />

        <View style={styles.innerContainer}>
          {searchLists.map((item, index) => (
            <Fragment key={index}>              
              {<Card image={item.image} title={item.weblink_name}  onPress={()=>{
                props.navigation.navigate("WebViewScreen", {'data' : item});
              }} />}
            </Fragment>
          ))}
        </View>
      </ScrollView>
    
  )
}


const styles = StyleSheet.create({
  container: {   
    minHeight: '100%',
    backgroundColor: Colors.bgColor,        
  },
  innerContainer: {
    padding: 10
  }
})