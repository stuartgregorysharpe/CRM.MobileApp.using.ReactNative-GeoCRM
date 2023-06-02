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
            console.log('Learning Dashboard Api result', response)
            let res = {
                "status": "success",
                "user_summary": {
                    "name": "Test User 1",
                    "image": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                    "total_points": "200",
                    "courses": {
                        "completed": "2",
                        "total": "6"
                    }
                },
                "current_course": {
                    "course_id": "6546356546346",
                    "course_name": "Water & Electricity Sales",
                    "course_icon": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                    "points": "200",
                    "lessons": {
                        "completed": "1",
                        "total": "4"
                    },
                    "progress": "25"
                },
                "assigned_courses": [
                    {
                        "course_id": "6546356546346",
                        "status": "in_progress",
                        "course_name": "Water & Electricity Sales",
                        "course_icon": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                        "lessons": {
                            "completed": "1",
                            "total": "4"
                        },
                        "points": "200",
                        "next_item": {
                            "type": "lesson_step",
                            "id": "574887648748745"
                        }
                    },
                    {
                        "course_id": "9865345634636",
                        "status": "in_progress",
                        "course_name": "Course Title",
                        "course_icon": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                        "lessons": {
                            "completed": "1",
                            "total": "5"
                        },
                        "points": "200",
                        "next_item": {
                            "type": "lesson_step",
                            "id": "3252354266"
                        }
                    },
                    {
                        "course_id": "986534525634636",
                        "status": "in_progress",
                        "course_name": "Long Course Name Example Course 225",
                        "course_icon": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                        "lessons": {
                            "completed": "2",
                            "total": "7"
                        },
                        "points": "200",
                        "next_item": {
                            "type": "lesson_step",
                            "id": "37547476"
                        }
                    },
                    {
                        "course_id": "5234523452345",
                        "status": "completed",
                        "course_name": "POPIA Policy Course",
                        "course_icon": "https://dev.georep.com/common/assets/users/profile_pics/geo_rep_fav.png",
                        "lessons": {
                            "completed": "7",
                            "total": "7"
                        },
                        "points": "200",
                        "next_item": {
                            "type": "",
                            "id": ""
                        }
                    }
                ]
            }

            setCourseList(res.assigned_courses)
            setUserSummary(res.user_summary)
            loadingBarRef.current.hideModal();

        }).catch(error =>{
            console.log("API for Learning Dashboard Error:", error)
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