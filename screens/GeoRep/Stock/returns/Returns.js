import { View, Text , ScrollView , StyleSheet , FlatList } from 'react-native'
import React , {useEffect , useState} from 'react'
import SvgIcon from '../../../../components/SvgIcon'
import Fonts from '../../../../constants/Fonts'
import { getApiRequest } from '../../../../actions/api.action';
import ReturnListItem from './components/ReturnListItem';
import ReturnListHeader from './components/ReturnListHeader';
import { SubmitButton } from '../../../../components/shared/SubmitButton';

export default function Returns() {

  const [returnLists, setReturnLists] = useState([]);

  useEffect(() =>{    
    getApiRequest("stockmodule/returns-list", {}).then((res) => {
      console.log("Dfdf",res)
        setReturnLists(res.return_items)
    }).catch((e) => {
        console.log("E",e);
    });
},[]);

  
  const renderItems = (item, index) => {
    return (
        <ReturnListItem item={item}></ReturnListItem>
    )
  }

  return (
    <View style={{flexDirection:'column', flex:1}}>
        
        <View style={{flexDirection:'column' , flex:1}}>
            <FlatList                              
                ListHeaderComponent={()=>
                    <ReturnListHeader></ReturnListHeader>
                }
                removeClippedSubviews={false}                
                initialNumToRender={10}                    
                data={returnLists}            
                renderItem={
                    ({ item, index }) => renderItems(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

        <View style={{marginHorizontal:10 ,  marginBottom:10}}>
          <SubmitButton title="Return Stock"></SubmitButton>
          <SubmitButton style={{marginTop:10}} title="Return All Stock To Warehouse"></SubmitButton>
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
  }
})