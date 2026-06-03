import { Workout } from "../types/data"
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { formatSec } from "../utils/time";
import React from "react";




export default function WorkoutItem({ item, children, childstyle = {} }: 
    { item: Workout, children?: React.ReactNode, childstyle?: StyleProp<ViewStyle>}) {
    return (
        <View style={styles.container}>
            <Text
                style={styles.name}>{item.name}
            </Text>
            <Text
                style={styles.duration}>Duration : {formatSec(item.duration)}
            </Text>
            <Text
                style={styles.difficulties}>Difficulity : {item.difficulty}
            </Text>
            { children &&
            <View style={childstyle}>
                {children}
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    position: "relative",

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
    },

    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        color: '#2563eb',
    },

    duration: {
        fontSize: 15,
        color: '#2563eb',
    },

    difficulties: {
        fontSize: 15,
        color: '#2563eb',
    }
})