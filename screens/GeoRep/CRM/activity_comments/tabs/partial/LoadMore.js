import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from '../../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../../constants/Colors';

const LoadMore = props => {

  return (

    <View style={{alignItems: 'center', flexDirection: 'column'}}>
        <TouchableOpacity
            style={{marginBottom: 10, marginTop: 10}}
            onPress={() => {
                if(props.loadMore){
                    props.loadMore();
                }
            }}>                                        
            <AppText
                type=""
                color={whiteLabel().mainText}
                size="small"
                title="Load More ..."></AppText>
        </TouchableOpacity>
	</View>
    
  )
}

export default LoadMore