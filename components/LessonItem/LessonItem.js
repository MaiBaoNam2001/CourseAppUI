import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Styles from "./styles";
import moment from "moment";

const LessonItem = ({ data }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={Styles.container} onPress={() => navigation.navigate('LessonDetail', { lessonId: data.id })}>
            <View>
                <Image source={{ uri: data.image }} width={120} height={120} />
            </View>
            <View style={Styles.content}>
                <Text style={Styles.subject}>{data.name}</Text>
                <Text style={Styles.createdDate}>{moment(data.created_date).fromNow()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default LessonItem;