import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Image,
    ScrollView,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import LoadingExam from "./LoadingExam";
import {createExamStudent, getExamById, getExamQuestions, getExamStudent} from "../../Backend";
import {BR} from "../components";
import auth from "@react-native-firebase/auth";

const Exam = ({navigation, route}) => {
    const {examId} = route.params;
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [examStudent, setExamStudent] = useState(null)
    const [loading, setLoading] = useState(false);
    const [startLoading, setStartLoading] = useState(false)
    useEffect(() => {

        if (exam !== null && questions !== null && examStudent !== null) {
            setLoading(false);
        }
    }, [exam, questions, examStudent])
    useEffect(() => {
        setLoading(true);
        getExamQuestions(setQuestions, examId, setExam)
        getExamStudent(examId, setExamStudent)
    }, [])
    return (
        <ScrollView
            style={{
                backgroundColor: 'white'
            }}
        >
            {
                (loading || exam === null || questions === null) && <LoadingExam/>
            }
            {
                !(loading || exam === null || questions === null) &&

                <View
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        backgroundColor: 'white',
                        alignItems: 'center',
                    }}
                >
                    <Image source={require('../../assets/examPhoto.jpg')} style={{width: '100%', height: 400}}
                           resizeMode={'cover'}/>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'grey',
                        textAlign: 'center',
                    }}
                    >
                        وقت الامتحان
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            // fontWeight: 'bold',
                            color: 'grey',
                            textAlign: 'center',
                        }}
                        >
                            مدة الامتحان:{exam.time} دقيقة
                        </Text>
                    </View>
                    <BR/>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            // fontWeight: 'bold',
                            color: 'grey',
                            textAlign: 'center',
                        }}
                        >
                            عدد الاسئلة:{questions.length} سؤال
                        </Text>
                    </View>
                    <BR/>
                    {
                        (
                            startLoading ?
                                <ActivityIndicator
                                    size="large"
                                    // color='rgb(0,0,0)'
                                    style={{
                                        marginTop: 20,
                                        // color:'rgb(0,0,0)'
                                    }}
                                />
                                : <StartButton examStudent={examStudent}
                                               setStartLoading={setStartLoading}
                                               examId={examId}
                                               exam={exam}
                                               questions={questions}
                                               navigation={navigation}/>

                        )
                    }
                </View>
            }
        </ScrollView>
    )
}
const StartButton = ({examStudent, setStartLoading, examId, exam, questions, navigation}) => {
    // console.log(examStudent)
    if (examStudent === undefined)
        return <TouchableOpacity
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
                    'هل انت متاكد من بدء الامتحان؟',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => null,
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: async () => {
                                setStartLoading(true)
                                try {
                                    await createExamStudent(examId)
                                    setStartLoading(false)
                                } catch (e) {
                                    console.log("error \n\n\n", e)
                                    setStartLoading(false)
                                }
                                navigation.navigate('StartExam', {
                                    exam: exam,
                                    questions: questions,
                                })
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
                ابدأ الامتحان
            </Text>
        </TouchableOpacity>
    if (examStudent !== null && examStudent.status==='canceled')
        return <TouchableOpacity
            style={{
                backgroundColor: 'grey',
                height: 50,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                margin: 20,
            }}
            onPress={() => {

            }}
        >
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',

            }}
            >
              تم الالغاء
            </Text>
        </TouchableOpacity>
    if(examStudent!==null &&examStudent.status!=='canceled'){
      return  <TouchableOpacity
            style={{
                backgroundColor: 'rgb(210,189,0)',
                height: 50,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                margin: 20,
            }}
            onPress={() => {
                navigation.navigate('FinishedExam', {
                    questions: questions,
                    examStudent:examStudent,
                })
            }}
        >
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',

            }}
            >
               مراجعة الامتحان
            </Text>
        </TouchableOpacity>

    }
}
export default Exam;
