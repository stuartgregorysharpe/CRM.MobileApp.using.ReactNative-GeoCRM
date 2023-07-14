import React, { useRef, useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const ImageCarousel = ({ value }) => {
    const { width } = Dimensions.get('window');
    const height = width * 0.6;

    const scrollViewRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    const scrollToIndex = (index) => {
        scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {value.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width, height }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {value.map((_, index) => (
                    currentIndex === index ? <Icon name="controller-record" style={styles.circle} size={12} color="#0000FF" /> : <Icon style={styles.circle} name="controller-record" size={12} color="#807e7e" />
                ))}
            </View>
            <TouchableOpacity style={styles.prevButton} onPress={() => scrollToIndex(Math.max(currentIndex - 1, 0))}>
                <Icon name="chevron-thin-left" size={20} color="#0000FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => scrollToIndex(Math.min(currentIndex + 1, value.length - 1))}>
                <Icon name="chevron-thin-right" size={20} color="#0000FF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        padding: 25,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
    },
    prevButton: {
        position: 'absolute',
        left: 3,
        bottom: '50%',
    },
    nextButton: {
        position: 'absolute',
        right: 3,
        bottom: '50%',
    },
    circle: {
        marginRight: 5
    }
});

export default ImageCarousel;
