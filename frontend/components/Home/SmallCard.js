import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

const SmallCard = ({
  text,
  onPress,
  image,
  size = 90,
  long = false,
  textStyle,
}) => {
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
        { width: size, height: size + 5 },
        long && { width: size * 2.78 },
      ]}
    >
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "gray",
    borderRadius: 30,
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
    position: "absolute",
    bottom: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 1,
  },
});

export default SmallCard;
