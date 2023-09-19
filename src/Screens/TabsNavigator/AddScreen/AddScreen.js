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
import {getAllClasses, getAllLectures, getAllMonths, getAllOrderByLecture, getAllOrderByMonth} from "../../../Backend";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingAdd from "./LoadingAdd";
import auth from "@react-native-firebase/auth";

const AddScreen = ({navigation}) => {
    const [classes, setClasses] = useState([]);
    const [months, setMonths] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [orderByLecture, setOrderByLecture] = useState([]);
    const [orderByMonth, setOrderByMonth] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState("1");
    const userBalance = 100;
    useEffect(() => {
        refresh();
    }, []);
    const refresh = () => {
        setLoading(true);
        getAllClasses(setClasses).then(r =>
            getAllLectures(setLectures).then(r =>
                getAllMonths(setMonths).then(r =>
                    getAllOrderByLecture(setOrderByLecture).then(r =>
                        getAllOrderByMonth(setOrderByMonth).then(r =>
                            setLoading(false)
                        )))));
    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refresh}/>
            }
        >

            {
                loading &&
                <LoadingAdd/>
            }
            {
                !loading &&

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    {/*<Card/>*/}
                    <Image source={require('../../../assets/backgroundScience.jpg')}
                           style={{margin: 20, width: '90%', height: 200, borderRadius: 10, alignSelf: 'center'}}/>


                    <FlatList
                        horizontal={true}

                        style={{
                            margin: 10,

                        }}

                        data={classes} renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedClass(item.number);
                                }}
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: selectedClass === item.number ? 'rgb(102,148,229)' : 'white',
                                    margin: 10,
                                    padding: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: selectedClass === item.number ? 'white' : 'grey',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        alignSelf: 'center',

                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>

                        )
                    }
                    }

                    />

                    {
                        months.filter((month) => {
                            return month.class === selectedClass;
                        }).sort((a, b) => {
                            return a.number - b.number;
                        }).map((item, index) => {
                            return (<Month month={item} index={index} orderByMonth={orderByMonth} lectures={lectures}
                                           key={index} navigation={navigation}/>)
                        })
                    }
                </View>
            }
        </ScrollView>
    )
}
const Month = ({month, index, orderByMonth, lectures, navigation}) => {
    const Colors = ['rgb(250,237,237)', 'rgb(236,240,248)', 'rgb(220,220,225)', 'rgb(238,235,220)', 'rgb(252,226,226)', 'rgb(252,226,226)']
    const isSubscribed = orderByMonth.find((order) => {
        return order.monthId === month.id && order.studentMail === auth().currentUser.email;
    })
    const userBalance = 100;
    const isFree = month.price === 0;
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isChargeVisible, setChargeVisible] = useState(false);
    const showAlertBuy = () => {
        setAlertVisible(true);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };
    const showCharge = () => {
        setChargeVisible(true);
    }
    const hideCharge = () => {
        setChargeVisible(false);
    }


    return (
        <View
            style={{
                width: '100%',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-start',


            }}
        >
            <CustomAlertBuy visible={isAlertVisible} message="This is a custom alert!" onClose={hideAlert}
                            showCharge={showCharge}/>
            <Charge visible={isChargeVisible} message="This is a custom alert!" onClose={hideCharge}
                    navigation={navigation}/>

            <View
                style={{
                    marginRight: 20,
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
                    backgroundColor: 'rgb(241,244,252)',
                    // backgroundColor:Colors[index%4],
                    margin: 10,
                    height: 100,
                    flex: 1,
                    borderRadius: 200,
                    shadowColor: "grey",
                    elevation: 5,
                    padding: 20,

                }}
                onPress={() => {
                    navigation.navigate('Lectures', {month: month,title:month.name});
                }}
            >
                <View
                    style={{
                        // backgroundColor:'white',
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

                <TouchableOpacity
                    style={{
                        // flex:1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: isSubscribed ? 'rgb(83,171,84)' : 'rgb(224,0,0)',
                        backgroundColor: month.price === 0 ? 'rgb(255,132,132)' : isSubscribed ? 'rgb(119,119,119)' : 'rgb(210,189,0)',
                        borderRadius: 10,
                        padding: 5,
                        flexDirection: 'row-reverse',
                    }}
                    onPress={

                        () => {
                            if (isFree || isSubscribed) {
                                return;
                            }
                            // if (userBalance >= month.price) {
                            showAlertBuy();
                            // }
                        }
                    }

                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginHorizontal: 5,
                        }}
                    >{isFree ? 'مجانى' : isSubscribed ? 'تم الاشتراك' : 'اشترك الان'}</Text>
                    {
                        isSubscribed && <Ionicons name={'checkmark'} color={'white'} size={24}/>
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}
const CustomAlertBuy = ({visible, message, onClose, showCharge}) => {
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
                        هل انت متاكد من انك تريد الاشتراك فى هذا الشهر
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
                                showCharge();
                            }
                            }
                            style={{
                                backgroundColor: 'rgb(102,148,229)',
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
const Charge = ({visible, message, onClose, navigation}) => {
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
                        رصيدك الحالى لا يكفى للشراء هل تريد شحن رصيدك{'\n'}الاشتراك الشهرى 100 جنيه
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
                                navigation.navigate('Pay');
                            }}
                            style={{
                                backgroundColor: 'rgb(102,148,229)',
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


export default AddScreen;
