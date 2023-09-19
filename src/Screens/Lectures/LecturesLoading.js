import {FlatList, View} from "react-native";

const LecturesLoading = () => {
    const list = Array(8).fill(0);
    return (
        <FlatList
            data={list}
            // keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Item item={item} />} // Use your custom item component
            numColumns={2} // Set the number of columns to 2
        />
    )
}
const Item = ({ item }) => {
    return (
        <View
            style={{
                flex: 1,
                margin: 20,
                height: 100,
                borderRadius: 10,
                backgroundColor: 'lightgrey',
            }}
        >{item.title}</View>
    )
}
export default LecturesLoading;
