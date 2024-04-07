import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    innerContainer: {
        flexDirection: 'row',
    },
    content: {
        marginLeft: 10
    },
    subject: {
        fontWeight: 'bold',
    },
    tagList: {
        marginTop: 10,
        flexDirection: 'row',
    },
    tagItem: {
        width: 75,
        height: 25,
        color: 'white',
        backgroundColor: 'blue',
        marginRight: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});

export default Styles;