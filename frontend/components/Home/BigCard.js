import React from "react";
import { Text, Image, Pressable, StyleSheet, Platform } from "react-native";

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
      <Image
        source={require("../../assets/images/cards/bigcard.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <Text style={styles.text}>Meu Pókedex</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 195,
    width: "100%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    bottom: 20,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "right",
    width: "100%",
    paddingRight: 20,
    zIndex: 1,
  },
});

export default BigCard;
