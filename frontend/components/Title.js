import React from "react";
import { Text, View } from "react-native";

const Title = ({ title }) => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
      }}
    >
      {title || "Meu Título!"}
    </Text>
  );
};
export default Title;
