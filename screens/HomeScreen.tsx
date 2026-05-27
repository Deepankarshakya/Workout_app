import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ImportMetaRegistry } from 'expo/build/winter/ImportMetaRegistry';
import WorkoutItem from '../components/Workoutitem';
import { useWorkouts } from '../hooks/useWorkouts';



export default function HomeScreen({ navigation }: any) {
    const workouts = useWorkouts();
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
                            />
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
    }

})