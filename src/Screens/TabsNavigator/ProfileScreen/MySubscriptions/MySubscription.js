import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import LoadingExam from "../../../Exam/LoadingExam";
import {BR} from "../../../components";

const MySubscription = ({navigation}) => {
    return (
        <ScrollView
            style={{
                backgroundColor: 'white'
            }}
        >
            {
                // (loading || exam === null || questions === null) && <LoadingExam/>
            }
            {
                // !(loading || exam === null || questions === null) &&

                <View
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        backgroundColor: 'white',
                        alignItems: 'center',
                    }}
                >
                    <Image source={require('../../../../assets/subscription.png')} style={{width: '100%', height: 400}}
                           resizeMode={'cover'}/>

                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'grey',
                            textAlign: 'center',
                        }}
                    >
                        الاشتراكات
                    </Text>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: '100%',
                            justifyContent: 'center',
                            marginTop: 20,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgb(210,189,0)',
                                borderRadius: 10,
                                padding: 10,
                                margin: 20,
                            }}
                            onPress={() => navigation.navigate('SubscriptionByMonth')}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                بالشهر
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgb(210,189,0)',
                                borderRadius: 10,
                                padding: 10,
                            }}
                            onPress={() => navigation.navigate('SubscriptionByLecture')}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                بالمحاضرة
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            }
        </ScrollView>
    )
}
export default MySubscription;
