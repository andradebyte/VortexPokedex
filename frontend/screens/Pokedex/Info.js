import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import TypeCard from "../../components/Info/TypeCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import Title from "../../components/Title";

export default function InfoScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Image
          source={require("../../assets/images/icons/pokeball.png")}
          style={styles.pokeballBackground}
        />

        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <Image source={item.imageSource} style={styles.image} />
      </View>

      <View style={{ paddingTop: 60 }} />
      <View style={styles.infoSection}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <Text style={styles.name}>{item.name || "???"}</Text>
          <TouchableOpacity
            onPress={() => console.log("Falando...")}
            style={styles.audioButton}
          >
            <AntDesign name="sound" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {item.tipo.map((type, index) => (
            <TypeCard
              key={index}
              simbolo={item.tipo[index].simbolo}
              text={item.tipo[index].text}
              myColor={item.tipo[index].bg}
            />
          ))}
        </View>
        <Title title={"Descrição"} style={styles.mytitle} />
        <Text style={styles.desc}>{item.namedesc || "??"}</Text>
        <Title title={"Habitat"} style={styles.mytitle} />
        <Text style={styles.desc}>{item.namehabitat || "??"}</Text>
      </View>
    </View>
  );
}

const IMAGE_OVERFLOW = 60; // quanto a imagem “sai” do fundo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },

  headerBackground: {
    width: "100%",
    backgroundColor: "#C52540",
    height: 220,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 3,
  },

  audioButton: {
    zIndex: 3,
  },

  image: {
    position: "absolute",
    bottom: -IMAGE_OVERFLOW,
    width: 150,
    height: 200,
    resizeMode: "contain",
    zIndex: 2,
  },

  infoSection: {
    backgroundColor: "#eaeaea",
    flex: 1,
    marginTop: -IMAGE_OVERFLOW,
    paddingTop: IMAGE_OVERFLOW + 20,
    paddingHorizontal: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  type: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  desc: {
    fontSize: 18,
    color: "#444",
    marginBottom: 20,
  },
  mytitle: {
    fontSize: 20,
  },
  pokeballBackground: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: [{ translateX: -100 }],
    width: 200,
    height: 200,
    opacity: 0.12, // Transparente!
    zIndex: 0,
  },
});
