import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Searchbar from '../../../components/SearchBar';
import Card from '../../../components/Card';
import { BG_COLOR } from '../../../constants/Colors';
import { CHANGE_LIBRARY_CHILD_STATUS } from '../../../actions/actionTypes';
import Fonts from '../../../constants/Fonts';
import { getBaseUrl, getToken } from '../../../constants/Storage';
import { downloadPDF, getContentLibrary } from '../../../actions/contentLibrary.action';
import RNFS, { DownloadFileOptions , DocumentDirectoryPath , downloadFile} from 'react-native-fs';
//import FileOpener from 'react-native-file-opener';
//const FileOpener = require('react-native-file-opener');

export default function ContentLibraryScreen(props) {

  const showLibraryChild = useSelector(state => state.rep.showLibraryChild);
  const dispatch = useDispatch();
  const [childList, setChildList] = useState({});
  const [libraryLists, setLibraryLists] = useState([]);
  const [searchLibraryLists , setSearchLibraryLists] = useState([]);  
  const FileOpener = require('react-native-file-opener');

  useEffect(() => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        title: "Content Library"
      });
    }
    loadList();
  } , []);  

  loadList = async() => {    
    var base_url = await getBaseUrl();
    var token = await getToken();
    if(base_url != null && token != null){
      let params = {};      
      getContentLibrary(base_url, token,  params)
      .then(res => {        
        setLibraryLists(res);
        setSearchLibraryLists(res);
        
      })
      .catch(error=>{
        setLibraryLists([]);
        setSearchLibraryLists([]);
      });
    }    
  }

  const showChildItem = (index) => {
    dispatch({type: CHANGE_LIBRARY_CHILD_STATUS, payload: true})
    setChildList(searchLibraryLists[index]);
  }
  const getResourceIcon = (title) =>{
    if(title.toLowerCase().includes('.png') || title.toLowerCase().includes('.jpg') || title.toLowerCase().includes('.jpeg')){
      return "Wallpaper";  
    }
    if(title.toLowerCase().includes('.mp4') || title.toLowerCase().includes('.mov') || title.toLowerCase().includes('.flv')){
      return "Video_Library";  
    }
    return "Description";
  }

  const getMineType = (title, ext) =>{
    if(title.toLowerCase().includes('.png') || title.toLowerCase().includes('.jpg') || title.toLowerCase().includes('.jpeg')){
      return "image/" + ext;  
    }
    if(title.toLowerCase().includes('.mp4') || title.toLowerCase().includes('.mov') || title.toLowerCase().includes('.flv')){
      return "video/" + ext;  
    }
    return "application/" + ext;
  }

  openFile = (path, type) => {
    console.log(type );
    FileOpener.open(
        path,
        type 
    ).then((msg) => {
        console.log('success!!')
    },(e) => {
        console.log('error!!', e)
    });  
  }


  if (showLibraryChild) {

    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={{ fontSize: 18, color: '#000', fontFamily: Fonts.secondaryBold, marginBottom: 10 }}>{childList.folder_name}</Text>
            {childList.files.map((item, index) => (              
               <Card 
                icon={getResourceIcon(item.filename)} title={item.filename} 
                subtitle={item.file_size + " Modified on " + item.modified_date} key={index}
                onPress={() => {
                  var ext = "";
                  var fileName = "";
                  var tmp = item.filename.split(".");
                  
                  if(tmp.length == 2){                                      
                    fileName = tmp[0];
                    ext = tmp[1];
                    const path = Platform.OS === 'ios' ?  `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}` :  `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}`;
                    RNFS.exists(path).then((res) =>{
                      if(res){
                        console.log("file exist", path);
                        openFile(path, getMineType(item.filename, ext));
                      }else{
                        downloadPDF(item.file_path, fileName , ext)
                        .then((res) =>{
                          if(res && res.statusCode === 200 && res.bytesWritten > 0 ){
                            openFile(path,getMineType(item.filename, ext));  
                          }else{                     
                            console.log(res);
                          }                    
                        })
                        .catch((error) =>{
                          console.log(error);
                        })
                      }
                    }).catch((error) =>{
                      console.log("error", error);
                    });
                    
                    
                                        
                  }                  
                }}
                 />              
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>

        <Searchbar onSearch={(text) =>{
          var tmp = [];
          libraryLists.forEach(element => {
            if(element.folder_name.toLowerCase().includes(text.toLowerCase())){
              tmp.push(element);
            }else{
              var flag = false;
              element.files.forEach(e => {
                if(e.filename.toLowerCase().includes(text.toLowerCase())){
                  flag = true;
                }
              })
              if(flag){
                tmp.push(element);
              }
            }
          });
          setSearchLibraryLists(tmp);
        }} />
        
        <View style={styles.innerContainer}>
          {searchLibraryLists.map((item, index) => (

            <Card title={item.folder_name} number={item.file_count} key={index} onPress={showChildItem.bind(null, index)}/>            
            
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: BG_COLOR
  },
  innerContainer: {
    padding: 10
  }
})