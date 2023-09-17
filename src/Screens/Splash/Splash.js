import {Text, View, Animated, Image} from "react-native";
import {useEffect, useRef, useState} from "react";
import {auth} from "../../Backend/firebase";

const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(fadeAnim, {
            fromValue: 0,
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const scaleAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
    useEffect(() => {
        Animated.timing(scaleAnim, {
            fromValue: 1,
            toValue: 1.5,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [scaleAnim]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
                transform: [{scale: scaleAnim}],
            }}>
            {props.children}
        </Animated.View>
    );
};
const Splash = ({navigation, route}) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState('');

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        //timer
        setTimeout(() => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    navigation.replace('TabsNavigator')
                } else {
                    navigation.replace('Welcome')
                }
            });
            // navigation.replace('Welcome')
            }, 2000);
    }, []);
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // if (initializing) return null;


    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: 'center',
                alignSelf: 'center',
                alignContent: 'center',


            }}
        >

        <Image source={require('../../assets/login.jpg')} style={{width: 100, height: 100,borderRadius:100}}/>
        </View>
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(102,148,229)'}}>
        //     <FadeInView
        //         style={{
        //             width: '100%',
        //             height: '100%',
        //             alignItems: 'center',
        //             justifyContent: 'center',
        //         }}
        //     >
        //         {/*<Image source={require('../../assets/artificial-intelligence.png')} style={{width: 100, height: 100,marginBottom:20}}/>*/}
        //
        //         <Text
        //             style={{
        //                 fontSize: 40,
        //                 fontWeight: "bold",
        //                 color: 'white',
        //                 letterSpacing: 3,
        //                 shadowColor: "#000",
        //                 elevation: 5,
        //             }}
        //         >
        //             Dr-Gemi
        //         </Text>
        //     </FadeInView>
        // </View>
    );

}
export default Splash;
