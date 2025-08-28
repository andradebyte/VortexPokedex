import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

const Button = ({
  onPress,
  title = "Oi",
  background = "#1976d2",
  style,
  iconName,
  iconColor = "#fff",
  iconSize = 22,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: background, justifyContent: "center" },
      style,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityLabel={title}
    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
  >
    <MaterialIcons
      name={iconName}
      size={iconSize}
      color={iconColor}
      style={styles.leftIcon}
    />

    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 1000,
  },
  leftIcon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    flexShrink: 1,
  },
});
export default Button;
