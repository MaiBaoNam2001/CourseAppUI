import axios from 'axios';

const HOST = 'https://haunguyen.pythonanywhere.com';

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lessonDetail': (lessonId) => `/lessons/${lessonId}/`,
}

export default axios.create({
    baseURL: HOST,
});