

import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PRIMARY_COLOR } from '../../../../constants/Colors';
import { getLocationInfo } from '../../../../actions/location.action';
import { getLocationLoop, storeLocationLoop } from '../../../../constants/Storage';
import SvgIcon from '../../../../components/SvgIcon';
import DeviceInfo from 'react-native-device-info';
var currentPosition = -1;
var isClickable = true;

export function NextPrev({pageType ,locationId , onUpdated , onStart}){

    // pageType : 'camera' or 'search-lists'  ,  onUpdated: called after pressed "next" or "prev" button.
    const [isPrev, setIsPrev] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const loopLists = useSelector(state => state.location.loopLists);
    const [currentLoopLists , setCurrentLoopList] = useState();    
    const [loopPosition, setLoopPosition] = useState(-1);
    const [nextLocationName, setNextLocationName] = useState("");
    const [prevLocationName, setPrevLocationName] = useState("");

    useEffect(() =>{        
        if(pageType.name === "search-lists"){
            // load from local storage 
            checkIsPrev();       
            setIsNext(true);                        
        }else if(pageType.name === "camera"){
            setCurrentLoopList([...loopLists]);            
            setIsNext(true);
            setIsPrev(true);
        }
    },[])

    useEffect(() =>{
        // get current position from the lists        
        if(loopLists.length > 0){
            var pos = getPosition();                    
        }                
    },[loopLists]);

    const checkIsPrev = async() =>{
        var locationLoops = await getLocationLoop();        
        if(locationLoops.length > 0 ){
            setIsPrev(true);
        }
    }

    const initLocationLoopData = async(pos) => {
        var locationLoops = await getLocationLoop();
        var new_lists = [...locationLoops];
        if( locationLoops.length === 0 || ( locationLoops.length > 0 && locationLoops[locationLoops.length - 1].location_id !== loopLists[pos].location_id ) ){
            new_lists = [...locationLoops , loopLists[pos] ];
        }
        setCurrentLoopList(new_lists);
        currentPosition = new_lists.length - 1;
        await storeLocationLoop(new_lists);        
        if(new_lists.length >= 2){
            setPrevLocationName(new_lists[new_lists.length - 2].name);
            setNextLocationName(loopLists[pos + 1].name)
        }else{
            setNextLocationName(loopLists[pos + 1].name)
        }
    }
    
    getCameraNextPosition = (pos) =>{
        if(pos < loopLists.length - 1){
            return pos +1;
        }
        if(pos === loopLists.length - 1){
            return 0;
        }
    }

    getCameraPrevPosition = (pos) =>{
        if(pos === 0){
            return loopLists.length - 1;
        }
        if(pos > 0){
            return pos -1;
        }
    }

    const getPosition = () => {
        var position = -1;
        loopLists.forEach((element, index) => {
            if(element.location_id === locationId){
                position = index;
            }
        });        
        if(pageType.name === "camera"){                    
            currentPosition = position;
            // Prev and Next Location Name for Tablet
            setNextLocationName(loopLists[getCameraNextPosition(position)].name);
            setPrevLocationName(loopLists[getCameraPrevPosition(position)].name);            
        }else if(pageType.name === "search-lists"){
            setLoopPosition(position); // position in original location list
            initLocationLoopData(position);
        }
    }
    
    const openLocationInfo = (location_id) => {

        isClickable = false;
        getLocationInfo( Number(location_id))
        .then((res) => {            
            onUpdated(res);
            isClickable = true;
        })
        .catch((e) =>{
            isClickable = true;
        })
    }

    const openNewLocationInfo = (location_id) => {        
        isClickable = false;
        getLocationInfo( Number(location_id))
        .then( async(res) => {
            // add new loop item
            let item = {
                name: res.location_name.value,
                address: res.address,
                distance: '',
                status: '',
                location_id: res.location_id,
                status_text_color:''
            }
            setCurrentLoopList([...currentLoopLists, item]);            
            currentPosition = currentPosition + 1;            
            await storeLocationLoop([...currentLoopLists, item]);
            onUpdated(res);
            isClickable = true;
        })
        .catch((e) =>{
            isClickable = true;
        })
    }

    const onPrev = () =>{
        if(isClickable){
            onStart();
            if(pageType.name === "camera"){                                    
                openLocationInfo(currentLoopLists[getCameraPrevPosition(currentPosition)].location_id);            
                currentPosition = getCameraPrevPosition(currentPosition);
                console.log("prev " , loopLists[getCameraPrevPosition(currentPosition)].name);
                console.log("next " , loopLists[getCameraNextPosition(currentPosition)].name);
                setNextLocationName(loopLists[getCameraNextPosition(currentPosition)].name);
                setPrevLocationName(loopLists[getCameraPrevPosition(currentPosition)].name);
            }else if(pageType.name === "search-lists"){            
                console.log("currentPosition",currentPosition);
                if(currentPosition > 0){
                    openLocationInfo(currentLoopLists[currentPosition - 1].location_id);                
                    currentPosition =  currentPosition - 1 ;

                    if(currentPosition === 0){
                        setIsPrev(false);
                    }else{ 
                        // Next & Prev button text
                        console.log("prev",currentLoopLists[currentPosition - 1].name )
    
                        setPrevLocationName(currentLoopLists[currentPosition - 1].name);
                        if(currentPosition < currentLoopLists.length - 1){                            
                            console.log("next",currentLoopLists[currentPosition + 1].name )
                            setNextLocationName(currentLoopLists[currentPosition + 1].name);                        
                        }
                    }
    
                }else{
                    setIsPrev(false);
                }
            }
        }
        
    }

    const onNext = () =>{
        if(isClickable){
            onStart();
            if(pageType.name === "camera"){
                openLocationInfo(currentLoopLists[getCameraNextPosition(currentPosition)].location_id);
                currentPosition = getCameraNextPosition(currentPosition);
                setNextLocationName(loopLists[getCameraNextPosition(currentPosition)].name);
                setPrevLocationName(loopLists[getCameraPrevPosition(currentPosition)].name);            
            }else if(pageType.name === "search-lists"){            
                if(currentPosition === currentLoopLists.length - 1){
                    if( loopPosition <= loopLists.length - 2){ // can go to next
                        console.log("currentLoopLists",currentLoopLists);
                        console.log("prev button name ", currentLoopLists[currentPosition].name);
                        setPrevLocationName(currentLoopLists[currentPosition].name);                    
                        if(loopPosition + 1 <= loopLists.length - 2){
                            console.log("next button name ", loopLists[loopPosition + 2].name);
                            setNextLocationName(loopLists[loopPosition + 2].name);
                        }else{
                            setIsNext(false)
                        }
                        openNewLocationInfo(loopLists[loopPosition + 1].location_id);
                        setLoopPosition(loopPosition + 1);
                        setIsPrev(true);                    
                        // Show button                    
                    }
                }else if(currentPosition < currentLoopLists.length - 1){
                    openLocationInfo(currentLoopLists[currentPosition + 1].location_id);                       
                    currentPosition = currentPosition + 1;
                    setIsPrev(true);
                    if(currentPosition === currentLoopLists.length - 1){
                        setPrevLocationName(currentLoopLists[currentPosition-1].name);
                        setNextLocationName(loopLists[loopPosition + 1].name);
                    }else{
                        setPrevLocationName(currentLoopLists[currentPosition-1].name);
                        setNextLocationName(currentLoopLists[currentPosition+1].name);
                    } 
                }
            }  
        }
          
    }
    
    return <Fragment>
        <View style={styles.container}>
            
            {
                isPrev &&
                <TouchableOpacity style={styles.leftContainer} 
                    onPress={() => {               
                        onPrev();                        
                    }}>
                    <View style={[styles.prevStyle, {paddingLeft:10, paddingRight:10}]}>
                        <SvgIcon icon="Arrow_Left_Btn" width='7px' height='15px' />
                        <Text style={{marginLeft:5,fontSize:12 , color:PRIMARY_COLOR , fontWeight:'700' }} >
                            { !DeviceInfo.isTablet() ? 'Previous' : prevLocationName }
                        </Text>
                    </View>            
                </TouchableOpacity>   
            }
            
            {
                isNext && 
                <TouchableOpacity style={[styles.rightContainer ]}  
                    onPress={() =>{                    
                        onNext();
                    }}>
                    <View style={[styles.prevStyle , { paddingLeft:20, paddingRight:10 }]}>
                        <Text style={{marginRight:13, fontSize:12 , color:PRIMARY_COLOR , fontWeight:'700'}}>                            
                            { !DeviceInfo.isTablet() ? 'Next' : nextLocationName }
                        </Text>
                        <SvgIcon icon="Arrow_Right_Btn" width='7px' height='15px' />
                    </View>            
                </TouchableOpacity>
            }
                        
        </View>
    </Fragment>

}

const styles = StyleSheet.create({
    container:{
        marginTop:3,
        flex:1,        
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5
    },
    leftContainer:{
        flexGrow:1,
        alignItems:'flex-start'
    },   
    rightContainer:{
        flexGrow:1,
        alignItems:'flex-end'
    },   
    prevStyle:{             
        flexDirection:'row',
        alignItems:'center',        
        justifyContent:'center',
        // width:Dimensions.get('window').width/5,
        borderWidth:2,
        borderRadius:15,
        borderColor:PRIMARY_COLOR,        
        padding:3
    },
    
});

