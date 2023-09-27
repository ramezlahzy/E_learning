import {View, Text, Image, ScrollView, RefreshControl} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {FlatList} from 'react-native';
import {
    getAllLectures,
    getUserLectures,
    getUserLectureSubscriptions,
    getUserMonthSubscriptions
} from "../../../Backend";
import LecturesLoading from "../../Lectures/LecturesLoading";
import {BR, ProgressBar} from "../../components";
import auth from "@react-native-firebase/auth";

export default function CourseChapter({navigation, route}) {
    const [userLectures, setUserLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userMonthSubscriptions, setUserMonthSubscriptions] = useState(null);
    const [userLectureSubscriptions, setUserLectureSubscriptions] = useState(null);
    const refresh=()=>{
        setLoading(true);
        getUserMonthSubscriptions(setUserMonthSubscriptions);
        getUserLectureSubscriptions(setUserLectureSubscriptions)
    }
    useEffect(() => {
        refresh()
    }, [])
    useEffect(() => {
        if (userMonthSubscriptions !== null && userLectureSubscriptions !== null)
            getUserLectures(setUserLectures, userMonthSubscriptions.map(
                (item) => item.monthId
            ), userLectureSubscriptions.map(
                (item) => item.lectureId
            )).then(() => {
                setLoading(false);
            }).catch((e) => {
                console.log(e);
            })
    }, [userMonthSubscriptions, userLectureSubscriptions])
    return (
        <>
            {
                loading && <LecturesLoading/>
            }
            {

                !loading &&
                <ScrollView
                    style={{
                        backgroundColor:'white'
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refresh}
                        />
                    }
                >
                    <Text
                        style={{
                            color: 'grey',
                            margin: 20,
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        اللى لسة مخلصتهاش
                    </Text>
                    {
                        userLectures.filter(
                            (item) => !(
                                item.videoSeenUsers.includes(auth().currentUser.uid)
                                && item.examSeenUsers.includes(auth().currentUser.uid)
                                && item.bankSeenUsers.includes(auth().currentUser.uid)
                            )
                        ).length===0&&(
                            <Image source={require('../../../assets/allOk.png')}
                                      style={{
                                          height:200,
                                          width:'100%'
                                      }}
                                   resizeMode={'contain'}
                                   />

                        )
                    }
                    {
                        (
                        userLectures.filter(
                            (item) => !(
                                item.videoSeenUsers.includes(auth().currentUser.uid)
                                && item.examSeenUsers.includes(auth().currentUser.uid)
                                && item.bankSeenUsers.includes(auth().currentUser.uid)
                            )
                        )
                            .map((item, index) => {
                                return <Item item={item} navigation={navigation} key={index}/>
                            })
                    )}
                    <BR/>
                    <Text
                        style={{
                            color: 'grey',
                            margin: 20,
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        اللى خلصتها
                    </Text>
                    {
                        userLectures.filter(
                            (item) => (
                                item.videoSeenUsers.includes(auth().currentUser.uid)
                                && item.examSeenUsers.includes(auth().currentUser.uid)
                                && item.bankSeenUsers.includes(auth().currentUser.uid)
                            )
                        ).length===0&&(
                            <Image source={require('../../../assets/noData.png')}
                                   style={{
                                       height:200,
                                       width:'100%'
                                   }}
                                   resizeMode={'contain'}
                            />

                        )
                    }
                    {(
                        userLectures.filter((item) => item.videoSeenUsers.includes(auth().currentUser.uid)
                            && item.examSeenUsers.includes(auth().currentUser.uid)
                            && item.bankSeenUsers.includes(auth().currentUser.uid)
                        )
                            .map((item, index) => {
                                return <Item item={item} navigation={navigation} key={index}/>
                            })
                    )}

                </ScrollView>
            }
        </>
    )
}
const Item = ({item, navigation}) => {
    let progress = 0;
    if (item.videoSeenUsers.includes(auth().currentUser.uid))
        progress += 33;
    if (item.examSeenUsers.includes(auth().currentUser.uid))
        progress += 33
    if (item.bankSeenUsers.includes(auth().currentUser.uid))
        progress += 34
    return (
        <TouchableOpacity
            style={{
                margin: 20,
                borderRadius: 10,
                flexDirection: 'row-reverse',
                backgroundColor: 'white',
                alignItems: 'center',
                shadowColor: 'black',
                elevation: 5,
                justifyContent: 'space-between',
            }}
            onPress={() => {
                navigation.navigate('OneLecture', {lecture: item});
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        // flex:1
                    }}
                >
                    {item.lectureName}
                </Text>
                <ProgressBar progress={progress}/>

            </View>
            <View
                style={{
                    padding: 15,
                    flexDirection: 'column',
                    margin: 10,
                    shadowColor: 'black',
                    elevation: 5,
                    backgroundColor: 'rgb(102,148,229)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                }}
            >
                <Text
                    style={{
                        color: 'white'
                    }}
                >
                    {item.day}
                </Text>
                <Text
                    style={{
                        color: 'white'
                    }}
                >
                    {item.month}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


