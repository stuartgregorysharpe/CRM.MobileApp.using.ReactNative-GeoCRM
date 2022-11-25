import { StyleSheet, Image,  Text, View, TouchableOpacity } from 'react-native'
import React , { useState } from 'react'
import { AppText } from '../../../../../components/common/AppText'
import { Colors } from '../../../../../constants'
import { whiteLabel } from '../../../../../constants/Colors'

const ProductItem = ({item}) => {

    const [qty, setQty] = useState(0);

    const increase = () => {
        setQty(qty + 1)
    }

    const decrease = () => {
        if(qty > 0){
            setQty(qty - 1)
        }
    }

  return (
    <View style={styles.container}>
        <Image source={item.product_images[0]} style={styles.imgStyle} />
        <View style={{flex:1}}>
            <AppText title={item.product_name}></AppText>
            <View style={{flexDirection:'row'}}>
                <AppText title={item.warehouse_name}></AppText>
                <AppText title="|"></AppText>
                <AppText title={"Stock: " + item.soh}></AppText>
            </View>
            <View style={{flexDirection:'row'}}>
                <AppText title="Qty"></AppText>
                <TouchableOpacity style={styles.addContainer}>
                    <AppText title="-" />
                </TouchableOpacity>
                
                <AppText title={qty} />
                <TouchableOpacity style={styles.addContainer}>
                    <AppText title="+" />
                </TouchableOpacity>
                <View style={{flex:1, alignItems:'flex-end'}}>
                <AppText title="R2,399" color={Colors.primaryColor}/>
                </View>
            </View>
        </View>
    </View>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },  
    imgStyle:{
        width: 100,
        height: 100
    },
    addContainer: {
        width : 20,
        height: 20,
        borderRadius: 3,
        backgroundColor: whiteLabel().actionFullButtonBackground
    }
    
})