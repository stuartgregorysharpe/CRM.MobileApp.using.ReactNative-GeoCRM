import React, { useEffect, useState, Fragment } from 'react';
import {  View, StyleSheet, ScrollView } from 'react-native';

import Searchbar from '../../../components/SearchBar';
import Card from '../../../screens/GeoRep/ContentLibrary/partial/Card';
import { BG_COLOR } from '../../../constants/Colors';
import { getWebLinks } from '../../../actions/weblinks.action';
import { getBaseUrl, getToken } from '../../../constants/Storage';

export default function WebLinksScreen(props) {

  const [lists, setLists] = useState([]);
  const [searchLists, setSearchLists] = useState([]);

  useEffect(() => {    
    if (props.screenProps) {
      props.screenProps.setOptions({
        title: "Web Links"
      });
    }
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
      });
    }    
  }
    
  return (   
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

        <Searchbar onSearch={(text) =>{
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
              {/* {index < 2 && <Card icon={item.icon} title={item.weblink_name}  />} */}
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
    backgroundColor: BG_COLOR,        
  },
  innerContainer: {
    padding: 10
  }
})