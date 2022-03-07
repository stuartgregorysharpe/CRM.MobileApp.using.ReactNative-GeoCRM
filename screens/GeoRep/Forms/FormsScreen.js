import React, { useEffect , useState } from 'react';
import { SafeAreaView, Text, View, Dimensions, StyleSheet ,FlatList } from 'react-native';
import { getFormFilters, getFormLists } from '../../../actions/forms.action';
import SearchBar from '../../../components/SearchBar';
import Colors from '../../../constants/Colors';
import { FilterView, FormFilterView } from './partial/FormFilterView';
import { FormListItem } from './partial/FormListItem';
import { Provider } from 'react-native-paper';
import { useDispatch ,useSelector } from 'react-redux';
import { SLIDE_STATUS } from '../../../actions/actionTypes';
import GrayBackground from '../../../components/GrayBackground';
import { getFilterData } from '../../../constants/Storage';

export default function FormsScreen({screenProps}) {

  const [originalFormLists, setOriginalFormLists] = useState([]);
  const [formLists, setFormLists] = useState([]);
  const [isInfo,setIsInfo] = useState(false);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [x,setX] = useState(0);
  const [y, setY] = useState(0);
  const [bubbleText, setBubleText] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const crmStatus = useSelector(state => state.rep.crmSlideStatus);  

  const dispatch = useDispatch()

  useEffect(() => {    
    if (screenProps) {
      screenProps.setOptions({
        title: "Forms"
      });
    }    
  });

  useEffect(() => {
    _callFormLists(null)
  },[]);

  
  const _onSearch = (text) => {
    var tmp = [...originalFormLists];
    tmp = tmp.filter( element => element.form_name.toLowerCase().includes(text.toLowerCase()) );    
    setFormLists(tmp);
  }

  const _callFormLists = async(filters) => {
    if(filters === null){
      filters = await getFilterData('@form_filter');
    }
    getFormLists('', '' , filters).then((res) => {      
      setFormLists(res);
      setOriginalFormLists(res);
    }).catch((e) => {
      console.log(e)
    })
  }

  const _onTouchStart = (e , text) => {    
    setX(e.pageX);
    setY(e.pageY);
    setLocationX(e.locationX);
    setLocationY(e.locationY);
    setBubleText(text);
    setTimeout(() =>{
      setIsInfo(true);
    },100)    
  }

  return (
    <Provider>
    <View style={styles.container}   onTouchStart={(e) => { setIsInfo(false) }} >   

        <GrayBackground></GrayBackground>
        {
          crmStatus && isFilter &&           
            <FormFilterView 
              apply={(filters) => {
                _callFormLists(filters);
              }}
              close={() => {
              setIsFilter(false);
              dispatch({type: SLIDE_STATUS, payload: false});
            }} ></FormFilterView>
        }

        <SearchBar isFilter={true} 
            animation={() => {
              setIsFilter(true);
              dispatch({type: SLIDE_STATUS, payload: true});              
            }}
            onSearch={(text) => _onSearch(text)}></SearchBar>

        <FlatList
            style={{margin:10}}
            removeClippedSubviews={false}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            data={formLists}
            renderItem={
                ({ item , index }) => (
                  <View
                  onLayout={(event) => {
                    let {x, y, width, height} = event.nativeEvent.layout                     
                  }}>
                  <FormListItem key={index} item={item} onTouchStart={(e , text) => _onTouchStart(e , text) }></FormListItem>
                </View>                
                )
            }
            keyExtractor={(item, index) => index.toString()}            
          />
        
        {
          isInfo &&
          <View style={{
              top: y - locationY - 65,
              position:'absolute',                                
              borderRadius: 5,                
              width:Dimensions.get("window").width,                               
              borderRadius: 20,                
            }} key={1}>
                
              <View  style={{ backgroundColor: "#DDD", padding:10, marginLeft:30,marginRight:30,borderRadius:10, fontSize: 16, color: "#fff", }} key={1}><Text>{bubbleText}</Text></View>  
              <View style={[styles.tip, {marginLeft:x - locationX + 3}]}></View>                                              
          </View>
        }

    </View>
    </Provider>
  );

  
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  tip:{
    position:'absolute',
    width:20,
    height:20,
    top:-10,
    backgroundColor:'#DDD',    
    transform: [{ rotate: '45deg'}]
  },  


});