import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import CommonHeader from "../components/CommonHeader";
import DashboardCard from "../components/Home/DashboardCard";

const INITIAL_DATA = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
  { id: "4", title: "Fourth Item" },
  { id: "5", title: "Fifth Item" },
  { id: "6", title: "Sixth Item" },
  { id: "7", title: "Sixth Item" },
];

export default function DashBoardScreen() {
  const [cards, setCards] = useState(INITIAL_DATA);

  return (
    <ScrollView
      style={{ alignSelf: "stretch" }}
      contentContainerStyle={styles.container}
    >
      <CommonHeader title={"Dashboard"} />

      {/* Grade dinâmica de DashboardCard */}
      <View style={styles.grid}>
        {cards.map((item) => (
          <DashboardCard key={item.id} text={item.title} />
        ))}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10, // mantém respiro lateral
    paddingTop: 10,
    alignItems: "center", // centraliza a grade
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
