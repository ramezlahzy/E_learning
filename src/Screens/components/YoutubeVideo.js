import {useRef, useState} from "react";
import {Button, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import YouTube from "react-native-youtube";
// import {Icon} from "react";

const YoutubeVideo = ({ videoId }) => {
    const [playing, setPlaying] = useState(false);
    const [isMute, setMute] = useState(false);
    const controlRef = useRef();
    const togglePlaying = () => {
        setPlaying((prev) => !prev);
    }
    const seekBackAndForth = (control) => {
        controlRef.current?.getCurrentTime().then((currentTime) => {
            control === 'forward'
                ? controlRef.current?.seekTo(currentTime + 15, true)
                : controlRef.current?.seekTo(currentTime - 15, true);
        });
    };
    const muteVideo = () => setMute(!isMute);
    return (
        <View
        style={{
            flex: 1,
            padding: 10,
        }}
        >

            <View
                // pointerEvents="none"
                style={{
                    width: '100%',
                    borderRadius: 10,
                }}
            >
                <YoutubePlayer
                    height={250}
                    play={playing}
                    videoId={'k6kX23F7D7I'}
                    controls={0} // Set controls to 0 to remove all controls
                    loop={true}
                    mute={isMute}
                    ref={controlRef}

                    // style={{alignSelf: 'center',width: '90%',height:400}}
                />
                {/*<YouTube videoId={'k6kX23F7D7I'} style={{alignSelf: 'center',width: '90%',height:200}}*/}
                {/*            play={playing} apiKey={'AIzaSyCwae0VoDxJ3UKaR5NotOx8pGMrcpIui5E'}*/}
                {/*/>*/}
            </View>
            {/*<Button title={playing ? 'pause' : 'play'} onPress={togglePlaying}/>*/}
            {/*<View style={styles.controlContainer}>*/}
            {/*    <Button title={"skip-previous"} onPress={() => seekBackAndForth('rewind')}/>*/}
            {/*    <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying}/>*/}
            {/*    <Button title={"skip-next"} onPress={() => seekBackAndForth('forward')}/>*/}
            {/*</View>*/}
            {/*<Button title={isMute ? 'unmute' : 'mute'} onPress={muteVideo}/>*/}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkblue',
    },
    controlContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
});
export default YoutubeVideo;
