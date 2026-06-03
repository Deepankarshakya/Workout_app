import { View, Text, StyleSheet, FlatList, Pressable, Alert, TouchableOpacity, Platform } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutItem from '../components/Workoutitem';
import { getWorkouts, deleteWorkout } from '../storage/workout';
import { Workout } from '../types/data';

export default function HomeScreen({ navigation }: any) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useFocusEffect(
        useCallback(() => {
            async function load() {
                const data = await getWorkouts();
                setWorkouts(data);
            }
            load();
        }, [])
    );

    const handleDelete = (slug: string) => {
        const del = async () => {
            await deleteWorkout(slug);
            setWorkouts(prev => prev.filter(w => w.slug !== slug));
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
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Work Out List</Text>
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