import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {GoogleSignin, statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useState} from "react";
import auth from '@react-native-firebase/auth';
import {openFacebookUrl} from "../../Backend";
import {PoweredBy} from "../components";

GoogleSignin.configure({
    webClientId: '777807118707-4cnr5h2q2bqkgr92vbkrutl1ch61p9hg.apps.googleusercontent.com'
});
const Welcome = ({navigation, route}) => {
    const [state, setState] = useState({});
    const signIn = async () => {
        try {
            // console.log('here1')
            await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
            // console.log('here2')
            const {idToken} = await GoogleSignin.signIn();
            // console.log('here3')
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential)
            // console.log('here4')
            navigation.replace('TabsNavigator')
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('operation (e.g. sign in) is in progress already')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('play services not available or outdated')
            } else {
                // some other error happened
                // navigation.navigate('TabsNavigator')
                console.log('some other error happened', error)
            }
        }
    };
    return (
        <ScrollView
            style={{backgroundColor: 'white'}}
        >

            <View
                style={{
                    alignItems: "center",
                    backgroundColor: 'white'
                }}
            >
                <Image
                    style={{
                        width: '100%',
                        height: 350,
                    }}
                    source={require('../../assets/login.jpg')}/>
                <View
                    style={{
                        width: '100%',
                        paddingTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}
                >

                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >

                        <Text
                            style={{
                                fontSize: 40,
                                fontWeight: 400,
                                color: 'black',
                                letterSpacing: 3,
                                height: 50,
                            }}
                        >
                            The Doctor
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'grey',
                                marginHorizontal: 20,
                                textAlign: 'center',
                                marginTop: 20,
                            }}>
                            الخيار الافضل للتعليم عن بعد , للحصول على اعلى الدرجات
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: 40,
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgb(0, 122, 255)',
                                padding: 10,
                                borderRadius: 100,
                                marginLeft: 20,
                                marginRight: 20,
                                height: 50,
                                shadowColor: "#000",
                                elevation: 5,
                            }}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: 'white',
                                    marginHorizontal: 20
                                }}>
                                دخول
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 100,
                                borderColor: 'grey',
                                borderWidth: .5,
                                height: 50,
                            }}
                            onPress={openFacebookUrl}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: 'black',
                                    marginHorizontal: 20

                                }}>
                                تسجيل
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flex: 2,

                        }}
                    >
                        <PoweredBy/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
export default Welcome;
