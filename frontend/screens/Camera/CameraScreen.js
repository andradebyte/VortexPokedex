import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function CameraScreen() {
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [mlStatus, requestML] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!mlStatus?.granted) requestML();
  }, [mlStatus]);

  if (!permission)
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>
          Precisamos da sua permissão para acessar a câmera.
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
          <Text style={styles.btnText}>Permitir câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickFromGallery = async () => {
    try {
      setLoading(true);

      // Pede permissão da galeria (ImagePicker cuida das diferenças iOS/Android)
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        console.warn("Permissão da galeria negada.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // só imagens
        allowsEditing: true, // permite recorte nativo (opcional)
        quality: 0.9,
        // allowsMultipleSelection: false, // (padrão)
        // selectionLimit: 1, // se quiser explicitar limite
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        const uri = result.assets[0].uri;
        navigation.replace("ImageSendingScreen", { imageUri: uri });
      }
    } catch (e) {
      console.warn("Erro ao abrir galeria:", e);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setLoading(true);

      // Algumas versões usam takePhotoAsync, outras takePictureAsync
      const photo =
        (await camRef.current?.takePhotoAsync?.({
          quality: 0.85,
          skipProcessing: true,
        })) ||
        (await camRef.current?.takePictureAsync?.({
          quality: 0.85,
          skipProcessing: true,
        }));

      if (photo?.uri) {
        navigation.navigate("ImageSendingScreen", { imageUri: photo.uri });
      } else {
        console.warn("Não foi possível obter a URI da foto.");
      }
    } catch (e) {
      console.warn("Erro ao tirar foto:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { paddingTop: 0, justifyContent: "center" }]}
    >
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/header3.png")}
          style={styles.headerImg}
        />
      </View>

      <CameraView
        ref={camRef}
        style={[StyleSheet.absoluteFill, { top: 0 }]}
        facing={facing}
        enableTorch={flash === "torch"}
      />

      <View style={[styles.bottomBar, { paddingHorizontal: 24 }]}>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
        >
          <Text style={styles.btnText}>↺</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.capture}
          onPress={takePhoto}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.captureInner} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.flashBtn} onPress={pickFromGallery}>
          <Image
            source={require("../../assets/images/gallery.png")}
            style={styles.flashImg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Image
          source={require("../../assets/images/bottom2.png")}
          style={styles.bottomImg}
        />
      </View>
    </View>
  );
}

const BTN = 64;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 150,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImg: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    alignSelf: "center",
  },
  bottomBar: {
    zIndex: 2000,
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roundBtn: {
    height: BTN,
    width: BTN,
    borderRadius: BTN / 2,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    height: BTN + 12,
    width: BTN + 12,
    borderRadius: (BTN + 12) / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureInner: {
    height: BTN - 3,
    width: BTN - 3,
    borderRadius: (BTN - 3) / 2,
    backgroundColor: "black",
  },
  flashBtn: {
    width: BTN,
    height: BTN,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  flashImg: { width: 48, height: 50, resizeMode: "stretch" },
  bottom: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    width: "100%",
    height: 150,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomImg: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    alignSelf: "center",
  },
  primaryBtn: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
