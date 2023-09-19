import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {getAllLectures} from "../../Backend";
import LecturesLoading from "./LecturesLoading";
import {ProgressBar} from "../components";

const Lectures = ({navigation, route}) => {
    const [allLectures, setAllLectures] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getAllLectures(setAllLectures).then(() => {
            setLoading(false);
        });
    }, [])
    return (
        <>
            {
                loading && <LecturesLoading/>
            }
            {
                !loading &&
                <FlatList
                    data={allLectures}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Item item={item} navigation={navigation}/>} // Use your custom item component
                    numColumns={2} // Set the number of columns to 2
                />
            }
        </>
    )
}
const Item = ({item,navigation}) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                margin: 20,
                // height: 200,
                borderRadius: 10,
                flexDirection: 'column',
                backgroundColor: 'white',

            }}
            onPress={() => {
                navigation.navigate('OneLecture', {
                    item: item,
                    title: item.lectureName,
                });
            }}
        >
            <Image source={{uri: item.imageUrl}} style={{width: '100%', height: 100,borderTopRightRadius:10,borderTopLeftRadius:10}}/>
            <Text style={{fontSize: 15, color: 'grey', alignSelf: 'center'}}>{item.lectureName}</Text>
            <ProgressBar progress={item.per}/>
            <Text style={{fontSize: 15, color: 'grey', alignSelf: 'flex-start',marginHorizontal:10}}>{item.per}%</Text>

        </TouchableOpacity>
    )
}

export default Lectures;

