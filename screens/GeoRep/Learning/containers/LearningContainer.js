import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LearningGradientView from '../components/LearningGradientView';
import CourseListCardView from '../components/CourseListCardView';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';

const LearningContainer = props => {
    const [courseList, setCourseList] = useState([]);
    const [userSummary, setUserSummary] = useState({});
    const loadingBarRef = useRef(null);
    useEffect(() => {
      getLearningDashboard()
    }, []);

    const getLearningDashboard = () =>{
        loadingBarRef.current.showModal();
        getApiRequest('v2/user/dashboard', {}, true).then(response =>{
            setCourseList(response.assigned_courses)
            setUserSummary(response.user_summary)
            loadingBarRef.current.hideModal();
        }).catch(error =>{
            loadingBarRef.current.hideModal()
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
        </ScrollView>
    );
}

export default LearningContainer