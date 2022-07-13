import { View, Text , FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from '../../../../components/common/AppText';
import  Colors, { whiteLabel } from '../../../../constants/Colors';
import CardView from '../../../../components/common/CardView';
import SvgIcon from '../../../../components/SvgIcon';
import { style } from '../../../../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';


export default function DevicesModalView(props) {

    const { lists ,openStockModule } = props;

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: '#70707045',
        height: 0.5,
      }}
    />
  );

  const renderItem = (item, index) => {
    return (        
        <TouchableOpacity key={index} onPress={() =>{
           // onItemSelected(item)
        }}>
            <CardView style={{borderColor:whiteLabel().borderColor, borderWidth:1, marginVertical:5 , padding:5 }}>                
                    <View key={index} style={{ flex:1, flexDirection:'column'}}>            
                        <View style={{flex: 1}}>
                            <AppText
                                size="big"
                                type="secondaryBold"
                                title={item.description}
                                style={{fontSize: 12.5}}></AppText>
                            
                        </View>
                        
                        <View style={{flex: 1, flexDirection:'row', marginRight:10}}>
                            <AppText
                                type="secondaryMedium"
                                title={"MSISDN: " + item.msisdn}              
                                color={whiteLabel().subText}
                                style={{fontSize: 10.4 , flex:1 }}></AppText>

                            <AppText
                                type="secondaryMedium"
                                title={"IMEI: " + item.imei}
                                color={whiteLabel().subText}
                                style={{fontSize: 10.4}}></AppText>
                            
                        </View>            
                    </View>
                    {/* <View style={{height:0.5, backgroundColor:Colors.greyColor, marginVertical:3 , marginRight:10}}></View> */}                
            </CardView>
            
        </TouchableOpacity>        
    );
  };

  return (
      <View style={styles.container}>
            <ScrollView>      
                {
                    lists !=undefined && lists.length > 0 && lists.map((item, index) => {
                        return renderItem(item, index);
                    })
                }

            {/* <FlatList        
                    data={lists}
                    renderItem={({item, index}) => renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingHorizontal: 0, marginTop: 0}}
                    ItemSeparatorComponent={renderSeparator}
                /> */}
            </ScrollView>

            {
                   // lists.length > 0 &&
                    <TouchableOpacity
                        style={[style.plusButton, { marginBottom: 0}]}
                        onPress={() => { 
                            openStockModule();       
                        }}>
                        <SvgIcon icon="Round_Btn_Default_Dark" width='70px' height='70px' />
                    </TouchableOpacity>
            }         

      </View>
    
  )
}


const styles = StyleSheet.create({
    container: {        
        flexDirection:'column',
        marginTop:8,        
        marginHorizontal: 20,      
        paddingBottom:0,
        height:Dimensions.get("window").height * 0.6
    },  
  
})

  