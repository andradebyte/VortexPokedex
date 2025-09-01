import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import CommonHeader from "../components/CommonHeader";
import PokedexCard from "../components/Home/PokedexCard";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/userContext";
import getUserAnimalsByUserId from "../requests/userAnimal/getUserAnimalsByUserId";


const INITIAL_DATA = [
  {
    id: 0,
    name: "???",
    animal_id: 'cat',
    imageSource: require("../assets/images/animals/cat.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 1,
    name: "???",
    animal_id: 'cow',
    imageSource: require("../assets/images/animals/cow.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 2,
    name: "???",
    animal_id: 'goat',
    imageSource: require("../assets/images/animals/goat.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 3,
    name: "???",
    animal_id: 'horse',
    imageSource: require("../assets/images/animals/horse.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 4,
    name: "???",
    animal_id: 'iguana',
    imageSource: require("../assets/images/animals/iguana.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 5,
    name: "???",
    animal_id: 'lizard',
    imageSource: require("../assets/images/animals/lizard.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 6,
    name: "???",
    animal_id: 'ostrich',
    imageSource: require("../assets/images/animals/ostrich.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 7,
    name: "???",
    animal_id: 'peacock',
    imageSource: require("../assets/images/animals/peacock.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 8,
    name: "???",
    animal_id: 'pigeon',
    imageSource: require("../assets/images/animals/pigeon.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 9,
    name: "???",
    animal_id: 'possum',
    imageSource: require("../assets/images/animals/possum.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
];

export default function PokedexScreen() {
  const [cards, setCards] = useState(INITIAL_DATA);
  const navigation = useNavigation();

  const { user } = useUser();

  useEffect(() => {
    async function fetchUserAnimals() {
      try {
        const userId = user.user.id;
        const userAnimals = await getUserAnimalsByUserId(userId, user.token);

        if (!!userAnimals || userAnimals.length > 0) {
          // const updatedCards = INITIAL_DATA.map(card => {
          //   const userAnimal = userAnimals.find(animal => animal.id === card.id);
          //   return userAnimal ? { ...card, ...userAnimal } : card;
          // });
          // setCards(updatedCards);
          INITIAL_DATA.map((elemento) => {
            console.log("---")
            if (userAnimals.find(animal => animal.animal.animal_id === elemento.animal_id)) {
              console.log(elemento.animal_id);
              elemento.name = animal.animal.nome;
              elemento.descricao = animal.animal.descricao;
              elemento.habitat = animal.animal.habitat;
              elemento.tipo = animal.animal.tipo;

              //               id: 0,
              // name: "???",
              // animal_id: 'cat',
              // imageSource: require("../assets/images/animals/cat.png"),
              // descricao: "???",
              // habitat: "???",
              // tipo: [{ text: "???", bg: "gray", simbolo: "" }],


            }
          })
        }

        // console.log(INITIAL_DATA);
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
    opacity: 0.12, // Transparente!
    zIndex: 100,
  },
});
