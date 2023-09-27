import {ActivityIndicator, View} from "react-native";
import {L} from "../../../components";

const Loading = () => {
    return (
        <View style={{
            flex: 1,
            width: '100%'
        }}>
            {/*<ActivityIndicator size="large"  />*/}
            {L(100)}
            {L(100)}
            {L(100)}
            {L(100)}
            {L(100)}
            {L(100)}
        </View>
    );
}
export default Loading;
