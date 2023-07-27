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
import ImageShowCaseStepView from '../components/lessonSteps/ImageShowCaseStepView.js';
import ImageGridStepView from '../components/lessonSteps/ImageGridStepView.js';
import ImageCrousalStepView from '../components/lessonSteps/ImageCrousalStepView.js';

import TrueFalseStepView from '../components/quizSteps/TrueFalseStepView.js'
import MultiSelectStepView from '../components/quizSteps/MultiSelectStepView.js'
import TextStepView from '../components/quizSteps/TextStepView.js'
import MultipleStepView from '../components/quizSteps/MultipleStepView.js'
import SelectImageStepView from '../components/quizSteps/SelectImageStepView.js'



const LessonStepsContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [quizAllData, setQuizAllData] = useState(null);
    const { quiz_id } = props;
    const { course_id } = props;
    const navigation = useNavigation();
    const [step, setstep] = useState(0);

    useEffect(() => {
        handlecourse(quiz_id);
    }, []);

    const handlecourse = async (quiz_id) => {
        showLoadingBar();
        try {
            const response = await getApiRequest('v2/user/quiz-details', { quiz_id: quiz_id }, true);
            setQuizAllData(response);
            hideLoadingBar();
        } catch (error) {
            expireToken(dispatch, error, alertModalRef);
        } finally {
            hideLoadingBar();
        }
    }

    const showLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

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

    if (!quizAllData) { return null; }

    console.log(quizAllData.quiz_items[0].components[0].value, "XXXXXX")
    return (
        <ScrollView
            style={{
                padding: 15
            }}
        >

            <View style={styles.card}>

                <View>
                    <View style={styles.container}>
                        <Text style={styles.textCourse}>{quizAllData?.quiz_title}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textOrder}>QUIZ: QUESTION {step + 1}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textTopic}>Question {step + 1}</Text>
                    </View>
                </View>
                {quizAllData?.quiz_items[step]?.components?.map((tp, idx) => {
                    if (tp?.component_type === "guidance") {
                        return <GuidanceStepView value={tp?.value} prefix_icon={tp.prefix_icon} suffix_icon={tp?.suffix_icon} background_color={tp?.background_color} />
                    }
                    if (tp?.component_type === "heading") {
                        return <HeadingStepView value={tp?.value} />
                    }
                    if (tp?.component_type === "paragraph") {
                        return <ParagraphStepView value={tp?.value} />
                    }
                    if (tp?.component_type === "checkbox") {
                        return <CheckBoxStepView value={tp?.value} />
                    }
                    if (tp?.component_type === "bullet_points") {
                        return <BulletStepView value={tp?.value} icon={tp.bullet_icon} />
                    }
                    if (tp?.component_type === "image_showcase") {
                        return <ImageShowCaseStepView value={tp?.value} />
                    }
                    if (tp?.component_type === "image_grid") {
                        return <ImageGridStepView value={tp?.value} />
                    }
                    if (tp?.component_type === "image_carousel") {
                        return <ImageCrousalStepView value={tp?.value} />
                    }
                    if(tp?.component_type === "true_false") {
                        return <TrueFalseStepView label = {tp?.label} />
                    }
                    if(tp?.component_type === "multi_select") {
                        return <MultiSelectStepView label = {tp?.label} options = {tp?.options} />
                    }
                    if(tp?.component_type === "text") {
                        return <TextStepView label = {tp?.label} />
                    }
                    if(tp?.component_type === "multiple") {
                        return <MultipleStepView label = {tp?.label} options = {tp?.options} />
                    }
                    if(tp?.component_type === "select_image"){
                        return <SelectImageStepView label = {tp?.label} options = {tp?.options} />
                    }
                })}


                {
                    step < quizAllData?.quiz_items.length && <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <ProgressIndicatorView total={parseInt(quizAllData?.quiz_items?.length)} completed={step + 1}
                                    // <ProgressIndicatorView total={parseInt(quizAllData?.quiz_items?.length) - 1} completed={parseInt(parseInt(quizAllData?.pass_percent)/100 * quizAllData?.quiz_items?.length)}
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
                                step >= 1 && <BackButton
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
                    </View>
                }
            </View>

            {/* <LoadingBar ref={loadingBarRef} /> */}
            {/* <AlertModal ref={alertModalRef} /> */}
        </ScrollView>
    );
}

export default LessonStepsContainer;

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "gray",
    },
    height10: {
        height: 10
    },
    height30: {
        height: 30
    },
    container: {
        flexDirection: 'row',
        marginVertical: 0,
        alignItems: 'center',
    },
    textCourse: {
        marginHorizontal: 2,
        flex: 1,
        fontWeight: '100',
        fontSize: 16,
        color: 'gray',
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    textOrder: {
        marginHorizontal: 2,
        flex: 1,
        fontWeight: '100',
        fontSize: 16,
        color: 'red',
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
    textTopic: {
        marginHorizontal: 2,
        flex: 1,
        fontWeight: '900',
        fontSize: 30,
        color: 'black',
        fontFamily: (Platform.OS === 'ios') ? "Gilroy-SemiBold" : "Radomir Tinkov - Gilroy-SemiBold",
    },
});

