import firestore, {Filter} from '@react-native-firebase/firestore';
import {Linking} from "react-native";
import auth from "@react-native-firebase/auth";
import {CommonActions} from '@react-navigation/native';
import {useState} from "react";

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
const openYoutubeUrl = (url) => {

    Linking.openURL(url)
        .catch((error) => {
            console.error('Error opening youtube URL:', error);
        });
}
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
            status: 'canceled',
            examId: examId,
            uid: auth().currentUser.uid,
        })
}
const getExamStudent = async (examId, setExamStudent) => {
    await firestore().collection('Exam_User').doc(examId + '' + auth().currentUser.uid).get().then(q => {
        setExamStudent(q.data())
    })
}
const submitExam = async (examId, examStudent) => {
    examStudent.examId = examId;
    examStudent.uid = auth().currentUser.uid;
    await firestore().collection('Exam_User').doc(examId + "" + auth().currentUser.uid).set(
        examStudent)
}
const clearStackAndNavigate = (navigation, to) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{name: to}], // Replace 'Details' with the name of the screen you want to navigate to
        })
    );
};
const getQuestionsByTestBankId = async (setQuestions, testBankId) => {
    const querySnapshot = await firestore().collection('TestBanks').where('id', '==', testBankId).get();
    for (const doc of querySnapshot.docs) {
        const questions = doc.data().questions;
        const questionsArray = [];
        const query = await firestore().collection('Questions').where('id', 'in', questions).get()
        query.docs.forEach(doc => {
            questionsArray.push(doc.data());
        });
        setQuestions(questionsArray);
    }
}
const getLectureQuestions = async (setQuestions, lectureId) => {
    const querySnapshot = await firestore().collection('StudentQuestions').where('lectureId', '==', lectureId).get();
    const questions = querySnapshot.docs.map(doc => doc.data());
    setQuestions(questions);
}
const addQuestion = async (question, lectureId) => {
    const query = await firestore().collection('StudentQuestions').add({
        question: question,
        uid: auth().currentUser.uid,
        lectureId: lectureId,
        name: auth().currentUser.displayName,
        date: new Date(),
    })
    await firestore().collection('StudentQuestions').doc(query.id).update({id: query.id})
}
const copyCollection = async (fromCollectionName, toCollectionName) => {
    const querySnapshot = await firestore().collection(fromCollectionName).get();
    querySnapshot.docs.forEach(doc => {
        firestore().collection(toCollectionName).doc(doc.id).set(doc.data())
    });
}
const getAnnouncements = async (setAnnouncements, lectureId) => {
    const querySnapshot = await firestore().collection('Announcements').where('lectureId', '==', lectureId).get();
    const announcements = querySnapshot.docs.map(doc => doc.data());
    setAnnouncements(announcements);
}
const getUserMonths = async (setMonths) => {
    const querySnapshot = await firestore().collection('Users').where('uid', '==', auth().currentUser.uid).get();
    let userClass = null;
    querySnapshot.docs.forEach(doc => {
        // setClass(doc.data().class);
        userClass = doc.data().class;
    });
    const querySnapshot2 = await firestore().collection('Months').where('class', '==', userClass).get();
    const months = querySnapshot2.docs.map(doc => doc.data());
    setMonths(months);
}
const getUserMonthSubscriptions = async (setSubscription) => {
    const querySnapshot = await firestore().collection('MonthSubscriptions').where('uid', '==', auth().currentUser.uid).get();
    const months = querySnapshot.docs.map(doc => doc.data());
    setSubscription(months);
}
const getUserLectureSubscriptions = async (setSubscription) => {
    const querySnapshot = await firestore().collection('LectureSubscriptions').where('uid', '==', auth().currentUser.uid).get();
    const months = querySnapshot.docs.map(doc => doc.data());
    setSubscription(months);
}
const getMonthByIds = async (setMonth, monthIds) => {
    const querySnapshot = await firestore().collection('Months').where('id', 'in', monthIds).get();
    const months = querySnapshot.docs.map(doc => doc.data());
    setMonth(months);
}
const getLectureByIds = async (setLecture, lectureIds) => {
    const querySnapshot = await firestore().collection('Lectures').where('id', 'in', lectureIds).get();
    const lectures = querySnapshot.docs.map(doc => doc.data());
    setLecture(lectures);
}
const getUserExams = async (setExams) => {
    const querySnapshot = await firestore().collection('Exam_User').where('uid', '==', auth().currentUser.uid).get();
    const exams = querySnapshot.docs.map(doc => doc.data());
    setExams(exams);
}
const getExamByIds = async (setExams, examIds) => {
    const querySnapshot = await firestore().collection('Exams').where('id', 'in', examIds).get();
    const exams = querySnapshot.docs.map(doc => doc.data());
    setExams(exams);
}
const getUserLectures = async (setLectures, userMonthSubscriptions, userLectureSubscriptions) => {
    // console.log(userMonthSubscriptions)
    // console.log(userLectureSubscriptions)
    const snapshot = await firestore()
        .collection('Lectures')
        .where('id', 'in', userLectureSubscriptions)
        .get();
    const snapshot2 = await firestore()
        .collection('Lectures')
        .where('monthId', 'in', userMonthSubscriptions)
        .get();


    const lectures = snapshot.docs.map(doc => doc.data());
    const lectures2 = snapshot2.docs.map(doc => doc.data());
    lectures2.forEach((item) => {
        if (!lectures.includes(item))
            lectures.push(item)
    })
    setLectures(lectures);

}
const openMyLinkedInUrl = () => {
    const linkedinUrl = 'https://www.linkedin.com/in/ramez-lahzy-37188021a/'; // Replace with your Facebook URL

    Linking.openURL(linkedinUrl)
        .catch((error) => {
            console.error('Error opening Facebook URL:', error);
        });
}
const sendMail = async (email, subject, body) => {
    const url = `mailto:rameznashaat9999@gmail.com?subject=${''}&body=${''}`;
    Linking.openURL(url);
}
const makeACall = async () => {
    const phoneNumber = '+201550575832'; // Replace with the actual phone number
    Linking.openURL(`tel:${phoneNumber}`);
}
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
    clearStackAndNavigate,
    getQuestionsByTestBankId,
    getLectureQuestions,
    addQuestion,
    copyCollection,
    getAnnouncements,
    openYoutubeUrl,
    getUserMonths,
    getUserMonthSubscriptions,
    getUserLectureSubscriptions,
    getMonthByIds,
    getLectureByIds,
    getUserExams,
    getExamByIds,
    getUserLectures,
    openMyLinkedInUrl,
    sendMail,
    makeACall
};
