import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

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
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button
                title="Sign Up"
                onPress={signUp}
            />

            <Button
                title="Already have an account? Sign In"
                onPress={() => navigation.navigate("SignIn")}
            />

        </View>
    );
}