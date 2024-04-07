import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { useEffect, useState } from "react";
import Axios, { endpoints } from "../../Axios";
import LessonItem from "../../components/LessonItem/LessonItem";

const LessonScreen = ({ route }) => {
    const [lessons, setLessons] = useState(null);
    const { courseId } = route.params;

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const res = await Axios.get(endpoints['lessons'](courseId));
                setLessons(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadLessons();
    }, [courseId]);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>DANH SÁCH BÀI HỌC</Text>
            {lessons === null ? <ActivityIndicator size='large' /> : <ScrollView>
                {lessons.map(lesson => <LessonItem key={lesson.id} data={lesson} />)}
            </ScrollView>}
        </View>
    )
}

export default LessonScreen;