import React, { useState } from "react";
import { TouchableOpacity, Image, View } from "react-native";

const AnimalPhoto = ({ onPress, size = 40, uri }) => {
  const [image, setImage] = useState(
    uri ??
      "https://static.vecteezy.com/system/resources/thumbnails/018/871/732/small_2x/cute-and-happy-dog-png.png"
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        height: size,
        width: size,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          onError={() => setImage(null)}
        />
      ) : (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
        />
      )}
    </TouchableOpacity>
  );
};

export default AnimalPhoto;
