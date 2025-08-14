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

export default function CameraScreen({ onClose, onPhoto }) {
  const camRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [mlStatus, requestML] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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

  const takePhoto = async () => {
    try {
      setLoading(true);
      const photo = await camRef.current?.takePictureAsync({
        quality: 0.85,
        skipProcessing: true,
      });
      setPreview(photo);
    } finally {
      setLoading(false);
    }
  };

  const savePhoto = async () => {
    if (!preview) return;
    try {
      setLoading(true);
      if (!mlStatus?.granted) await requestML();
      await MediaLibrary.saveToLibraryAsync(preview.uri);
      onPhoto?.(preview);
      setPreview(null);
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  const retake = () => setPreview(null);

  return (
    <View style={styles.container}>
      {!preview ? (
        <>
          <CameraView
            ref={camRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            enableTorch={flash === "torch"}
          />

          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.topBtn} onPress={onClose}>
              <Text style={styles.topTxt}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBtn}
              onPress={() => setFlash((f) => (f === "off" ? "torch" : "off"))}
            >
              <Text style={styles.topTxt}>
                {flash === "off" ? "Flash: Off" : "Flash: On"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.roundBtn}
              onPress={() =>
                setFacing((f) => (f === "back" ? "front" : "back"))
              }
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

            <View style={styles.roundBtnPlaceholder} />
          </View>
        </>
      ) : (
        // Preview
        <View style={styles.previewWrap}>
          <Image source={{ uri: preview.uri }} style={styles.preview} />
          <View style={styles.previewActions}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={retake}>
              <Text style={styles.btnText}>Refazer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={savePhoto}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  topBar: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topBtn: { padding: 10, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 8 },
  topTxt: { color: "#fff", fontWeight: "600" },

  bottomBar: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
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
  roundBtnPlaceholder: { width: BTN, height: BTN },

  capture: {
    height: BTN + 12,
    width: BTN + 12,
    borderRadius: (BTN + 12) / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  captureInner: {
    height: BTN - 10,
    width: BTN - 10,
    borderRadius: (BTN - 10) / 2,
    backgroundColor: "#ff3b30",
  },

  previewWrap: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1, resizeMode: "contain" },
  previewActions: {
    position: "absolute",
    bottom: 30,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  primaryBtn: {
    backgroundColor: "#1976d2",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
