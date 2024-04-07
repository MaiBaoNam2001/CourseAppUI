import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Axios, { endpoints } from './Axios';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LessonScreen from './screens/LessonScreen/LessonScreen';
import LessonDetailScreen from './screens/LessonScreen/LessonDetailScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await Axios.get(endpoints['categories']);
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeScreen} options={{ title: 'Khóa học' }} />
        <Drawer.Screen name='Login' component={LoginScreen} options={{ title: 'Đăng nhập' }} />
        <Drawer.Screen name='Register' component={RegisterScreen} options={{ title: 'Đăng ký' }} />
        {categories?.map(category => <Drawer.Screen key={category.id} name={category.name} component={HomeScreen} initialParams={{ categoryId: category.id }} />)}
        <Drawer.Screen name='Lesson' component={LessonScreen} options={{ title: 'Danh sách bài học', drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name='LessonDetail' component={LessonDetailScreen} options={{ title: 'Chi tiết bài học', drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
