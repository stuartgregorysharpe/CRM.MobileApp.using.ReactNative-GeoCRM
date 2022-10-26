import { View, Text , FlatList ,TouchableOpacity , StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { AppText } from '../../../../../components/common/AppText';
import { getApiRequest} from '../../../../../actions/api.action';
import Colors, { whiteLabel } from '../../../../../constants/Colors';  
import SvgIcon from '../../../../../components/SvgIcon';
import { style } from '../../../../../constants/Styles';
import FastImage from 'react-native-fast-image';
import { expireToken } from '../../../../../constants/Helper';
import { useDispatch } from 'react-redux';

export default function CustomerSalesHistory(props) {

    const { locationId } = props;

    const [saleItems, setSaleItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() =>{
        let isMount = true;
        var postData = {
            location_id: locationId
        };

        getApiRequest("locations/customer-sales-history", postData).then((res) => {
            if(isMount){
                var tmp = [];
                res.sales_items.forEach(element => {
                    element.visible = false;
                    tmp.push(element);
                });            
                setSaleItems(tmp);                        
            }            
        }).catch((e) => {
            console.log("customer-sales-history api error: ",e);
            expireToken(dispatch , e);
        });
        return () => {
            isMount = false;
        }
    },[]);

    
    const renderItems = (item, index) => {
        return (
            <View style={[style.card , styles.itemContainer]}>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View>
                        <FastImage style={styles.imageContainer}  source={{uri:item.category_image}} />
                    </View>

                    <View style={{flex:2 , marginLeft:10}}>
                        <AppText type="secondaryMedium" title={item.category} color={whiteLabel().mainText} style={{fontSize:12.3}}></AppText>
                    </View>

                    <TouchableOpacity onPress={() => {onExpand(item)}}>
                        <View>
                            <SvgIcon icon={item.visible? "Drop_Up" : "Drop_Down" } width="23px" height="23px" />
                        </View>
                    </TouchableOpacity>                    
                </View>

                {
                    item.visible &&
                    <View style={{flexDirection:'column', width:'100%', marginTop:10}}>
                        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                            <View style={{flex:1.5}}><AppText title={item.heading_label}></AppText></View>
                            {
                                item.month_labels.map((element, index) =>{
                                    return <View key={"header" + index} style={{flex:1}}><AppText  title={element}></AppText></View>
                                })
                            }                            
                        </View>

                        <View style={{marginTop:5, marginBottom:2, width:'100%', height:1, backgroundColor:whiteLabel().mainText}}></View>
                        
                        {
                            item.sales_records && item.sales_records.map((element, k) => {
                                return (
                                    <View key={k} style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:5 }}>
                                         <View style={{flex:1.5}}><AppText title={element.description} color={Colors.disabledColor}></AppText></View>
                                            { 
                                                item.month_labels.map((subElement, index) =>{
                                                    return (<View key={"sub" + index}  style={{flex:1}}>
                                                            <AppText title={element.values[subElement]} color={Colors.disabledColor}>
                                                            </AppText>
                                                        </View>);
                                                })
                                            }
                                    </View>
                                )
                            })
                        }

                    </View>
                }
                
            </View>
        )
    }

    const onExpand = ( item ) =>{
        var tmp = [];
        saleItems.forEach(element => {
            if(element.category === item.category){
                element.visible = !item.visible;   
            }
            tmp.push(element);
        });            
        setSaleItems(tmp);  
    }

    return (
        <View style={{flexDirection:'column', flex:1}}>        
            <AppText size="big" type="secondaryBold" color={whiteLabel().mainText} title="Customer Sales History" style={{marginLeft:15 , marginTop:10}}></AppText>
            <View style={{flexDirection:'column'}}>

                <FlatList                                                  
                    removeClippedSubviews={false}                
                    initialNumToRender={10}                    
                    data={ saleItems }            
                    renderItem={
                        ({ item, index }) => renderItems(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>                       
            
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection:'column' , 
        marginTop:10, 
        marginBottom:3,         
        borderWidth:1,
        borderColor: whiteLabel().mainText,
        marginHorizontal:15,        
    },
    imageContainer:{
        borderWidth:1,
        borderColor:Colors.greyColor,
        width:20,        
        height: 14,
        resizeMode:'contain'
    }
})