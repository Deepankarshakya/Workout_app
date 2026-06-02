import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./styled/Pressable";

export type ExerciseFormData = {
    name: string,
    duration: string,
    type: string,
    reps?: number
}


type WorkoutProps = {
    onSubmit: (form: ExerciseFormData) => void
}


const selectionItems = ["exercise", "break", "streach"]

export default function ExerciseForm({
    onSubmit
}: WorkoutProps) {

    const { control, handleSubmit } = useForm();
    const [isSelectionOn, setSelectionOn] = useState(false);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.rowContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="name"
                        render={({ field: { onChange, value } }) =>
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder="Name"
                            />
                        }
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="duration"
                        render={({ field: { onChange, value } }) =>
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder="Duration"
                            />
                        }
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Controller
                        control={control}
                        name="reps"
                        render={({ field: { onChange, value } }) =>
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder="Repetation"
                            />
                        }
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="type"
                        render={({ field: { onChange, value } }) =>
                            <View style={{flex:1}}>
                                {isSelectionOn ?
                                    <View>
                                        {
                                            selectionItems.map(selection =>
                                                <PressableText 
                                                    key={selection}
                                                    text={selection}
                                                    style={styles.selection}
                                                    onPress={() => {
                                                        onChange(selection)
                                                        setSelectionOn(false)}}/>
                                            )}
                                    </View> :
                                    <TextInput
                                        onFocus={() => setSelectionOn(true)}
                                        style={styles.input}
                                        placeholder="Types"
                                        value={value}
                                    />
                                }

                            </View>

                        }
                    />
                </View>
                <PressableText
                    text="Add Exercise"
                    onPress={handleSubmit((data) => {
                        onSubmit(data as ExerciseFormData);
                    })}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        height: 30,
        margin: 2,
        borderWidth: 1,
        padding: 3,
        borderRadius: 5,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    selection:{
        margin: 2,
        padding: 3,
        alignSelf: "center",
    }
})