import {ActivityIndicator, Alert, BackHandler, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {BR, secondsToMMSS, showToast, shuffleArray} from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitExam} from "../../Backend";
import {ChooseQuestion, TrueFalseQuestion} from "../components/index";
const StartExam = ({navigation, route}) => {
    const {exam, questions} = route.params;
    const [time, setTime] = useState(exam.time * 60);
    const [loading, setLoading] = useState(false)
    const [unable, setUnable] = useState(false)
    const [chooseQuestions, setChooseQuestions] = useState(questions.filter((question) => question.type === 'choose')
        .map((question) => {
            return [
                question.id,
                question.correctAnswer,
                question.question,
                shuffleArray([question.correctAnswer, ...question.options]),
            ]
        })
    )
    const [chooseQuestionsAnswers, setChooseQuestionsAnswers] = useState(questions.filter((question) => question.type === 'choose')
        .map((question) => {
            return null
        }))
    const trueFalseQuestions = questions.filter((question) => question.type === 'trueFalse')
    const [trueFalseQuestionsAnswer, setTrueFalseQuestionsAnswer] = useState(trueFalseQuestions
        .map((question) => {
            return null
        }))
    const submit = () => {
        const submitChoose = []
        for (let i = 0; i < chooseQuestions.length; i++) {
            const question = chooseQuestions[i]
            const answer = chooseQuestionsAnswers[i]
            submitChoose.push({studentAnswer: answer, questionId: question[0]})
        }
        const submitTrueFalse = []
        for (let i = 0; i < trueFalseQuestions.length; i++) {
            submitTrueFalse.push({
                questionId: trueFalseQuestions[i].id,
                studentAnswer: trueFalseQuestionsAnswer[i]
            })
        }
        setLoading(true)
        const examStudent={
            status: 'approved',
            trueFalseQuestions  :submitTrueFalse,
            chooseQuestions:submitChoose
        }
        submitExam(exam.id,examStudent).then(r => {
                setLoading(false)
                navigation.goBack();
                navigation.goBack()
                navigation.navigate('FinishedExam', {examStudent:examStudent, questions: questions})
            }
        ).catch(e => {
            setLoading(false)
            showToast('حدث خطأ ما الرجاء المحاولة مرة اخرى')
            setUnable(true)
        })
    }
    // setLoading(false)
    useEffect(() => {
        const startTime = Date.now();
        const startTimeString = startTime.toString();
        AsyncStorage.setItem('examStartTime', startTimeString)
            .then(() => {
            })
            .catch((error) => {
                console.error('Error storing start time:', error);
            });
        const interval = setInterval(() => {
                AsyncStorage.getItem('examStartTime')
                    .then((startTimeString) => {
                        if (startTimeString) {
                            const startTime = parseInt(startTimeString, 10);
                            const currentTime = Date.now();
                            const elapsedTime = currentTime - startTime;
                            const elapsedMinutes = Math.floor(elapsedTime / 1000);
                            if (elapsedMinutes >= exam.time * 60) {
                                setTime(0)
                                setUnable(true)
                                clearInterval(interval)
                                Alert.alert(
                                    'تحذير',
                                    'انتهى الوقت',
                                    [
                                        {
                                            text: 'تم',
                                            onPress: () => null,
                                            style: 'cancel',
                                        },
                                    ],
                                    {cancelable: false}
                                );
                            } else {
                                setTime(exam.time * 60 - elapsedMinutes)

                            }

                        } else {
                            console.log('Start time not found in storage');
                        }
                    })
                    .catch((error) => {
                        console.error('Error retrieving start time:', error);
                    });
            }
            , 1000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                'تحذير',
                'يجب تسليم الامتحان اولا',
                [
                    {
                        text: 'تم',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    // {
                    //     text: 'Yes',
                    //     onPress: () => {
                    //         backHandler.remove();
                    //         navigation.goBack();
                    //         navigation.goBack()
                    //         // clearStackAndNavigate(navigation,'TabsNavigator')
                    //
                    //     },
                    // },

                ],
                {cancelable: false}
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);
    return (
        <ScrollView>

            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                display: 'flex',
                paddingHorizontal: 20,

            }}
            >
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'grey',
                    textAlign: 'center',
                    marginTop: 20,
                }}>
                    الوقت المتبقي
                </Text>
                <View
                    style={{
                        shadowColor: 'black',
                        elevation: 5,
                        backgroundColor: 'white',
                        marginBottom: 40,
                        justifyContent: 'center',
                        display: 'flex'

                    }}
                >

                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        // color: 'rgb(210,189,0)',
                        color: '#2E9E9B',
                        // backgroundColor: '#2E9E9B',

                        textAlign: 'center',

                    }}
                    >
                        {secondsToMMSS(time)}
                    </Text>
                </View>
                <View
                    style={
                        unable ? [{pointerEvents: 'none'}] : []
                    }
                >

                    {
                        chooseQuestions.map((question, index) => {
                                return <ChooseQuestion question={question} key={index} index={index}
                                                       setChooseQuestionsAnswers={setChooseQuestionsAnswers}
                                                       chooseQuestionsAnswers={chooseQuestionsAnswers}/>
                            }
                        )
                    }
                    {
                        trueFalseQuestions.map((questions, index) => {
                            return <TrueFalseQuestion question={questions} key={index} index={index}
                                                      before={chooseQuestions.length}
                                                      trueFalseQuestionsAnswer={trueFalseQuestionsAnswer}
                                                      setTrueFalseQuestionsAnswer={setTrueFalseQuestionsAnswer}/>
                        })
                    }
                </View>
                {
                    loading ?
                        <ActivityIndicator
                            size="large"
                            style={{
                                marginVertical: 20,
                            }}
                        />
                        :
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#2E9E9B',
                                height: 50,
                                borderRadius: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                margin: 20,
                            }}
                            onPress={() => {
                                Alert.alert(
                                    'تاكيد',
                                    'هل انت متاكد من الانتهاء',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => null,
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => {
                                                submit()
                                            },
                                        },

                                    ],
                                    {cancelable: false}
                                );

                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white',

                            }}
                            >
                                تسليم
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        </ScrollView>
    )
}
export default StartExam;
