

import { View} from 'react-native'
import React from 'react'
import CardView from '../../../../../components/common/CardView'
import { AppText } from '../../../../../components/common/AppText'
import { whiteLabel } from '../../../../../constants/Colors'
import { SubmitButton } from '../../../../../components/shared/SubmitButton'

export default function StockDetailsView(props) {
    const {item} = props;    
    return (
        <View style={{marginBottom:30}}>
        
            <CardView style={{ marginTop:10, marginHorizontal:10 , borderColor:whiteLabel().borderColor, borderWidth:1}}>
                    <View style={{padding:5}}>
                        <AppText size="medium" type="secondaryBold" title={item != undefined ? item.description :  ''} color={whiteLabel().mainText}></AppText>
                        <AppText title={item != undefined ? "IMEI: " + item.serial : "IMEI: "} color={whiteLabel().subText}></AppText>
                    </View>
            </CardView>

            <View style={{marginHorizontal:10 , marginTop:20}}>
                <SubmitButton title="Sell to Trader" onSubmit={props.sellToTrader} ></SubmitButton>
                <SubmitButton title="Swop at Trader" style={{marginTop:10}}></SubmitButton>
                <SubmitButton title="Trader" style={{marginTop:10}}></SubmitButton>
            </View>
                     
        </View>
    )
}