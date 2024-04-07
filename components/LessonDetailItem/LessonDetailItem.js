import { Image, Text, View } from "react-native"
import Styles from "./styles"
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const LessonDetailItem = ({ data }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={Styles.container}>
            <View style={Styles.innerContainer}>
                <View>
                    <Image source={{ uri: data.image }} width={120} height={120} />
                </View>
                <View style={Styles.content}>
                    <Text style={Styles.subject}>{data.name}</Text>
                    <View style={Styles.tagList}>
                        {data.tags.map(tag => <Text key={tag.id} style={Styles.tagItem}>{tag.name}</Text>)}
                    </View>
                </View>
            </View>
            <View>
                <RenderHtml contentWidth={width} source={{ html: data.description }} />
            </View>
        </View>
    )
}

export default LessonDetailItem;