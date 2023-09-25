import {Text, View} from "react-native";
import LoadingQuestions from "../LoadingQuestions";
import {BR} from "../../../components";

const OtherQuestions = ({ loading,questions }) => {
    return(
        <View
            style={{
                width: '100%',
            }}
        >
            {
                loading &&
                <LoadingQuestions/>
            }
            { !loading &&
                questions.map((item, index) => {
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
                                    {/*<Image*/}
                                    {/*    source={item.studentImage}*/}
                                    {/*    style={{*/}
                                    {/*        width: 50,*/}
                                    {/*        height: 50,*/}
                                    {/*        borderRadius: 50,*/}
                                    {/*        margin: 10,*/}

                                    {/*    }}*/}
                                    {/*/>*/}
                                    {/*<Text*/}
                                    {/*    style={{*/}
                                    {/*        color: 'grey',*/}
                                    {/*        fontSize: 18,*/}
                                    {/*        fontWeight: 'bold',*/}

                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {item.studentName}*/}
                                    {/*</Text>*/}
                                </View>
                                <Text
                                    style={{
                                        color: 'grey',
                                        marginHorizontal:10,
                                    }}
                                >
                                    السؤال
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
                                الاجابة
                            </Text>
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
                                <Text
                                    style={{
                                        color: 'grey',
                                    }}
                                >
                                    {item.answer}
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
export default OtherQuestions;
