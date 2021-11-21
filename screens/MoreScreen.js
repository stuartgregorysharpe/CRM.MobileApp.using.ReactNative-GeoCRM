// import * as React from 'react';
// import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

// export default function MoreScreen(props) {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text>MoreScreen</Text>
//       </View>
//     </SafeAreaView>
//   )
// }


import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Pressable,
  View,
  Text,
} from 'react-native';

const App = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

    const startAnimation = (toValue) => {
      Animated.timing(animatedValue, {
        toValue,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    const left = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['2%', '50%'],
      extrapolate: 'clamp',
    });

    const scale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.9, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Animated.View style={[styles.slider, { left }]} />
          <Pressable
            style={styles.clickableArea}
            onPress={startAnimation.bind(null, 0)}>
            <Animated.Text
              style={[styles.sliderText, { transform: [{ scale }] }]}>
              Active
            </Animated.Text>
          </Pressable>
          <Pressable
            style={styles.clickableArea}
            onPress={startAnimation.bind(null, 1)}>
            <Animated.Text
              style={[styles.sliderText, { transform: [{ scale }] }]}>
              History
            </Animated.Text>
          </Pressable>
        </View>
      </View>
    );      
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderContainer: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
    },
    clickableArea: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderText: {
      fontSize: 17,
      fontWeight: '500',
    },
    slider: {
      position: 'absolute',
      width: '48%',
      height: '90%',
      borderRadius: 10,
      backgroundColor: '#f4f4f4',
    },
  });

  export default App;