import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import CommonHeader from "../components/CommonHeader";
import DashboardCard from "../components/Home/DashboardCard";
import { useNavigation } from "@react-navigation/native";

const INITIAL_DATA = [
  {
    id: 0,
    name: "???",
    imageSource: require("../assets/images/animals/cat.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 1,
    name: "???",
    imageSource: require("../assets/images/animals/cow.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 2,
    name: "???",
    imageSource: require("../assets/images/animals/goat.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 3,
    name: "???",
    imageSource: require("../assets/images/animals/horse.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 4,
    name: "???",
    imageSource: require("../assets/images/animals/iguana.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 5,
    name: "???",
    imageSource: require("../assets/images/animals/lizard.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 6,
    name: "???",
    imageSource: require("../assets/images/animals/ostrich.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 7,
    name: "???",
    imageSource: require("../assets/images/animals/peacock.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 8,
    name: "???",
    imageSource: require("../assets/images/animals/pigeon.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
  {
    id: 9,
    name: "???",
    imageSource: require("../assets/images/animals/possum.png"),
    descricao: "???",
    habitat: "???",
    tipo: [{ text: "???", bg: "gray", simbolo: "" }],
  },
];

export default function DashBoardScreen() {
  const [cards, setCards] = useState(INITIAL_DATA);
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ alignSelf: "stretch" }}
      contentContainerStyle={styles.container}
    >
      <CommonHeader title={"Dashboard"} />

      <View style={styles.grid}>
        {cards.map((item) => (
          <DashboardCard
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
    alignSelf: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
});
