import { StyleSheet, Text, View , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AppText } from '../AppText';
import { whiteLabel } from '../../../constants/Colors';
import SvgIcon from '../../SvgIcon';

const NavigationButton = (props) => {

    const { item } = props;
    if(!item) return null;

  return (
        <TouchableOpacity
            onPress={async () => {                        
                if(props.onNavigate){
                    props.onNavigate();
                }
            }}>

            <View style={{ marginLeft: 5 , flexWrap: 'wrap'}}>
                <View style={styles.wazeStyle}>                    
                    <AppText title={item.title}></AppText>

                    {
                        item.type == 'png' && 
                        <Image
                            resizeMethod="resize"
                            style={{width: 20, height: 20, marginLeft: 10}}
                            source={item.image}
                        />
                    }
                    {
                        item.type == 'svg' && 
                        <SvgIcon                        
                            style={{marginLeft:10}}
                            icon={item.image}
                            width="16px"
                            height="16px"
                        />
                    }                                        
                </View>
            </View>
        </TouchableOpacity>
       
  )
}

export default NavigationButton

const styles = StyleSheet.create({
    wazeStyle: {
        
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: whiteLabel().fieldBorder,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 34
      },
})