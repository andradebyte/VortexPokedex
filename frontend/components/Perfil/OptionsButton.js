import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

const OptionsButton = ({
  title = "",
  background = "#2595C4",
  style,
  iconName,
  iconColor = "#fff",
  iconSize = 22,
  logout = false,
}) => (
  <View
    style={[
      styles.button,
      { backgroundColor: background },
      logout && { justifyContent: "center" },
      style,
    ]}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityLabel={title}
    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
  >
    {!logout && iconName ? (
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.leftIcon}
      />
    ) : logout && iconName ? (
      <MaterialIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.leftIcon}
      />
    ) : null}

    <Text style={styles.text}>{title}</Text>
  </View>
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

export default OptionsButton;
