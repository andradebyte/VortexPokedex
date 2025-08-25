import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

const SmallCard = ({ text, onPress, imageSource }) => {
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
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}
      {/* <Text style={styles.text}>{text || "Olá"}</Text> */}
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
    overflow: "hidden", // Ensures image corners are rounded
  },
  image: {
    ...StyleSheet.absoluteFillObject, // Fills the card
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

export default SmallCard;
