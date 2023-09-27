import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getExamByIds, getExamsById, getUserExams} from "../../../../Backend";
import LoadingExam from "../../../Exam/LoadingExam";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../ProfileScreen";
import {CircularProgress} from "../../../components";

const MyExams = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState(null);
    const [myExamsSolution, setMyExamsSolution] = useState(null);
    useEffect(() => {
        setLoading(true)
        getUserExams(setMyExamsSolution)
    }, []);
    useEffect(() => {
        if (myExamsSolution !== null) {
            getExamByIds(setExams, myExamsSolution.map(
                (exam) => exam.examId
            )).then(() => {
                setLoading(false)
            })
        }
    }, [myExamsSolution]);


    return (
        <ScrollView
            style={{
                backgroundColor: 'white',
            }}
        >
            {
                (loading || exams === null || myExamsSolution === null)
                && <LoadingExam/>
            }
            {
                !(loading || exams === null || myExamsSolution === null) &&

                <View
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Image source={require('../../../../assets/myExams.jpg')} style={{width: '100%', height: 400}}
                           resizeMode={'cover'}/>
                    {
                        myExamsSolution.map((examSolution, index) => {
                            const exam = exams.find((exam) => exam.id === examSolution.examId);
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: '90%',
                                        flexDirection: 'row',
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        padding: 20,
                                        marginVertical: 20,
                                        alignItems: 'center',
                                        shadowColor: 'black',
                                        elevation: 5,
                                        // justifyContent: 'space-between',

                                    }}
                                >

                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 200,
                                            backgroundColor: '#d2bd00',
                                            padding: 10,
                                        }}
                                        onPress={() => {
                                            navigation.navigate('Exam', {examId: exam.id})
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color:'white',
                                            }}
                                            >
                                            مراجعة
                                        </Text>

                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: 'grey',
                                            marginHorizontal: 10,
                                            flex:1
                                        }}
                                    >
                                        {exam.name}
                                    </Text>
                                </View>
                            )

                        })
                    }
                </View>

            }
        </ScrollView>
    )
}
export default MyExams;
