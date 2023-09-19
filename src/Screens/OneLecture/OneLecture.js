import {Button, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import YouTube from "react-native-youtube";
import YoutubePlayer from 'react-native-youtube-iframe';
import {useRef, useState} from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import {WebView} from "react-native-webview";
// import {Icon} from 'react-native-elements';

const OneLecture = ({navigation, route}) => {
    const {item} = route.params;
    const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key
    const videoId = 'Ks-_Mh1QhMc'; // Replace with the video ID you want to fetch

    // Construct the API URL
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;
    const [choose, setChoose] = useState('الدرس');
    return (
        <ScrollView>
            <View style={{flex: 1}}>
                <YoutubeVideo videoId={
                    'k6kX23F7D7I'
                }/>
                <View style={{
                    width: '95%',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    minHeight: 200,
                    alignSelf: 'center'
                }}>
                    <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', padding: 10}}>
                        <Touch name={'الدرس'} onPress={() => setChoose('الدرس')} choose={choose}/>
                        <Touch name={'الاسئلة'} onPress={() => setChoose('الاسئلة')} choose={choose}/>
                        <Touch name={'امتحان سريع'} onPress={() => setChoose('امتحان سريع')} choose={choose}/>


                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const Touch = ({onPress, name, choose}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: choose===name?'grey':'#6694e5',
            borderRadius: 10,
            padding: 10,
            margin: 5,
            flex: 1,
            justifyContent: 'center',
            shadowColor: 'black',
            elevation: 5
        }}>
            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>{name}</Text>
        </TouchableOpacity>
    )
}
export default OneLecture;
