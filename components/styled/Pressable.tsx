import {Text, Pressable, PressableProps, StyleSheet } from 'react-native';


export function PressableText(props: PressableProps & {text: string}){

    return (
        <Pressable
        {...props} style={styles.buttons}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttons: {
        padding:10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        shadowColor: '#65ccf5',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        margin: 3,

    },
    text: {
        color: '#2563eb',
        margin: "auto",
        fontWeight: "bold",
    }
})