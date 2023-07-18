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

const LessonListCardView = props => {
    const navigation = useNavigation();

    const { lesson_list, quiz, course_id, course_title, course_description } = props


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

    function handlelessonstart() {
        showLoadingBar();
        getApiRequest('v2/user/course-dashboard', { course_id: course_id }, true).then(response => {
            console.log("course dashboard response is same as :: ", response)
            setcourse_content(response);
            hideLoadingBar();
        }).catch(error => {
            hideLoadingBar();
            expireToken(dispatch, error, alertModalRef);
        })
    }

    return (
        <View style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            marginTop: 20
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
                <View style={{ backgroundColor: 'red', borderRadius: 8, paddingHorizontal: 7 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TermsToKnow', {
                            "course_id": course_id,
                            "course_title": course_title,
                            "course_description": course_description
                        });
                    }}>
                        <Text style={{ color: "white" }}>Terms To Know</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                lesson_list?.map((tp, idx) => {
                    return <View key={tp?.lesson_id?.toString()} >
                        <TouchableOpacity onPress={async () => {
                            navigation.navigate('LessonSteps', {
                                'lesson_id': tp?.lesson_id
                            });
                        }}>
                            <LessonCardItemView item={tp} idx={idx} />
                        </TouchableOpacity>
                        {idx < lesson_list.length - 1 && <View style={{ backgroundColor: '#EAEDF2', height: 2, marginVertical: 0 }} />}
                    </View>
                })
            }
            <View style={{ backgroundColor: '#EAEDF2', height: 2, marginVertical: 0 }} />
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate("QuizSteps", {
                        "quiz_id": quiz?.quiz_id,
                        "course_id": course_id
                    })
                }
            }>
            <QuizCardItemView item={quiz} />
            </TouchableOpacity>

        </View>
    );
}

export default LessonListCardView