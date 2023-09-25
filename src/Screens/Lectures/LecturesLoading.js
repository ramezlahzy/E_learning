import {FlatList, View} from "react-native";

const LecturesLoading = () => {
    const list = Array(8).fill(0);
    return (
        <View
        >
            <View
                style={{
                    height: 300,
                    width: '90%',
                    backgroundColor: 'lightgrey',
                    alignSelf: 'center',
                }}/>
            {
                list.map((item, index) => {
                    return (
                        <Item item={item} key={index}/>
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
