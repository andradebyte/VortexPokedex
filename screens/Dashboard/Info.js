import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import DashBoardHeader from "../components/Header/DashBoardHeader";

export default function DashBoardScreen() {
  return (
    <ScrollView
      style={{ alignSelf: "stretch" }}
      contentContainerStyle={styles.container}
    >
      <DashBoardHeader />

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
