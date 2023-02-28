import { Platform, StyleSheet, Text, View  } from 'react-native'
import React , { useEffect, useState} from 'react'
import { AppText } from '../../../../../components/common/AppText';
import Colors, { whiteLabel } from '../../../../../constants/Colors';

const TableView = (props) => {

    const { monthLabels , data , networks, selectedIndex } = props;

    const [name, setName] = useState('');
    const [tableData, setTableData] = useState(null);
    const dataTypes = [
        {
            title : 'Allocated',
            slug: 'allocated'
        },
        {
            title : 'RICA',
            slug: 'rica'
        },
        {
            title : 'RICA%',
            slug: 'rica_percent'
        },
        {
            title : 'Connections',
            slug: 'connections'
        },
        {
            title : 'Connections%',
            slug: 'connections_percent'
        },
        {
            title : 'CIB',
            slug: 'cib'
        },
        {
            title : 'CIB%',
            slug: 'cib_percent'
        },
    ]

    useEffect(() => {
        if(selectedIndex != undefined){
            if(networks[selectedIndex]?.name){
                setName(networks[selectedIndex]?.name);
            }            
        }
    },[networks, selectedIndex]);

    useEffect(() => {
        if(name != null && data != null){            
            setTableData(data[name]);
        }
        
    }, [name]);

    return (
        <View style={styles.container}>
            
            <View style={styles.rowContainer}>
                <AppText title='Data' style={[styles.headerStyle, {flex:3, textAlign:'left'}]}  type="secondaryMedium" />
                {
                    monthLabels.map((item , index) => {
                        return <View style={{flex:2}}>
                                <AppText key={'title' + index} title={item} size="big" type="secondaryMedium" style={styles.headerStyle} />
                            </View>
                    })
                }
            </View>


            <View style={{height:2, width:'100%', backgroundColor:whiteLabel().actionOutlineButtonBorder, marginVertical:7,}}></View>

            {
                dataTypes.map((dataItem , index) => {
                    
                    if(tableData != null && tableData[dataItem.slug] != undefined){
                        return (
                            <View  key={'table' + index}>
                                <View style={styles.rowContainer}>
                                    <AppText title={dataItem.title} style={{flex:3 , marginTop:1, fontSize:13}} size="medium" type="secondaryRegular" />
                                    {
                                        monthLabels.map((item , index) => {
                                            return <View style={{flex:2}} key={index}> 
                                                <AppText title={tableData[dataItem.slug][item]?.value} 
                                                    size="medium" 
                                                    type="secondaryRegular" 
                                                    style={[styles.textStyle , {color: tableData[dataItem.slug][item]?.color , marginTop:1 }]} 
                                                />
                                            </View>;
                                        })
                                    }                                
                                </View>
                                {
                                    dataTypes.length - 1  != index &&
                                    <View style={{height:1, width:'100%', backgroundColor:Colors.graph_grey, marginVertical:7,}}></View> 
                                }
                                
                            </View>
                        )
                    }else{
                        return <View key={'table' + index}></View>;
                    }
                    
                })
            }
            


        </View>
    )
}

export default TableView

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        borderWidth:2,
        borderRadius:3,
        paddingHorizontal: 7,
        paddingVertical : 8,
        borderColor: whiteLabel().actionOutlineButtonBorder,        
    },
    rowContainer: {
        flexDirection:'row'
    },

    headerStyle :{        
        textAlign:'center',         
        fontSize:15,     
    },
    textStyle :{        
        textAlign:'center',        
        fontSize:13,
    }
})