import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    commentTitle: {
        fontWeight: 'bold',
        color: 'blue',
    },
    commentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentInput: {
        flex: 1,
        padding: 5,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    commentButton: {
        padding: 10,
        marginLeft: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: 'yellow'
    }
});

export default Styles;