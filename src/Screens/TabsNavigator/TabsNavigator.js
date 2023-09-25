import React, {useEffect, useState} from "react";
import {createBottomTabNavigator,} from "@react-navigation/bottom-tabs";
import CustomBottomTabs from "./CustomBottomTabs";
import HomeScreen from './HomeScreen/HomeScreen';
import AddScreen  from "./AddScreen/AddScreen";
const TabsStack = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
import MyItemsScreen from "./MyItemsScreen/MyItemsScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import {auth} from "../../Backend/firebase";

const TabsNavigator = ({navigation,route}) => {
    // auth().currentUser.updateProfile({
    //     displayName: 'mohamed hossam',
    //     photoURL: 'https://firebasestorage.googleapis.com/v0/b/e-learning-16148.appspot.com/o/view-3d-male-chemist-lab.jpg?alt=media&token=1d4eb726-2f66-4b34-b317-487975d38304',
    // }).then(r =>
    //     console.log('updated successfully')).catch(e=>
    //     console.log(e));
    return (
        <>
            <TabsStack.Navigator
                screenOptions={{tabBarShowLabel: false}}
                tabBar={(props) => <CustomBottomTabs {...props}/>}
            >
                <TabsStack.Screen
                    name={'الرئيسية'}
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon(props) {
                            return <Ionicons name="home" {...props} />;
                        },
                    }}
                />

                <TabsStack.Screen
                    name={'محاضراتى'}
                    component={MyItemsScreen}
                    options={{
                        title: 'محاضراتى',
                        tabBarIcon(props) {
                            return <Ionicons name="bookmark" {...props} />;
                        },
                    }}
                />
                <TabsStack.Screen
                    name={'اضافة'}
                    component={AddScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon(props) {
                            return <Ionicons name="add" {...props} />;
                        },
                    }}
                />
                <TabsStack.Screen
                    name={'الملف الشخصي'}
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon(props) {
                            return <Ionicons name="person" {...props} />;
                        }
                    }}
                />
            </TabsStack.Navigator>
        </>
    );
};

export default TabsNavigator;

