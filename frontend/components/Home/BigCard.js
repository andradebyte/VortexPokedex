import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

const BigCard = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={Platform.select({
        android: { color: "#b3b3b3" },
        default: undefined,
      })}
      style={({ pressed }) => [
        styles.card,
        pressed &&
          Platform.OS !== "android" && {
            opacity: 0.7,
            transform: [{ scale: 0.98 }],
          },
      ]}
    >
      <Text>Pokedex aqui</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    backgroundColor: "gray",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BigCard;
