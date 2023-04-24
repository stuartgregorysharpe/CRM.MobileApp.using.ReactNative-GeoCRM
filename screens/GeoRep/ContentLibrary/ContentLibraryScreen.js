import React, {useEffect, useState} from 'react';
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
import { Notification } from '../../../components/modal/Notification';

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

  useEffect(() => {
    var screenProps = props.screenProps;
    if (screenProps === undefined) {
      screenProps = props.navigation;
    }
    console.log('screenPropsscreenProps', screenProps);
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
    console.log('is back', isBack);

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

      // tabBarStyle: {
      //   position: 'absolute',
      //   height: 50,
      //   paddingBottom: Platform.OS == "android" ? 5 : 0,
      //   backgroundColor: "#fff",
      //},
    });
  };

  loadList = async () => {
    GetRequestContentlibraryDAO.find()
      .then(res => {
        setLibraryLists(res.folders);
        setSearchLibraryLists(res.folders);
      })
      .catch(error => {
        expireToken(dispatch, error);
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

  const getMineType = (title, ext) => {
    if (Platform.OS == 'android') {
      if (
        title.toLowerCase().includes('.png') ||
        title.toLowerCase().includes('.jpg') ||
        title.toLowerCase().includes('.jpeg')
      ) {
        return 'image/*'; // + ext;
      }
      if (
        title.toLowerCase().includes('.mp4') ||
        title.toLowerCase().includes('.mov') ||
        title.toLowerCase().includes('.flv')
      ) {
        return 'video/' + ext;
      }
      if(
        title.toLowerCase().includes('.csv') ||
        title.toLowerCase().includes('.xlsx')
      ){
        return 'application/xls';
      }
      return 'application/' + ext;
    } else {
      if (
        title.toLowerCase().includes('.png') ||
        title.toLowerCase().includes('.jpg') ||
        title.toLowerCase().includes('.jpeg')
      ) {
        return 'public.image';
      }
      if (
        title.toLowerCase().includes('.mp4') ||
        title.toLowerCase().includes('.mov') ||
        title.toLowerCase().includes('.flv')
      ) {
        return 'public.movie';
      }
      return 'public.data';
    }
  };

  const openFile = (path, type) => {       
    const paths = FileViewer.open(path)
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.log("failed => ", error.toString());
        });
  };

  if (isBack) {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
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
                          console.log('file exist', path);
                          console.log('ext', ext , getMineType(item.filename, ext));
                          openFile(path, getMineType(item.filename, ext));
                        } else {
                          console.log('no file exist', item.file_path);
                          console.log("ext", ext);
                          downloadPDF(item.file_path, fileName, ext)
                            .then(res => {
                              console.log(res);
                              if (
                                res &&
                                res.statusCode === 200 &&
                                res.bytesWritten > 0
                              ) {
                                openFile(path, getMineType(item.filename, ext));
                              } else {
                                console.log(res);
                              }
                            })
                            .catch(error => {
                              console.log(error);
                            });
                        }
                      })
                      .catch(error => {
                        console.log('error', error);
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

        <Notification />

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
