import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonImgSend = ({ onPress, title = "Send Image" }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#953040",
    padding: 18,
    minWidth: 150,
    borderRadius: 100,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtonImgSend;
