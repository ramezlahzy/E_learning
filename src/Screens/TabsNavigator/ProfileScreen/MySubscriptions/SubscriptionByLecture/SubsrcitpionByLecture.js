import {Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {
    getLectureByIds,
    getMonthByIds,
    getUserLectureSubscriptions,
    getUserMonthSubscriptions
} from "../../../../../Backend";
import Loading from "../Loading";

const SubscriptionByLecture = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [userLectureSubscription, setUserLectureSubscription] = useState(null);
    const [lectures, setLectures] = useState(null);
    useEffect(() => {
        setLoading(true);
        getUserLectureSubscriptions(setUserLectureSubscription).catch((error) => {
            console.log(error);
        })
    }, [])
    useEffect(() => {
        if (userLectureSubscription !== null) {
            getLectureByIds(setLectures, userLectureSubscription.map(subscription => subscription.lectureId)).then(() => {
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [userLectureSubscription])
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                padding: 20
            }}
        >
            {
                (loading || lectures === null || userLectureSubscription === null)
                && <Loading/>
            }
            {
                !(loading || lectures === null || userLectureSubscription === null) &&
                (

                    userLectureSubscription.map((userLectureSubscription, index) => {
                            const lecture = lectures.find(lecture => lecture.id === userLectureSubscription.lectureId);
                            return (
                                <TouchableOpacity key={index}
                                                  style={{
                                                      width: '100%',
                                                      flexDirection: 'row',
                                                      borderRadius: 20,
                                                      backgroundColor: 'white',
                                                      padding: 10,
                                                      marginVertical: 20,
                                                      alignItems: 'center',
                                                      shadowColor: 'black',
                                                      elevation: 5
                                                  }}
                                                  onPress={() => {
                                                      navigation.navigate('OneLecture', {lecture: lecture});
                                                  }}
                                >

                                    <View
                                        style={{
                                            padding: 10,
                                            borderRadius: 10,
                                            backgroundColor: 'rgb(102,148,229)',
                                            shadowColor: 'black',
                                            elevation: 5,
                                            margin:10
                                        }}
                                    >
                                        <Text
                                            style={{color: 'white'}}
                                        >
                                            {userLectureSubscription.price}
                                        </Text>
                                        <Text
                                            style={{color: 'white',}}
                                        >
                                            جنيه
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{color: 'grey',fontSize:20,fontWeight:'bold',margin:10}}
                                        >
                                            {lecture.lectureName}
                                        </Text>
                                        <Text
                                            style={{color: 'grey',}}
                                        >
                                            {' تاريخ الاشتراك:'} {userLectureSubscription.date.toDate().toISOString().split('T')[0]}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    ))

            }
        </View>
    )
}
export default SubscriptionByLecture;
