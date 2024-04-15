import { View, Text, ActivityIndicator, ScrollView, Dimensions, TextInput, TouchableOpacity } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { useContext, useEffect, useState } from "react";
import Axios, { authAxios, endpoints } from "../../Axios";
import LessonDetailItem from "../../components/LessonDetailItem/LessonDetailItem";
import Styles from "./styles";
import CommentItem from "../../components/CommentItem/CommentItem";
import UserContext from "../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LessonDetailScreen = ({ route }) => {
    const [lesson, setLesson] = useState(null);
    const [currentComment, setCurrentComment] = useState('');
    const [comments, setComments] = useState(null);
    const { lessonId } = route.params;
    const [user, dispatch] = useContext(UserContext);

    const handleAddComment = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access-token');
            const res = await authAxios(accessToken).post(endpoints['comments'](lessonId), {
                'content': currentComment,
            });

            setComments(prev => [res.data, ...prev]);
            setCurrentComment('');

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const loadLesson = async () => {
            try {
                const res = await Axios.get(endpoints['lessonDetail'](lessonId));
                setLesson(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        const loadComments = async () => {
            try {
                const res = await Axios.get(endpoints['comments'](lessonId));
                setComments(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadLesson();
        loadComments();
    }, [lessonId]);

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>CHI TIẾT BÀI HỌC</Text>
            {lesson === null ? <ActivityIndicator size='large' /> : <ScrollView>
                <LessonDetailItem data={lesson} />
                <Text style={Styles.commentTitle}>Bình luận:</Text>
                {user !== null && <View style={Styles.commentContainer}>
                    <TextInput style={Styles.commentInput} value={currentComment} onChangeText={value => setCurrentComment(value)} placeholder="Nội dung bình luận..." />
                    <TouchableOpacity onPress={handleAddComment}>
                        <Text style={Styles.commentButton}>Bình luận</Text>
                    </TouchableOpacity>
                </View>}
                {comments !== null && <>
                    {comments.map(comment => <CommentItem key={comment.id} data={comment} />)}
                </>}
            </ScrollView>}
        </View>
    )
}

export default LessonDetailScreen;