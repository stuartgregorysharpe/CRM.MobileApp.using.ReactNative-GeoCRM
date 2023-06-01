import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgIcon from '../../../../components/SvgIcon';
import { AppText } from '../../../../components/common/AppText';
import { whiteLabel } from '../../../../constants/Colors';
import CourseCardItemView from './CourseCardItemView';
const CourseListCardView = props => {
    const {course_list} = props
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
                    style = {{
                        fontSize: 14,
                        marginLeft: 10
                    }}
                    />
                </View>
            </View>
            {
                course_list.map((course, index) => {
                    return <View key={index.toString()} >
                        <TouchableOpacity onPress={() => {}}>
                            <CourseCardItemView item={course}/>
                        </TouchableOpacity>
                        {index < course_list.length - 1 && <View style={{ backgroundColor: '#EAEDF2', height: 2, marginVertical: 5 }} />}
                    </View>
                })
            }
            
        </View>
    );
}

export default CourseListCardView