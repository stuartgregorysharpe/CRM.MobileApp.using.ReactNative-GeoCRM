import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const CustomImageDialog = ({ visible, data, onControlDialogVisible }) => {
    const [reqImageHeight, setImageHeight] = useState(Dimensions.get('window').width * 0.5);
    let imageWidth = null;
    if (data != null && data.length != 0) {
        Image.getSize(data.notificationImage, (width, height) => {
            const screenWidth = Dimensions.get('window').width;
            const scaleFactor = width / screenWidth;
            const imageHeightRq = height / scaleFactor;
            imageWidth = screenWidth;
            setImageHeight(imageHeightRq);
        });
    }

    const feedTypeValidation = (data, imageWidth, reqImageHeight) => {
        return <Image
            backgroundColor='transparent'
            source={{ uri: data.notificationImage }}
            style={{
                width: imageWidth,
                height: reqImageHeight,
            }}>
        </Image>

    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"slide"}
            onRequestClose={() => { onControlDialogVisible }}>
            <View style={{
                flex: 1,
            }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#00000099',
                        justifyContent: "center",
                        paddingHorizontal: 5.0
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                padding: 5,
                                // marginHorizontal: 10.0,
                                marginTop: 20.0
                            }}
                            onPress={onControlDialogVisible}>
                            <Icon name='closecircle' size={30} color={'#ffffff'} />

                        </TouchableOpacity>
                        {feedTypeValidation(data, imageWidth, reqImageHeight)}

                    </View>
                </ScrollView>
            </View>
        </Modal >
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default CustomImageDialog;