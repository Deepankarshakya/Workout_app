import { View, StyleSheet, Text } from 'react-native';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import { SequenceItems, SequenceType } from '../types/data';
import slugify from "@sindresorhus/slugify"
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ExerciseItem from '../components/ExerciseItem';
import { PressableTextClose } from '../components/styled/pressableclose';
import { Modal } from '../components/styled/Modal';
import { PressableText } from '../components/styled/Pressable';
import WorkoutForm, { WorkoutFormData } from '../components/WorkoutForm';

export default function PlannerScreen({ navigation }: any) {
    const [seqItems, setSeqItems] = useState<SequenceItems[]>([]);


    const handelExerciseSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItems = {
            slug: slugify(form.name + " " + Date.now(), { lowercase: true }),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        };

        if (form.reps) {
            sequenceItem.reps = Number(form.reps)
        }

        setSeqItems([...seqItems, sequenceItem]);
    }

    const handelWorkoutSubmit = (from: WorkoutFormData) => {
        console.log(from);
        const workout = {
            name : from.name,
            slug: slugify(from.name + " " + Date.now(), { lowercase: true }),
        }

        console.log(workout);
    }


    return (
        <View style={styles.container}>

            <ExerciseForm
                onSubmit={handelExerciseSubmit} 
            />

            <FlatList
                data={seqItems}
                renderItem={({ item, index }) =>
                    <ExerciseItem item={item}>
                        <PressableTextClose
                            text="Remove"
                            onPressIn={() => {
                                const items = [...seqItems]
                                items.splice(index, 1);
                                setSeqItems(items)

                            }}
                        />
                    </ExerciseItem>
                }
                keyExtractor={item => item.slug}
            />
            <View>
                <Modal
                    activator={({ handelOpen }) =>
                        <PressableText
                            text="Create workout"
                            onPress={handelOpen}
                        />
                    }>
                    <View>
                        <WorkoutForm
                            onSubmit={handelWorkoutSubmit}
                        />
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
})