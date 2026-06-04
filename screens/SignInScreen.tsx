import React, { useState } from 'react';
import {View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignInScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      Alert.alert(error.message);
    }
  };

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
        title="Sign In"
        onPress={signIn}
      />

      <Button
        title="Create Account"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}