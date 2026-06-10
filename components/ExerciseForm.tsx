import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./styled/Pressable";
import { Picker } from '@react-native-picker/picker';

export type ExerciseFormData = {
    name: string,
    duration: string,
    type: string,
    reps?: number
}


type WorkoutProps = {
    onSubmit: (form: ExerciseFormData) => void;
    onOpenModal?: () => void;
};


const selectionItems = ["exercise", "break", "stretch"]

export default function ExerciseForm({
    onSubmit
}: WorkoutProps) {

    const { control, handleSubmit, watch } = useForm();
    const [isSelectionOn, setSelectionOn] = useState(false);
    const selectedType = watch("type");

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="name"
                    render={({ field: { onChange, value } }) =>
                        <View>
                            <Text style={{ fontSize: 12, padding: 5, color: "#0940f3", fontWeight: 'bold' }}>{'Enter Name'}</Text>
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder="Name"
                            />
                        </View>
                    }
                />

                <Controller
                    control={control}
                    rules={{
                        required: "Duration is Required",
                        validate: (value) => !isNaN(Number(value)) || "Must be a number"
                    }}
                    name="duration"
                    render={({ field: { onChange, value }, fieldState: { error } }) =>
                        <View>
                            <Text style={{ fontSize: 12, padding: 5, color: "#0940f3", fontWeight: 'bold' }}>{'Duration (seconds)'}</Text>
                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder="Duration"
                            />
                            {error && <Text style={{ color: 'red', fontSize: 10, height: 14 }}>{error.message}</Text>}
                        </View>
                    }
                />

                {(selectedType === "exercise" || selectedType === "stretch") && (
                    <Controller
                        control={control}
                        rules={{
                            required: false,
                            validate: (value) => {
                                if (!value) return true;
                                return !isNaN(Number(value)) || "Must be a number"
                            }
                        }}
                        name="reps"
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <View>
                                <Text style={{ fontSize: 12, padding: 5, color: "#0940f3", fontWeight: 'bold' }}>{'Repetation'}</Text>
                                <TextInput
                                    onChangeText={(text) => onChange(text)}
                                    value={value?.toString()}
                                    style={[styles.input, error && { borderColor: 'red' }]}
                                    placeholder="Repetation"
                                />
                                {error && <Text style={{ color: 'red', fontSize: 10, height: 14 }}>{error.message}</Text>}
                            </View>
                        }
                    />
                )}

                <Controller
                    control={control}
                    rules={{
                        required: "Please select a type",
                    }}
                    name="type"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    padding: 5,
                                    color: "#0940f3",
                                    fontWeight: "bold",
                                }}
                            >
                                Type
                            </Text>

                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                >
                                    <Picker.Item label="Select Type" value="" />
                                    <Picker.Item label="Exercise" value="exercise" />
                                    <Picker.Item label="Break" value="break" />
                                    <Picker.Item label="Stretch" value="stretch" />
                                </Picker>
                            </View>

                            {error && (
                                <Text style={{ color: "red", fontSize: 10 }}>
                                    {error.message}
                                </Text>
                            )}
                        </View>
                    )}
                />
            </View>
            <View>
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
    form: {
        display: "flex",
        gap: 6,
        marginTop: 10,
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        height: 30,
        margin: 2,
        borderWidth: 1,
        padding: 3,
        borderRadius: 5,
    },
    selection: {
        margin: 2,
        padding: 3,
        alignSelf: "center",
    },
    pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    },
})