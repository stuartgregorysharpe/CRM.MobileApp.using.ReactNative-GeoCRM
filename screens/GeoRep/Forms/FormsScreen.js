import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import {FormFilterView} from './partial/FormFilterView';
import {FormListItem} from './partial/FormListItem';
import {Provider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getFilterData} from '../../../constants/Storage';
import {style} from '../../../constants/Styles';
import Images from '../../../constants/Images';
import FilterOptionsModal from '../../../components/modal/FilterOptionsModal';
import {GuideInfoView} from './partial/GuideInfoView';
import {expireToken} from '../../../constants/Helper';
import {Notification} from '../../../components/modal/Notification';
import {getApiRequest} from '../../../actions/api.action';
import NavigationHeader from '../../../components/Header/NavigationHeader';
import {useNavigation} from '@react-navigation/native';
import { Colors, Constants } from '../../../constants';

let isInfoWindow = false;

export default function FormsScreen(props) {
  const [originalFormLists, setOriginalFormLists] = useState([]);
  const [formLists, setFormLists] = useState([]);
  const [isInfo, setIsInfo] = useState(false);

  const [bubbleText, setBubbleText] = useState({});
  const [isFilter, setIsFilter] = useState(false);
  const locationIdSpecific = props.route.params
    ? props.route.params.locationInfo
    : null;
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState(null);

  const isShowCustomNavigationHeader = props.isDeeplink;
  
 const navigationMain = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (locationIdSpecific) {
                  props.navigation.navigate('CRM', {
                    screen: 'LocationSpecificInfo',
                    params: {data: locationIdSpecific},
                  });
                }
              }}>
              <View style={style.headerTitleContainerStyle}>
                {locationIdSpecific !== null && (
                  <Image
                    resizeMethod="resize"
                    style={{width: 15, height: 20, marginRight: 5}}
                    source={Images.backIcon}
                  />
                )}
                <Text style={style.headerTitle}>Forms</Text>
              </View>
            </TouchableOpacity>
          );
        },
      });
    }
  });

  useEffect(() => {
    _callFormLists(null);
    initFilter();
  }, []);

  const initFilter = async () => {
    var savedFilters = await getFilterData('@form_filter');
    setFilters(savedFilters);
  };

  const saveFilter = (value, isChecked) => {
    var data = [...filters.form_type];
    var index = data.indexOf(value);
    if (index !== -1) {
      if (!isChecked) {
        data.splice(index, 1);
      }
    } else {
      if (isChecked) {
        data.push(value);
      }
    }
    filters.form_type = data;
    setFilters(filters);
    setOptions([]);
    var tmp = [...options];
    setOptions(tmp);
  };

  const _onSearch = text => {
    var tmp = [...originalFormLists];
    tmp = tmp.filter(element =>
      element.form_name.toLowerCase().includes(text.toLowerCase()),
    );
    setFormLists(tmp);
  };

  const _callFormLists = async filters => {
    if (filters === null) {
      filters = await getFilterData('@form_filter');      
    }
    var form_type_id = filters.form_type.map(item => item).join(',');
    let param = {
      form_type_id: form_type_id,
      location_id:
        locationIdSpecific != null ? locationIdSpecific.location_id : '',
    };
    getApiRequest('forms/forms-list', param)
      .then(res => {
        setFormLists(res.forms);
        setOriginalFormLists(res.forms);        
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
  };

  const _onTouchStart = (e, text) => {
 
    setBubbleText(text);
    setIsInfo(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        {isShowCustomNavigationHeader && (
          <NavigationHeader
            showIcon={true}
            title={'Forms'}
            onBackPressed={() => {
              props.navigation.goBack();
            }}
          />
        )}
        <Notification></Notification>
        <FormFilterView
          visible={isFilter}
          onModalHide={() => {
            consolelog('modal hide');
          }}
          apply={() => {
            console.log('DDfilters', filters);
            _callFormLists(filters);
          }}
          onItemClicked={options => {
            setOptions(options);
            setIsFilter(false);
            setTimeout(() => {
              setModalVisible(true);
            }, 500);
          }}
          onModalClose={() => {
            setIsFilter(false);
          }}
          close={() => {
            setIsFilter(false);
          }}></FormFilterView>

        <FilterOptionsModal
          clearTitle={'Close'}
          modaVisible={modalVisible}
          options={options}
          filters={filters}
          selectedType={'form_type'}
          fieldType={'form_type'}
          onClose={() => {
            setModalVisible(false);
            setTimeout(() => {
              setIsFilter(true);
            }, 500);
          }}
          onValueChanged={(value, isChecked) => {
            console.log(value, isChecked);
            saveFilter(value, isChecked);
          }}></FilterOptionsModal>

        <SearchBar
          isFilter={true}
          haveFilter={
            filters && filters.form_type && filters.form_type.length > 0
              ? true
              : false
          }
          animation={() => {
            setIsFilter(true);
          }}
          onSearch={text => _onSearch(text)}></SearchBar>

        <FlatList
          style={{margin: 10}}
          removeClippedSubviews={false}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          data={formLists}
          renderItem={({item, index}) => (
            <View>
              <FormListItem
                key={index}
                item={item}
                onItemPress={() => {
                  if (!isInfoWindow) {
                 
                    var routeName = "DeeplinkFormQuestionsScreen"
                    if(!isShowCustomNavigationHeader){
                      routeName = "FormQuestions"
                    }
                    
                    props.navigation.navigate(routeName, {
                      data: item,
                      location_id:
                        locationIdSpecific != null
                          ? locationIdSpecific.location_id
                          : '',
                    });
                  } else {
                    isInfoWindow = false;
                  }
                }}
                onTouchStart={(e, text) =>
                  _onTouchStart(e, text)
                }></FormListItem>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <GuideInfoView
          visible={isInfo}
          info={bubbleText}
          onModalClose={() => setIsInfo(false)}></GuideInfoView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:40,
  },
  bubbleTextStyle: {
    backgroundColor: Colors.bgColor,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
  },
});
