import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import { useRoute } from "@react-navigation/native";
import ButtonImgSend from "../../components/ImageSending/ButtonImgSend";

const ImageSendingScreen = ({ route }) => {
  const { imageUri } = route.params || {};

  return (
    <View style={styles.container}>
      <CommonHeader
        title={"Pokédex"}
        textStyle={{ color: "white" }}
        iconColor={"white"}
      />

      <Image
        source={require("../../assets/images/icons/pokeball.png")}
        style={styles.pokeballBackground}
      />

      <View
        style={{
          borderBottomLeftRadius: 40,
          height: "20%",
          width: "200%",
          position: "absolute",
          backgroundColor: "#C52540",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

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
          zIndex: 200,
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
      <Text style={{ fontSize: 18 }}>Deseja escanear essa imagem?</Text>
      <ButtonImgSend
        iconName={"catching-pokemon"}
        background="#C52540"
        title="Enviar"
        style={{ position: "absolute", bottom: "15%", width: 200 }}
        logout={true}
      />
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
  pokeballBackground: {
    position: "absolute",
    top: -100,
    left: "70%",
    transform: [{ translateX: -100 }, { rotate: "30deg" }],
    width: 300,
    height: 300,
    opacity: 0.12, // Transparente!
    zIndex: 100,
  },
});

export default ImageSendingScreen;
