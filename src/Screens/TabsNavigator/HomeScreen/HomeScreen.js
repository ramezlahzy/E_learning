import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({navigation, route}) => {
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
                        width: "90%",
                        height: 200,
                        marginTop: 0,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <View style={{
                        width: "100%",
                        height: 130,
                        backgroundColor: "rgb(102,148,229)",
                        borderRadius: 20,
                    }}>

                    </View>
                    <View style={{
                        left: 0, bottom: 0,
                        position: 'absolute',
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}>

                        <Image source={require("../../../assets/SharqawyPNG.png")}
                               style={{
                                   width: 190, height: 190, resizeMode: "contain",
                               }}/>
                        <View style={{
                            height: 130,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
                                textAlign: "center",
                                marginTop: 10,
                            }}>
                                دكتور
                                {"\n"}
                                صموئيل شرقاوى
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    width: "90%",
                    height: 50,
                    marginTop: 30,
                    borderRadius: 10,
                    backgroundColor: "rgba(206,202,202,0.37)",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <TextInput
                        placeholder={"ابحث عن محاضرة"}
                        placeholderTextColor={"grey"}
                        style={{
                            flex: 1,
                            marginHorizontal: 10,
                            color: "black",
                        }}
                    />
                    <Ionicons name={"search"} size={24} color={"black"} style={{marginHorizontal: 10}}/>

                </View>
                <Class clas={"الصف الاول الثانوى"} image={require('../../../assets/study1.jpg')}/>
                <Class clas={"الصف الثانى الثانوى"} image={require('../../../assets/study2.jpg')}/>
                <Class clas={"الصف الثالث الثانوى"} image={require('../../../assets/study3.jpg')}/>

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
