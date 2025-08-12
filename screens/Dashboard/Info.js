import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import DashBoardHeader from "../../components/Header/DashBoardHeader";
import NameAnimal from "../../components/Info/NameAnimal";
import TypeCard from "../../components/Info/TypeCard";
import DescriptionContainer from "../../components/Info/DescriptionContainer";

export default function InfoScreen() {
  return (
    <ScrollView
      style={{ alignSelf: "stretch", backgroundColor: "#47d1b0" }}
      contentContainerStyle={styles.container}
    >
      <View
        style={{
          paddingHorizontal: 10,
          width: "100%",
          marginTop: 10,
        }}
      >
        <DashBoardHeader />
      </View>
      <View style={{ width: "100%" }}>
        <NameAnimal style={{ justifyContent: "flex-start", marginLeft: 20 }} />
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <TypeCard text="Grass" />
          <TypeCard text="Poison" />
        </View>
        <DescriptionContainer />
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
