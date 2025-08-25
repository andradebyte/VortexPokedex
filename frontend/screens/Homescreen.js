import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import ProfileModal from "../components/Perfil/ProfileModal";
import BigCard from "../components/Home/BigCard";
import SmallCard from "../components/Home/SmallCard";
import List from "../components/Lists/List";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVisible = () => {
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { width: "100%" }]}>
      <ScrollView
        style={{ alignSelf: "stretch" }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header title={"Pókedex"} onPress={() => handleModalVisible()} />
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <BigCard onPress={() => navigation.navigate("DashBoardScreen")} />
          <View style={{ marginBottom: 10 }} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <SmallCard
              text="Camera"
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
            />
            <SmallCard text="Estatísticas" />
          </View>
          <List />
        </View>
      </ScrollView>
      <ProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
