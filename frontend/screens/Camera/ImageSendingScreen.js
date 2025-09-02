import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CommonHeader from "../../components/CommonHeader";
import ButtonImgSend from "../../components/ImageSending/ButtonImgSend";
import relateUserAnimal from "../../requests/userAnimal/relateUserAnimal";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/userContext";
import { ActivityIndicator } from "react-native";
import enviarFoto from "../../requests/enviarFoto/enviarFoto";
import INITIAL_DATA from "../../constants/INITIAL_DATA";
import ANIMAL_IMAGES from "../../constants/ANIMAL_IMAGES";
import TYPE_COLORS from "../../constants/TYPE_COLORS";
import getAnimal from "../../requests/animal/getAnimal";
import { Audio } from "expo-av";

const playSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/capturesoundeff.mp3")
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log("Erro ao tocar som:", error);
  }
};

function normalizeType(type) {
  return type
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getUpdatedAnimalCard(card, animalFromApi) {
  return {
    ...card,
    name: animalFromApi.nome,
    descricao: animalFromApi.description,
    habitat: animalFromApi.habitat,
    tipo: animalFromApi.types.map((t) => {
      const normType = normalizeType(t);
      return TYPE_COLORS[normType] || { text: t, bg: "gray", simbolo: "" };
    }),
    imageSource:
      ANIMAL_IMAGES[card.animal_id] ||
      require("../../assets/images/animals/none.png"),
  };
}

const ImageSendingScreen = ({ route }) => {
  const { imageUri } = route.params || {};
  const navigation = useNavigation();
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [animalId, setAnimalId] = React.useState("");

  useEffect(() => {
    if (!!animalId && animalId !== "") {
      handleRelateUserAnimal();
    }
  }, [animalId]);

  const handleGetAnimal = async (showConfetti = false) => {
    try {
      if (!animalId) return;
      const data = await getAnimal(animalId, user.token);
      console.log("Animal obtido:", data);
      const card = INITIAL_DATA.find((card) => card.animal_id === animalId);
      const updatedCard = getUpdatedAnimalCard(card, data);
      navigation.navigate("InfoScreen", {
        item: updatedCard,
        onPress: () => navigation.pop(3),
        showConfetti,
      });
    } catch (error) {
      console.error("Erro ao buscar animal:", error.message);
    }
  };

  const handleRelateUserAnimal = async () => {
    try {
      await relateUserAnimal(user.user.id, animalId, user.token);
      await playSound();
      await handleGetAnimal(true);
    } catch (error) {
      if (error.message && error.message.includes("Relação já existe")) {
        await handleGetAnimal(false);
      } else {
        console.error("Erro ao relacionar:", error.message);
      }
    }
  };

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
