

import { View, Text ,TouchableOpacity , StyleSheet} from 'react-native'
import React from 'react'
import { boxShadow, style } from '../../constants/Styles'
import Colors, { whiteLabel } from '../../constants/Colors';

export default function TopThreeTab(props) {

    const { headers , tabIndex , setTabIndex } = props;
    return (
        <View style={{margin:10}}>      
            <View style={[styles.tabContainer, boxShadow]}>
                <TouchableOpacity style={style.tabItem} onPress={() => setTabIndex(1)}>
                    <Text style={[style.tabText, tabIndex == 1 ? style.tabActiveText : {}]}>{headers[0]}</Text>
                    <View style={{height:2, width:'100%', marginTop: 0, backgroundColor: tabIndex === 1 ? whiteLabel().activeTabUnderline : Colors.whiteColor }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={style.tabItem} onPress={() => setTabIndex(2)}>
                    <Text style={[style.tabText, tabIndex == 2 ? style.tabActiveText : {}]}>{headers[1]}</Text>
                    <View style={{height:2, width:'100%', marginTop: 0, backgroundColor: tabIndex === 2 ? whiteLabel().activeTabUnderline : Colors.whiteColor }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={style.tabItem} onPress={() => {             
                    setTabIndex(3)                               
                }}>
                <Text style={[style.tabText, tabIndex == 3 ? style.tabActiveText : {}]}>{headers[2]}</Text>
                    <View style={{height:2, width:'100%', marginTop: 0, backgroundColor: tabIndex === 3 ? whiteLabel().activeTabUnderline : Colors.whiteColor }}></View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles =  StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 7,
        backgroundColor: '#fff',        
    },
})