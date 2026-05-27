import { View, Text, StyleSheet, Modal as DefaultModel } from 'react-native';
import { PressableText } from "./Pressable"
import { FunctionComponent, ReactNode, useState } from "react"
import { PressableTextClose } from './pressableclose';

type ModalProps = {
    activator?: FunctionComponent<
    {
        handelOpen: () => void
    }
    >,
    children: React.ReactNode
}

export function Modal({
    activator: Activator,
    children
}: ModalProps) {
    const [isModelVisible, setModelVisible] = useState(false);

    return (
        <View>
            <DefaultModel
                visible={isModelVisible}
                transparent={false}
                animationType="fade"
            >
                <View style={styles.centerView}>
                    <View style={styles.contentView}>
                        {children}
                    </View>
                    <PressableTextClose
                        onPress={() => setModelVisible(false)}
                        text="Close Model"
                    />
                </View>
            </DefaultModel>
            {
                Activator ?
                    <Activator
                        handelOpen = {() => setModelVisible(true)}
                    /> :
                    <PressableText
                        onPress={() => setModelVisible(true)}
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
