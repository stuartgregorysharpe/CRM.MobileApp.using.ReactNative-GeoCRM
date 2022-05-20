
import { View, Text, TouchableOpacity } from 'react-native'
import React , { useEffect , useState} from 'react'
import TopThreeTab from '../../../components/common/TopThreeTab'
import StockLists from './partial/StockLists';
import Movements from './partial/Movements';
import Returns from './partial/Returns';
import { style } from '../../../constants/Styles';

export default function Stock(props) {
    const headers = ["Stock","Movements", "Returns"];
    const [tabIndex , setTabIndex] = useState(1);

    useEffect(() => {
        var screenProps = props.screenProps;    
        if(screenProps === undefined){
          screenProps = props.navigation;
        }
        if (screenProps) {
          screenProps.setOptions({        
            headerTitle: () => {
              return (<TouchableOpacity
                onPress={
                  () => {}}>
                <View style={style.headerTitleContainerStyle}>                
                  <Text style={style.headerTitle} >Stock Module</Text>
                </View></TouchableOpacity>)
            }
          });      
        }
    });

    return (
        <View style={{flexDirection:'column' , flex:1}}>      
            <TopThreeTab headers={headers} tabIndex={tabIndex}  setTabIndex={(index) => {
                setTabIndex(index)
            }}></TopThreeTab>

            <View style={{flex:1}}>                
                {
                    tabIndex === 1 && <StockLists></StockLists>
                }
                {
                    tabIndex === 2 && <Movements></Movements>
                }
                {
                    tabIndex === 3 && <Returns></Returns>
                }

            </View>
        </View>
    )
}