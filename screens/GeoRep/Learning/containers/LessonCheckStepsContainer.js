import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
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
import SvgIcon from '../../../../components/SvgIcon';

const LessonStepsContainer = props => {

    const loadingBarRef = useRef(null);
    const alertModalRef = useRef(null);
    const [lessonStepData, setLessonStepData] = useState(null);
    const { course_id } = props;
    const navigation = useNavigation();
    const [step, setstep] = useState(5);

    const [modalVisible, setModalVisible] = useState(false);

    const [correct_answer_value, setCorrectAnswerValue] = useState(null);
    const correct_answer = (param) => {
        console.log("FinalData:::::", param)
        setCorrectAnswerValue(param);
    }

    function arraysEqual(a, b) {
        if (a?.length !== b?.length) return false;

        for (let i = 0; i < a?.length; i++) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    }

    useEffect(() => {
        handlecourse(5);
    }, []);

    const showLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.showModal();
    }

    const hideLoadingBar = () => {
        if (loadingBarRef.current)
            loadingBarRef.current.hideModal();
    }

    const handleModal = () => {
        setModalVisible(true);
        const data = lessonStepData?.components[lessonStepData?.components.length - 1];
        if(!data.correct_answer)
        handlestep('plus')
    }

    const handlestep = (string) => {
        if (step >= 9 && string === "plus") {
            navigation.navigate("CourseDashboard", { "course_id": course_id });
        }
        if (string === "plus") {
            setModalVisible(false)
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
    console.log("This is the data from check in::", lessonStepData)

    return (
        <ScrollView
            style={{
                padding: 15
            }}
        >
            <View style={styles.card}>
                {
                    lessonStepData?.components.map((tp, comId) => {
                        return (
                            <View>
                                {
                                    comId == 0 && <View>
                                        <View style={styles.container}>
                                            <Text style={styles.textCourse}>{lessonStepData?.course_name}</Text>
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.textOrder}>CHECK IN {lessonStepData?.lesson_order}: {lessonStepData?.lesson_name}</Text>
                                        </View>
                                        <View style={styles.container}>
                                            <Text style={styles.textTopic}>{lessonStepData?.topic_name}</Text>
                                        </View>
                                    </View>
                                }

                                {tp?.component_type === "guidance" && <GuidanceStepView value={tp?.value} prefix_icon={tp.prefix_icon} suffix_icon={tp?.suffix_icon} background_color={tp?.background_color} />}

                                {tp?.component_type === "heading" && <HeadingStepView value={tp?.value} />}

                                {tp?.component_type === "paragraph" && <ParagraphStepView value={tp?.value} />}

                                {tp?.component_type === "checkbox" && <CheckBoxStepView value={tp?.value} />}

                                {tp?.component_type === "bullet_points" && <BulletStepView value={tp?.value} icon={tp.bullet_icon} />}

                                {tp?.component_type === "image_showcase" && <ImageShowCaseStepView value={tp?.value} />}

                                {tp?.component_type === "image_grid" && <ImageGridStepView value={tp?.value} />}

                                {tp?.component_type === "image_carousel" && <ImageCrousalStepView value={tp?.value} />}

                                {tp?.component_type === "true_false" && <TrueFalseStepView label={tp?.label} correct_answer={correct_answer} />}

                                {tp?.component_type === "multi_select" && <MultiSelectStepView label={tp?.label} options={tp?.options} correct_answer={correct_answer} />}

                                {tp?.component_type === "text" && <TextStepView label={tp?.label} />}

                                {tp?.component_type === "multiple" && <MultipleStepView label={tp?.label} options={tp?.options} correct_answer={correct_answer}/>}

                                {tp?.component_type === "select_image" && <SelectImageStepView label={tp?.label} options={tp?.options} correct_answer={correct_answer}/>}


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
                                                onSubmit={() => handleModal()}
                                            />
                                        </View>
                                        <View style={styles.height30}></View>
                                    </View>
                                }

                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(false);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>

                                            <View style={{ flex: 1, paddingTop: 60 }}>

                                                {
                                                    (correct_answer_value == tp?.correct_answer || arraysEqual(correct_answer_value, tp?.correct_answer)) && <View style={{ alignItems: "center" }}>
                                                        <SvgIcon icon="failAnswerIcon" width="100" height="100" />
                                                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: "#133c8b" }}>Good Job!!!</Text>
                                                    </View>
                                                }

                                                {
                                                    (correct_answer_value != tp?.correct_answer && !arraysEqual(correct_answer_value, tp?.correct_answer)) && <View style={{ alignItems: "center" }}>
                                                        <SvgIcon icon="successAnswerIcon" width="100" height="100" />
                                                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: "red" }}>Incorrect!</Text>
                                                    </View>
                                                }

                                                {tp?.component_type === "true_false" && correct_answer_value == tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.correct_answer_feedback}</Text>}

                                                {tp?.component_type === "true_false" && correct_answer_value != tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.incorrect_answer_feedback}</Text>}

                                                {tp?.component_type === "multiple" && correct_answer_value == tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.correct_answer_feedback}</Text>}

                                                {tp?.component_type === "multiple" && correct_answer_value != tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.incorrect_answer_feedback}</Text>}

                                                {tp?.component_type === "select_image" && correct_answer_value == tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.correct_answer_feedback}</Text>}

                                                {tp?.component_type === "select_image" && correct_answer_value != tp?.correct_answer &&
                                                    <Text style={styles.modalText}>{tp?.incorrect_answer_feedback}</Text>}

                                                {tp?.component_type === "multi_select" && arraysEqual(correct_answer_value, tp?.correct_answer) &&
                                                    <Text style={styles.modalText}>{tp?.correct_answer_feedback}</Text>}

                                                {tp?.component_type === "multi_select" && !arraysEqual(correct_answer_value, tp?.correct_answer) &&
                                                    <Text style={styles.modalText}>{tp?.incorrect_answer_feedback}</Text>}

                                            </View>

                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', marginBottom: 20 }}
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <SubmitButton
                                                    style={{ flex: 1, marginHorizontal: 10 }}
                                                    title="Continue"
                                                    onSubmit={() => handlestep('plus')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>

                            </View>
                        )
                    })

                }
            </View>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Background overlay
    },
    modalView: {
        width: "95%",
        height: "43%",
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

