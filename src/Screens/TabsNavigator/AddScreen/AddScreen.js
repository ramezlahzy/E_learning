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
    getAllOrderByMonth, getClassById, getUserMonths, getUserMonthSubscriptions,
    openFacebookUrl
} from "../../../Backend";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingAdd from "./LoadingAdd";
import auth from "@react-native-firebase/auth";
import {SubscriptionButton} from "../../components";

const AddScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [userMonthSubscriptions, setUserMonthSubscriptions] = useState(null);
    const [userMonths, setUserMonths] = useState(null);
    useEffect(() => {
        refresh();
    }, []);
    useEffect(() => {
        if (userMonths != null && userMonthSubscriptions != null) {
            setLoading(false);
        }
    }, [userMonths, userMonthSubscriptions])

    const refresh = () => {
        setLoading(true);
        getUserMonths(setUserMonths).catch((e) => {
            console.log("user months", e);
        })
        getUserMonthSubscriptions(setUserMonthSubscriptions).catch((e) => {
            console.log("user month subscriptions", e);
        })

    }

    return (
        <ScrollView
            style={{
                backgroundColor: 'white'
            }}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refresh}/>
            }
        >

            {
                (loading || (userMonths === null || userMonthSubscriptions === null)) &&
                <LoadingAdd/>
            }
            {
                !(loading || (userMonths === null || userMonthSubscriptions === null)) &&

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        paddingBottom: 20,
                    }}
                >

                    <View
                        style={{
                            width: '100%',
                            marginBottom: 70,
                            height: 300,
                            backgroundColor: 'lightgrey',
                            paddingBottom: 40,
                            borderBottomRightRadius: 40,
                            borderBottomLeftRadius: 40,
                        }}
                    >
                        <Image source={require("../../../assets/map3blue.png")}
                               style={{
                                   width: '100%',
                                   height: '100%',
                                   borderBottomRightRadius: 40,
                                   borderBottomLeftRadius: 40,
                                   marginTop: 20,
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

                    <View
                        style={{
                            width: '100%',
                            borderRadius: 40,
                            shadowColor: 'black',
                            elevation: 5,
                            paddingVertical: 15,
                            backgroundColor: 'white'
                        }}
                    >

                        {
                            userMonths.length===0&&
                            <Image
                                source={require('../../../assets/noData.png')}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    alignSelf: 'center',
                                }}
                                resizeMode={'contain'}
                            />
                        }
                        {
                            userMonths.sort((a, b) => {
                                return a.number - b.number;
                            }).map((item, index) => {
                                return (<Month month={item} index={index} monthSubscription={userMonthSubscriptions.map(
                                    (monthSubscription) => {
                                        return monthSubscription.monthId
                                    }
                                )}
                                               key={index} navigation={navigation}/>)
                            })
                        }
                    </View>
                </View>
            }
        </ScrollView>
    )
}
const Month = ({month, index, lectures, navigation,monthSubscription}) => {
    const isSubscribed = monthSubscription.includes(month.id);
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
                        {
                            month.free ? "مجاني" : "مدفوع"
                        }
                    </Text>
                </View>


                <SubscriptionButton isFree={isFree} isSubscribed={isSubscribed}/>
            </TouchableOpacity>
        </View>
    )
}


export default AddScreen;
