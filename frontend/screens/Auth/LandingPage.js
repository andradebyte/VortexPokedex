import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

export default function SignupNeoPokedex({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const onSubmit = () => {
    // TODO: validação & submit
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" />
      {/* HEADER com accent redondo no canto */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Cadastro</Text>

        {/* “lente/accent” minimal no canto superior direito */}
        <View style={s.lensOuter}>
          <View style={s.lensInner} />
        </View>
      </View>

      {/* Card que invade o header */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={s.content}
      >
        <View style={s.card}>
          <View style={s.field}>
            <Text style={s.label}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Ash Ketchum"
              placeholderTextColor="#98A2B3"
              style={s.input}
              returnKeyType="next"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="ash@pallet.town"
              placeholderTextColor="#98A2B3"
              keyboardType="email-address"
              autoCapitalize="none"
              style={s.input}
              returnKeyType="next"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Senha</Text>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              placeholder="********"
              placeholderTextColor="#98A2B3"
              secureTextEntry
              style={s.input}
              returnKeyType="done"
            />
          </View>

          {/* CTA com bolinha à esquerda (diferentão) */}
          <TouchableOpacity
            style={s.cta}
            activeOpacity={0.9}
            onPress={onSubmit}
          >
            <View style={s.pokeball}>
              <View style={s.pokeballInner} />
            </View>
            <Text style={s.ctaText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate?.("Login")}
            style={{ alignSelf: "center" }}
          >
            <Text style={s.link}>Já tem conta? Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const RED = "#E3350D";
const DARK = "#111827";
const MUTED = "#6B7280";
const LINE = "#E5E7EB";
const CARD = "#FFFFFF";
const BG = "#FCFCFD";

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },

  header: {
    height: 150,
    backgroundColor: RED,
    paddingHorizontal: 20,
    paddingBottom: 18,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "800" },

  lensOuter: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#3EC7E0",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.95,
  },
  lensInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#B3ECF2",
  },

  content: { flex: 1 },
  card: {
    marginTop: -18, // invade um pouco o header
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: "#EEF0F4",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    gap: 18,
  },

  field: { gap: 6 },
  label: { color: MUTED, fontSize: 12, fontWeight: "700" },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: DARK,
    fontSize: 16,
    backgroundColor: "#FAFBFC",
  },

  cta: {
    marginTop: 4,
    height: 56,
    borderRadius: 14,
    backgroundColor: RED,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  ctaText: { color: "#FFF", fontWeight: "800", fontSize: 16, paddingLeft: 8 },

  // bolinha (pokéball) à esquerda do texto
  pokeball: {
    position: "absolute",
    left: 14,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffffff55",
  },
  pokeballInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: RED,
  },

  link: { color: "#1E88E5", fontWeight: "700", marginTop: 12 },
});
