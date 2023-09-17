import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {white} from "../../../.yarn/releases/yarn-1.22.19";

const Pay = () => {
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',

            }}
        >
            <Text
                style={{
                    color: 'black',
                    margin:5
                }}
            >
                ادخل قيمة المبلغ
            </Text>
            <TextInput
                style={{
                    height: 50,
                    width: 200,
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 10,
                    padding: 5,
                    shadowColor: 'black',
                    elevation: 5,
                    textAlign:'center'
                    //numeric
                }}
                keyboardType="numeric"
                placeholderTextColor={'grey'}
                placeholder={'المبلغ'}
            />
            <TouchableOpacity
                style={{
                    height: 50,
                    width: 200,
                    backgroundColor: 'rgb(224,0,0)',
                    margin: 20,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:10,
                    shadowColor:'black',
                    elevation:5,
                }}>
                <Text
                style={{
                    color:"white",
                    fontSize:20,
                    fontWeight:'bold'
                }}
                >
                    اشحن
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Pay;
