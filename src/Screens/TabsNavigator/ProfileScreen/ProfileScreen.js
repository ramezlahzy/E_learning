import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openYoutubeUrl} from "../../../Backend";
import {PoweredBy} from "../../components";

const ProfileScreen = ({navigation}) => {
    return (
        <ScrollView>

            <View>
                <View
                    style={{
                        width: '100%',
                        marginBottom: 70,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: "100%",
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                            position: 'absolute',
                            backgroundColor: '#6694e5'
                        }}/>
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginVertical: 60
                    }}>
                        <Image
                            source={auth().currentUser.photoURL ? {uri: auth().currentUser.photoURL} : require('../../../assets/boring.jpg')}
                            style={{width: 100, height: 100, borderRadius: 50, alignSelf: 'center', margin: 10,borderWidth:3,borderColor:'white'}}/>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'white',

                                }}
                            >
                                {auth().currentUser.displayName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: 'white',

                                }}
                            >
                                {auth().currentUser.email}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        width: '75%',
                        backgroundColor: 'white',
                        height: 100,
                        alignSelf: 'center',
                        borderRadius: 20,
                        shadowColor: 'black',
                        elevation: 5,
                        bottom: -50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        position: 'absolute',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            style={{
                                padding: 5,
                                backgroundColor: '#d2bd00',
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                            onPress={()=>openYoutubeUrl('https://www.youtube.com/watch?v=4gZFVrePKSU')}
                            >
                            <Text
                                style={{
                                    color:'white'
                                }}
                            >
                                اتفرج
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 20,
                                color:'grey',
                                margin:15,
                                fontWeight:'bold'
                            }}>
                             افهم المنصة اكتر
                        </Text>
                    </View>
                </View>
                <SettingComponent
                    name={'جميع اشتراكاتي'}
                    iconName={'add'}
                    action={() => {
                        navigation.navigate('MySubscription')
                    }}
                />
                <SettingComponent
                    name={'جميع امتحناتى'}
                    iconName={'person-outline'}
                    action={() => {
                        navigation.navigate('MyExams')
                    }}
                />
                <SettingComponent
                    name={'تسجيل الخروج'}
                    iconName={'log-out-outline'}
                    action={() => {
                        auth().signOut().then(r => {
                            navigation.replace('Welcome')
                        })

                    }}
                />
                <View
                    style={{
                        marginTop: 20,
                    }}>

                <PoweredBy/>
                </View>
            </View>
        </ScrollView>
    )
}
const SettingComponent = ({action, name, iconName}) => {
    return (
        <TouchableOpacity
            style={{
                width: '90%',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flexDirection: 'row-reverse',
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 10,
                shadowColor: 'black',
                elevation: 5,
                alignItems: 'center',
                padding: 10,
                marginVertical: 10,
            }}
            onPress={() => {
                action()
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'grey',
                        textAlign: 'center',
                        marginHorizontal: 15,
                    }}
                >
                    {name}
                </Text>
                <View
                    style={{
                        backgroundColor: '#6694e5',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                    }}
                >
                    <Ionicons name={iconName} size={25} color={'white'}/>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#e5e5e5',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                }}
            >
                <Ionicons name={'arrow-forward'} size={20} color={'grey'}/>

            </View>

        </TouchableOpacity>
    )
}
export default ProfileScreen;
