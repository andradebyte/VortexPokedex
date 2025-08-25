import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";

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
      <ImageBackground
        source={require("../../assets/imgs/bigcard4.png")}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BigCard;
