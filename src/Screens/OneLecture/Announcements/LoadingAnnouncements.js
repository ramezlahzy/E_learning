import {View} from "react-native";
import {L} from "../../components";

const LoadingAnnouncements=()=>{
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
export default LoadingAnnouncements;
