import { ScrollView, StyleSheet, View } from 'react-native'
import React , { useEffect ,useState} from 'react'
import { AppText } from '../../../../components/common/AppText'
import { Colors } from '../../../../constants'
import { whiteLabel } from '../../../../constants/Colors'
import CCheckBox from '../../../../components/common/CCheckBox'

const Warehouse = (props) => {

    const { warehouse , selectedItem} = props;        
    const [updatedLists, setUpdatedLists] = useState([])
    if(!warehouse) return null;

    useEffect(() => {
        let isMout = true;
        const options = warehouse.options ? warehouse.options : [];
        setUpdatedLists([ {id: 0, label: 'All Warehouses'} , ...options  ]);                
        return () => {
            isMout = false;
        };
    }, [warehouse])

    const onValueChange = (item , isChecked) => {
        if(props.onItemSelected)
            props.onItemSelected(item , isChecked)
    }

    const getCheckedStatus  = (item) => {
        var flag = false;
        if(selectedItem != undefined && selectedItem != null){            
            selectedItem.forEach(element => {
                if(element.id === item.id){
                    flag = true;                    
                }        
            });            
        }
        return flag;
    }

    return (
        <ScrollView style={{alignSelf:'stretch', maxHeight:230}}>
                    
            {
                updatedLists.map((item , index) => {
                    return (
                        <View key={index}>
                            <View style={{flexDirection:'row', alignItems:'center' , paddingVertical:5 }}>                      

                                <View style={{flex:3 , flexDirection:'row' , alignItems:'center'}}>
                                    <AppText title={item.label}  style={{flex:1}}></AppText>                                                                
                                    <CCheckBox value={getCheckedStatus(item)} 
                                        style={styles.checkbox} 
                                        onValueChange={() => {

                                            onValueChange(item , getCheckedStatus(item));
                                    }} />
                                </View>
                            </View>
                            <View style={{height:1, backgroundColor:Colors.lightGreyColor}} ></View>
                        </View>
                        
                    )
                })
            }
        </ScrollView>


    )
}

export default Warehouse

const styles = StyleSheet.create({
    checkbox: {
        marginRight:0,
        width: 25,
        height: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteLabel().itemSelectedBackground,
        borderWidth: 1,
        borderColor: whiteLabel().itemSelectedBackground,
    },

})