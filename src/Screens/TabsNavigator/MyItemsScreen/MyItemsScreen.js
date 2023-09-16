
import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import Colors from '../../../Shared/Colors';
import { Button } from 'react-native';
// import ProgressBar from '../Components/ProgressBar';
// import Services from '../Shared/Services';
// import GlobalApi from '../Shared/GlobalApi';
// import { AuthContext } from '../Context/AuthContext';


export default function CourseChapter({navigation,route}) {
    // const navigation=useNavigation();
    const param=useRoute().params;
    const [chapter,setChapter]=useState([])
    const [run,setRun]=useState(false);
    const [progress,setProgress]=useState(0);
    // const {userData,setUserData}=useContext(AuthContext);
    let chapterRef;
    //
    // useEffect(()=>{
    //
    //     setProgress(0);
    //     setChapter(param.courseContent.Content)
    //
    // },[])
    // const onClickNext=(index)=>{
    //     setRun(false);
    //     setProgress(index+1/chapter.length)
    //     try{
    //         chapterRef.scrollToIndex({animated:true,index:index+1})
    //     }
    //     catch(e)
    //     {
    //         let coursePro;
    //         const data={
    //             data:{
    //                 uid:userData.id,
    //                 courseId:param.courseId,
    //                 courseContentId:param.courseContent.id
    //             }
    //         }
    //
    //         GlobalApi.setCourseProgress(data).then(resp=>{
    //             navigation.navigate({
    //                 name:'course-detail' ,
    //                 params:{courseContentId:param.courseContent.id},
    //                 merge:true
    //             })
    //         })
    //
    //
    //     }
    // }
    return (
        <Text>hello</Text>
    )
}
