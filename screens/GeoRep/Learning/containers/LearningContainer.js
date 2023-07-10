import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LearningGradientView from '../components/LearningGradientView';
import CourseListCardView from '../components/CourseListCardView';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../components/modal/AlertModal';
import { expireToken } from '../../../../constants/Helper';

const LearningContainer = props => {
    const [courseList, setCourseList] = useState([]);
    const [userSummary, setUserSummary] = useState({});
    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    useEffect(() => {
      getLearningDashboard()
    }, []);
    const showLoadingBar = () => {
        print("Show Loading Bar")
        if(loadingBarRef.current)
        loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if(loadingBarRef.current)
        loadingBarRef.current.hideModal();
    }
    const getLearningDashboard = () =>{
        showLoadingBar();
        getApiRequest('v2/user/dashboard', {}, true).then(response =>{
            console.log("Learning Dashboard API", response)
            setCourseList(response.assigned_courses)
            setUserSummary(response.user_summary)
            hideLoadingBar();
        }).catch(error =>{
            console.log("Learning Dashboard API", error)
            hideLoadingBar();
            expireToken(dispatch, error , alertModalRef); 
        })
    }
    return (
        <ScrollView
            style= {{
                padding: 15
            }}
        >
            <LearningGradientView total_points = {userSummary.total_points} courses = {userSummary.courses}/>
            {/* Course to complete */}
            <CourseListCardView icon_name = "Learning" section_title = "Course to complete" course_list = {courseList.filter(element => element.status != 'completed')}/>
            {/* Completed Course */}
            <CourseListCardView icon_name = "Verified" section_title = "Completed Courses" course_list = {courseList.filter(element => element.status == 'completed')}/>
            {/* Loading Bar */}
            <LoadingBar ref={loadingBarRef}/>
            {/* Alert Dialog */}
            <AlertModal ref = {alertModalRef}/>
        </ScrollView>
    );
}

export default LearningContainer