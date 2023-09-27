import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from "./src/Screens/Splash/Splash";
import Welcome from "./src/Screens/Welcome/Welcome";
import TabsNavigator from "./src/Screens/TabsNavigator/TabsNavigator";
import Login from "./src/Screens/Login/Login";
import Register from "./src/Screens/Register/Register";
import Pay from "./src/Screens/Pay/Pay";
import PaymentWebView from "./src/Screens/Pay/PaymentWebView";
import OneLecture from "./src/Screens/OneLecture/OneLecture";
import Lectures from "./src/Screens/Lectures/Lectures";
import DisplayVideo from "./src/Screens/components/DisplayVideo";
import Exam from "./src/Screens/Exam/Exam";
import StartExam from "./src/Screens/Exam/StartExam";
import FinishedExam from "./src/Screens/Exam/FinishedExam";
import ExamSolution from "./src/Screens/Exam/ExamSolution";
import TestBank from "./src/Screens/TestBank/TestBank";
import MySubscription from "./src/Screens/TabsNavigator/ProfileScreen/MySubscriptions/MySubscription";
import SubscriptionByLecture
    from "./src/Screens/TabsNavigator/ProfileScreen/MySubscriptions/SubscriptionByLecture/SubsrcitpionByLecture";
import SubscriptionByMonth
    from "./src/Screens/TabsNavigator/ProfileScreen/MySubscriptions/SubscriptionByMonth/SubscriptionByMonth";
import MyExams from "./src/Screens/TabsNavigator/ProfileScreen/MyExams/MyExams";
import NoData from "./src/Screens/NoData/NoData";

const Stack = createNativeStackNavigator();

function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash}
                              options={{
                                  headerShown: false
                              }}
                />
                <Stack.Screen name="Welcome" component={Welcome}
                              options={{
                                  headerShown: false
                              }}
                />
                <Stack.Screen name="Login" component={Login}
                              options={{
                                  headerShown: false
                              }}
                />
                <Stack.Screen name="Register" component={Register}
                              options={{
                                  headerShown: false
                              }}
                />
                <Stack.Screen name="TabsNavigator" component={TabsNavigator}
                              options={{
                                  title: 'Welcome',
                                  headerShown: false
                              }}
                />
                <Stack.Screen name={'Pay'} component={Pay}
                              options={{
                                  title: "اشحن",
                              }}
                />
                <Stack.Screen name={'PaymentWebView'} component={PaymentWebView}
                              options={{
                                  title: "اشحن",
                                  headerShown: false
                              }}
                />
                <Stack.Screen name={'OneLecture'} component={OneLecture}
                              options={{
                                  title: "محتوى المحاضرة",
                              }}
                />
                <Stack.Screen name={'Lectures'} component={Lectures}
                              options={({route}) => ({title: route.params.title})}
                />
                <Stack.Screen name={'DisplayVideo'} component={DisplayVideo}
                              options={{
                                  headerShown: false
                              }}/>
                <Stack.Screen name={'Exam'} component={Exam}
                              options={{
                                  title: "امتحان",
                              }}/>
                <Stack.Screen name={'StartExam'} component={StartExam}
                              options={{
                                  headerShown: false
                              }}/>
                <Stack.Screen name={'FinishedExam'} component={FinishedExam}
                              options={{
                                  headerShown: false
                              }}
                />
                <Stack.Screen name={'ExamSolution'} component={ExamSolution}
                              options={{
                                  title: "حل الامتحان",
                              }}
                />
                <Stack.Screen name={'TestBank'} component={TestBank}
                              options={{
                                  title: "بنك الاسئلة",
                              }}/>
                <Stack.Screen name={'MySubscription'} component={MySubscription}
                              options={{
                                  title: "اشتراكاتي",
                                  // headerShown: false
                              }}
                />
                <Stack.Screen name={'SubscriptionByMonth'} component={SubscriptionByMonth}
                              options={{
                                  title: "اشتراكاتي",

                              }}
                />
                <Stack.Screen name={'SubscriptionByLecture'} component={SubscriptionByLecture}
                              options={{
                                  title: "اشتراكاتي",
                              }}
                />
                <Stack.Screen name={'MyExams'} component={MyExams}
                              options={{
                                  title: "امتحاناتي",
                              }}
                />
                <Stack.Screen name={'NoData'} component={NoData}
                              options={{
                                  headerShown: false
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
