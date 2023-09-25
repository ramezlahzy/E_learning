import {ScrollView, Text, View} from "react-native";
import {useState} from "react";
import {ChooseQuestion, shuffleArray, TrueFalseQuestion} from "../components";

const ExamSolution = ({navigation, route}) => {
    const {examStudent, questions} = route.params;
    const getStudentAnswerTrueFalse = (question) => {
        let solution = '';
        examStudent.trueFalseQuestions.forEach((q) => {
            if (question.id === q.questionId) {
                solution = q.studentAnswer;
            }
        })
        return solution;
    }
    const getStudentAnswerChoose = (question) => {
        let solution = '';
        examStudent.chooseQuestions.forEach((q) => {
            if (question[0] === q.questionId) {
                solution = q.studentAnswer;
            }
        })
        return solution;
    }
    const [chooseQuestions, setChooseQuestions] = useState(questions.filter((question) => question.type === 'choose')
        .map((question) => {
            return [
                question.id,
                question.correctAnswer,
                question.question,
                shuffleArray([question.correctAnswer, ...question.options]),
            ]
        })
    )
    const trueFalseQuestions = questions.filter((question) => question.type === 'trueFalse')

    return (
        <ScrollView style={{backgroundColor: 'white', paddingVertical: 20}}>

            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    display: 'flex',
                    paddingHorizontal: 20,
                    pointerEvents: 'none',
                    paddingBottom: 40,
                }

                }
            >

                {
                    chooseQuestions.map((question, index) => {
                            return <ChooseQuestion question={question} key={index} index={index}
                                                   studentAnswer={getStudentAnswerChoose(question)} solution={true}/>
                        }
                    )
                }
                {
                    trueFalseQuestions.map((question, index) => {
                        return <TrueFalseQuestion question={question} key={index} index={index}
                                                  before={chooseQuestions.length}
                                                  studentAnswer={getStudentAnswerTrueFalse(question)} solution={true}
                        />
                    })
                }
            </View>
        </ScrollView>
    )
}
export default ExamSolution
