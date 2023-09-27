import {Text, TouchableOpacity, View} from "react-native";
import Loading from "../Loading";
import {useEffect, useState} from "react";
import {getMonthByIds, getUserMonthSubscriptions} from "../../../../../Backend";

const SubscriptionByMonth = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [userMonthSubscriptions, setUserMonthSubscriptions] = useState(null);
    const [months, setMonths] = useState(null);
    useEffect(() => {
        setLoading(true);
        getUserMonthSubscriptions(setUserMonthSubscriptions).catch((error) => {
            console.log(error);
        })
    }, [])
    useEffect(() => {
        if (userMonthSubscriptions !== null) {
            getMonthByIds(setMonths, userMonthSubscriptions.map(subscription => subscription.monthId)).then(() => {
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [userMonthSubscriptions])
    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                padding: 20
            }}
        >
            {
                (loading || months === null || userMonthSubscriptions === null)
                && <Loading/>
            }
            {
                !(loading || months === null || userMonthSubscriptions === null) &&
                (

                    userMonthSubscriptions.map((userMonthSubscription, index) => {
                            const month = months.find(month => month.id === userMonthSubscription.monthId);
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
                                            navigation.navigate('Lectures', {month: month, title: month.name});
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
                                            {userMonthSubscription.price}
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
                                            {month.name}
                                        </Text>
                                        <Text
                                            style={{color: 'grey',}}
                                        >
                                            {' تاريخ الاشتراك:'} {userMonthSubscription.date.toDate().toISOString().split('T')[0]}
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
export default SubscriptionByMonth;
