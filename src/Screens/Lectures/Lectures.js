import {FlatList, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getAllLectures, getLecturesByMonth, openFacebookUrl} from "../../Backend";
import LecturesLoading from "./LecturesLoading";
import {ProgressBar, SubscriptionButton} from "../components";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

const Lectures = ({navigation, route}) => {
    const monthName = route.params.title;
    const month = route.params.month;
    const [allLectures, setAllLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [warningSubscribed, setWarningSubscribed] = useState(false);
    useEffect(() => {
        setLoading(true);
        getLecturesByMonth(setAllLectures, month.id).then(() => {
            setLoading(false);
        });
    }, [])
    return (
        <>
            {
                loading && <LecturesLoading/>
            }
            {
                !loading &&
                <FlatList
                    data={allLectures}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Lecture lecture={item} navigation={navigation} month={month}
                                                     warningSubscribed={warningSubscribed}
                                                     setWarningSubscribed={setWarningSubscribed}
                    />}
                    numColumns={1}
                />
            }
        </>
    )
}
const Lecture = ({month, lecture, navigation, warningSubscribed, setWarningSubscribed}) => {
    const isSubscribed = month.users.includes(auth().currentUser.uid) || lecture.users.includes(auth().currentUser.uid);
    const isFree = month.free || lecture.free;
    return (
        <View
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <Warning visible={warningSubscribed} onClose={() => {
                setWarningSubscribed(false);
            }}/>

            <View
                style={{
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    width: "15%",
                }}
            >
                <Text style={
                    {
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 20,
                    }
                }
                >
                    {
                        lecture.day
                    }
                </Text>

                <Text style={
                    {
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 15,
                    }
                }
                >
                    {lecture.month}
                </Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <View
                    style={{
                        width: 1,
                        flex: 1,
                        backgroundColor: 'grey',
                    }}

                />
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        backgroundColor: 'grey',
                    }}
                />
                <View
                    style={{
                        width: 1,
                        flex: 1,
                        backgroundColor: 'grey',
                    }}

                />
            </View>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    backgroundColor: 'white',
                    margin: 10,
                    flex: 1,
                    borderRadius: 20,
                    shadowColor: "grey",
                    elevation: 5,
                    padding: 20,
                }}
                onPress={() => {
                    if (isSubscribed || isFree)
                        navigation.navigate('OneLecture', {lecture: lecture, title: lecture.name});
                    else
                        setWarningSubscribed(true);
                }}
            >
                <View
                    style={{
                        flex: 2,
                        // height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}
                    >
                        {lecture.lectureName}
                    </Text>
                </View>
                <SubscriptionButton isFree={isFree} isSubscribed={isSubscribed}/>
            </TouchableOpacity>
        </View>
    )
}
const Warning = ({visible, onClose}) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50}}>
                <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10, flexDirection: 'column'}}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 20,
                        }}
                    >
                       انت غير مشترك {'\n'}للاشتراك تواصل معنا
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                onClose();
                            }
                            }
                            style={{
                                borderRadius: 10,
                                backgroundColor: 'grey',
                                padding: 10,
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 15,
                                }}
                            >
                                الغاء
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                onClose();
                                openFacebookUrl();
                                // showCharge();
                            }
                            }
                            style={{
                                backgroundColor: 'rgb(210,189,0)',
                                borderRadius: 10,
                                padding: 10,
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 15,
                                }}
                            >
                                تأكيد
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Lectures;

