import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NameAnimal = ({ title = "Bulbassauro", style }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", color: "white" }}>
        {title}
      </Text>
    </View>
  );
};
export default NameAnimal;
