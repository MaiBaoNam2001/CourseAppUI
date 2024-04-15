import { View, Text, Touchable, TouchableOpacity, ActivityIndicator } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles"
import { TextInput } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import Styles from "./styles";
import UserContext from "../../UserContext";
import Axios, { authAxios, endpoints } from "../../Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(UserContext);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await Axios.post(endpoints['login'], {
                'grant_type': 'password',
                'client_id': 'OGv9qjli4n6ObltJw8AGW4IlAEZecpI2qu0Rxdh9',
                'client_secret': 'RzKwHdgMqGw2jIuaaL6lxGqbl4uCpuE87Jsc33RIUUwdY4Ec6glAJLA5eJMPpiMtyHLMj61s9aG1dxOZbOuHnfynJ56ouF0LpieBbc785UquoCii24HNHvzJaz0hQylQ',
                'username': username,
                'password': password
            });

            const currentUser = await authAxios(res.data.access_token).get(endpoints['currentUser']);
            await AsyncStorage.setItem('access-token', res.data.access_token);
            dispatch({
                type: 'login',
                payload: {
                    ...currentUser.data
                }
            });

            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>ĐĂNG NHẬP</Text>
            <TextInput style={Styles.input} value={username} onChangeText={value => setUsername(value)} placeholder="Tên đăng nhập..." />
            <TextInput style={Styles.input} secureTextEntry={true} value={password} onChangeText={value => setPassword(value)} placeholder="Mật khẩu..." />
            {loading ? <ActivityIndicator size='large' /> :
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={Styles.button}>Login</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default LoginScreen;