import {Image, ScrollView} from "react-native";

const NoData=()=>{
    return(
        <ScrollView>

        <Image
        style={{
            width:'100%',
            height:400
        }}
        source={require('../../assets/noData.png')}
        />
        </ScrollView>
    )
}
export default NoData
