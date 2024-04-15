import { View, Text, Touchable, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { TextInput } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import Styles from "./styles";
import UserContext from "../../UserContext";
import Axios, { authAxios, endpoints } from "../../Axios";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        'first_name': '',
        'last_name': '',
        'username': '',
        'password': '',
        'email': '',
        'avatar': ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setUser(prev => {
            return { ...prev, [key]: value }
        });
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied!');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                handleChange('avatar', result.assets[0]);
            }
        }
    }

    const handleRegister = async () => {
        if (user.password === confirmPassword) {
            try {
                setLoading(true);
                const formData = new FormData();

                for (const key in user) {
                    if (key === 'avatar') {
                        formData.append(key, {
                            uri: user[key].uri,
                            name: user[key].fileName,
                            type: user[key].type
                        });
                    } else {
                        formData.append(key, user[key]);
                    }
                }

                const res = await Axios.post(endpoints['register'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                navigation.navigate('Login')

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            console.warn('Mật khẩu xác nhận không khớp')
        }
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>ĐĂNG KÝ</Text>
            <TextInput style={Styles.input} value={user.first_name} onChangeText={value => handleChange('first_name', value)} placeholder="Tên..." />
            <TextInput style={Styles.input} value={user.last_name} onChangeText={value => handleChange('last_name', value)} placeholder="Họ và chữ lót..." />
            <TextInput style={Styles.input} value={user.username} onChangeText={value => handleChange('username', value)} placeholder="Tên đăng nhập..." />
            <TextInput style={Styles.input} value={user.password} secureTextEntry={true} onChangeText={value => handleChange('password', value)} placeholder="Mật khẩu..." />
            <TextInput style={Styles.input} value={user.confirmPassword} secureTextEntry={true} onChangeText={value => setConfirmPassword(value)} placeholder="Xác nhận mật khẩu..." />
            <TextInput style={Styles.input} value={user.email} onChangeText={value => handleChange('email', value)} placeholder="Email..." />
            <TouchableOpacity onPress={handlePickImage}>
                <Text style={Styles.input}>Chọn ảnh đại diện...</Text>
            </TouchableOpacity>
            {user.avatar && <Image source={{ uri: user.avatar.uri }} style={Styles.image} />}
            {loading ? <ActivityIndicator size='large' /> :
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={Styles.button}>Login</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default RegisterScreen;