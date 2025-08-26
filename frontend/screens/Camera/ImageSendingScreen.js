import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import { useRoute } from "@react-navigation/native";
import ButtonImgSend from "../../components/ImageSending/ButtonImgSend";

const ImageSendingScreen = ({ route }) => {
  const { imageUri } = route.params || {};

  return (
    <View style={styles.container}>
      <CommonHeader title={"Image Sending"} />
      <View
        style={{
          width: 300,
          height: 300,
          borderWidth: 1,
          borderColor: "#ccc",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          marginBottom: 16,
          overflow: "hidden",
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
      <View style={{ position: "absolute", bottom: "20%" }}>
        <ButtonImgSend
          title="Send Image"
          onPress={() => alert("Image Sent!")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ImageSendingScreen;
