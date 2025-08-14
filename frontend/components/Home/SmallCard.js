import React from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";

const SmallCard = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress || (() => console.log("SmallCard pressionado!"))}
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
      <Text>{text || "Olá"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    backgroundColor: "gray",
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SmallCard;
