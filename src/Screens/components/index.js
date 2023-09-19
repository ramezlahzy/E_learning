import {Text, TextInput, View, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const InputFeild = ({feildName, iconName, setFeild, feild, error, placeHolder}) => {
    return (
        <View
            style={{
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
                display: 'flex',

            }}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'black',
                    marginHorizontal: 20,
                    textAlign: 'right',
                    alignSelf: 'flex-end',
                }}
            >
                {feildName}
            </Text>
            <View
                style={{
                    width: '90%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'rgb(240, 240, 240)',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    borderColor: error !== '' ? 'red' : 'rgb(240, 240, 240)',
                    borderWidth: 1,
                }}>
                <TextInput
                    style={{
                        height: 50,
                        borderRadius: 10,

                        flex: 1,
                        color: 'black',
                        padding: 10,
                    }}
                    secureTextEntry={feildName === 'كلمة المرور' ? true : false}
                    placeholder={placeHolder}
                    placeholderTextColor={'grey'}
                    onChangeText={setFeild}
                    value={feild}
                />
                <Ionicons name={iconName} color='grey' size={20}></Ionicons>
            </View>

            {
                error !== '' &&
                <Text
                    style={{
                        fontSize: 12,
                        color: 'red',
                        marginHorizontal: 20,
                    }}
                >
                    {
                        error
                    }
                </Text>
            }
        </View>
    )
}
const ProgressBar = ({progress}) => {
    return (
        <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${progress}%`}]}></View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        width: '90%',
        height: 10,
        margin: 10,
        backgroundColor: '#ccc',
        borderRadius: 2,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    progress: {
        height: '100%',
        backgroundColor: 'rgb(102,148,229)',
    },
});


export {InputFeild, ProgressBar}
