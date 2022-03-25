import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList,Image, TouchableOpacity, Platform } from 'react-native';
import { getFormLists } from '../../../actions/forms.action';
import SearchBar from '../../../components/SearchBar';
import { FormFilterView } from './partial/FormFilterView';
import { FormListItem } from './partial/FormListItem';
import { Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { SLIDE_STATUS } from '../../../actions/actionTypes';
import GrayBackground from '../../../components/GrayBackground';
import { getFilterData } from '../../../constants/Storage';
import { style } from '../../../constants/Styles';
import Images from '../../../constants/Images';
import FilterOptionsModal from '../../../components/modal/FilterOptionsModal';
import { GuideInfoView } from './partial/GuideInfoView';

let isInfoWindow = false;

export default function FormsScreen(props) {
  
  const [originalFormLists, setOriginalFormLists] = useState([]);
  const [formLists, setFormLists] = useState([]);
  const [isInfo, setIsInfo] = useState(false);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [bubbleText, setBubleText] = useState({});
  const [isFilter, setIsFilter] = useState(false);
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);
  const locationIdSpecific = props.route.params ? props.route.params.locationInfo : null;  
  const [modalVisible, setModalVisible ] = useState(false);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        headerTitle: () => {
          return (<TouchableOpacity
            onPress={ () => { 
              if(locationIdSpecific){
                props.navigation.navigate('CRM', {'screen': 'LocationSpecificInfo',  params : {'data': locationIdSpecific}});
              }              
            }}>
            <View style={style.headerTitleContainerStyle}>
              {
                locationIdSpecific !== null &&
                <Image
                  resizeMethod='resize'
                  style={{width:15,height:20, marginRight:5}}
                  source={Images.backIcon}
                />
              }
              <Text style={style.headerTitle} >Forms</Text>
            </View></TouchableOpacity>)
        }
      });
    }
  });

  useEffect(() => {
    _callFormLists(null);
    initFilter();
  }, []);

  const initFilter = async() => {
    var savedFilters = await getFilterData("@form_filter");
    setFilters(savedFilters);
  }

  const saveFilter = (value, isChecked) => {
    var data = [...filters.form_type];
    var index = data.indexOf(value);
    if(index !== -1){
        if(!isChecked){      
          data.splice(index, 1)
        }
    }else{
        if(isChecked){
          data.push(value);
        }
    }
    filters.form_type = data;
    setFilters(filters);
    setOptions([]); 
    var tmp = [...options];
    setOptions(tmp);
  }

  const _onSearch = (text) => {
    var tmp = [...originalFormLists];
    tmp = tmp.filter(element => element.form_name.toLowerCase().includes(text.toLowerCase()));
    setFormLists(tmp);
  }

  const _callFormLists = async (filters) => {
    if (filters === null) {
      filters = await getFilterData('@form_filter');
      console.log("store filters", filters)
    }
    getFormLists('', locationIdSpecific ? locationIdSpecific : '', filters).then((res) => {
      setFormLists(res);
      setOriginalFormLists(res);
    }).catch((e) => {
      console.log(e)
    })
  }

  const _onTouchStart = (e, text) => {    
    // isInfoWindow = true;
    // setX(e.pageX);
    // setY(e.pageY);
    // setLocationX(e.locationX);
    // setLocationY(e.locationY);
    console.log("------------- " , text)
    setBubleText(text);
    // setTimeout(() => {
    //   setIsInfo(true);
    // }, 100)

    setIsInfo(true);

  }

  const getShift = () => {
    if (Platform.OS === 'ios') {
      return 65;
    }
    return 35;
  }

  return (
    <Provider>
      <View style={styles.container} 
        //onTouchStart={(e) => { setIsInfo(false); }} 
        >

        {/* <GrayBackground></GrayBackground>
        {
          crmStatus && isFilter &&
          <FormFilterView
            apply={(filters) => {
              _callFormLists(filters);
            }}
            close={() => {
              setIsFilter(false);
              dispatch({ type: SLIDE_STATUS, payload: false });
            }} ></FormFilterView>
        } */}

        <FormFilterView
          visible={isFilter}
          onModalHide={() => {
            consolelog("modal hide")
          } }
          apply={() => {
            console.log("DDfilters" ,filters);
            _callFormLists(filters);
          }}
          onItemClicked={(options) => {                        
              setOptions(options);              
              setIsFilter(false)              
              setTimeout(() => {
                setModalVisible(true);  
              },500);
          }}
          onModalClose={() => {
            setIsFilter(false)
          }}
          close={() => {
            setIsFilter(false);
            //dispatch({ type: SLIDE_STATUS, payload: false });
          }} ></FormFilterView>
        
        <FilterOptionsModal
            clearTitle={"Close"}
            modaVisible={modalVisible}         
            options={options} 
            filters={filters}
            selectedType={"form_type"}
            fieldType={"form_type"}
            onClose={() =>{
                setModalVisible(false);          
                setTimeout(() => {
                  setIsFilter(true)
                },500);
            }}
            onValueChanged={( value, isChecked) =>{
                console.log(value, isChecked)
                saveFilter( value , isChecked);                    
            }} >
        </FilterOptionsModal>      

        <SearchBar isFilter={true}
          animation={() => {
            setIsFilter(true);            
            //dispatch({ type: SLIDE_STATUS, payload: true });
          }}
          onSearch={(text) => _onSearch(text)}></SearchBar>

        <FlatList
          style={{ margin: 10 }}
          removeClippedSubviews={false}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          data={formLists}
          renderItem={
            ({ item, index }) => (
              <View>
                <FormListItem key={index} item={item}
                  onItemPress={() => {                    
                    if (!isInfoWindow) {
                      props.navigation.navigate("FormQuestions", { 'data': item });
                    } else {
                      isInfoWindow = false;
                    }
                  }}
                  onTouchStart={(e, text) => _onTouchStart(e, text)}></FormListItem>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
        
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
            position: 'absolute',
            borderRadius: 5,
            width: Dimensions.get("window").width,
            borderRadius: 20,
          }} key={1}>

            <View style={styles.bubbleTextStyle} key={1}><Text>{bubbleText}</Text></View>
            <View style={[style.tip, { marginLeft: x - locationX + 3 }]}></View>
          </View>
        }         */}


      </View>
     </Provider>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubbleTextStyle:{ 
    backgroundColor: "#DDD", 
    padding: 10, 
    marginLeft: 30, 
    marginRight: 30, 
    borderRadius: 10, 
    fontSize: 16, 
    color: "#fff", 
  }


});