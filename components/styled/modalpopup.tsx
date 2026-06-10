import React from "react";
import { Modal, View, StyleSheet } from "react-native";

type CustomModalProps = {
  visible: boolean;
  children: React.ReactNode;
};

export default function CustomModal({
  visible,
  children,
}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
  },
});