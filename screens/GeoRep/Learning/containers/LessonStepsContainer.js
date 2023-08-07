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

const LessonStepsContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [lessonStepData, setLessonStepData] = useState(null);
    const { course_id } = props;
    const navigation = useNavigation();
    const [step, setstep] = useState(1);

    useEffect(() => {
        handlecourse(1);
    }, []);

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
            // navigation.navigate("CourseDashboard", { "course_id": course_id });
            navigation.navigate("LessonCheckStep", { "course_id": course_id });
            return;
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
            setLessonStepData(response);
            hideLoadingBar();
        } catch (error) {
            expireToken(dispatch, error, alertModalRef);
        } finally {
            hideLoadingBar();
        }
    }

    if (!lessonStepData) { return null; }

    return (
        <ScrollView
            style={{
                padding: 15
            }}
        >
            {
                lessonStepData?.components.map((tempComponent, comId) => {
                    return (
                        <View style={styles.card}>
                            {
                                comId == 0 && <View>
                                    <View style={styles.container}>
                                        <Text style={styles.textCourse}>{lessonStepData?.course_name}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.textOrder}>Lesson {lessonStepData?.lesson_order}: {lessonStepData?.lesson_name}</Text>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.textTopic}>{lessonStepData?.topic_name}</Text>
                                    </View>
                                </View>
                            }

                            {tempComponent?.map((tp, idx) => {
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
                            })}

                            {
                                comId == lessonStepData?.components.length - 1 && <View>
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
                                </View>
                            }
                        </View>
                    )
                })

            }
            <LoadingBar ref={loadingBarRef} />
            <AlertModal ref={alertModalRef} />
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

