import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/Button";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {
  const navigation = useNavigation();

  const [tab, setTab] = useState("Entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate a login request
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("HomeScreen");
    }, 2000);
  };

  const handleRegister = () => {
    setLoading(true);
    // Simulate a registration request
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("HomeScreen");
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Loading Indicator */}
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, marginBottom: 12 }}>
            Carregando...
          </Text>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      {/* Rest of the UI */}
      <StatusBar barStyle="light-content" />
      {/* Fundo com grid e estrelas */}
      <View style={styles.bg}>
        {/* Header */}
        <Image
          source={require("../../assets/images/icons/pokeball.png")}
          style={styles.pokeballBackground}
        />
        <Text style={styles.header}>Pronto para explorar?</Text>
        <Text style={styles.subheader}>
          É rapidinho! Faça login ou crie uma conta e aproveite.
        </Text>
      </View>

      {/* Card branco com abas */}
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === "Entrar" && styles.tabActive]}
            onPress={() => {
              setTab("Entrar");
              setNome("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text
              style={[styles.tabText, tab === "Entrar" && styles.tabTextActive]}
            >
              Entrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === "Cadastro" && styles.tabActive]}
            onPress={() => {
              setTab("Cadastro");
              setNome("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text
              style={[
                styles.tabText,
                tab === "Cadastro" && styles.tabTextActive,
              ]}
            >
              Cadastro
            </Text>
          </TouchableOpacity>
        </View>

        {tab === "Cadastro" ? (
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Nome de usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="usuario"
              placeholderTextColor="#B0B3C7"
              autoCapitalize="none"
              value={nome}
              onChangeText={setNome}
            />
          </View>
        ) : null}

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="meuemail@gmail.com"
            placeholderTextColor="#B0B3C7"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/* Password */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.passwordBox}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="********"
              placeholderTextColor="#B0B3C7"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((s) => !s)}
              style={{ paddingHorizontal: 8 }}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#B0B3C7"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Button
        iconName={"catching-pokemon"}
        background="#C52540"
        title="Enviar"
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: "15%",
          width: 200,
        }}
        logout={true}
        onPress={tab === "Entrar" ? handleLogin : handleRegister}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C52540",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bg: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 36 : 24,
    paddingHorizontal: 24,
    paddingBottom: 50,
    backgroundColor: "#C52540",
  },
  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 6,
  },
  subheader: {
    color: "white",
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: "100%",
    marginTop: -24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    color: "#B0B3C7",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#191B38",
    fontWeight: "bold",
  },
  inputBox: {
    marginBottom: 18,
  },
  inputLabel: {
    color: "#8689A3",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#181932",
    marginBottom: 0,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
  },
  pokeballBackground: {
    position: "absolute",
    top: -100,
    left: "70%",
    transform: [{ translateX: -100 }, { rotate: "30deg" }],
    width: 300,
    height: 300,
    opacity: 0.12,
    zIndex: 100,
  },
});
