import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { useEffect, useState } from "react";
import Axios, { endpoints } from "../../Axios";
import CourseItem from "../../components/CourseItem/CourseItem";

const HomeScreen = ({ route }) => {
    const [courses, setCourses] = useState(null);
    const { categoryId } = route.params || {};

    useEffect(() => {
        let url = endpoints['courses'];

        if (categoryId !== undefined && categoryId !== '') {
            url = `${url}?category_id=${categoryId}`;
        }

        const loadCourses = async () => {
            try {
                const res = await Axios.get(url);
                setCourses(res.data.results);
            } catch (error) {
                console.error(error);
            }
        }

        loadCourses();
    }, [categoryId]);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>DANH MỤC KHÓA HỌC</Text>
            {courses === null ? <ActivityIndicator size='large' /> : <ScrollView>
                {courses.map(course => <CourseItem key={course.id} data={course} />)}
            </ScrollView>}
        </View>
    )
}

export default HomeScreen;