import { View, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Colors from '../../../../../../constants/Colors';
import { AppText } from '../../../../../../components/common/AppText';

export default function LindtFestivalProgress({ steps, colors, height, titles, titleSize }) {
    // console.log("Indicator: ", steps);
    const reactive2 = useRef(new Animated.Value(-100)).current;
    const [width, setWidth] = useState(0);
    const [firstTextWidth, setFirstTextWidth] = useState(0);
    const [secondTextWidth, setSecondTextWidth] = useState(0);

    useEffect(() => {
        reactive2.setValue(0);
    }, [steps, width]);

    const getTotal = () => {
        var sum = 0;
        steps.forEach(element => {
            sum = sum + element;
        });
        if (sum == 0) {
            return 1;
        }
        return sum;
    };

    const additionalWidth = index => {
        if(steps[index]==100){
            return -8;
        }

        if(steps[index]>85){
            return -40;
        }else if(steps[index]<10){
            return 40
        }
        return 0;
    };

    return (
        <View style={{ flexDirection: 'column' }}>
            <View
                onLayout={e => {
                    const newWidth = e.nativeEvent.layout.width;
                    setWidth(newWidth);
                }}
                style={{
                    height: height,
                    flexDirection: 'row',
                    borderRadius: height,
                    width: '100%'
                }}>
                <Animated.View
                    style={{
                        justifyContent: 'center',
                        height,
                        width: (width * steps[0]) / getTotal()+additionalWidth(0),
                        borderRadius: height,
                        backgroundColor: colors[0],
                        zIndex: 5,
                        alignItems: 'center',

                    }}>
                    <View onLayout={e => {
                        setFirstTextWidth(e.nativeEvent.layout.width)
                    }}>
                        <AppText type="secondaryBold" style={{ fontSize: 10 }} color={Colors.whiteColor}
                            title={titles[0]}></AppText>
                    </View>

                </Animated.View>
                {steps[1]>0 && <Animated.View
                    style={{
                        justifyContent: 'center',
                        height,
                        width: (width * steps[1]) / getTotal()+additionalWidth(1),
                        borderRadius: height,
                        backgroundColor: colors[1],
                        zIndex: 4,
                        alignItems: 'center',
                        marginLeft:-12

                    }}>
                    <View onLayout={e => {
                        setSecondTextWidth(e.nativeEvent.layout.width)
                    }}>
                        <AppText type="secondaryBold" style={{ fontSize: 10 }} color={Colors.whiteColor}
                            title={titles[1]}></AppText>
                    </View>

                </Animated.View>}
            </View>
        </View>
    );
}
