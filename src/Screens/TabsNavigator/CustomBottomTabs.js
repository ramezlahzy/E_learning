import {View, Text, TouchableOpacity, Pressable} from "react-native";
import React from "react";
// import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {SafeAreaView} from "react-native-safe-area-context";
// import Animated, {
//     interpolateColor,
//     useAnimatedStyle,
//     useSharedValue,
//     withDelay,
// } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomBottomTabs = (props) => {
    return (
        <SafeAreaView edges={["bottom"]} style={{backgroundColor: 'white'}}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                }}
            >
                {props.state.routes.map((route, i) => {
                    const isActive = i === props.state.index;
                    return (
                        <TabItem
                            key={i}
                            isActive={isActive}
                            routeName={route.name}
                            navigation={props.navigation}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

export default CustomBottomTabs;

const TabItem = ({
                     routeName,
                     isActive,
                     navigation,
                 }) => {
    // const { colors } = useTheme();
    const colors = {
        primary: "rgb(102,148,229)",
        card: "#ffffff",
        text: "#000000",
    }
    const onTap = () => {
        navigation.navigate(routeName);
    };

    return (
        <Pressable
            onPress={onTap}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingVertical: 4,
            }}
        >
            {/*<Animated.View*/}
            <View
                style={[
                    {
                        width: 36,
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 32,
                        backgroundColor: isActive ? colors.primary : "transparent",
                    },
                ]}
            >
                <Ionicons
                    name={
                        routeName === 'الرئيسية'
                            ? "home"
                            : routeName === 'محاضراتى'
                                ? "bookmark" :
                                routeName === 'اضافة'?
                                    "add" : 'person'
                    }
                    size={24}
                    color={isActive ? colors.card : colors.text}
                    style={{
                        opacity: isActive ? 1 : 0.5,

                    }}
                />
            </View>
            {/*</Animated.View>*/}
            {/*{isActive && (*/}
                <Text
                    style={{
                        marginLeft: 4,
                        fontSize: 12,
                        fontWeight: "600",
                        color: isActive ? colors.primary : 'grey'
                    }}
                >
                    {routeName}
                </Text>
            {/*)}*/}
        </Pressable>
    );
};
