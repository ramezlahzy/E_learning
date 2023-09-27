import {Image, Text, View} from "react-native";
import {BR} from "../../../components";
import LoadingQuestions from "../LoadingQuestions";
import auth from "@react-native-firebase/auth";

const MyQuestions = ({ loading,questions }) => {
    const myQuestions = questions.filter(item => item.uid === auth().currentUser.uid).sort((a,b)=>b.date-a.date)
    return(
        <View
            style={{
                width: '100%',
                minHeight: 100,
            }}
        >
            {
                loading &&
                <LoadingQuestions/>
            }
            { !loading &&
                myQuestions.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                width: '100%',
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                    // alignItems: 'flex-start',
                                    shadowColor: 'black',
                                    elevation: 5,
                                    marginVertical: 10,
                                    padding: 10,

                                }}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            margin:10
                                        }}
                                    >
                                        {auth().currentUser.displayName}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        color: 'grey',
                                        marginHorizontal:10,

                                    }}
                                >
                                    -السؤال
                                </Text>
                                <Text
                                    style={{
                                        color: 'grey',
                                        margin:10
                                    }}
                                >
                                    {item.question}
                                </Text>

                            </View>
                            <Text
                                style={{
                                    color: 'grey',

                                }}
                            >
                                -الاجابة
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                    shadowColor: 'black',
                                    elevation: 5,
                                    marginVertical: 10,
                                    padding: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'grey',
                                    }}
                                >
                                    {!item.reply? 'لم يتم الرد على السؤال بعد':item.reply}
                                </Text>
                            </View>
                            <BR/>

                        </View>
                    )
                })
            }
        </View>
    )
}
export default MyQuestions;
