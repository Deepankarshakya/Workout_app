import {Text, Pressable, PressableProps, StyleSheet } from 'react-native';


export function PressableTextClose(props: PressableProps & {text: string}){

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
        shadowColor: '#f56a65',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,

    },
    text: {
        color: '#fe0f0f',
        fontWeight: "bold",
    }
})