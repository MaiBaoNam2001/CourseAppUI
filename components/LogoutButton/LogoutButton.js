import { useContext } from "react"
import { Button } from "react-native"
import UserContext from "../../UserContext"

const LogoutButton = () => {
    const [user, dispatch] = useContext(UserContext);

    const handleLogout = () => {
        dispatch({
            type: 'logout'
        })
    }
    return (
        <Button title='Logout' onPress={handleLogout}></Button>
    )
}

export default LogoutButton;