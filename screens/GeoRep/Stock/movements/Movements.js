
import { View , FlatList ,TouchableOpacity , StyleSheet , ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import { AppText } from '../../../../components/common/AppText';
import { getApiRequest} from '../../../../actions/api.action';
import { whiteLabel } from '../../../../constants/Colors';  
import Fonts from '../../../../constants/Fonts'
import MovementListHeader from './components/MovementListHeader';
import MovementListItem from './components/MovementListItem';
import { useDispatch } from 'react-redux';
import { expireToken } from '../../../../constants/Helper';

var isEndPageLoading = false;

export default function Movements() {
  
    const [movementLists, setMovementLists] = useState([]);
    const [page,setPage] = useState(0);
    const [originMovementLists, setOriginMovementLists] = useState([]);    
    const [isPageLoading, setPageLoading] = useState(false);
    const dispatch = useDispatch();

    var isMount = true;

    useEffect(() =>{
        isMount = true;
        loadMoreData();
        return () => {
          isMount = false;
        }
    },[]);
   
    const renderItems = (item, index) => {
        return (
          <MovementListItem item={item}></MovementListItem>
        )
    }

    const loadMoreData = () => {        
        if(isPageLoading == false && isEndPageLoading == false){          
            setPageLoading(true)
            getApiRequest("stockmodule/movements-list", {page_nr:page}).then((res) => {                
                if(isMount){
                  setMovementLists([...movementLists, ...res.movement_items]);
                  setOriginMovementLists(res.movement_items);
                  setPage(page + 1);
                  setPageLoading(false);            
                }                
            }).catch((e) => {
                console.log("movements-list api error:",e);
                expireToken(dispatch , e);
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