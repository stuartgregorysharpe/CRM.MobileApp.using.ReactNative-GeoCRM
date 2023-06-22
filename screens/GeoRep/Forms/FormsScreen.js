import React, {useEffect, useState, useRef , useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import {FormListItem} from './partial/FormListItem';
import {Provider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFilterData,
  getJsonData,
  getLocalData,
} from '../../../constants/Storage';
import {style} from '../../../constants/Styles';
import Images from '../../../constants/Images';
import {expireToken} from '../../../constants/Helper';
import NavigationHeader from '../../../components/Header/NavigationHeader';
import FormFilterModal from './modal/FormFilterModal';
import {Constants, Strings} from '../../../constants';
import {GetRequestFormListsDAO} from '../../../DAO';
import SearchLocationModal from '../Stock/stock/modal/SearchLocationModal';
import {Notification} from '../../../components/modal/Notification';
import GuideInfoModal from './modal/GuideInfoModal';
import { setCompulsoryForm } from '../../../actions/location.action';

export const FormsScreen = props => {
  
  const navigation = props.navigation;
  const [originalFormLists, setOriginalFormLists] = useState([]);
  const [formLists, setFormLists] = useState([]);  
  const [bubbleText, setBubbleText] = useState({});
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const formFilterModalRef = useRef(null);
  const searchLocationModalRef = useRef(null);
  const guideInfoModalRef = useRef();
  const isCheckin = useSelector(state => state.location.checkIn);
  const [formIds, setFormIds] = useState([]);

  const dispatch = useDispatch();

  const locationIdSpecific = props.route.params
    ? props.route.params.locationInfo
    : null;

  const isShowCustomNavigationHeader = props.isDeeplink;
  let isMount = true;
  
  useEffect(() => {
    isMount = true;
    //_callFormLists(null);
    initFilter();
    initializeFormIds();
    return () => {
      isMount = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {      
      renderHeaderTitle();
      _callFormLists(null);
      initializeFormIds();
    });
    return unsubscribe;
  }, [navigation]);

  const renderHeaderTitle = () => {
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
  }

  const initializeFormIds = async () => {
    var formIds = await getJsonData('@form_ids');
    var formIdLists = [];
    if (formIds != null) {
      formIds.forEach(id => {
        formIdLists.push(id);
      });
    }
    setFormIds(formIdLists);
  };

  const getCompulsoryForm = async lists => {

    if(locationIdSpecific != null){
      var formLists = [...lists];
      const formIds = await getJsonData('@form_ids');
      var flag = false;      
      formLists.forEach(element => {
        if (
          element.compulsory === '1' &&
          (formIds == null ||
            (formIds != null && !formIds.includes(element.form_id)))
        ) {
          flag = true;
        }
      });
      dispatch(setCompulsoryForm(flag));
    }        
  };

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

  const _callFormLists =  useCallback(
    async(filters) => {
      
    if (filters === null) {
      filters = await getFilterData('@form_filter');
    }
    var form_type_id = filters.form_type.map(item => item).join(',');
    var location_id = locationIdSpecific != null ? locationIdSpecific.location_id : '';    

    let param = {
      form_type_id: form_type_id,
      location_id:location_id        
    };

    if ( locationIdSpecific != null  && isCheckin) {
      const checkin_type_id = await getLocalData('@checkin_type_id');
      const checkin_reason_id = await getLocalData('@checkin_reason_id');

      console.log('checkin_type_id', checkin_type_id);
      console.log('checkin_reason_id', checkin_reason_id);

      if (checkin_type_id && checkin_reason_id != '') {
        param.checkin_type_id = checkin_type_id;
      }
      if (checkin_reason_id && checkin_reason_id != '') {
        param.checkin_reason_id = checkin_reason_id;
      }
    }    
    console.log("param ", param);
    
    GetRequestFormListsDAO.find(param)
      .then(res => {        
        setFormLists(res.forms);
        setOriginalFormLists(res.forms);
        getCompulsoryForm(res.forms);        
      })
      .catch(e => {
        expireToken(dispatch, e);
      });
    },
    [isCheckin],
  )



  const _onTouchStart = (e, text) => {
    setBubbleText(text);
	showGuideInfoModal();    
  };

  const onFormFilterModalClosed = ({type, value}) => {
    if (type == Constants.actionType.ACTION_CAPTURE) {
      saveFilter(value.value, value.isClick);
    }
    if (type == Constants.actionType.ACTION_DONE) {
      _callFormLists(filters);
      formFilterModalRef.current.hideModal();
    }
    if (type == Constants.actionType.ACTION_FORM_CLEAR) {
      initFilter();
      _callFormLists(null);
    }
  };

  const onOpenFormItem = (item, locationId) => {
    var routeName = 'DeeplinkFormQuestionsScreen';
    if (!isShowCustomNavigationHeader) {
      routeName = 'FormQuestions';
    }

    props.navigation.navigate(routeName, {
      data: item,
      location_id: locationId,
    });
  };

  const onFormItemPress = async item => {
    if (locationIdSpecific != null) {
      onOpenFormItem(item, locationIdSpecific.location_id);
      return;
    }
    if (item.location_required == 1) {
      if (isCheckin) {
        const checkinLocationId = await getLocalData('@specific_location_id');
        onOpenFormItem(item, checkinLocationId);
      } else {
        setSelectedItem(item);
        searchLocationModalRef.current.showModal();
      }
    } else {
      onOpenFormItem(item, '');
    }
  };

  const onSearchLocation = async ({type, value}) => {
    if (type == Constants.actionType.ACTION_NEXT) {
      if (value && value.locationId) {
        if (selectedItem) {
          onOpenFormItem(selectedItem, value.locationId);
        }
      }
    }
  };

  const showGuideInfoModal = () => {
	if(guideInfoModalRef.current){
		guideInfoModalRef.current.showModal();
	}
  }

  const hideGuideInfoModal = () => {
	  if(guideInfoModalRef.current){
		  guideInfoModalRef.current.hideModal();
	  }
  }

  const renderItems = (item, index) => {
    return (
      <View>
        <View>
          <FormListItem
            key={index}
            item={item}
            isSubmitted={formIds.includes(item.form_id)}
            onItemPress={() => {
              onFormItemPress(item);
            }}
            onTouchStart={(e, text) => _onTouchStart(e, text)}></FormListItem>
        </View>
        {formLists.length - 1 == index && <View style={{height: 50}}></View>}
      </View>
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Notification />

        {isShowCustomNavigationHeader && (
          <NavigationHeader
            showIcon={true}
            title={'Forms'}
            onBackPressed={() => {
              props.navigation.goBack();
            }}
          />
        )}

        <FormFilterModal
          title={Strings.Forms.Filter_Your_Search}
          clearText={Strings.Forms.Clear_Filters}
          filters={filters}
          ref={formFilterModalRef}
          onButtonAction={onFormFilterModalClosed}
        />

        <SearchBar
          isFilter={true}
          haveFilter={
            filters && filters.form_type && filters.form_type.length > 0
              ? true
              : false
          }
          animation={() => {
            formFilterModalRef.current.showModal();
          }}
          onSearch={text => _onSearch(text)}></SearchBar>

        <FlatList
          style={{marginHorizontal: 10, marginTop: 0, marginBottom: 0}}
          removeClippedSubviews={false}
          //maxToRenderPerBatch={10}
          initialNumToRender={formLists.length}
          data={formLists}
          renderItem={({item, index}) => renderItems(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
		
		<GuideInfoModal
			ref={guideInfoModalRef}
			info={bubbleText}        
			onModalClose={() => hideGuideInfoModal()}
		/>
		        
        <SearchLocationModal
          ref={searchLocationModalRef}
          title={Strings.Search_Location}
          onButtonAction={onSearchLocation}
          isSkipLocationIdCheck={true}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
});
