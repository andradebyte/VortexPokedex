import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import { useRoute } from "@react-navigation/native";
import ButtonImgSend from "../../components/ImageSending/ButtonImgSend";
import relateUserAnimal from "../../requests/userAnimal/relateUserAnimal";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/userContext"
import { ActivityIndicator } from "react-native";
import enviarFoto from "../../requests/enviarFoto/enviarFoto";

const ImageSendingScreen = ({ route }) => {
  const { imageUri } = route.params || {};
  // const navigation = useNavigation();
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);

  const [animalId, setAnimalId] = React.useState("");

  const handleRelateUserAnimal = async () => {
    try {
      console.log(user.user.id, animalId, user.token);
      const data = await relateUserAnimal(user.user.id, animalId, user.token);
      console.log("Relacionamento criado/sucesso:", data);
      // navigation.navigate("InfoScreen");
    } catch (error) {
      console.error("Erro ao relacionar:", error.message);
    }
  }

  // ImageSendingScreen
  const enviarImagem = async () => {
    if (loading) return;
    setLoading(true);

    try {
      setLoading(true);
      const payload = {
        uri: imageUri,
        type: "image/jpeg",
        name: "foto.jpg",
      };
      const data = await enviarFoto(payload, user.token);
      console.log("Imagem enviada com sucesso:", data);
      setAnimalId(data.fastapi_response.label);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>

      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 12 }}>
            Carregando...
          </Text>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

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
        onPress={async () => {
          await enviarImagem();
          if (!!animalId && animalId != "") await handleRelateUserAnimal();
        }}
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
    opacity: 0.12,
    zIndex: 100,
  },
});

export default ImageSendingScreen;
