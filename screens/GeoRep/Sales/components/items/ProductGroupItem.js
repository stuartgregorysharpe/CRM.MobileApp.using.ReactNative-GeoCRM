import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText'
import SvgIcon from '../../../../../components/SvgIcon'
import { style } from '../../../../../constants/Styles'
import Colors, { whiteLabel } from '../../../../../constants/Colors'

const ProductGroupItem = (props) => {

    const { title, products } = props;

    const getBorderStatus = () => {
        var flag = false;
        products.forEach(element => {
            if(element.qty > 0){
                flag = true;
            }            
        });
        return flag;
    }

  return (
    <TouchableOpacity 
        onPress={() => {
            if(props.onGroupItemClicked){
                props.onGroupItemClicked();
            }
        }}
        >
        <View style={[styles.container, style.card , getBorderStatus() ? styles.redBorder : {} ]}>
            <View style={{flex:1}}>
                <View style={[styles.subContainer, {marginBottom:5, flexDirection:'row', alignItems:'center'}]}>
                    <AppText title={title}  size="big" type="secondaryBold"/>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <SvgIcon icon={"Bottom_Arrow"} width="25" height="25" />
                    </View>
                </View>

                {
                    products && products.map((element, index) => {
                        if(index < 3){
                            return (
                                <View key={index} style={styles.subContainer}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:3}}> 
                                            <AppText title={element.product_name} size="medium" />
                                        </View>
                                        
                                        <View style={{flex:2, flexDirection:'row'}}>
                                            <AppText title={element.warehouse_name + ' | ' + "Stock : " + element.soh} size="medium" color={whiteLabel().subText}/>
                                            {/* <AppText title="  |  " size="medium" color={whiteLabel().subText}/>
                                            <AppText title={"Stock : " + element.soh} size="medium" color={whiteLabel().subText}/> */}
                                        </View>                                        
                                    </View>
                                    {
                                        ((products.length > 2 && index != 2) || (products.length <= 2 && products.length - 1 == index)) &&    
                                        <View style={{height:1, backgroundColor: Colors.lightGreyColor, marginTop:5}}></View>
                                    }
                                    
                                </View>
                            )
                        }                    
                    })
                }
                
                {
                    products.length > 3 &&
                    // <TouchableOpacity 
                    //     onPress={() => {                            
                    //     }}
                    //     >
                        <View style={{flex:1, alignItems:'flex-end', paddingTop:5,}}>
                            <AppText title={"+" + ( products.length - 3 ) +  " More"} color={whiteLabel().mainText} />
                        </View>
                    // </TouchableOpacity>
                    
                }
                
            </View>                    
        </View>
    </TouchableOpacity>
  )
}

export default ProductGroupItem

const styles = StyleSheet.create({
    container:{        
        marginHorizontal:10,
        alignSelf:'stretch'
    },
    subContainer:{
        marginTop:5
    },
    redBorder :{
        borderWidth:1,
        borderColor:whiteLabel().mainText,
        borderRadius:3
    }
})