

import { View, StyleSheet, TouchableOpacity} from 'react-native'
import React , { useEffect, useState , useRef} from 'react'
import { whiteLabel } from '../../../../../constants/Colors'
import { CHorizontalProgressBar } from '../../../../../components/common/CHorizontalProgressBar';
import SvgIcon from '../../../../../components/SvgIcon';
import {RotationAnimation} from '../../../../../components/common/RotationAnimation';
import { formattedNumber } from '../../../../../helpers/formatHelpers';

const BasketSyncProgress = props => {

    const { totalTableCount, syncedTableCount, totalRecords, syncedRecords , isLoading} = props;
    const [startTable, setStartTable] = useState(false);
    const [startRecord, setStartRecord] = useState(false);    
    const tableRef = useRef();
    const recordRef = useRef();
    const rotationAnimationRef = useRef();

    useEffect(() => {        
        if(rotationAnimationRef.current){                          
            rotationAnimationRef.current.start();            
        }            
    },[ isLoading, startTable ,syncedTableCount , syncedRecords ]);

    useEffect(() => {
        let isMount = true;
        if(isMount && totalTableCount != 0){
            if(syncedTableCount === totalTableCount){
                setStartTable(false);
                tableRef.current.moveToNextStep(100);
                recordRef.current.moveToNextStep(0);
            }else{
                setStartTable(true);                
                tableRef.current.moveToNextStep( syncedTableCount * 100 / totalTableCount )
            }            
        }    
        return () => {
            isMount =false;
        } 

    }, [syncedTableCount, totalTableCount]);

    useEffect(() => {
        let isMount = true;
        if(isMount && totalRecords != 0){

            if( syncedRecords === totalRecords){
                setStartRecord(false);
                recordRef.current.moveToNextStep(100)
            }else{
                setStartRecord(true);
                recordRef.current.moveToNextStep(syncedRecords * 100 / totalRecords)
            }
        }        
        return () => {
            isMount =false;
        }
    }, [syncedRecords, totalRecords]);
    
    const onSync = () => {                
    }   

    return (
        <View style={[styles.container]}>

           <View style={{flexDirection:'column', flex:1}}>
                <CHorizontalProgressBar ref={tableRef} isStart={startTable} title={ syncedTableCount + "/" + totalTableCount + " Tables Synced"} />
                <CHorizontalProgressBar ref={recordRef} isStart={startRecord} title={ formattedNumber(syncedRecords) + "/" + formattedNumber(totalRecords) + " Records"}/>
           </View>

           {
                isLoading && <RotationAnimation ref={rotationAnimationRef} />
           }

           {
               !isLoading && 
               <View style={ styles.syncButton }>
                    <TouchableOpacity onPress={onSync}>                  
                        <SvgIcon icon="Sync" width='50' height='50' color={whiteLabel().mainText} />                                            
                    </TouchableOpacity>
                </View>
           }
            
        </View>
    )
}

export default BasketSyncProgress;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',   
        alignItems:'flex-end',        
    },
    syncButton: {
        backgroundColor:whiteLabel().actionFullButtonBackground , 
        borderRadius:5, 
        marginLeft:5 ,        
    },
    
});
