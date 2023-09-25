import {Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openFacebookUrl} from "../../Backend";
import Svg, {Circle} from 'react-native-svg';
import {useState} from "react";

const InputFeild = ({feildName, iconName, setFeild, feild, error, placeHolder}) => {
    return (
        <View
            style={{
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
                display: 'flex',

            }}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'black',
                    marginHorizontal: 20,
                    textAlign: 'right',
                    alignSelf: 'flex-end',
                }}
            >
                {feildName}
            </Text>
            <View
                style={{
                    width: '90%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'rgb(240, 240, 240)',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderColor: error !== '' ? 'red' : 'rgb(240, 240, 240)',
                    borderWidth: 1,
                }}>
                <TextInput
                    style={{
                        height: 50,
                        borderRadius: 10,

                        flex: 1,
                        color: 'black',
                        padding: 10,
                    }}
                    secureTextEntry={feildName === 'كلمة المرور' ? true : false}
                    placeholder={placeHolder}
                    placeholderTextColor={'grey'}
                    onChangeText={setFeild}
                    value={feild}
                />
                <Ionicons name={iconName} color='grey' size={20}></Ionicons>
            </View>

            {
                error !== '' &&
                <Text
                    style={{
                        fontSize: 12,
                        color: 'red',
                        marginHorizontal: 20,
                    }}
                >
                    {
                        error
                    }
                </Text>
            }
        </View>
    )
}
const ProgressBar = ({progress}) => {
    return (
        <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${progress}%`}]}></View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        width: '90%',
        height: 10,
        margin: 10,
        backgroundColor: '#ccc',
        borderRadius: 2,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    progress: {
        height: '100%',
        backgroundColor: 'rgb(102,148,229)',
    },
});
const SubscriptionButton = ({isFree, isSubscribed}) => {
    return <TouchableOpacity
        style={{
            // flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: isSubscribed ? 'rgb(83,171,84)' : 'rgb(224,0,0)',
            backgroundColor: isFree ? 'rgb(255,132,132)' : isSubscribed ? 'rgb(119,119,119)' : 'rgb(102,148,229)',
            borderRadius: 10,
            padding: 5,
            flexDirection: 'row-reverse',
        }}
        onPress={

            () => {
                if (isFree || isSubscribed) {
                    return;
                }
                // if (userBalance >= month.price) {
                openFacebookUrl();
                // }
            }
        }

    >
        <Text
            style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
                marginHorizontal: 5,
            }}
        >{isFree ? 'مجانى' : isSubscribed ? 'تم الاشتراك' : 'اشترك الان'}</Text>
        {
            isSubscribed && <Ionicons name={'checkmark'} color={'white'} size={24}/>
        }
    </TouchableOpacity>

}
const BR = () => {
    return <View style={{
        height: 1,
        backgroundColor: 'grey',
        width: '80%',
        alignSelf: 'center',
        marginVertical: 6,
        opacity: .6
    }}></View>
}

function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const mm = minutes < 10 ? `0${minutes}` : minutes;
    const ss = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${mm}:${ss}`;
}

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}
const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);

}
const CircularProgress = ({radius, strokeWidth, progress}) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View>
            <Svg width={radius * 2} height={radius * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#d1d1d1"
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    fill="transparent"
                    stroke="#3498db"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
            {/*<Text style={{ textAlign: 'center',color:'rgb(102,148,229)' }}>{`${progress}%`}</Text>*/}
        </View>
    );
};

const TrueFalseQuestion = ({
                               question,
                               index,
                               trueFalseQuestionsAnswer,
                               setTrueFalseQuestionsAnswer,
                               before,
                               studentAnswer,
                               solution
                           }) => {
    // console.log(studentAnswer, question.correctAnswer)
    let trueAnswer = false;
    if (studentAnswer === 'صح' && question.correctAnswer || studentAnswer === 'خطا' && !question.correctAnswer) {
        trueAnswer = true;
    }
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
                // marginBottom: 20,

            }}
            >

                <TrueFalseAnswer index={index} setTrueFalseQuestionsAnswer={setTrueFalseQuestionsAnswer}
                                 trueFalseQuestionsAnswer={trueFalseQuestionsAnswer}
                                 solution={solution} studentAnswer={studentAnswer}
                                 correctAnswer={question.correctAnswer}
                />
                <View
                    style={{
                        marginBottom: 20,
                    }}
                >

                    {
                        solution && !trueAnswer && <Text style={{
                            color: 'red',
                            textAlign: 'center',
                        }}
                        >
                            اجابة خاطئة
                        </Text>
                    }
                    {
                        solution && trueAnswer && <Text style={{
                            color: 'green',
                            textAlign: 'center',
                        }}
                        >
                            اجابة صحيحة
                        </Text>
                    }
                </View>
                {
                    solution && <Text style={{
                        // fontSize: 15,
                        color: 'black',
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
const TrueFalseAnswer = ({
                             index,
                             trueFalseQuestionsAnswer,
                             setTrueFalseQuestionsAnswer,
                             solution,
                             studentAnswer,
                             correctAnswer
                         }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const Answer = ({name}) => {
        let backgroundColor = selectedAnswer === name ? 'rgb(102,148,229)' : '#fff';
        if (solution) {
            if (name === studentAnswer) {
                backgroundColor = 'rgb(102,148,229)'
            }
        }
        let textColor = selectedAnswer === name ? 'white' : 'grey';
        if (solution) {
            if (name === studentAnswer) {
                textColor = 'white'
            }
        }
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
                trueFalseQuestionsAnswer[index] = name;
                setTrueFalseQuestionsAnswer(trueFalseQuestionsAnswer)
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

const ChooseQuestion = ({
                            question,
                            index,
                            setChooseQuestionsAnswers,
                            chooseQuestionsAnswers,
                            studentAnswer,
                            solution
                        }) => {
    const trueAnswer = studentAnswer === question.correctAnswer;
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
                <Answers answers={question.options} index={index} setChooseQuestionsAnswers={setChooseQuestionsAnswers}
                         chooseQuestionsAnswers={chooseQuestionsAnswers}
                         solution={solution} studentAnswer={studentAnswer} correctAnswer={question.correctAnswer}
                />
                {/*   wrong answer */}
                {
                    solution && !trueAnswer && <Text style={{
                        color: 'red',
                        textAlign: 'center',
                    }}
                    >
                        اجابة خاطئة
                    </Text>
                }
                {
                    solution && trueAnswer && <Text style={{
                        color: 'green',
                        textAlign: 'center',
                    }}
                    >
                        اجابة صحيحة
                    </Text>
                }

            </View>

            {
                solution && <Text style={{
                    color: 'black',
                }}
                >
                    الاجابة الصحيحة : {question.correctAnswer}
                </Text>
            }
            <BR/>
        </View>

    )
}
const Answers = ({
                     answers,
                     index,
                     chooseQuestionsAnswers,
                     setChooseQuestionsAnswers,
                     solution,
                     studentAnswer,
                     correctAnswer
                 }) => {

    const [selectedAnswer, setSelectedAnswer] = useState('')
    return (answers.map((answer, indexMin) => {
            let color = 'white';
            if (solution) {
                if (answer === studentAnswer) {
                    color = 'rgb(102,148,229)'
                }
            } else {
                color = selectedAnswer === answer ? 'rgb(102,148,229)' : '#fff';
            }
            let textColor = selectedAnswer === answer ? 'white' : 'grey';
            if (solution) {
                if (answer === studentAnswer) {
                    textColor = 'white'
                }
            }
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
                    chooseQuestionsAnswers[index] = answer;
                    setChooseQuestionsAnswers(chooseQuestionsAnswers)
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
export {
    InputFeild, ProgressBar, SubscriptionButton, BR, secondsToMMSS, shuffleArray, showToast, CircularProgress,
    TrueFalseQuestion, ChooseQuestion, Answers, TrueFalseAnswer
}
