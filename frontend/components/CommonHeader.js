import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import Title from "./Title";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const CommonHeader = ({ title, iconColor, textStyle }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          zIndex: 2000,
          height: 70 + insets.top,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingTop: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={iconColor || "black"}
            style={{ marginRight: 18 }}
          />
        </TouchableOpacity>
        <Title title={title} style={textStyle} />
      </View>
    </>
  );
};

export default CommonHeader;
