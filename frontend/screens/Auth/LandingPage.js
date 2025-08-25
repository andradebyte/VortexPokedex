import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LandingPage = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require("../../assets/background.jpeg")} // sua imagem de fundo
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Pokedex!</Text>

          <View style={styles.containerText}>
            <Text
              style={[
                styles.title,
                { fontSize: 20, textAlign: "left", width: "100%" },
              ]}
            >
              Cadastre-se:
            </Text>

            <View style={styles.inputContainer}>
              <Icon name="at" size={20} color="#555" style={styles.icon} />
              <TextInput
                placeholder="Nome"
                placeholderTextColor="#888"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="mail" size={20} color="#555" style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="lock-closed-outline"
                size={20}
                color="#555"
                style={styles.icon}
              />
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: -10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: 80,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // leve transparência pra melhorar leitura
  },
  containerText: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#f9f9f9",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
  },
});

export default LandingPage;
