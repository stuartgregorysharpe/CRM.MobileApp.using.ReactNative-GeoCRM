
import { View, Text , FlatList ,TouchableOpacity , StyleSheet , ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import { AppText } from '../../../../components/common/AppText';
import { getApiRequest} from '../../../../actions/api.action';
import SearchBar from '../../../../components/SearchBar';
import Colors, { whiteLabel } from '../../../../constants/Colors';  
import SvgIcon from '../../../../components/SvgIcon';
import Fonts from '../../../../constants/Fonts'
import MovementListHeader from './components/MovementListHeader';
import MovementListItem from './components/MovementListItem';

var isEndPageLoading = false;

export default function Movements() {
  
    const [movementLists, setMovementLists] = useState([]);
    const [page,setPage] = useState(0);
    const [originMovementLists, setOriginMovementLists] = useState([]);
    
    const [isPageLoading, setPageLoading] = useState(false);

    useEffect(() =>{
        loadMoreData()
    },[]);

    const onFilter = (text) => {
        if(text !== "" && text !== undefined){
            var tmp = [];
            originMovementLists.map((item, index) => {
                if(item.description.toLowerCase().includes(text.toLowerCase())){
                    tmp.push(item);
                }
            });
            setMovementLists(tmp);
        }else{            
          setMovementLists([...originMovementLists]);
        }        
    }

    const renderItems = (item, index) => {
        return (
          <MovementListItem item={item}></MovementListItem>
        )
    }

    const loadMoreData = () => {
        
        if(isPageLoading == false && isEndPageLoading == false){
          console.log("page" , page);
            setPageLoading(true)
            getApiRequest("https://dev.georep.com/local_api_old/stockmodule/movements-list", {page_nr:page}).then((res) => {
                //console.log("Res", res);
                console.log(res.movement_items.length)
                setMovementLists([...movementLists, ...res.movement_items]);
                setOriginMovementLists(res.movement_items);
                setPage(page + 1);
                setPageLoading(false);            
            }).catch((e) => {
                console.log("E",e);
            });            
        }
        
    }

    renderFooter = () => {
      if (!isEndPageLoading && isPageLoading) {
        return (
          <View style={styles.footer}>
            <TouchableOpacity>
              {/* <Text style={styles.btnText}>Loading</Text> */}
              <AppText type="" color={whiteLabel().mainText} size="small" title="Load More ..."></AppText>
              {isPageLoading ? (
                <ActivityIndicator color="white" style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity>
          </View>
        );
      }
      return <View></View>;
    };

    
    return (
        <View style={{flexDirection:'column', flex:1 }}>        
            <View style={{flexDirection:'column', flex:1 , marginBottom:0 }}>
                <FlatList                              
                    ListHeaderComponent={()=>
                        <MovementListHeader></MovementListHeader>
                    }
                    removeClippedSubviews={false}                
                    initialNumToRender={10}                    
                    data={movementLists}            
                    renderItem={
                        ({ item, index }) => renderItems(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={1}
                    ListFooterComponent={renderFooter.bind(this)}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
  container:{
      flex:1,                                       
      paddingTop:10
  },

  faqTextStyle:{
      marginTop:10,
      marginHorizontal:10,
      fontSize:16,
      fontWeight:'700',
      fontFamily:Fonts.primaryBold,
      textAlign:'center'
  },

  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },


})