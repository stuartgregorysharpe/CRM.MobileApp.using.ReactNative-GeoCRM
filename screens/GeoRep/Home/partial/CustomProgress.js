import { View, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Colors, { TEXT_COLOR } from '../../../../constants/Colors';
import { AppText } from '../../../../components/common/AppText';

export default function CustomProgress({ count, color, height, percentage }) {

    const reactive2 = useRef(new Animated.Value(-100)).current;
    const [width, setWidth] = useState(0);
    const [textWidth,setTextWidth] = useState(0);

    useEffect(() => {
        reactive2.setValue(0);
    }, [count, width]);

    const getTotal = () => {
        var sum = 100;
        // steps.forEach(element => {
        //     sum = sum + element;
        // });
        // if (sum == 0) {
        //     return 1;
        // }
        return sum;
    };

    return (
        <View
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth);
            }}
            style={{
                // height: height,
                flexDirection: 'row',
                borderRadius: height,
                alignItems: 'center',
            }}>
            <Animated.View
                style={{
                    justifyContent: 'center',
                    height,
                    width: (width * percentage) / 100 - (textWidth*percentage/100),
                    borderRadius: 2,
                    backgroundColor: color,
                    zIndex: 5,
                    alignItems: 'center',
                }}>

            </Animated.View>
            <View onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setTextWidth(newWidth);
            }}>
                <AppText type="secondaryBold" color={TEXT_COLOR} title={count} style={{ fontSize: 12,marginHorizontal:5 }}></AppText>
            </View>

        </View>
    );
}
