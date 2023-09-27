import {Image, ScrollView, Text, TextInput, TouchableOpacity, View, Linking} from "react-native";
import {openFacebookUrl} from "../../../Backend";
import {useState} from "react";
import {WebView} from "react-native-webview";


const HomeScreen = ({navigation, route}) => {
    const [playing, setPlaying] = useState(false);

    const togglePlaying = () => {
        setPlaying((prev) => !prev);
    }
    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 50,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        marginBottom: 50,
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
                        marginBottom: 10,
                        marginTop: 20,
                    }}>
                        <Image source={require("../../../assets/SharqawyPNG.png")}
                               style={{
                                   width: 190, height: 190, resizeMode: "contain",
                                   // backgroundColor: 'white',
                                   marginLeft: -20,
                               }}/>
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'white',
                                fontWeight: "bold",
                                textAlign: "center",
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            دكتور {"\n"}
                            صموئيل شرقاوى
                        </Text>
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
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15,
                        position: 'absolute',

                    }}>
                        <Text
                            style={{
                                fontSize: 15,
                                color: 'grey',
                            }}
                        >
                            الحق احجز مكانك الان
                        </Text>
                        <TouchableOpacity
                            onPress={openFacebookUrl}
                            style={{
                                margin: 5,
                                padding: 5,
                                backgroundColor: "rgb(210,189,0)",
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "white",

                            }}
                            >
                                احجز
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>

                <WebView
                    style={{ marginTop: 40, width: 320, height: 230 ,borderRadius: 20}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/lF_nCDFnPww" }}
                />
                {/*<Class clas={"الصف الاول الثانوى"} image={require('../../../assets/study1.jpg')}/>*/}
                {/*<Class clas={"الصف الثانى الثانوى"} image={require('../../../assets/study2.jpg')}/>*/}
                {/*<Class clas={"الصف الثالث الثانوى"} image={require('../../../assets/study3.jpg')}/>*/}

            </View>
        </ScrollView>
    );
}
const Class = ({clas, image}) => {
    return (
        <View style={{
            width: "90%",
            marginTop: 20,
            borderRadius: 50,

        }}>
            <TouchableOpacity
                onPress={() => {

                }}
                style={{}}>
                <Image source={image}
                       style={{
                           width: "100%",
                           height: 150,
                           borderRadius: 20,
                       }}
                       resizeMode={"center"}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "grey",
                textAlign: "center",
            }}
            >
                {clas}
            </Text>
        </View>
    )
}
export default HomeScreen;
