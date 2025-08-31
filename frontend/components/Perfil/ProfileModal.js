import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfilePhoto from "../Perfil/ProfilePhoto";
import OptionsButton from "./OptionsButton";
import { useUser } from "../../context/userContext";

const ProfileModal = ({
  modalVisible,
  setModalVisible,
  topOffset = 0,
  onPress,
}) => {
  const insets = useSafeAreaInsets();
  const topSpace = topOffset + insets.top;

  const { logout, user } = useUser();

  const [nome, setNome] = React.useState(user ? user.user.nome : "Meu Nome");
  const [email, setEmail] = React.useState(
    user ? user.user.email : "meuemail@gmail.com"
  );

  const handleLogout = () => {
    logout();
    setModalVisible(false);
    setEmail("");
    setNome("");
  };

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
            <View style={{ marginBottom: 30 }} />
            <OptionsButton title={nome} iconName="at" />
            <OptionsButton title={email.toLowerCase()} iconName="mail" />
            <OptionsButton title={"******"} iconName={"lock-closed"} />
            <OptionsButton
              onPress={() => {
                onPress();
                handleLogout();
                setModalVisible(false);
              }}
              iconName={"catching-pokemon"}
              background="#D63D3D"
              title="Sair da conta"
              style={{ position: "absolute", bottom: 20, width: 200 }}
              logout={true}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RADIUS = 40;

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
  title: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  button: {
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  buttonClose: {},
  textStyle: { color: "#2196F3", fontWeight: "bold", fontSize: 16 },
});

export default ProfileModal;
