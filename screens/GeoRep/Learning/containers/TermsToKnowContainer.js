import { View, Text, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import TermsToKnowGradientView from '../components/TermsToKnowGradientView.js';
import TermsCardView from '../components/TermsCardView.js';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../components/modal/AlertModal';
import { expireToken } from '../../../../constants/Helper';
import { SubmitButton } from '../../../../components/shared/SubmitButton';

const TermsToKnowContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [terms_content, setterms_content] = useState({});
    const { course_id, course_title, course_description } = props

    useEffect(async () => {

        function handlecourse() {
            showLoadingBar();
            getApiRequest('v2/user/course-terms-to-know', { course_id: course_id }, true).then(response => {
                console.log("Terms To Know :: ", response)
                setterms_content(response);
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
            <TermsToKnowGradientView course_title = {course_title} course_description = {course_description} />
            <TermsCardView icon_name="Question" section_title="Terms To Know" content = {terms_content?.terms} />
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

export default TermsToKnowContainer

const styles = StyleSheet.create({
    height10:{
        height: 10
    },
    height30:{
        height: 30
    }
});