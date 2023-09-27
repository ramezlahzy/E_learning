import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {getAnnouncements} from "../../../Backend";
import LoadingAnnouncements from "./LoadingAnnouncements";

const Announcements= ({ lectureId}) => {
    const [loading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        setLoading(true)
        getAnnouncements(setAnnouncements, lectureId).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <View
            style={{
                color:'black',
                width: '100%',
            }}
        >
            {
                loading ? <LoadingAnnouncements/> :
                    announcements.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                    shadowColor: 'black',
                                    elevation: 5,
                                    marginVertical: 10,
                                    padding: 20,

                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color:'grey'
                                    }}
                                >
                                    {item.content}
                                </Text>
                            </View>
                        )
                    })
            }
        </View>
    )
}

export default Announcements;
