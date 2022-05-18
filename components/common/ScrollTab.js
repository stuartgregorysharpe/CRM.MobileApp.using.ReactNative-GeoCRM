
import { View, Text , ScrollView , StyleSheet , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { boxShadow } from '../../constants/Styles';
import Fonts from '../../constants/Fonts';
import Colors, { whiteLabel } from '../../constants/Colors';
import { AppText } from './AppText';

export default function ScrollTab(props) {

    const { tabs ,onTabSelection } = props;
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <View style={[styles.tabContainer, boxShadow, { alignItems: 'center' , }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginRight: 10, alignItems: 'center' }}
                onMomentumScrollEnd={(e) => {                          
                }}>
                { tabs && tabs.map((item, index) => {
                    return <TouchableOpacity key={index} onPress={() => { 
                        console.log("Selected tab", item.id)
                         setSelectedTab(item.id);
                         onTabSelection(item);
                    }}>
                        {/* <View style={styles.headerWrapper}>
                            <AppText title={item.name} type={selectedTab === item.id ? "secondaryBold" : "secondaryMedium"} color={Colors.primaryColor} size="medium"></AppText>
                        </View> */}
                        <View style={[styles.headerWrapper, {borderBottomColor: selectedTab === item.id ? whiteLabel().activeTabText : 'transparent'}]}>
                            <Text key={index} style={[ styles.tabText, selectedTab === item.id ? styles.tabActiveText : {}]}> {item.name} </Text>
                        </View>
                        
                    </TouchableOpacity>
                })}
                </ScrollView>
                {/* {canShowArrow && <SvgIcon icon="Arrow_Right_Btn" width='20px' height='25px' />} */}
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 7,
        backgroundColor: '#fff',
        marginBottom: 8
    },

    tabText: {
        fontFamily: Fonts.secondaryMedium,
        fontSize: 15,
        color: Colors.disabledColor,
        marginHorizontal: 5
    },

    tabActiveText: {
        color: whiteLabel().activeTabText,
        fontFamily: Fonts.secondaryBold,
        borderBottomColor: whiteLabel().activeTabUnderline,
        // borderBottomWidth: 2,
        // paddingBottom: 2,
    },
    headerWrapper: {
        paddingBottom:1,        
        borderBottomColor: whiteLabel().activeTabText,
        borderBottomWidth: 2,        
        marginHorizontal:5,
    },

      
})