import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../components/common/AppText'
import SvgIcon from '../../../../../components/SvgIcon'

const ProductGroupItem = (props) => {

    const {item } = props;

  return (
    <TouchableOpacity 
        onPress={() => {
            if(props.onGroupItemClicked){
                props.onGroupItemClicked();
            }
        }}
        >
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <AppText title="MacBook Pro" />
                <View style={{flex:1, alignItems:'flex-end'}}>
                    <SvgIcon icon={"Dropdown"} width="20" height="20" />
                </View>
            </View>

            {
                item.products && item.products.map((element, index) => {
                    return (
                        <View style={styles.subContainer}>
                            <AppText title="Title" />
                            <View style={{flex:1, alignItems:'flex-end'}}>
                                <SvgIcon icon={"Dropdown"} width="20" height="20" />
                            </View>
                        </View>
                    )
                })
            }
            
            <View style={{flex:1, alignItems:'flex-end'}}>
                <AppText title="more" />
            </View>            
        </View>
    </TouchableOpacity>
  )
}

export default ProductGroupItem

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        padding:10
    },
    subContainer:{

    }
})