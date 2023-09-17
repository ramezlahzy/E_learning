import React from 'react';
import {
    StyleSheet,
    useColorScheme,
} from 'react-native';
import 'react-native-gesture-handler';


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from "./src/Screens/Splash/Splash";
import Welcome from "./src/Screens/Welcome/Welcome";
import TabsNavigator from "./src/Screens/TabsNavigator/TabsNavigator";
import Login from "./src/Screens/Login/Login";
import Register from "./src/Screens/Register/Register";
import Pay from "./src/Screens/Pay/Pay";
// import { createDrawerNavigator } from 'react-navigation-drawer';

const Stack = createNativeStackNavigator();


function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="TabsNavigator"
                    component={TabsNavigator}
                    options={{
                        title: 'Welcome',
                        headerShown: false
                    }}
                />
                <Stack.Screen name={'Pay'} component={Pay}
                                options={{
                                    title:"اشحن",
                                }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
