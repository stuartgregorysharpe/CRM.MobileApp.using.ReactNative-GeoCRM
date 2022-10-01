
import { View } from 'react-native'
import React from 'react'
import CustomerSalesHistory from '../components/CustomerSalesHistory';

export default function CustomerSalesHistoryContainer(props) {
    
    return (
        <View style={{alignSelf:'stretch' , flex:1 , marginBottom:30}}>
            <CustomerSalesHistory                            
                {...props}
            />
        </View>
    )
}