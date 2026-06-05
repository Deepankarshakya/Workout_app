import { View, Text, Button, StyleSheet, FlatList, Pressable, Alert, TouchableOpacity, Platform } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutItem from '../components/Workoutitem';
import { getWorkouts, deleteWorkout } from '../storage/workout';
import { Workout } from '../types/data';
import {
    saveWorkoutToSupabase,
    fetchWorkouts,
} from "../lib/supabaseWorkouts";
import { supabase } from "../lib/supabase";
import { deleteWorkoutFromSupabase } from "../lib/supabaseWorkouts";
import { useWorkouts } from "../hooks/useWorkouts";

export default function HomeScreen({ navigation }: any) {
    const workouts = useWorkouts();



    const testSupabase = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                console.log("No user logged in");
                return;
            }

            await saveWorkoutToSupabase(user.id, {
                slug: "test-workout",
                name: "Test Workout",
                duration: 15,
                difficulty: "easy",
                sequence: [],
            });

            const workouts = await fetchWorkouts(user.id);

            console.log("Fetched workouts:", workouts);
        } catch (err) {
            console.error(err);
        }
    };

const handleDelete = (slug: string) => {
    const del = async () => {
        await deleteWorkout(slug);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                await deleteWorkoutFromSupabase(
                    user.id,
                    slug
                );
            }
        } catch (error) {
            console.log("Supabase delete failed", error);
        }
    };

    if (Platform.OS === 'web') {
        if (window.confirm("Are you sure you want to delete this workout?")) {
            del();
        }
    } else {
        Alert.alert(
            "Delete Workout",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: del }
            ]
        );
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Work Out List</Text>
            <Button
                title="Test Supabase"
                onPress={testSupabase}
            />
            <FlatList
                data={workouts}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() => navigation.navigate("WorkoutDetail", { slug: item.slug })}
                        >
                            <WorkoutItem
                                item={item}
                                childstyle={{ position: "absolute", right: 12, top: 0, bottom: 0, justifyContent: "center" }}
                            >
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.slug)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </WorkoutItem>
                        </Pressable>
                    )
                }}
                keyExtractor={item => item.slug}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#F8FAFC"
    },
    header: {
        fontSize: 24,
        padding: 10,
        width: '100%',
        marginBottom: 10,
        fontWeight: 'bold',
    },
})