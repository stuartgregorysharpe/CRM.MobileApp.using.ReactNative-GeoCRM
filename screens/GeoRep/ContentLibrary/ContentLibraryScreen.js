import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text , PermissionsAndroid, Platform , TouchableOpacity ,Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Searchbar from '../../../components/SearchBar';
import Card from '../../../components/Card';
import { BG_COLOR } from '../../../constants/Colors';
import { BACK_ICON_STATUS, CHANGE_LIBRARY_CHILD_STATUS } from '../../../actions/actionTypes';
import Fonts from '../../../constants/Fonts';
import { getBaseUrl, getToken } from '../../../constants/Storage';
import { downloadPDF, getContentLibrary } from '../../../actions/contentLibrary.action';
import RNFS, { DownloadFileOptions , DocumentDirectoryPath , downloadFile} from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';
import FileViewer from "react-native-file-viewer";
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';

//import FileOpener from 'react-native-file-opener3';
//import FileOpener from 'react-native-file-opener';
//const FileOpener = require('react-native-file-opener');

export default function ContentLibraryScreen(props) {

  //const showLibraryChild = useSelector(state => state.rep.showLibraryChild);
  const dispatch = useDispatch();
  const [childList, setChildList] = useState({});
  const [libraryLists, setLibraryLists] = useState([]);
  const [searchLibraryLists , setSearchLibraryLists] = useState([]);  
  const FileOpener = require('react-native-file-opener');
  const [isBack, setIsBack] = useState( props.route.params && props.route.params.isBack ? props.route.params.isBack : false);  
  const [title,setTitle] = useState("Content Library");
  //const FileOpener = require('react-native-file-opener3');

 // console.log("content library", screenProps);

  useEffect(() => {    
    //setIsBack(props.route.params.isBack);
    props.navigation.setOptions({           
      headerTitle:(props) =>{
        return(<TouchableOpacity                   
           onPress={
          () =>{
            setIsBack(false);         
            setTitle("Content Library");
          }}>            
          <View style={style.headerTitleContainerStyle}>            
              {
                isBack &&
                <Image
                  resizeMethod='resize'  
                  style={{width:15,height:20, marginRight:5}}
                  source={Images.backIcon}
                />
              }              
          <Text style={style.headerTitle} > {title} </Text>
        </View></TouchableOpacity>)
      },            
      tabBarStyle: {
        position: 'absolute',
        height: 50,      
        paddingBottom: Platform.OS == "android" ? 5 : 0,          
        backgroundColor: "#fff",
      },
    });
  }, [isBack])

  useEffect(() => {             
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

  // const requestExternalStoreageRead = async() =>{
  //   try {
  //       const granted = await PermissionsAndroid.request(
  //                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //                 {
  //                     'title': 'Cool App ...',
  //                     'message': 'App needs access to external storage'
  //                 }
  //       );

  //       return granted == PermissionsAndroid.RESULTS.GRANTED
  //   } 
  //   catch (err) {
  //     //Handle this error
  //     return false;
  //   }
  // }

  const showChildItem = (index) => {
    dispatch({type: CHANGE_LIBRARY_CHILD_STATUS, payload: true})
    setChildList(searchLibraryLists[index]);
    setIsBack(true);
    setTitle(searchLibraryLists[index].folder_name);

    //dispatch({type: BACK_ICON_STATUS, payload: true})
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
    if(Platform.OS == 'android'){
      if(title.toLowerCase().includes('.png') || title.toLowerCase().includes('.jpg') || title.toLowerCase().includes('.jpeg')){
        return "image/*"; // + ext;  
      }
      if(title.toLowerCase().includes('.mp4') || title.toLowerCase().includes('.mov') || title.toLowerCase().includes('.flv')){
        return "video/" + ext;  
      }
      return "application/" + ext;
    }else{
      
      // <string>com.microsoft.powerpoint.ppt</string>
      // <string>public.item</string>
      // <string>com.microsoft.word.doc</string>
      // <string>com.adobe.pdf</string>
      // <string>com.microsoft.excel.xls</string>
      // <string>public.image</string>
      // <string>public.content</string>
      // <string>public.composite-content</string>
      // <string>public.archive</string>
      // <string>public.audio</string>
      // <string>public.movie</string>
      // <string>public.text</string>
      // <string>public.data</string>
      if(title.toLowerCase().includes('.png') || title.toLowerCase().includes('.jpg') || title.toLowerCase().includes('.jpeg')){
        return "public.image";  
      }
      if(title.toLowerCase().includes('.mp4') || title.toLowerCase().includes('.mov') || title.toLowerCase().includes('.flv')){
        return "public.movie";
      }
      return  "public.data";
    }    
  }

  openFile = (path, type) => {
    console.log(type );
    if(Platform.OS == "android"){      
      FileOpener.open(
          path,
          type
      ).then((msg) => {
          console.log('success!!')
      },(e) => {
          console.log('error!!', e)
      });  
    }else{
      const paths = FileViewer.open(path) // absolute-path-to-my-local-file.
      .then(() => {
        console.log("success");
        // success
      })
      .catch((error) => {
        // error
      });
    }
    
  }

  if (isBack) {

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
                    //const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;

                    RNFS.exists(path).then((res) =>{
                      if(res){
                        console.log("file exist", path);
                        openFile(path, getMineType(item.filename, ext));
                      }else{
                        console.log("no file exist", item.file_path);
                        downloadPDF(item.file_path, fileName , ext)
                        .then((res) =>{
                          console.log(res);
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