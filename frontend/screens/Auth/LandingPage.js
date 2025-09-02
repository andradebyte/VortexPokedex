import React, { useState, useRef } from "react";
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
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "../../components/Button";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
// importa os usuários do contexto
import { useUser } from "../../context/userContext.js";
// importa a função de cadastro
import { logarUsuario } from "../../requests/user/login.js";
import { cadastrarUsuario } from "../../requests/user/cadastro.js";

export default function LandingPage() {
  const { saveUser } = useUser();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const [onblueStyle, setOnBlueStyle] = useState(false);
  const [tab, setTab] = useState("Entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFocus = (y = 180) => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y, animated: true });
      }
    }, 100); // Um pequeno delay ajuda a garantir que o teclado já abriu
  };

  const handleBlur = () => {
    setOnBlueStyle(false);
    setTimeout(() => {
      if (scrollViewRef.current) {
        // Volta para o topo, ou o valor que quiser
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }, 100);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await logarUsuario(email, password);
      console.log(data);
      await saveUser(data);
      setError("");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
      setError("Erro ao fazer login");
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const data = await cadastrarUsuario(nome, email, password);
      console.log(data);
      await saveUser(data);
      setError("");
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
      setError("Erro ao cadastrar usuário");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
        <View style={styles.bg}>
          <Image
            source={require("../../assets/images/icons/pokeball.png")}
            style={styles.pokeballBackground}
          />
          <Text style={styles.header}>Pronto para explorar?</Text>
          <Text style={styles.subheader}>
            É rapidinho! Faça login ou crie uma conta e aproveite.
          </Text>
        </View>

        <View style={styles.card}>
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
                style={[
                  styles.tabText,
                  tab === "Entrar" && styles.tabTextActive,
                ]}
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
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={[styles.passwordBox]}>
              <TextInput
                onFocus={() => {
                  setOnBlueStyle(true);
                  handleFocus(150);
                }}
                onBlur={() => {
                  handleBlur();
                }}
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
          <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
          {onblueStyle && <View style={{ paddingBottom: 30 }} />}
        </View>
        <Button
          iconName={"catching-pokemon"}
          background="#C52540"
          title="Enviar"
          style={{
            position: "relative",
            alignSelf: "center",
            bottom: "30%",
            width: 200,
          }}
          logout={true}
          onPress={tab === "Entrar" ? handleLogin : handleRegister}
        />
      </ScrollView>
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
    backgroundColor: "#C52540",
  },
  tabText: {
    fontSize: 16,
    color: "#B0B3C7",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#ffff",
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
