import firestore from '@react-native-firebase/firestore';
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
const getAllOrderByLecture = async (setOrders) => {
    const querySnapshot = await firestore().collection('OrderByLecture').get();
    const orders = querySnapshot.docs.map(doc => doc.data());
    setOrders(orders);
}
const getAllOrderByMonth = async (setOrders) => {
    const querySnapshot = await firestore().collection('OrderByMonth').get();
    const orders = querySnapshot.docs.map(doc => doc.data());
    setOrders(orders);
}
export {getAllClasses, getAllMonths, getAllLectures, getAllOrderByLecture, getAllOrderByMonth};
