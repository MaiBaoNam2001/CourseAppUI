import axios from 'axios';

const HOST = 'https://haunguyen.pythonanywhere.com';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lessonDetail': (lessonId) => `/lessons/${lessonId}/`,
    'login': '/o/token/',
    'currentUser': '/users/current_user/',
    'register': '/users/',
    'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
}

export const authAxios = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        Authorization: `bearer ${accessToken}`,
    }
});

export default axios.create({
    baseURL: HOST,
});