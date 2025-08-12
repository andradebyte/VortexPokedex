import React, { useState } from "react";
import { TouchableOpacity, Image, View } from "react-native";

const ProfilePhoto = ({ onPress, size = 40, uri }) => {
  const [image, setImage] = useState(
    uri ??
      "https://pm1.aminoapps.com/7331/b46bd24e0f8e4df3cf3a145a48c18d57d3e1af16r1-1500-1500v2_00.jpg"
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        overflow: "hidden", // recorta a imagem em círculo
        backgroundColor: "#eee", // cor de fundo enquanto carrega
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          onError={() => setImage(null)} // fallback se der erro
        />
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfilePhoto;
