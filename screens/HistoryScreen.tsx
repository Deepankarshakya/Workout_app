import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { fetchWorkoutLogs } from "../lib/supabaseWorkouts";
import { WorkoutLog } from "../types/data";

export default function HistoryScreen() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await fetchWorkoutLogs(user.id);
      setLogs(data);
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.workoutName}</Text>
            <Text style={styles.meta}>
              {item.totalDuration} min • {item.exercisesCompleted} exercises
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    color: "#64748b",
    marginTop: 4,
  },
});