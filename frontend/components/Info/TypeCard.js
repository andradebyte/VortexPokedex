import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TypeCard = ({ text, myColor = "gray", simbolo }) => {
  return (
    <View
      style={[styles.card, { backgroundColor: myColor, borderRadius: 1000 }]}
    >
      <Text style={[styles.simbolo, simbolo ? "" : { marginRight: -5 }]}>
        {simbolo}
      </Text>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    height: 40,
    width: 100,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  simbolo: {
    marginRight: 10,
  },
});

export default TypeCard;
