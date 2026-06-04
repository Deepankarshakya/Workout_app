import {Pressable, PressableProps, Text, StyleSheet } from 'react-native';

export default function SignupButton(props: PressableProps & {text:string}){
    return(
        <Pressable {...props} style={styles.button}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    button: {
        padding:10,
        marginBottom: 10,
        backgroundColor:'#2563EB',
        borderRadius: 10,
        borderWidth: 1,
        shadowColor: '#65ccf5',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        width: '100%',
        borderColor: '#d0d0d0',
        color:'#fff'
    },

    text: {
        color: '#ffffff',
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center',
        fontWeight: "bold",
    }
})