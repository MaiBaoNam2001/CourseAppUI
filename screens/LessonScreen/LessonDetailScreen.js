import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { useEffect, useState } from "react";
import Axios, { endpoints } from "../../Axios";
import LessonDetailItem from "../../components/LessonDetailItem/LessonDetailItem";

const LessonDetailScreen = ({ route }) => {
    const [lesson, setLesson] = useState(null);
    const { lessonId } = route.params;

    useEffect(() => {
        const loadLesson = async () => {
            try {
                const res = await Axios.get(endpoints['lessonDetail'](lessonId));
                setLesson(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadLesson();
    }, [lessonId]);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>CHI TIẾT BÀI HỌC</Text>
            {lesson === null ? <ActivityIndicator size='large' /> : <ScrollView>
                <LessonDetailItem data={lesson} />
            </ScrollView>}
        </View>
    )
}

export default LessonDetailScreen;