import {View} from "react-native";

const LoadingQuestions = () => {
    const L = (height) => {
        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: 'lightgrey',
                    borderRadius: 20,
                    alignSelf: 'center',
                    // alignItems: 'flex-start',
                    shadowColor: 'black',
                    elevation: 5,
                    marginVertical: 20,
                    padding: 10,
                    height: height
                }}/>
        )
    }
    return (
        <View
            style={{
                width: '100%',
                backgroundColor: 'white',
            }}
        >
            {L(100)}
            {L(50)}
            {L(100)}
            {L(50)}


        </View>

    )
}
export default LoadingQuestions;
