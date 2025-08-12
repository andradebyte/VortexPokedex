import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilePhoto from "../Perfil/ProfilePhoto";

const ProfileModal = ({ modalVisible, setModalVisible, topOffset = 0 }) => {
  const insets = useSafeAreaInsets();
  const topSpace = topOffset + insets.top;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Começa a partir daqui! */}

      <View style={[styles.sheetContainer, { paddingTop: topSpace + 40 }]}>
        <View style={styles.sheet}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <ProfilePhoto size={120} />
            <Text style={styles.title}>Your name here</Text>
            <TouchableOpacity style={{ position: "absolute", bottom: 20 }}>
              <Text style={[styles.title, { color: "red" }]}>
                Sair da conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RADIUS = 20;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 12,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 18, marginTop: 20 },
  button: {
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  buttonClose: {},
  textStyle: { color: "#2196F3", fontWeight: "bold", fontSize: 16 },
});

export default ProfileModal;
