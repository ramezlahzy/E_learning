import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {BR, CircularProgress} from "../components";
import {useEffect, useState} from "react";

const FinishedExam = ({navigation, route}) => {
    const {examStudent, questions} = route.params;
    const [allQuestions, setAllQuestions] = useState(examStudent.chooseQuestions.length + examStudent.trueFalseQuestions.length);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
            let correctAnswersTemp = 0;
            examStudent.chooseQuestions.filter((question) => {
                questions.filter((q) => {
                        if (question.questionId === q.id) {
                            if (question.studentAnswer === q.correctAnswer) {
                                correctAnswersTemp++;
                            }
                        }
                    }
                )
            })
            examStudent.trueFalseQuestions.filter((question) => {
                questions.filter((q) => {
                        if (question.questionId === q.id) {
                            let answer = question.studentAnswer === 'صح' ? true : question.studentAnswer === 'خطا' ? false : null;
                            if (answer === q.correctAnswer) {
                                correctAnswersTemp++;
                            }
                        }
                    }
                )
            })
            setCorrectAnswers(correctAnswersTemp)

            let count = 0;
            const timeout = setInterval(() => {
                    if (count >= parseInt(correctAnswersTemp * 100 / allQuestions)) {
                        clearInterval(timeout);
                    } else {
                        count += 1;
                        setProgress(count);
                    }
                }
                , 10);

    }, [])
    return (
        <ScrollView style={{backgroundColor: 'white', paddingVertical: 20}}>

            <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                <View
                    style={{
                        width: '100%', height: 300,
                        backgroundColor: 'white',
                        borderBottomEndRadius: 40,
                        borderBottomStartRadius: 40,
                        marginBottom: 4,
                        shadowColor: "#000",
                        elevation: 5,
                    }}
                >
                <Image source={require('../../assets/compelet.jpg')} style={{width: '100%', height: 300}}
                       resizeMode={'center'}/>
                {/*<BR/>*/}
                </View>
                <View style={{marginVertical: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress radius={80} strokeWidth={10} progress={progress}/>
                    <Text
                        style={{
                            color: 'rgb(102,148,229)',
                            position: 'absolute',
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}
                    >
                        {correctAnswers}/{allQuestions}
                    </Text>

                </View>
                <Text style={{textAlign: 'center', color: 'rgb(102,148,229)'}}>{`${parseInt(progress)}%`}</Text>
                <BR/>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgb(210,189,0)',
                        height: 50,
                        borderRadius: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginVertical: 10,
                        margin: 20,
                    }}
                    onPress={() => {
                        navigation.navigate('ExamSolution', {
                            examStudent:examStudent,
                            questions: questions,
                        })
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',

                    }}
                    >
                        مراجعة الاجابات
                    </Text>
                </TouchableOpacity>
                <BR/>
            </View>
        </ScrollView>
    );
}
export default FinishedExam;
