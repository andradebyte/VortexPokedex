import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

const PokedexCard = ({ text, onPress, myColor, imageSource, subText }) => {
  return (
    <Pressable
      onPress={onPress || (() => console.log("PokedexCard pressionado!"))}
      android_ripple={Platform.select({
        android: { color: "#b3b3b3" },
        default: undefined,
      })}
      style={({ pressed }) => [
        styles.card,
        myColor && { backgroundColor: myColor },
        pressed &&
        Platform.OS !== "android" && {
          opacity: 0.7,
          transform: [{ scale: 0.98 }],
        },
      ]}
    >
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.text}>{text || "???"}</Text>
      {subText && <Text style={styles.subText}>{subText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    borderRadius: 60,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
});

export default PokedexCard;
