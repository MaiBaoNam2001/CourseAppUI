import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    subContainer: {
        marginLeft: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    content: {
        fontSize: 13,
    },
    createdDate: {
        fontSize: 12,
    }
});

export default Styles;