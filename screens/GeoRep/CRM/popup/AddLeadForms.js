import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, Pressable, } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Divider from '../../../../components/Divider';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import { FormListItem } from '../../Forms/partial/FormListItem';
import { GuideInfoView } from '../../Forms/partial/GuideInfoView';

let isInfoWindow = false;
export default function AddLeadForms(props) {
    const navigationMain = useNavigation();
    const [isInfo, setIsInfo] = useState(false);
    const [bubbleText, setBubleText] = useState({});
    
    const _onTouchStart = (e, text) => {
        setBubleText(text);
        setIsInfo(true);
    }
    
    return (
        <Modal
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                props.onClose();
            }}>
            <Pressable style={{ flex: 1, backgroundColor: '#00000055' }} onPress={() => { props.onClose() }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ backgroundColor: Colors.whiteColor, padding: 10 }}>
                    <TouchableOpacity style={{ padding: 6 }} onPress={() => {
                        props.onClose();
                    }}>
                        <Divider />
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Title style={{ fontFamily: Fonts.primaryBold }}>Forms</Title>
                        <Button
                            labelStyle={{
                                fontFamily: Fonts.primaryRegular,
                                letterSpacing: 0.2
                            }}
                            color={Colors.selectedRedColor}
                            uppercase={false}
                            onPress={() => {
                                props.onClose();
                            }}
                        >
                            Close
                        </Button>
                    </View>
                    <View>
                        <FlatList
                            style={{ margin: 10 }}
                            removeClippedSubviews={false}
                            maxToRenderPerBatch={10}
                            initialNumToRender={10}
                            data={props.formLists}
                            renderItem={
                                ({ item, index }) => (
                                    <View>
                                        <FormListItem key={index} item={item}
                                            onItemPress={() => {
                                                // props.onClose();
                                                if (!isInfoWindow) {
                                                    // navigationMain.navigate("FormQuestions", { 'data': item,pageType:'CRM' });
                                                    // navigationMain.
                                                    navigationMain.navigate("RepForms", {
                                                        screen: "FormQuestions",
                                                        params: { 'data': item,pageType:'CRM' }
                                                    });
                                                } else {
                                                    isInfoWindow = false;
                                                }
                                            }}
                                            onTouchStart={(e, text) => _onTouchStart(e, text)}></FormListItem>
                                    </View>
                                )
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <GuideInfoView
                            visible={isInfo}
                            info={bubbleText}
                            onModalClose={() => setIsInfo(false)}
                        >
                        </GuideInfoView>
                    </View>
                </View>
            </Pressable>
        </Modal>

    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

})