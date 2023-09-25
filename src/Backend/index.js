import firestore from '@react-native-firebase/firestore';
import {Linking} from "react-native";
import auth from "@react-native-firebase/auth";
import { CommonActions } from '@react-navigation/native';

const getAllClasses = async (setClasses) => {
    const querySnapshot = await firestore().collection('Classes').get();
    const classes = querySnapshot.docs.map(doc => doc.data());
    setClasses(classes);
}
const getAllMonths = async (setMonths) => {
    const querySnapshot = await firestore().collection('Months').get();
    const months = querySnapshot.docs.map(doc => doc.data());
    setMonths(months);
}
const getAllLectures = async (setLectures) => {
    const querySnapshot = await firestore().collection('Lectures').get();
    const lectures = querySnapshot.docs.map(doc => doc.data());
    setLectures(lectures);
}
const openFacebookUrl = () => {
    const facebookUrl = 'https://www.facebook.com/samuel.sharkawy'; // Replace with your Facebook URL

    Linking.openURL(facebookUrl)
        .catch((error) => {
            console.error('Error opening Facebook URL:', error);
        });
};
const getClassById = async (setClass) => {
    const querySnapshot = await firestore().collection('Users').where('uid', '==', auth().currentUser.uid).get();
    querySnapshot.docs.forEach(doc => {
        setClass(doc.data().class);
    });
}
const getLecturesByMonth = async (setLectures, monthId) => {
    const querySnapshot = await firestore().collection('Lectures').where('monthId', '==', monthId).get();
    const lectures = querySnapshot.docs.map(doc => doc.data());
    setLectures(lectures);
}
const updateLectureArrayField = async (lectureId, field, add) => {
    const querySnapshot = await firestore().collection('Lectures').where('id', '==', lectureId).get();
    querySnapshot.docs.forEach(doc => {
        if (add)
            firestore().collection('Lectures').doc(doc.id).update({
                [field]: firestore.FieldValue.arrayUnion(auth().currentUser.uid)
            })
        else
            firestore().collection('Lectures').doc(doc.id).update({
                [field]: firestore.FieldValue.arrayRemove(auth().currentUser.uid)
            })
    });
}
const getExamById = async (setExam, examId) => {
    const querySnapshot = await firestore().collection('Exams').where('id', '==', examId).get();
    querySnapshot.docs.forEach(doc => {
        setExam(doc.data());
    });
}
const getExamQuestions = async (setQuestions, examId, setExam) => {
    //where question id in exam.questions
    const querySnapshot = await firestore().collection('Exams').where('id', '==', examId).get();
    querySnapshot.docs.forEach(doc => {
        setExam(doc.data());
        const questions = doc.data().questions;
        const questionsArray = [];
        firestore().collection('Questions').where('id', 'in', questions).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                questionsArray.push(doc.data());
            });
            setQuestions(questionsArray);
        });
    });
}
const createExamStudent = async (examId) => {
    await firestore().collection('Exam_User').doc(examId + "" + auth().currentUser.uid).set(
        {
            status: 'canceled'
        })
}
const getExamStudent = async (examId, setExamStudent) => {
    await firestore().collection('Exam_User').doc(examId+''+auth().currentUser.uid).get().then(q=>{
        setExamStudent(q.data())
    })
}
const submitExam=async (examId, examStudent) => {
    console.log("examStudent ",examStudent)
    await firestore().collection('Exam_User').doc(examId + "" + auth().currentUser.uid).set(
        examStudent)
}
const clearStackAndNavigate = (navigation,to) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: to}], // Replace 'Details' with the name of the screen you want to navigate to
        })
    );
};
export {
    getAllClasses,
    getAllMonths,
    getAllLectures,
    openFacebookUrl,
    getClassById,
    getLecturesByMonth,
    updateLectureArrayField,
    getExamById,
    getExamQuestions,
    createExamStudent,
    getExamStudent,
    submitExam,
    clearStackAndNavigate
};
