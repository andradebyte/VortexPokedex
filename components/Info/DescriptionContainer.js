import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DescriptionContainer = ({ description }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default DescriptionContainer;
