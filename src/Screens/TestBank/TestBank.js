import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import LecturesLoading from "../Lectures/LecturesLoading";
import {useEffect, useState} from "react";
import {getQuestionsByTestBankId} from "../../Backend";
import {BR, shuffleArray} from "../components";

const TestBank = ({navigation, route}) => {
    const {testBankId} = route.params;
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [chooseQuestions, setChooseQuestions] = useState([]);
    const [trueFalseQuestions, setTrueFalseQuestions] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    useEffect(() => {
        setLoading(true);
        getQuestionsByTestBankId(setQuestions, testBankId).then(() => {
            setLoading(false);
        })
    }, [])
    useEffect(() => {
        setChooseQuestions(questions.filter((question) => question.type === 'choose')
            .map((question) => {
                return {
                    ...question,
                    options: shuffleArray([question.correctAnswer, ...question.options]),
                }
            })
        )
        setTrueFalseQuestions(questions.filter((question) => question.type === 'trueFalse'))
    }, [questions])

    return (
        <ScrollView
            style={{
                backgroundColor: 'white',

            }}
        >
            {
                loading && <LecturesLoading/>
            }
            {
                !loading &&
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        display: 'flex',
                        paddingHorizontal: 20,

                    }}
                >
                    <View>
                        <Image source={require('../../assets/solve.jpg')}
                               style={{width: '100%', height: 300, borderRadius: 20, marginBottom: 10}}
                               resizeMode={'center'}/>

                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: showAnswers?'grey':'#2E9E9B',
                            height: 50,
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            margin: 20,
                        }}
                        onPress={() => {
                            setShowAnswers(!showAnswers)
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',

                        }}
                        >
                            {showAnswers ? 'اخفاء الاجابات' : 'اظهار الاجابات'}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{}}
                    >

                        {
                            chooseQuestions.map((question, index) => {
                                    return <ChooseQuestion question={question} key={index} index={index} showAnswers={showAnswers} />
                                }
                            )
                        }
                        {
                            trueFalseQuestions.map((questions, index) => {
                                return <TrueFalseQuestion question={questions} key={index} index={index}
                                                          before={chooseQuestions.length}
                                                          showAnswers={showAnswers}
                                />
                            })
                        }
                    </View>
                </View>
            }
        </ScrollView>
    )
}

const TrueFalseQuestion = ({question, index, before,showAnswers}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            display: 'flex',


        }}
        >
            <Text style={{
                fontSize: 15,
                color: 'black',
            }}
            >
                {index + 1 + before} - {question.question}
            </Text>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                display: 'flex',

            }}
            >

                <TrueFalseAnswer/>
                <View
                    style={{
                        marginBottom: 20,
                    }}
                >
                </View>
                {
                    showAnswers&&  <Text style={{
                        color: 'rgb(210,189,0)',
                    }}
                    >
                        الاجابة الصحيحة : {question.correctAnswer ? ' صح' : ' خطأ'}
                    </Text>
                }
            </View>
            <BR/>
        </View>
    )
}
const TrueFalseAnswer = ({}) => {
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const Answer = ({name}) => {
        let backgroundColor = selectedAnswer === name ? 'rgb(102,148,229)' : '#fff';
        let textColor = selectedAnswer === name ? 'white' : 'grey';
        return <TouchableOpacity
            style={{
                backgroundColor: backgroundColor,
                padding: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
                margin: 20,
                shadowColor: 'black',
                elevation: 5
            }}
            onPress={() => {
                setSelectedAnswer(name)
            }}
        >
            <Text
                style={{
                    fontSize: 15,
                    color: textColor

                }}
            >
                {name}
            </Text>
        </TouchableOpacity>
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}
        >
            <Answer name={'خطا'}/>
            <Answer name={'صح'}/>
        </View>
    )
}

const ChooseQuestion = ({question, index,showAnswers}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            display: 'flex',
        }}
        >
            <Text style={{
                fontSize: 15,
                color: 'black',
            }}
            >
                {index + 1} - {question.question}
            </Text>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                display: 'flex',
                paddingHorizontal: 20,
                marginVertical: 20

            }}
            >
                <Answers answers={question.options} index={index}/>
            </View>

            {
                showAnswers&&  <Text style={{
                    color: 'rgb(210,189,0)',
                }}
                >
                    الاجابة الصحيحة : {question.correctAnswer}
                </Text>
            }
            <BR/>
        </View>

    )
}
const Answers = ({answers}) => {
    const [selectedAnswer, setSelectedAnswer] = useState('')
    return (answers.map((answer,indexMin) => {
            let color = selectedAnswer === answer ? 'rgb(102,148,229)' : '#fff';

            let textColor = selectedAnswer === answer ? 'white' : 'grey';

            return <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: color,
                    display: 'flex',
                    marginVertical: 5,
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: 'black',
                    elevation: 5
                }}
                onPress={() => {
                    setSelectedAnswer(answer)
                }}>
                <Text style={{
                    fontSize: 15,
                    color: textColor

                }}>
                    {indexMin + 1} - {answer}
                </Text>
            </TouchableOpacity>

        }
    ))
}
export default TestBank;
