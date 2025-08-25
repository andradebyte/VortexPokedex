import React from "react";
import { Text, View } from "react-native";

const Title = ({ title, style }) => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "bold",
        ...style,
      }}
    >
      {title || "Meu Título!"}
    </Text>
  );
};
export default Title;
