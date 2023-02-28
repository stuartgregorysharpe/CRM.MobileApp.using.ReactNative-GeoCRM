import { Platform, StyleSheet, Text, View  } from 'react-native'
import React , { useEffect, useState} from 'react'
import { AppText } from '../../../../../components/common/AppText';
import { whiteLabel } from '../../../../../constants/Colors';

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
            console.log("name ", name , data[name]) 
            setTableData(data[name]);
        }
        
    }, [name]);

    return (
        <View style={styles.container}>
            
            <View style={styles.rowContainer}>
                <AppText title='Data' style={{flex:3}} size="big" type="secondaryMedium" />
                {
                    monthLabels.map((item) => {
                        return <AppText title={item} size="big" type="secondaryMedium" style={styles.headerStyle} />;
                    })
                }
            </View>

            <View style={{height:1, width:'100%', backgroundColor:whiteLabel().actionOutlineButtonBorder}}></View>

            {
                dataTypes.map((dataItem , index) => {
                    
                    if(tableData != null && tableData[dataItem.slug] != undefined){
                        return (
                            <View style={styles.rowContainer} key={'table' + index}>
                                <AppText title={dataItem.title} style={{flex:3}} size="medium" type="secondaryRegular" />
                                {
                                    monthLabels.map((item , index) => {
                                        return <View style={{flex:2}} key={index}> 
                                            <AppText title={tableData[dataItem.slug][item]?.value} 
                                                size="medium" 
                                                type="secondaryRegular" 
                                                style={[styles.textStyle , {color: tableData[dataItem.slug][item]?.color }]} 
                                            />
                                        </View>;
                                    })
                                }                                
                            </View>
                        )
                    }else{
                        return <View></View>;
                    }
                    
                })
            }
            


        </View>
    )
}

export default TableView

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        borderWidth:1,
        padding:5,
        borderColor: whiteLabel().actionOutlineButtonBorder,        
    },
    rowContainer: {
        flexDirection:'row'
    },
    headerStyle :{
        flex:2,          
        textAlign:'center',                
    },
    textStyle :{
        flex:2,            
        paddingLeft:10
        //textAlign:'left'
    }
})