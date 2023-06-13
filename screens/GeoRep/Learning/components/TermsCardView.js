import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import SvgIcon from '../../../../components/SvgIcon';
import { AppText } from '../../../../components/common/AppText';
import { whiteLabel } from '../../../../constants/Colors';
import LessonCardItemView from './LessonCardItemView';
import QuizCardItemView from './QuizCardItemView';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../components/modal/AlertModal';
import { expireToken } from '../../../../constants/Helper';
import { useNavigation } from '@react-navigation/native';

const TermsCardView = props => {
    const navigation = useNavigation();

    const { content } = props


    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);

    const showLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

    return (
        <View style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            marginTop: -30
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SvgIcon
                        icon={props.icon_name}
                        width="20px"
                        height="20px"
                    />
                    <AppText type="" color={whiteLabel().mainText} size="big" title={props.section_title}
                        style={{
                            fontSize: 14,
                            marginLeft: 10
                        }}
                    />
                </View>
            </View>

            {
                content?.map((tp, idx) => {
                    return <View key={idx} >
                        <View style={{ backgroundColor: '#EAEDF2', height: 2, marginVertical: 5 }} />
                        <TouchableOpacity onPress={() => { }}>
                            <View style={{ marginHorizontal: 2, flex: 1 }}>
                                <Text style={{
                                    fontWeight: '900',
                                    fontSize: 16,
                                    color: 'black',
                                    fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                                }}>{tp.term}</Text>

                                <Text style={{
                                    fontWeight: '600',
                                    fontSize: 13,
                                    color: 'black',
                                    paddingVertical: 5,
                                    fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
                                }}>{tp.description}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                })
            }
        </View>
    );
}

export default TermsCardView


