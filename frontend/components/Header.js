import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import ProfilePhoto from "./Perfil/ProfilePhoto";
import Title from "./Title";

const Header = ({ title, onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          // backgroundColor: "white",
          height: 70 + insets.top,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 20,
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <Title title={title} />
        <ProfilePhoto onPress={onPress} />
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: "black",
          elevation: 2,
          width: "100%",
          opacity: 0.3,
        }}
      />
    </>
  );
};

export default Header;
