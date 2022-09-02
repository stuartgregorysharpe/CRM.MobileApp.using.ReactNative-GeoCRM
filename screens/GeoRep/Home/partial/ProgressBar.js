import {View, Animated } from 'react-native';
import React, {useRef, useState, useEffect } from 'react';
import Colors from '../../../../constants/Colors';
import {AppText} from '../../../../components/common/AppText';

export default function ProgressBar({steps, colors, height}) {

  const reactive2 = useRef(new Animated.Value(-100)).current;
  const [width, setWidth] = useState(0);

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
    var itemWidth = (width * steps[index]) / getTotal();
    if (steps.length === 4) {
      if (itemWidth == width) {
        return -25 * 3;
      }

      if (itemWidth < 20) {
        return 35 - itemWidth;
      } else if (itemWidth > 45) {
        return -itemWidth * 0.2;
      } else {
        return 9;
      }
    } else {
      if (itemWidth == width) {
        return -25 * 2;
      }

      if (itemWidth < 10) {
        return 35 - itemWidth;
      } else if (itemWidth > 45) {
        return -itemWidth * 0.2;
      } else {
        return 8;
      }
    }
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height: height,
          flexDirection: 'row',
          borderRadius: height,
        }}>
        <Animated.View
          style={{
            justifyContent: 'center',
            height,
            width: (width * steps[0]) / getTotal() + additionalWidth(0),
            borderRadius: height,
            backgroundColor: colors[0],
            zIndex: 5,
            alignItems: 'center',
          }}>
          <AppText color={Colors.whiteColor} title={steps[0]}></AppText>
        </Animated.View>

        <Animated.View
          style={{
            justifyContent: 'center',
            height,
            width: (width * steps[1]) / getTotal() + additionalWidth(1),
            borderTopRightRadius: height,
            borderBottomRightRadius: height,
            backgroundColor: colors[1],
            marginLeft: -12,
            zIndex: 4,
            alignItems: 'center',
          }}>
          <AppText
            color={Colors.whiteColor}
            title={steps[1]}
            style={{marginLeft: 5}}></AppText>
        </Animated.View>

        <Animated.View
          style={{
            justifyContent: 'center',
            height,
            width: (width * steps[2]) / getTotal() + additionalWidth(2),
            borderTopRightRadius: height,
            borderBottomRightRadius: height,
            backgroundColor: colors[2],
            marginLeft: -12,
            zIndex: 3,
            alignItems: 'center',
          }}>
          <AppText
            color={Colors.whiteColor}
            title={steps[2]}
            style={{marginLeft: 5}}></AppText>
        </Animated.View>

        {steps.length >= 4 && (
          <Animated.View
            style={{
              justifyContent: 'center',
              height,
              width: (width * steps[3]) / getTotal() + additionalWidth(3),
              borderTopRightRadius: height,
              borderBottomRightRadius: height,
              backgroundColor: colors[3],
              marginLeft: -12,
              zIndex: 2,
              alignItems: 'center',
            }}>
            <AppText
              color={Colors.whiteColor}
              title={steps[3]}
              style={{marginLeft: 5}}></AppText>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
