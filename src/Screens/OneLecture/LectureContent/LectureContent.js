import {Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CheckBox} from "@rneui/themed";
import {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";
import {updateLectureArrayField} from "../../../Backend";

const LectureContent = ({lecture, setProgress, navigation}) => {
    const [checkVideo, setCheckVideo] = useState(lecture.videoSeenUsers.includes(auth().currentUser.uid));
    const [checkBank, setCheckBank] = useState(lecture.bankSeenUsers.includes(auth().currentUser.uid));
    const [checkExam, setCheckExam] = useState(lecture.examSeenUsers.includes(auth().currentUser.uid));
    useEffect(() => {
        let progress = 0;
        if (checkVideo) progress += 33;
        if (checkBank) progress += 33;
        if (checkExam) progress += 34;
        setProgress(progress)
    }, [checkVideo, checkBank, checkExam])
    return (
        <View style={{
            color: 'black',
            width: '100%',
            justifyContent: 'center',
        }}>
            <CoursePart name={'فيديو المحاضرة'} iconName={'play-circle-outline'}
                        checked={checkVideo}
                        setChecked={setCheckVideo}
                        fieldName={'videoSeenUsers'}
                        lecture={lecture}
                        action={() => {
                            navigation.navigate('DisplayVideo', {videoId: lecture.videoLink})
                        }}/>

            <CoursePart name={'بنك الاسئلة'} iconName={"book"}
                        checked={checkBank}
                        setChecked={setCheckBank}
                        fieldName={'bankSeenUsers'}
                        lecture={lecture}
                        action={() => {
                            if (lecture.testBankId)
                                navigation.navigate('TestBank', {testBankId: lecture.testBankId})
                            else
                                navigation.navigate('NoData')
                        }}/>

            <CoursePart name={'امتحان على المحاضرة'} iconName={'stopwatch'}
                        checked={checkExam}
                        setChecked={setCheckExam}
                        fieldName={'examSeenUsers'}
                        lecture={lecture}
                        action={() => {
                            if (lecture.examId)
                                navigation.navigate('Exam', {examId: lecture.examId})
                            else
                                navigation.navigate('NoData')
                        }}
            />
        </View>
    )
}
const CoursePart = ({action, name, iconName, checked, setChecked, fieldName, lecture}) => {
    return (
        <TouchableOpacity
            style={{
                width: '90%',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flexDirection: 'row-reverse',
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 10,
                shadowColor: 'black',
                elevation: 5,
                alignItems: 'center',
                padding: 10,
                marginVertical: 20,
            }}
            onPress={() => {
                action()
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'grey',
                        textAlign: 'center',
                        marginHorizontal: 15,
                    }}
                >
                    {name}
                </Text>
                <View
                    style={{
                        backgroundColor: '#6694e5',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                    }}
                >
                    <Ionicons name={iconName} size={25} color={'white'}/>
                </View>
            </View>
            <View>
                <CheckBox
                    checked={checked}
                    onPress={() => {
                        if (checked) {
                            if (lecture[fieldName].includes(auth().currentUser.uid))
                                lecture[fieldName].splice(lecture[fieldName].indexOf(auth().currentUser.uid), 1)
                            updateLectureArrayField(lecture.id, fieldName, false)
                        } else {
                            if (!lecture[fieldName].includes(auth().currentUser.uid))
                                lecture[fieldName].push(auth().currentUser.uid)
                            updateLectureArrayField(lecture.id, fieldName, true)
                        }
                        setChecked(!checked)
                    }}
                    size={25}
                />
            </View>

        </TouchableOpacity>
    )
}

export default LectureContent;
