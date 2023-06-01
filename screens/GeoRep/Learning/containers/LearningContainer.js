import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LearningGradientView from '../components/LearningGradientView';
import CourseListCardView from '../components/CourseListCardView';

const LearningContainer = props => {
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
      setCourseList([
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
      ])
    }, []);
    return (
        <ScrollView
            style= {{
                padding: 15
            }}
        >
            <LearningGradientView/>
            {/* Course to complete */}
            <CourseListCardView icon_name = "Learning" section_title = "Course to complete" course_list = {courseList}/>
            {/* Completed Course */}
            <CourseListCardView icon_name = "Verified" section_title = "Completed Courses" course_list = {courseList}/>
        </ScrollView>
    );
}

export default LearningContainer