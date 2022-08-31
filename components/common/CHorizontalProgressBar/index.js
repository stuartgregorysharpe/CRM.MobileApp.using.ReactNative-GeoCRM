
import { View, Animated, StyleSheet } from 'react-native'
import React , { useEffect, useState , useRef , forwardRef,  useImperativeHandle } from 'react'
import { AppText } from '../AppText';
import { Colors } from '../../../constants';
import { whiteLabel } from '../../../constants/Colors';


export const CHorizontalProgressBar = forwardRef((props, ref) => {

    const { isStart , initailStep } = props;

    const countInterval = useRef(null);
    const [count, setCount] = useState(0);
    
    useImperativeHandle(ref, () => ({
        moveToNextStep(step) {
            setCount(step)
        },
    }));

    // useEffect(() => {        
    //     if(isStart){
    //         setCount((old) => old + 0)
    //     }
    //     // countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
    //     // return () => {
    //     //   clearInterval(countInterval); //when user exits, clear this interval.
    //     // };
    // }, [isStart]);    

    useEffect(() => {
        load(count)
        if (count >= 100) {
          setCount(100);
          clearInterval(countInterval);
        }
    }, [count]);

    const loaderValue = useRef(new Animated.Value(0)).current;    
    const load = (count) => {
        Animated.timing(loaderValue, {
          toValue: count, //final value
          duration: 500, //update value in 500 milliseconds
          useNativeDriver: false,
        }).start();
    };    
    const width = loaderValue.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })
    

    return (
        <View style={styles.container}>
            <AppText title={props.title} style={{marginBottom:5, fontSize:12}} />
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: whiteLabel().mainText, borderRadius:7, width }}/>
            </View>
        </View>
    )
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column", //column direction
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,      
        padding: 5,
    },    
    progressBar: {
        height: 4,
        flexDirection: "row",
        width: '100%',
        backgroundColor: Colors.disabledColor,
        borderColor: '#000',
        borderWidth: 0,        
        borderRadius: 7,
        
    }

  });

