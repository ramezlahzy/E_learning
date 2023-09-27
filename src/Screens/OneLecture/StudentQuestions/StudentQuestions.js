import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import {BR} from "../../components";
import MyQuestions from "./MyQuestions/MyQuestions";
import {addQuestion, getLectureQuestions} from "../../../Backend";
import OtherQuestions from "./OtherQuestions/OtherQuestions";

const StudentQuestions = ({lectureId, navigation}) => {
    const [studentQuestions, setStudentQuestions] = useState([]);
    const [myQuestions, setMyQuestions] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [sendError, setSendError] = useState(false);
    const [questionToSend, setQuestionToSend] = useState('');

    const sendQuestion = () => {
        if (questionToSend.length === 0) {
            setSendError(true)
            return;
        }
        setSendLoading(true)
        setSendError(false)
        addQuestion(questionToSend, lectureId).then(() => {
            setSendLoading(false)
            setQuestionToSend('')
            getLectureQuestions(setStudentQuestions, lectureId).then(() => {
                setLoading(false)
                setMyQuestions(true)
            })
        })
    }
    useEffect(() => {
        // setSendLoading(false)
        setLoading(true)
        getLectureQuestions(setStudentQuestions, lectureId).then(() => {
            setLoading(false)
        })
    }, [])
    return (<View
        style={{
            marginTop: 30, width: '100%', alignItems: 'center', paddingHorizontal: 10,
        }}
    >

        <TextInput
            style={{
                borderWidth: 1,
                borderColor: sendError ? 'red' : '#ccc',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 8,
                fontSize: 16,
                color: '#444',
                width: '100%',
                height: 90,
                alignSelf: 'center',
            }}
            placeholderTextColor={'#ccc'}
            placeholder={'اكتب سؤالك هنا'}
            numberOfLines={3}
            multiline={true}
            maxLength={200}
            onChangeText={setQuestionToSend}
            value={questionToSend}
        />

        {sendLoading && <ActivityIndicator
            size="large"
            // color="blue"
            style={{
                marginTop: 10, margin: 10, alignSelf: 'flex-end',

            }}
        />
            // <Text
            //     style={{
            //
            //     }}
        }

        {!sendLoading && <TouchableOpacity
            style={{
                backgroundColor: '#6694e5',
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 15,
                alignSelf: 'flex-end',
                marginTop: 10,
            }}
            onPress={sendQuestion}
        >
            <Text
                style={{
                    color: 'white',
                }}
            >
                ارسال
            </Text>
        </TouchableOpacity>}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
                style={{
                    margin: 20,
                    backgroundColor: myQuestions ? 'grey' : 'white',
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: 'black',
                    elevation: 5,
                }}
                onPress={() => {
                    setMyQuestions(true)
                }}
            >
                <Text
                    style={{
                        color: myQuestions ? 'white' : 'grey',
                    }}
                >
                    اسئلتى
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: myQuestions ? 'white' : 'grey',
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: 'black',
                    elevation: 5,
                }}
                onPress={() => {
                    setMyQuestions(false)
                }}
            >
                <Text
                    style={{
                        color: !myQuestions ? 'white' : 'grey',
                    }}
                >
                    اسئلة باقى الطلبة
                </Text>
            </TouchableOpacity>
        </View>
        {myQuestions && <MyQuestions
            loading={loading}
            questions={studentQuestions}
        />}
        {myQuestions === false && <OtherQuestions
            loading={loading}
            questions={studentQuestions}
        />}

    </View>)
}
export default StudentQuestions;
