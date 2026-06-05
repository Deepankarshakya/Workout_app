import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";
import { PressableTextClose } from "../components/styled/pressableclose";

export default function AccountScreen() {
    const { user } = useAuth();

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
  <Text style={styles.title}>My Account</Text>

  <View style={styles.model}>
    <Text style={styles.label}>Email</Text>
    <Text style={styles.value}>{user?.email}</Text>

    <View style={styles.divider} />

    <Text style={styles.label}>User ID</Text>
    <Text style={styles.value}>{user?.id}</Text>

    <View style={styles.buttonContainer}>
      <PressableTextClose
        text="Sign Out"
        onPress={signOut}
      />
    </View>
  </View>
</View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    padding: 20,
  },

  model: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    color: "#111827",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  buttonContainer: {
    marginTop: 24,
  },
});