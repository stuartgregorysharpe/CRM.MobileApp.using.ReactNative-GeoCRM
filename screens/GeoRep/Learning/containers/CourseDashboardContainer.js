import { View, Text, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import CourseContentGradientView from '../components/CourseContentGradientView';
import LessonListCardView from '../components/LessonListCardView';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../components/modal/AlertModal';
import { expireToken } from '../../../../constants/Helper';
import { SubmitButton } from '../../../../components/shared/SubmitButton';

const CourseDashboardContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [course_content, setcourse_content] = useState({});
    const { course_id } = props

    useEffect(async () => {

        function handlecourse() {
            showLoadingBar();
            getApiRequest('v2/user/course-dashboard', { course_id: course_id }, true).then(response => {
                setcourse_content(response);
                hideLoadingBar();
            }).catch(error => {
                hideLoadingBar();
                expireToken(dispatch, error, alertModalRef);
            })
        }
        handlecourse();
    }, []);

    const showLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

    return (
        <ScrollView
            style={{
                padding: 15
            }}
        >
            <CourseContentGradientView content={course_content} />

            <LessonListCardView icon_name="Learning" section_title="Course Lessons" lesson_list={course_content?.lessons} quiz={course_content?.quiz} />
            <View style={styles.height10}></View>
            <SubmitButton
                style={{ marginHorizontal: 10 }}
                title="Start Next Lesson"
            />
            <View style={styles.height30}></View>
            <LoadingBar ref={loadingBarRef} />
            <AlertModal ref={alertModalRef} />
        </ScrollView>
    );
}

export default CourseDashboardContainer

const styles = StyleSheet.create({
    height10:{
        height: 10
    },
    height30:{
        height: 30
    }
});