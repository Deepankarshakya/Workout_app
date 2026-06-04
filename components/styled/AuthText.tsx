import {TextInputProps, StyleSheet, TextInput } from 'react-native';

export default function AuthText(props: TextInputProps) {
    return <TextInput {...props} style={styles.input}/>;
}

const styles = StyleSheet.create({
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,  
    backgroundColor:'#fff',   
    width:'100%'  
    }
})