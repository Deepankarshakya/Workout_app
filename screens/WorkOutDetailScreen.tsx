import { View, Text, StyleSheet } from 'react-native';
import { useWorkoutBySlug } from '../hooks/useWorkoutsBySlug';
import { Modal } from '../components/styled/Modal';
import { PressableText } from '../components/styled/Pressable';
import { formatSec } from '../utils/time';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native'
import WorkoutItem from '../components/Workoutitem';
import { useEffect, useState } from 'react';
import { SequenceItems } from '../types/data';
import { useCountDown } from '../hooks/useCountDown';
import { supabase } from "../lib/supabase";
import { saveWorkoutLogToSupabase } from "../lib/supabaseWorkouts";
import { PressableTextClose } from '../components/styled/pressableclose';

type DetailParams = {
    route: {
        params: {
            slug: string
        }
    }
}

type Navigation = any & DetailParams

export default function WorkoutDetailScreen({ route, navigation }: any) {
    const [sequence, setSequence] = useState<SequenceItems[]>([])

    const [trackerIdx, setTrackerIdx] = useState(-1);

    const workout = useWorkoutBySlug(route.params.slug);

    const startupSeq = ["3", "2", "1", "Go"].reverse();
    const { countDown, isRunning, stop, start } = useCountDown(
        trackerIdx
    )

    useEffect(() => {
        if (!workout) { return; }
        if (trackerIdx === workout.sequence.length - 1) { return; }
        if (countDown === 0) {
            addItemToSequence(trackerIdx + 1)
        }
    }, [countDown])

    const completeWorkout = async () => {
        if (!workout) return;

        try {
            const log = {
                id: Date.now().toString(),
                workoutSlug: workout.slug,
                workoutName: workout.name,
                completedAt: new Date().toISOString(),
                totalDuration: workout.duration,
                exercisesCompleted: workout.sequence.length,
            };

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                await saveWorkoutLogToSupabase(user.id, log);
            }

            alert("Workout completed 🎉");

            navigation.navigate("History");

            setSequence([]);
            setTrackerIdx(-1);
        } catch (error) {
            console.log("Failed to save workout log", error);
        }
    };


    const addItemToSequence = (idx: number) => {
        let newSequence = [];

        if (idx > 0) {
            newSequence = ([...sequence, workout!.sequence[idx]])
        } else {
            newSequence = [workout!.sequence[idx]];
        }
        setSequence(newSequence)
        setTrackerIdx(idx)
        start(newSequence[idx].duration + startupSeq.length);
    }

    if (!workout) {
        return null;
    }

    const hasReachedEnd =
        sequence.length === workout.sequence.length &&
        countDown === 0

    return (
        <View style={styles.container}>
            <WorkoutItem
                item={workout}
                childstyle={{ marginTop: 20 }}
            >
                <Modal
                    activator={({ handelOpen }) =>
                        <PressableText
                            onPress={handelOpen}
                            text="Check Sequence"
                        />
                    }
                >
                    {() =>

                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 20 }}>The Sequences to follow are given below</Text>
                            {workout.sequence.map((si, idx) =>
                                <View key={si.slug} style={styles.sequenceItems}>
                                    <Text style={{ justifyContent: "center", padding: 2, alignItems: 'center', margin: 'auto' }}>
                                        {si.name} | {si.type} | {formatSec(si.duration)}
                                    </Text>
                                    {idx !== workout.sequence.length - 1 &&
                                        <FontAwesome
                                            name="arrow-down"
                                            size={20}
                                        />
                                    }
                                </View>
                            )}
                        </View>
                    }

                </Modal>
            </WorkoutItem>
            <View style={styles.centerView}>
                {sequence.length === 0 ?
                    <FontAwesome
                        name="play-circle-o"
                        size={100}
                        color="#2563eb"
                        style={{
                            marginVertical: 20,
                        }}
                        onPress={() => addItemToSequence(0)}
                    /> :
                    isRunning ?
                        <FontAwesome
                            name="stop-circle-o"
                            size={100}
                            color="#2563eb"
                            style={{
                                marginVertical: 20,
                            }}
                            onPress={() => stop()}
                        /> :
                        <FontAwesome
                            name="play-circle-o"
                            size={100}
                            color="#2563eb"
                            style={{
                                marginVertical: 20,
                            }}
                            onPress={() => {
                                if (hasReachedEnd) {
                                    addItemToSequence(0)
                                } else {
                                    start(countDown)
                                }
                            }
                            }
                        />

                }
                {sequence.length > 0 && countDown >= 0 &&
                    <View>
                        <Text style={styles.countdownText}>
                            {
                                countDown > sequence[trackerIdx].duration ?
                                    startupSeq[countDown - sequence[trackerIdx].duration - 1] :
                                    countDown
                            }
                        </Text>
                    </View>
                }
            </View>
            <View style={styles.countdownnumber}>
                <Text style={styles.statusText}>
                    {sequence.length === 0 ?
                        "Ready to start" :
                        hasReachedEnd ?
                            "Workout Complete" : "Current Exercise : " + sequence[trackerIdx].name
                    }
                </Text>
            </View>

            <PressableTextClose
                text="Finish Workout"
                onPress={completeWorkout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8fafc",
    },

    header: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 15,
        fontWeight: "700",
        color: "#0f172a",
    },

    sequenceItems: {
        justifyContent: "center",
        alignItems: "center",
    },

    centerView: {
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#dbeafe",
        borderRadius: 24,

        paddingVertical: 40,
        paddingHorizontal: 20,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 8,
    },

    countdownnumber: {
        justifyContent: "center",
        alignItems: "center",
    },

    countdownText: {
        fontSize: 72,
        fontWeight: "800",
        color: "#2563eb",
    },

    workoutsdetails: {
        marginTop: 12,
        fontSize: 30,
        fontWeight: "700",
        color: "#1e3a8a",
        textAlign: "center",
    },

    statusText: {
        marginTop: 10,
        fontSize: 16,
        color: "#64748b",
        fontWeight: "500",
        letterSpacing: 1,
        textAlign: 'center'
    },
});