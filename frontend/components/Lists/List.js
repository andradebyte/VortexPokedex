import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import getUserAnimalsByUserId from "../../requests/userAnimal/getUserAnimalsByUserId";
import { useUser } from "../../context/userContext";
import ANIMAL_IMAGES from "../../constants/ANIMAL_IMAGES";
import { useFocusEffect } from "@react-navigation/native";

import { ActivityIndicator } from "react-native";
export default function List() {
  const context = useUser();
  const user = context?.user || {};

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!user || !user?.user?.id || !user?.token) {
        setAnimals([]);
        setLoading(false);
        return;
      }

      let isActive = true;
      setLoading(true);

      async function fetchCaughtAnimals() {
        try {
          const res = await getUserAnimalsByUserId(user.user.id, user.token);
          const formatted = res
            .filter((item) => !!item.animal)
            .map((item) => ({
              id: item.animal.animal_id,
              name: item.animal.nome,
              image:
                ANIMAL_IMAGES[item.animal.animal_id] ||
                require("../../assets/images/animals/none.png"),
              capturedAt: item.createdAt,
            }))
            .sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));

          if (isActive) setAnimals(formatted);
        } catch (err) {
          console.error("Erro ao buscar conquistas:", err);
        } finally {
          if (isActive) setLoading(false);
        }
      }

      fetchCaughtAnimals();
      return () => {
        isActive = false;
      };
    }, [user])
  );

  if (!user || !user.user || !user.user.id || !user.token) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "#999" }}>
          Faça login para ver suas conquistas.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="small" color="#C52540" />
      </View>
    );
  }

  if (!animals.length) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "#999" }}>Nenhuma conquista ainda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {animals.slice(0, 3).map((animal) => (
        <Pressable
          key={animal.id}
          onPress={() => console.log("Press:", animal.id)}
          style={() => [styles.item]}
        >
          <Image source={animal.image} style={styles.image} />
          <Text style={styles.text}>Parabéns, você pegou o {animal.name}!</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
  item: {
    backgroundColor: "#E3E3E3",
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 18,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
