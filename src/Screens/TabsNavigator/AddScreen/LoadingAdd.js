import {View} from "react-native";

const LoadingAdd = () => {
    return (
        <View style={
            {
                width: "100%",
                height: 800,
                alignItems: "center",
                backgroundColor: "white",
            }
        }>
            <View style={{
                width: "90%",
                height: 200,
                marginVertical: 20,
                backgroundColor: "lightgrey",
            }}/>
            <View style={{
                width: "90%",
                height: 70,
                backgroundColor: "lightgrey",
            }}/>

            <View style={{
                width: "90%",
                height: 800,
                backgroundColor: "lightgrey",
                marginTop: 25,
            }}/>

        </View>
    );
}
export default LoadingAdd;
