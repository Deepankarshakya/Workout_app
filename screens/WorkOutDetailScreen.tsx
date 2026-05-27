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

type DetailParams = {
    route: {
        params: {
            slug: string
        }
    }
}

type Navigation = any & DetailParams

export default function WorkoutDetailScreen({ route }: Navigation) {
    const [sequence, setSequence] = useState<SequenceItems[]>([])

    const [trackerIdx, setTrackerIdx] = useState(-1);

    const workout = useWorkoutBySlug(route.params.slug);

    const countDown = useCountDown(
        trackerIdx,
        trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
    )


    useEffect(() => {
        if (!workout) { return; }

        if (trackerIdx === workout.sequence.length - 1) { return; }

        if (countDown === 0) {
            addItemToSequence(trackerIdx + 1)
        }
    }, [countDown])


    const addItemToSequence = (idx: number) => {
        setSequence([...sequence, workout!.sequence[idx]])
        setTrackerIdx(idx)
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 20 }}>The Sequences to follow are given below</Text>
                    <View>
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
                </Modal>
            </WorkoutItem>
            <View style={styles.centerView}>
                {sequence.length === 0 &&
                    <FontAwesome
                        name="play-circle-o"
                        size={100}
                        color="#2563eb"
                        style={{
                            marginVertical: 20,
                        }}
                        onPress={() => addItemToSequence(0)}
                    />
                }
                {sequence.length > 0 && countDown >= 0 &&
                    <View>
                        <Text style={styles.countdownText}>
                            {countDown}
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
        textAlign:'center'
    },
});