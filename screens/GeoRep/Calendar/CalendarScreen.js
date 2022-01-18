import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity , FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDoubleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SvgIcon from '../../../components/SvgIcon';
import { PRIMARY_COLOR } from '../../../constants/Colors';
import { boxShadow, style } from '../../../constants/Styles';
import { BG_COLOR } from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { getBaseUrl, getToken } from '../../../constants/Storage';
import { getCalendar, updateCalendar } from '../../../actions/calendar.action';
import { useSelector, useDispatch , connect} from 'react-redux';
import { CalendarItem } from './partial/CalendarItem';
import DraggableFlatList , {ScaleDecorator , useOnCellActiveAnimation}  from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CalendarScreen(props) {

  const currentLocation = useSelector(state => state.rep.currentLocation);
  const [tabIndex, setTabIndex] = useState(2);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    if (props.screenProps) {
      props.screenProps.setOptions({
        title: "Calendar"
      });
    }
    loadList("today");
  }, []);

  const loadList = async(type) => {    
    var base_url = await getBaseUrl();
    var token = await getToken();
    if(base_url != null && token != null){      
      getCalendar(base_url, token, type)
      .then(res => {        
        setLists(res);      
        console.log("response", res);  
      })
      .catch(error=>{
        setLists([]);
      });
    }    
  }

  const updateLists =  async(data) => {    
      updateCalendar({schedules:data})
      .then(res => {                          
      })
      .catch(error=>{        
      });        
  }

  const renderCalendarItem = (item, index) => {    
    return (<View style={{marginTop:10}}><CalendarItem key={index} navigation={props.navigation} item={item} current={currentLocation} > </CalendarItem></View>)
  }
  
  const renderTodayItem = ({item, drag} )  => {    
    const { isActive } = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <TouchableOpacity          
          onLongPress={drag}
          disabled={isActive}
          style={[
            isActive ? style.rowItem : { marginTop:10},
            { backgroundColor: isActive ? "#eee" : BG_COLOR },
          ]}>
          <CalendarItem key={item.schedule_id} navigation={props.navigation} item={item} current={currentLocation} > </CalendarItem>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={[styles.tabContainer, boxShadow]}>

          <TouchableOpacity style={styles.tabItem} onPress={() => {
            setTabIndex(1);
            loadList("last_week");
          }}>
          <Text style={[styles.tabText, tabIndex == 1 ? styles.tabActiveText : {}]}>Last Week</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => {
            setTabIndex(2);
            loadList("today");
          }}>
            <Text style={[styles.tabText, tabIndex == 2 ? styles.tabActiveText : {}]}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => {
            setTabIndex(3);
            loadList("week_ahead");            
            }}>
          <Text style={[styles.tabText, tabIndex == 3 ? styles.tabActiveText : {}]}>Week Ahead</Text>
          </TouchableOpacity>
        </View>

        {
          false && 
          <TouchableOpacity style={styles.startButton} onPress={() => console.log("pressed")}>
            <Text style={[styles.startButtonText]}>Start My Day</Text>
            <FontAwesomeIcon style={styles.startButtonIcon} size={25} color="#fff" icon={ faAngleDoubleRight } />
          </TouchableOpacity>
        }

        <View style={{flex:1}}>
          {
            (tabIndex == 1 || tabIndex == 3) &&
            <FlatList
              data={lists}
              renderItem={
                  ({ item , index }) => renderCalendarItem(item, index)
              }
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 7, marginTop: 15 }}
            />
          }
          {
            tabIndex == 2 &&   
            <GestureHandlerRootView>
              <DraggableFlatList
                data={lists}
                onDragEnd={({ data }) => {
                  var tmp = [];
                  var newlists = [];
                  data.forEach((item , index) =>{
                    item.schedule_order = (index + 1).toString();
                    newlists.push(item);
                    tmp.push({schedule_order:(index + 1).toString() , location_id: item.location_id, schedule_id: item.schedule_id, schedule_date: item.schedule_date, schedule_time: item.schedule_time });
                  });
                  setLists(newlists);                  
                  updateLists(tmp);
                }}   
                keyExtractor={(item) => item.schedule_id}
                renderItem={renderTodayItem}                
              />
            </GestureHandlerRootView>            
          }          
        </View>                          

      </View>
      <TouchableOpacity style={style.plusButton}>
        <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
      </TouchableOpacity>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: '100%',
    backgroundColor: BG_COLOR
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginBottom: 8
  },
  tabText: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 15,
    color: '#9D9FA2'
  },
  tabActiveText: {
    color: PRIMARY_COLOR,
    fontFamily: Fonts.secondaryBold,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  startButton: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    borderRadius: 7,
    backgroundColor: "#9D9FA2",
    marginBottom: 16
  },
  startButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.primaryRegular
  },
  startButtonIcon: {
    position: 'absolute',
    right: 10
  },

  itemButtonActive: {
    backgroundColor: PRIMARY_COLOR
  },    
  rowItem: {    
  },
})