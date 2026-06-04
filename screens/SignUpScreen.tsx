import React, { useState } from 'react';
import { View,  Alert,  Image } from 'react-native';
import { supabase } from '../lib/supabase';
import SignupButton from '../components/styled/signupbutton';
import AuthText from "../components/styled/AuthText";

export default function SignUpScreen({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert(error.message);
            return;
        }

        else {
            Alert.alert(
                'Success',
                'Check your Email for Vertification.'
            )
        }
    }
    return (
    <View style={{ padding: 20, backgroundColor:'#fff', flex:1, alignItems:'center'}}>
      <Image 
      source={require('../assets/app.png')}
      style={{          width: 180,
      height: 180,
      resizeMode: 'contain',
      marginBottom: 30,}}
      />
            <AuthText
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <AuthText
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <SignupButton
                text="Sign Up"
                onPress={signUp}
            />

            <SignupButton
                text="Already have an account? Sign In"
                onPress={() => navigation.replace("SignIn")}
            />

        </View>
    );
}