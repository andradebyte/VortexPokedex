import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ImageSendingScreen = ({ route }) => {
  const { imageUri } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Sending Screen</Text>
      <View
        style={{
          width: 200,
          height: 200,
          borderWidth: 1,
          borderColor: "#ccc",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      <Text>This is a simple React Native page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ImageSendingScreen;
