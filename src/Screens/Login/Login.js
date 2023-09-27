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
import {useEffect, useState} from "react";
import {auth} from "../../Backend/firebase";
import {InputFeild} from "../components";
import {openFacebookUrl} from "../../Backend";

const Login = ({setStage, navigation}) => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;
        if (email.length === 0) {
            setEmailError('الرجاء ادخال البريد الالكتروني');
            valid = false;
        } else
            setEmailError('');

        if (password.length === 0) {
            setPasswordError('الرجاء ادخال كلمة المرور');
            valid = false;
        } else
            setPasswordError('');
        if (valid) {
            setLoading(true);
            auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    navigation.replace('TabsNavigator');
                    ToastAndroid.show("تم تسجيل الدخول بنجاح", ToastAndroid.SHORT);
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false)
                console.log(error);
                let errorMessage = error.message;
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'البريد الالكتروني غير مسجل';
                }
                if (error.code === 'auth/wrong-password') {
                    errorMessage = 'كلمة المرور غير صحيحة';
                }
                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'البريد الالكتروني غير صحيح';
                }
                if (error.code === 'auth/invalid-login') {
                    errorMessage = 'الرجاء الدخول عبر جوجل'
                }
                setLoading(false);
                ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            });
        }

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
                    alignSelf:'center'
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
                    سجل الدخول
                </Text>
                <InputFeild
                    feildName={'البريد الالكتروني'}
                    iconName={'mail'}
                    error={emailError}
                    setFeild={setEmail}
                    feild={email}
                    placeHolder={'example@gmail.com'}
                />
                <InputFeild
                    feildName={'كلمة المرور'}
                    iconName={'lock-closed'}
                    error={passwordError}
                    setFeild={setPassword}
                    feild={password}
                    placeHolder={'ادخل كلمة المرور'}
                />
                {
                    loading ?
                        <ActivityIndicator
                            size="large"
                            style={{
                                marginTop: 20,

                            }}
                        />
                        :

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
                                تسجيل الدخول
                            </Text>
                        </TouchableOpacity>
                }
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                        marginTop: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={openFacebookUrl}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: 'rgb(0, 122, 255)',
                                marginHorizontal: 10,
                                textAlign: 'center',
                                alignSelf: 'center',

                            }}
                        >
                           تواصل معنا
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'black',
                            textAlign: 'center',
                            alignSelf: 'center',
                        }}
                    >
                        ليس لديك حساب ؟
                    </Text>

                </View>

            </View>
        </ScrollView>
    )
}
export default Login;
