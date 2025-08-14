import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DescriptionContainer = ({ description, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 20,
    elevation: 2,
    padding: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default DescriptionContainer;
