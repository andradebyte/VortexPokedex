import React, { useState } from "react";
import { TouchableOpacity, Image, View } from "react-native";

const ProfilePhoto = ({ onPress, size = 40 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/images/icons/ash-profile-icon-blue.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        onError={() => setImage(null)}
      />
    </TouchableOpacity>
  );
};

export default ProfilePhoto;
