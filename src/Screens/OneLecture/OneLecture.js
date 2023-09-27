import {Button, ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, FlatList} from "react-native";
import {useRef, useState} from "react";
import DisplayVideo from "../components/DisplayVideo";
import Ionicons from "react-native-vector-icons/Ionicons";
import LectureContent from "./LectureContent/LectureContent";
import StudentQuestions from "./StudentQuestions/StudentQuestions";
import Announcements from "./Announcements/Announcements";

const OneLecture = ({navigation, route}) => {
    const {lecture} = route.params;
    const [choose, setChoose] = useState('محتوى المحاضرة');
    const [progress, setProgress] = useState(0);
    const allContent=[{name:'محتوى المحاضرة',func:() => setChoose('محتوى المحاضرة')},
        {name:'اسأل براحتك',func:() => setChoose('اسأل براحتك')},{name:'تنبيهات',func:() => setChoose('تنبيهات')}]
    return (
        <ScrollView>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View
                    style={{
                        width: '90%', height: 300,
                        marginBottom: 4,
                        marginTop:20
                    }}

                >
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            backgroundColor: 'white',
                            borderRadius: 100,
                            bottom: -35,
                            right: 20,
                        }}
                        onPress={() => {
                            navigation.navigate('DisplayVideo', {videoId: lecture.videoLink})
                        }}
                    >
                        <Ionicons name={'play-circle-outline'} size={70} color={'rgb(102,148,229)'}/>
                    </TouchableOpacity>
                    <Image source={require('../../assets/video.jpg')
                        // {uri: lecture.imageUrl}
                    } style={{width: '100%', height: '100%', borderRadius: 20}}/>
                </View>
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 40,
                        backgroundColor: 'rgb(210,189,0)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        alignSelf: 'flex-start',
                        margin: 10,
                        padding: 1
                    }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        تم الاشتراك
                    </Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'black'
                }}>{lecture.lectureName}</Text>

                <Text style={{fontSize: 15, color: 'grey', textAlign: 'center', marginBottom: 10}}>
                    الجزء الباقى
                </Text>
                <ProgressBar progress={progress}/>
                <View style={{
                    width: '95%',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    alignSelf: 'center',
                    alignItems: 'flex-start',
                    shadowColor: 'black',
                    elevation: 5,
                    marginVertical: 10,
                    padding: 10,
                }}>

                    <FlatList data={allContent} horizontal={true}  renderItem={
                        ({item}) => {
                            return (
                                <Touch name={item.name} onPress={item.func} choose={choose}/>
                            )
                        }}/>
                    {
                        choose === 'محتوى المحاضرة' && <LectureContent lecture={lecture} setProgress={setProgress} navigation={navigation}/>
                    }
                    {
                        choose === 'اسأل براحتك' && <StudentQuestions navigation={navigation} lectureId={lecture.id}/>
                    }
                    {
                        choose === 'تنبيهات' && <Announcements navigation={navigation} lectureId={lecture.id}/>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
const Touch = ({onPress, name, choose}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: choose === name ? 'grey' : '#6694e5',
            borderRadius: 10,
            padding: 10,
            margin: 5,
            flex: 1,
            justifyContent: 'center',
            shadowColor: 'black',
            elevation: 5,

        }}>
            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>{name}</Text>
        </TouchableOpacity>
    )
}
const ProgressBar = ({progress}) => {
    return (
        <View style={{
            width: '90%',
            height: 25,
            margin: 10,
            backgroundColor: '#ccc',
            borderRadius:30
        }}>
            <View style={[{
                height: '100%',
                backgroundColor: 'rgb(102,148,229)',
                borderRadius:30
            }, {width: `${progress}%`}]}>

            </View>
            {/*<Text style={{position:'absolute',top:2,color:'white',fontSize:15,alignSelf:'center'}}>{progress}%</Text>*/}
        </View>
    );
};

export default OneLecture;
