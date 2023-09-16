import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";

// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-ionicons'
import {useState} from "react";
import {auth} from "../../Backend/firebase";

const RegisterStage2 = ({setStage,navigation}) => {
    const [existError, setExistError] = useState(false);
    const validate = () => {
        auth().onAuthStateChanged((user) => {
            console.log("user", user)
            if (user) {
                if (user.emailVerified) {
                    navigation.replace('TabNavigation');
                } else {
                    setExistError(true);
                }
            }else{
                navigation.replace('Welcome');
            }
        });
    }
    return (
        <ScrollView>
            {/*<Icon name="add" size={30} color="black" />*/}
            <TouchableOpacity
                onPress={() => navigation.replace('Welcome')}
                style={{padding: 15}}>
                <Ionicons name="arrow-back" color='black' size={30}></Ionicons>
            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: 'white',
                    marginLeft: 20,
                    marginRight: 20,
                    width: '90%',
                    borderRadius: 10,
                    paddingBottom: 20,
                }}
            >
                <Image source={require('../../assets/login.jpg')}
                       style={{
                           width: 100,
                           height: 100,
                           marginTop: 20,
                           marginBottom: 20,
                           borderRadius: 50,
                           borderColor: 'black',
                           borderWidth: 1,
                       }}/>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 400,
                        color: 'black',
                        letterSpacing: 3,
                    }}
                >
                    انشاء حساب جديد
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        color: 'grey',
                        marginHorizontal: 20,
                        textAlign: 'center',
                        marginTop: 20,

                    }}>
                    تم ارسال رابط التفعيل الى بريدك الالكتروني الرجاء الضغط على الرابط ثم اضغط متابعة
                </Text>
                {
                    existError &&
                <Text
                    style={{
                        fontSize: 15,
                        color: 'red',
                        marginHorizontal: 20,
                        textAlign: 'center',
                        marginTop: 20,
                    }}
                >
                    الرجاء تفعيل حسابك أولا
                </Text>
                }
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgb(0, 122, 255)',
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        width: '90%',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,

                    }}
                    onPress={validate}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 400,
                            color: 'white',

                        }}
                    >
                        متابعه
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 20,
                    }}
                    onPress={() => navigation.replace('Welcome')}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 400,
                            color: 'black',

                        }}
                    >
                        ارسال رابط التفعيل مره اخرى
                    </Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}
export default RegisterStage2;
