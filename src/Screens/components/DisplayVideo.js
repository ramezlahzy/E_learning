import {Button, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {WebView} from "react-native-webview";
import Orientation from 'react-native-orientation-locker';
import {useEffect} from "react";

const DisplayVideo = ({videoId}) => {
    useEffect(() => {
        // Enable screen rotation
        Orientation.unlockAllOrientations();

        // Add an event listener to detect orientation changes
        const handleOrientationChange = (orientation) => {
            console.log('Orientation changed:', orientation);
        };

        // Subscribe to the orientation change event
        Orientation.addOrientationListener(handleOrientationChange);

        return () => {
            // Remove the orientation change listener when component unmounts
            Orientation.removeOrientationListener(handleOrientationChange);
        };
    }, []);
    return (
        <View style={[styles.container, ]}>
            <WebView
                source={{
                    html: `
            <html>
              <body style="margin:0;padding:0;">
                <iframe
                  src="https://iframe.mediadelivery.net/embed/157151/7ccffa70-025c-4ff6-a1a2-67ae6e93f678?autoplay=true&loop=false&muted=false&preload=true"
                  style="border:0;width:100%;height:100%;position:absolute;top:0;left:0;"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowfullscreen="true"
                ></iframe>
              </body>
            </html>
          `,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Background color for full-screen effect
    },
});
export default DisplayVideo;
