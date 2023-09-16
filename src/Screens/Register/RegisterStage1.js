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
import {InputFeild} from "../components";

const RegisterStage1 = ({setStage,navigation}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [mailError, setMailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState(false)
    // setLoading(false)
    const validate = () => {
        let valid = true
        if (firstName === '') {
            setFirstNameError('يجب ادخال الاسم الاول')
            valid = false
        } else
            setFirstNameError('')
        if (lastName === '') {
            setLastNameError('يجب ادخال الاسم الاخير')
            valid = false
        } else
            setLastNameError('')
        if (mail === '' || !mail.includes('@gmail.com')) {
            setMailError('يجب ادخال البريد الالكترونى بشكل صحيح')
            valid = false
        } else
            setMailError('')
        if (password === '' || password.length < 8) {
            setPasswordError('كلمة المرور يجب ان تكون اكثر من 8 حروف')
            valid = false
        } else
            setPasswordError('')
        if (valid){
            setLoading(true)
            auth()
                .createUserWithEmailAndPassword(mail, password)
                .then((userCredential) => {
                    console.log('User account created & signed in!');
                    ToastAndroid.showWithGravity(
                        "تم انشاء الحساب بنجاح",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    // setLoading(false)
                    // userCredential.user.sendEmailVerification().then(function() {
                    //     setStage(2)
                    // }).catch(function(error) {
                    //     ToastAndroid.showWithGravity(
                    //         "حدث خطأ ما",
                    //         ToastAndroid.SHORT,
                    //         ToastAndroid.CENTER
                    //     );
                    // });
                    navigation.replace('TabsNavigator');
                    setLoading(false)
                })
                .catch(error => {
                    let errorCode = error.code;
                    if (error.code === 'auth/email-already-in-use') {
                        errorCode = 'هذا البريد الالكترونى مستخدم بالفعل'
                    } else if (error.code === 'auth/invalid-email') {
                        errorCode = 'البريد الالكترونى غير صحيح'
                    }

                    console.error(error);
                    //toast
                    ToastAndroid.showWithGravity(
                        errorCode,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    setLoading(false)
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
                    marginBottom: 20,
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
                <InputFeild feildName={'الاسم الاول'} iconName={'person'} error={firstNameError}
                      hasError={firstNameError} setFeild={setFirstName} feild={firstName} placeHolder={'الاسم الاول'}
                />
                <InputFeild feildName={'الاسم الاخير'} iconName={'person'} error={lastNameError}
                      hasError={lastNameError} setFeild={setLastName} feild={lastName} placeHolder={'الاسم الاخير'}
                />
                <InputFeild feildName={'البريد الالكترونى'} iconName={'mail'} error={mailError}
                      hasError={mailError} setFeild={setMail} feild={mail} placeHolder={'example@gmail.com'}

                />
                <InputFeild feildName={'كلمة المرور'} iconName={'key'} error={passwordError}
                      hasError={passwordError} setFeild={setPassword} feild={password} placeHolder={'كلمة المرور'}
                />

                {
                    loading ?
                        <ActivityIndicator size="large" color="blue" style={{
                            marginTop: 20,
                        }}/> :
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
            </View>
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 20,
                }}
            >

                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}>
                    <Text style={{
                        color: 'blue',
                        fontSize: 15,
                        fontWeight: 400,
                        margin: 10,
                    }}>
                        تسجيل الدخول
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        color: 'grey',
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 400,


                    }}
                >
                    لديك حساب بالفعل ؟
                </Text>
            </View>
        </ScrollView>
    )
}
export default RegisterStage1;
