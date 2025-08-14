import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TypeCard from "../../components/Info/TypeCard";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function InfoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Falando...")}
          style={styles.audioButton}
        >
          <AntDesign name="sound" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
          }}
          style={styles.image}
        />
      </View>

      {/* Parte branca para as informações */}
      <View style={{ paddingTop: 40 }} />
      <View style={styles.infoSection}>
        <Text style={styles.name}>Charizard</Text>

        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <TypeCard simbolo={"🔥"} text="Fogo" myColor="#FFA94D" />
          <TypeCard simbolo={"🕊️"} text="Voador" myColor="#89AAE3" />
        </View>

        <Text style={styles.desc}>
          Ele cospe fogo quente o suficiente para derreter pedras...
        </Text>
      </View>
    </View>
  );
}

const IMAGE_OVERFLOW = 60; // quanto a imagem “sai” do fundo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerBackground: {
    width: "100%",
    backgroundColor: "#FFA94D",
    height: 250,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
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
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 3,
  },

  image: {
    position: "absolute",
    bottom: -IMAGE_OVERFLOW,
    width: 250,
    height: 250,
    resizeMode: "contain",
    zIndex: 2,
  },

  infoSection: {
    backgroundColor: "#fff",
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
  },
});
