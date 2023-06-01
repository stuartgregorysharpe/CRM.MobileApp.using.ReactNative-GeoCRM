import {View, Text, TouchableOpacity, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LearningGradientView from './components/LearningGradientView';
import { AppText } from "../../../components/common/AppText";
import { whiteLabel } from '../../../constants/Colors';  
import SvgIcon from '../../../components/SvgIcon';
import CourseCardItemView from './components/CourseCardItemView';
import LearningContainer from './containers/LearningContainer';
const Learning = props =>{
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
    <SafeAreaView>
      <LearningContainer/>
    </SafeAreaView>
  );
}

export default Learning;