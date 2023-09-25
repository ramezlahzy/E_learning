import {Text} from "react-native";

const TestBank = ({navigation,route}) => {
    const {testBankId} = route.params;
    return (
        <Text
            style={{
                color:'black'
            }}
        >{testBankId}</Text>
    )
}
export default TestBank;
