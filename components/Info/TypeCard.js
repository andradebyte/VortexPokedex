import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TypeCard = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.textStyle}>{text || "Olá"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 35,
    backgroundColor: "rgba(150, 150, 150, 0.5)",
    opacity: 0.8,
    borderRadius: 1000,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TypeCard;
