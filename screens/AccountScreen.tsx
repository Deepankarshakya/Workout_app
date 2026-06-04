import { View, Text, Button } from "react-native";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";

export default function AccountScreen() {
    const { user } = useAuth();

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email:</Text>
            <Text>{user?.email}</Text>

            <Text>User ID:</Text>
            <Text>{user?.id}</Text>

            <Button
                title="Sign Out"
                onPress={signOut}
            />
        </View>
    );
}