import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";

// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-ionicons'
import {useState} from "react";
import {auth} from "../../Backend/firebase";
import RegisterStage1 from "./RegisterStage1";
import RegisterStage2 from "./RegisterStage2";

const Register = ({navigation}) => {
    const [stage, setStage] = useState(1);
    return (
        <>
            {
                stage === 1 &&
                <RegisterStage1 setStage={setStage}
                                navigation={navigation}
                />
            }


        </>
    )
}
export default Register;
