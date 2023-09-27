import {FlatList, View} from "react-native";
import {L} from "../components";

const LecturesLoading = () => {
    const list = Array(8).fill(0);
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
            }}
        >
            {
                L(300)
            }
            {
                list.map((item, index) => {
                    return(

                            L(100)

                    )
                })
            }
        </View>

    )
}
const Item = ({item}) => {
    return (
        <View
            style={{
                flex: 1,
                margin: 20,
                height: 100,
                borderRadius: 10,
                // marginRight: 40,
                backgroundColor: 'lightgrey',
            }}
        >{item.title}</View>
    )
}
export default LecturesLoading;
