import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import CommonHeader from "../components/CommonHeader";
import PokedexCard from "../components/Home/PokedexCard";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/userContext";
import getUserAnimalsByUserId from "../requests/userAnimal/getUserAnimalsByUserId";
import TYPE_COLORS from "../constants/TYPE_COLORS";
import ANIMAL_IMAGES from "../constants/ANIMAL_IMAGES";
import INITIAL_DATA from "../constants/INITIAL_DATA";

function normalizeType(type) {
  return type
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

export default function PokedexScreen() {
  const [cards, setCards] = useState(INITIAL_DATA);
  const navigation = useNavigation();

  const { user } = useUser();

  useEffect(() => {
    async function fetchUserAnimals() {
      try {
        const userId = user.user.id;
        const userAnimals = await getUserAnimalsByUserId(userId, user.token);

        if (userAnimals && userAnimals.length > 0) {
          const updatedCards = INITIAL_DATA.map((card) => {
            const found = userAnimals.find(
              (animal) => animal.animal.animal_id === card.animal_id
            );
            let name = "???";
            let descricao = "???";
            let habitat = "???";
            let tipo = [{ text: "???", bg: "gray", simbolo: "" }];
            if (found) {
              name = found.animal.nome;
              descricao = found.animal.description;
              habitat = found.animal.habitat;
              tipo = found.animal.types.map((t) => {
                const normType = normalizeType(t);
                return (
                  TYPE_COLORS[normType] || { text: t, bg: "gray", simbolo: "" }
                );
              });
            }
            // Decide imagem
            const shouldShowColor = name && name !== "???";
            const imageKey = shouldShowColor
              ? card.animal_id
              : `${card.animal_id}-black`;

            return {
              ...card,
              name,
              descricao,
              habitat,
              tipo,
              imageSource: ANIMAL_IMAGES[imageKey],
            };
          });
          setCards(updatedCards);
        }
      } catch (error) {
        console.error("Failed to fetch user animals:", error);
      }
    }
    fetchUserAnimals();
  }, []);

  return (
    <ScrollView
      style={{ alignSelf: "stretch" }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("../assets/images/icons/pokeball.png")}
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

      <CommonHeader
        title={"Pokédex"}
        textStyle={{ color: "white" }}
        iconColor={"white"}
      />

      <View style={styles.grid}>
        {cards.map((item) => (
          <PokedexCard
            key={item.id}
            text={item.name || "???"}
            imageSource={item.imageSource}
            onPress={() => navigation.navigate("InfoScreen", { item })}
          />
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: "center",
    paddingBottom: 60,
  },
  grid: {
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
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
