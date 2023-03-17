import { View, Text ,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React , { useState } from 'react'
import { AppText } from '../../../common/AppText';
import SvgIcon from '../../../SvgIcon';
import { SubmitButton } from '../../SubmitButton';
import { Colors, Constants, Fonts } from '../../../../constants';
import { whiteLabel } from '../../../../constants/Colors';

export default function ProductListsView(props) {
    
    const { questionType, lists, onSave ,removeProduct} = props;
    const closeModal = () => {
        props.onButtonAction({type: Constants.actionType.ACTION_CLOSE, value: 0});
    }

    const changeNetwork = () => {
        props.onButtonAction({type: Constants.actionType.ACTION_CHANGE_NETWORK, value: 0});
    }

    const renderItem = (item, index) => {
        return (
            <View key={index} style={{flexDirection:'row', marginTop:5,marginBottom:5}}>
                <View style={{flex:2}}>
                    <AppText type="primaryRegular" title={item.product_type} style={{marginRight:5}}></AppText>
                </View>
                <View style={{flex:3}}>
                    <AppText type="primaryRegular" title={item.label} ></AppText>
                </View>
                {
                    questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES && 
                    <View style={{flex:1}}>
                        <AppText type="primaryRegular" title={item.productIssue} ></AppText>
                    </View>
                }

                <TouchableOpacity onPress={() => removeProduct(item)}>
                    <SvgIcon icon="DELETE" width="20" height='20' />
                </TouchableOpacity>     
            </View>
        )
    }

    return (
        <View style={styles.container}>        

            <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row', marginTop:5,marginBottom:5}}>
                    <View style={{flex:2}}>
                        <AppText type="primaryRegular" title={'Type'} color={whiteLabel().mainText}></AppText>
                    </View>
                    <View style={{flex:3}}>
                        <AppText type="primaryRegular" title={'Product'} color={whiteLabel().mainText}></AppText>
                    </View>
                    {
                        questionType == Constants.questionType.FORM_TYPE_PRODUCT_ISSUES && 
                        <View style={{flex:1, marginRight:10}}>
                            <AppText type="primaryRegular"  title={'Issue'} color={whiteLabel().mainText} ></AppText>
                        </View>
                    }
                </View>
                <View style={{height:1,backgroundColor:whiteLabel().mainText}}></View>
            </View>

            <ScrollView style={{marginTop:10}}>                
                {
                    lists.map((item , index) => {
                        return renderItem(item, index)
                    })
                }
            </ScrollView>
            <SubmitButton title= {"Save"} style={{marginTop:20 , marginBottom:30}} onSubmit={onSave}></SubmitButton>          
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      flexDirection:'column',
      paddingTop: 10,
      marginHorizontal: 20,
      //marginBottom: 30,
      paddingBottom:0,      
      height:Dimensions.get("window").height * 0.85
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.primaryRegular,
    color: Colors.blackColor,
  },
})

