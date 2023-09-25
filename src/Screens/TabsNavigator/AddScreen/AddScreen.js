import {
    Button,
    FlatList,
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {
    getAllClasses,
    getAllLectures,
    getAllMonths,
    getAllOrderByLecture,
    getAllOrderByMonth, getClassById,
    openFacebookUrl
} from "../../../Backend";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingAdd from "./LoadingAdd";
import auth from "@react-native-firebase/auth";
import {SubscriptionButton} from "../../components";

const AddScreen = ({navigation}) => {
    const [classes, setClasses] = useState(null);
    const [months, setMonths] = useState(null);
    const [lectures, setLectures] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    useEffect(() => {
        refresh();
    }, []);
    useEffect(() => {
        if(months!==null && lectures!==null && classes!==null && selectedClass!==null){
            setLoading(false);
        }
    },[months, lectures, classes, selectedClass])

    const refresh = () => {
        setLoading(true);
        getAllClasses(setClasses)
        getAllLectures(setLectures)
        getClassById(setSelectedClass)
        getAllMonths(setMonths)
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refresh}/>
            }
        >

            {
                (loading||(months===null|| lectures===null|| classes===null|| selectedClass===null)) &&
                <LoadingAdd/>
            }
            {
                !(loading||(months===null|| lectures===null|| classes===null|| selectedClass===null)) &&

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >

                    <View
                        style={{
                            width: '100%',
                            marginBottom: 70,
                            height: 200,

                        }}
                    >
                        <Image source={require("../../../assets/map.png")}
                               style={{
                                   width: '100%',
                                   height: '100%',
                                   borderBottomRightRadius: 40,
                                   borderBottomLeftRadius: 40,
                               }}
                               resizeMode={'cover'}
                        />

                        <View style={{
                            width: '75%',
                            backgroundColor: 'white',
                            height: 100,
                            alignSelf: 'center',
                            borderRadius: 20,
                            shadowColor: 'black',
                            elevation: 5,
                            bottom: -50,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 15,
                            position: 'absolute',
                        }}>
                            <Text
                                style={{
                                    fontSize: 30,
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                خريطة السنة
                            </Text>
                        </View>
                    </View>


                    {
                        months.filter((month) => {
                            return month.class === selectedClass;
                        }).sort((a, b) => {
                            return a.number - b.number;
                        }).map((item, index) => {
                            return (<Month month={item} index={index}  lectures={lectures}
                                           key={index} navigation={navigation}/>)
                        })
                    }
                </View>
            }
        </ScrollView>
    )
}
const Month = ({month, index, lectures, navigation}) => {
    const isSubscribed = month.users.includes(auth().currentUser.uid);
    const isFree = month.free;
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
            <View
                style={{
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    width: "15%",
                    // backgroundColor: 'blue',
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
                        month.day
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
                    {month.month}
                </Text>
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    // backgroundColor: 'white',
                    // marginHorizontal: 10,

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
                    navigation.navigate('Lectures', {month: month, title: month.name});
                }}
            >
                <View
                    style={{
                        flex: 2,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}
                    >
                        {month.name}
                    </Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 13,
                        }}
                    >
                        {lectures.filter(
                            (lecture) => {
                                return lecture.monthId === month.id;
                            }
                        ).length} محاضرة
                    </Text>
                </View>


                <SubscriptionButton isFree={isFree} isSubscribed={isSubscribed}/>
            </TouchableOpacity>
        </View>
    )
}


export default AddScreen;
