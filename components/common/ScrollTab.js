
import { View, Text , ScrollView , StyleSheet , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { boxShadow } from '../../constants/Styles';
import Fonts from '../../constants/Fonts';
import Colors, { whiteLabel } from '../../constants/Colors';
import { checkConnectivity } from '../../DAO/helper';
import { showOfflineDialog } from '../../constants/Helper';
import { useDispatch } from 'react-redux';

export default function ScrollTab(props) {

    const { tabs , onTabSelection , selectedTab } = props;
    //const [selectedTab, setSelectedTab] = useState(0);
    const dispatch = useDispatch()

    return (
        <View style={[styles.tabContainer, boxShadow, { alignItems: 'center' , }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginRight: 10, alignItems: 'center' }}
                onMomentumScrollEnd={(e) => {                          
                }}>
                { tabs && tabs.map((item, index) => {
                    return <TouchableOpacity key={index} onPress={() => { 
                        
                        checkConnectivity().then((isConnected) => {
                            if(isConnected || item.name === "Main"){
                                //setSelectedTab(item.id);
                                onTabSelection(item);
                            }else{
                                showOfflineDialog(dispatch);
                            }
                        }).catch((e) => {
                        });
                         
                    }}>                        
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