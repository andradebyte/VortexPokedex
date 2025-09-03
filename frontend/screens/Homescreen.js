import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import ProfileModal from "../components/Perfil/ProfileModal";
import BigCard from "../components/Home/BigCard";
import SmallCard from "../components/Home/SmallCard";
import List from "../components/Lists/List";
import Title from "../components/Title";

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
          <BigCard onPress={() => navigation.navigate("PokedexScreen")} />
          <View style={{ marginBottom: 20 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <SmallCard
              long={true}
              text="Descubra mais"
              image={require("../assets/images/cards/descubramais1.png")}
              textStyle={{
                width: "100%",
                textAlign: "right",
                paddingRight: 20,
              }}
            />
            <SmallCard
              text="Câmera"
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
              image={require("../assets/images/cards/cameracard.png")}
            />
          </View>
          <Title
            title="Conquistas"
            style={{
              fontSize: 20,
              paddingLeft: 10,
              paddingBottom: 10,
              paddingTop: 10,
            }}
          />
          <List />
        </View>
      </ScrollView>
      <ProfileModal
        onPress={() => {
          navigation.navigate("LandingPage");
        }}
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
