import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

const SmallCard = ({ text, onPress, image, size = 90, long = false }) => {
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
        { width: size, height: size },
        long && { width: size * 2 },
      ]}
    >
      {/* {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )} */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    zIndex: 1,
  },
});

export default SmallCard;
