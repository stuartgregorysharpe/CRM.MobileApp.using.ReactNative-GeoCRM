import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { getApiRequest } from '../../../../actions/api.action';
import LoadingBar from '../../../../components/LoadingView/loading_bar';
import AlertModal from '../../../../components/modal/AlertModal';
import { expireToken } from '../../../../constants/Helper';
import { SubmitButton } from '../../../../components/shared/SubmitButton';
import { BackButton } from '../../../../components/shared/BackButton';
import { useNavigation } from '@react-navigation/native';
import ProgressIndicatorView from '../components/ProgressIndicatorView';
import ParagraphStepView from '../components/lessonSteps/ParagraphStepView';
import HeadingStepView from '../components/lessonSteps/HeadingStepView.js';
import CheckBoxStepView from '../components/lessonSteps/CheckBoxStepView.js';
import BulletStepView from '../components/lessonSteps/BulletStepView.js';
import GuidanceStepView from '../components/lessonSteps/GuidanceStepView.js';


const LessonStepsContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [lessonStepData, setlessonStepData] = useState(null);  // initialize with null
    const { course_id } = props

    const navigation = useNavigation();

    useEffect(() => {
        handlecourse(1);  // fetch data when component mounts
    }, []);

    const showLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

    const [step, setstep] = useState(1);

    const handlestep = (string) => {
        if (step >= 4 && string === "plus") {
            navigation.navigate("CourseDashboard", { "course_id": course_id });
            console.log("outWS");
        }
        if (string === "plus") {
            setstep(prevstep => {
                let newStep = prevstep + 1;
                handlecourse(newStep);
                return newStep;
            });
        }
        if (string === "minus") {
            setstep(prevstep => {
                let newStep = prevstep - 1;
                if (newStep > 0) handlecourse(newStep);
                return newStep;
            });
        }
    }

    const handlecourse = async (item_id) => {
        showLoadingBar();
        try {
            const response = await getApiRequest('v2/user/lesson-item-details', { type: "lesson_step", item_id: item_id }, true);
            console.log("LessonSteps :: ", response);
            setlessonStepData(response);
        } catch (error) {
            expireToken(dispatch, error, alertModalRef);
        } finally {
            hideLoadingBar();
        }
    }

    console.log(lessonStepData?.components, "components");

    if (!lessonStepData) return null;  // if data is not loaded yet, return null or a loading indicator

    return (
        <ScrollView
            style={{
                padding: 15
            }}
        >
            {/* start content */}

            {lessonStepData?.components?.map((tp, idx) => {
                if (tp?.component_type === "paragraph") {
                    return <ParagraphStepView value={tp?.value} />
                }
            })}

            {lessonStepData?.components?.map((tp, idx) => {
                if (tp?.component_type === "heading") {
                    return <HeadingStepView value={tp?.value} />
                }
            })}

            {lessonStepData?.components?.map((tp, idx) => {
                if (tp?.component_type === "checkbox") {
                    return <CheckBoxStepView value={tp?.value} />
                }
            })}

            {lessonStepData?.components?.map((tp, idx) => {
                if (tp?.component_type === "bullet_points") {
                    return <BulletStepView value={tp?.value} icon = {tp.bullet_icon} />
                }
            })}

            {lessonStepData?.components?.map((tp, idx) => {
                if (tp?.component_type === "guidance") {
                    return <GuidanceStepView value={tp?.value} prefix_icon = {tp.prefix_icon} suffix_icon={tp?.suffix_icon} background_color= {tp?.background_color}/>
                }
            })}


            {/* end content */}

            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <ProgressIndicatorView total={parseInt(lessonStepData?.progress?.total)} completed={parseInt(lessonStepData?.progress?.completed)}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            flex: 1,
                            height: 5,
                        }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                {
                    step > 1 && <BackButton
                        title="Back"
                        style={{ flex: 1, marginHorizontal: 10 }}
                        onSubmit={() => handlestep("minus")}
                    />
                }
                <SubmitButton
                    style={{ flex: 1, marginHorizontal: 10 }}
                    title="Next"
                    onSubmit={() => handlestep('plus')}
                />
            </View>

            <View style={styles.height30}></View>
            <LoadingBar ref={loadingBarRef} />
            <AlertModal ref={alertModalRef} />
        </ScrollView>
    );
}

export default LessonStepsContainer;

const styles = StyleSheet.create({
    height10: {
        height: 10
    },
    height30: {
        height: 30
    }
});
