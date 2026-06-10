import React, { useState } from 'react';
import { View, Image, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import SignupButton from '../components/styled/signupbutton';
import AuthText from "../components/styled/AuthText";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#fff', flex: 1, alignItems: 'center' }}>
      <Image
        source={require('../assets/app.png')}
        style={{
          width: 180,
          height: 180,
          resizeMode: 'contain',
          marginBottom: 30,
        }}
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
      {loading ? (<ActivityIndicator size='large' color="#2563EB" />) : (
        <>
          <SignupButton
            text="Sign In"
            onPress={signIn}
          />

          <SignupButton
            text="Create Account"
            onPress={() => navigation.replace("SignUp")}
          />
        </>
      )}


    </View>
  );
}