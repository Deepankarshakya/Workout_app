import { View, Text, StyleSheet, Modal as DefaultModel } from 'react-native';
import { PressableText } from "./Pressable"
import React, { FunctionComponent, ReactNode, useState } from "react"
import { PressableTextClose } from './pressableclose';

type ModalProps = {
    activator?: FunctionComponent<
    {
        handelOpen: () => void
    }
    >,
    children: (props:
    {
        handelOpen: () => void,
        handelClose: () => void
    }) => React.ReactNode;
}

export function Modal({
    activator: Activator,
    children
}: ModalProps) {
    const [isModelVisible, setModelVisible] = useState(false);
    const handelOpen = () => setModelVisible(true)
    const handelClose = () => setModelVisible(false)

    return (
        <View>
            <DefaultModel
                visible={isModelVisible}
                transparent={false}
                animationType="fade"
            >
                <View style={styles.centerView}>
                    <View style={styles.contentView}>
                        {children({handelOpen, handelClose})}
                    </View>
                    <PressableTextClose
                        onPress={handelClose}
                        text="Close Model"
                    />
                </View>
            </DefaultModel>
            {
                Activator ?
                    <Activator
                        handelOpen = {handelOpen}
                    /> :
                    <PressableText
                        onPress={handelOpen}
                        text=""
                    />
            }

        </View>

    )
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    contentView: {
        marginBottom: 30,
    },
})
