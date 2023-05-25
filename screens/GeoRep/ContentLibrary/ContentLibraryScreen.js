import React, {useEffect, useState , useRef} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Searchbar from '../../../components/SearchBar';
import Card from './partial/Card';
import Colors from '../../../constants/Colors';
import {CHANGE_LIBRARY_CHILD_STATUS} from '../../../actions/actionTypes';
import Fonts from '../../../constants/Fonts';
import {
  downloadPDF,
} from '../../../actions/contentLibrary.action';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {style} from '../../../constants/Styles';
import Images from '../../../constants/Images';
import {expireToken} from '../../../constants/Helper';
import {GetRequestContentlibraryDAO} from '../../../DAO';
import AlertModal from '../../../components/modal/AlertModal';
import LoadingBar from '../../../components/LoadingView/loading_bar';

export default function ContentLibraryScreen(props) {
  
  const dispatch = useDispatch();
  const [childList, setChildList] = useState({});
  const [libraryLists, setLibraryLists] = useState([]);
  const [searchLibraryLists, setSearchLibraryLists] = useState([]);  
  const [isBack, setIsBack] = useState(
    props.route.params && props.route.params.isBack
      ? props.route.params.isBack
      : false,
  );
  const [title, setTitle] = useState('Content Library');
  const alertModalRef = useRef();
  const loadingBarRef = useRef();

  useEffect(() => {    
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }    
    if (screenProps) {
      renderHeader(screenProps);
    }
  });

  useEffect(() => {
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }
    renderHeader(screenProps);
  }, [isBack]);

  useEffect(() => {
    loadList();
  }, []);

  const renderHeader = screenProps => {
    screenProps.setOptions({
      headerTitle: props => {
        return (
          <TouchableOpacity
            onPress={() => {
              setIsBack(false);
              setTitle('Content Library');
            }}>
            <View style={style.headerTitleContainerStyle}>
              {isBack && (
                <Image
                  resizeMethod="resize"
                  style={{width: 15, height: 20, marginRight: 5}}
                  source={Images.backIcon}
                />
              )}
              <Text style={style.headerTitle}> {title} </Text>
            </View>
          </TouchableOpacity>
        );
      },
    });
  };

  loadList = async () => {
    GetRequestContentlibraryDAO.find()
      .then(res => {
        setLibraryLists(res.folders);
        setSearchLibraryLists(res.folders);
      })
      .catch(error => {
        expireToken(dispatch, error , alertModalRef);
        setLibraryLists([]);
        setSearchLibraryLists([]);
      });
  };

  const showChildItem = index => {
    console.log('clicked');
    dispatch({type: CHANGE_LIBRARY_CHILD_STATUS, payload: true});
    setChildList(searchLibraryLists[index]);
    setIsBack(true);
    setTitle(searchLibraryLists[index].folder_name);
  };

  const getResourceIcon = title => {
    if (
      title.toLowerCase().includes('.png') ||
      title.toLowerCase().includes('.jpg') ||
      title.toLowerCase().includes('.jpeg')
    ) {
      return 'Wallpaper';
    }
    if (
      title.toLowerCase().includes('.mp4') ||
      title.toLowerCase().includes('.mov') ||
      title.toLowerCase().includes('.flv')
    ) {
      return 'Video_Library';
    }
    return 'Description';
  };

  const openFile = (path, type) => {       
    const paths = FileViewer.open(path , { showOpenWithDialog: true } )
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.log("failed => ", error.toString());
          if(alertModalRef.current){
            alertModalRef.current.alert(error.toString());
          }
        });
  };

  const onFilePressed = (item) => {
    
    var ext = '';
    var fileName = '';
    var tmp = item.filename.split('.');

    if (tmp.length == 2) {

      fileName = tmp[0];
      ext = tmp[1];
      const path =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/${fileName}.${ext}`
          : `${RNFS.ExternalDirectoryPath}/${fileName}.${ext}`;
          
      RNFS.exists(path)
        .then(res => {
          if (res) {            
            openFile(path, '');
          } else {
            console.log('no file exist', item.file_path);            
            showLoadingBar();
            downloadPDF(item.file_path, fileName, ext)
              .then(res => {
                
                if (
                  res &&
                  res.statusCode === 200 &&
                  res.bytesWritten > 0
                ) {
                  hideLoadingBar(path);
                  
                } else {
                  console.log(res);
                  hideLoadingBar('');
                }
              })
              .catch(error => {
                console.log(error);
                hideLoadingBar('');
              });
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }

  const showLoadingBar = () => {
    if(loadingBarRef.current){
      loadingBarRef.current.showModal();
    }
  }
  const hideLoadingBar = ( path = '') => {
    const delay = Platform.OS == 'ios' ? 500 : 0;
    setTimeout(() => {
      if(loadingBarRef.current){
        loadingBarRef.current.hideModal();
        if(path != ''){
          setTimeout(() => {
            openFile(path, '');
          }, delay)          
        }
      }
    }, 300);    
  }

  const renderMainPage = () => {
    return (
      <View>
        <Searchbar
          initVal=""
          onSearch={text => {
            var tmp = [];
            libraryLists.forEach(element => {
              if (
                element.folder_name.toLowerCase().includes(text.toLowerCase())
              ) {
                tmp.push(element);
              } else {
                var flag = false;
                element.files.forEach(e => {
                  if (e.filename.toLowerCase().includes(text.toLowerCase())) {
                    flag = true;
                  }
                });
                if (flag) {
                  tmp.push(element);
                }
              }
            });
            setSearchLibraryLists(tmp);
          }}
        />

        <View style={styles.innerContainer}>
          {searchLibraryLists.map((item, index) => (
            <Card
              title={item.folder_name}
              number={item.file_count}
              key={index}
              onPress={showChildItem.bind(null, index)}
            />
          ))}
        </View>

      </View>
    )
  }

  const renderDetailsPage = () => {
    return (
      <View style={styles.innerContainer}>  
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontFamily: Fonts.secondaryBold,
                marginBottom: 10,
              }}>
              {childList.folder_name}
            </Text>
            {childList.files.map((item, index) => (
              <Card
                icon={getResourceIcon(item.filename)}
                title={item.filename}
                subtitle={item.file_size + ' Modified on ' + item.modified_date}
                key={index}
                onPress={() => {
                  onFilePressed(item);                 
                }}
              />
            ))}
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>        
        
        <AlertModal ref={alertModalRef} />

        <LoadingBar ref={loadingBarRef}/>

        {isBack ? renderDetailsPage() : renderMainPage()}                
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: Colors.bgColor,
  },
  innerContainer: {
    padding: 10,
  },
});
