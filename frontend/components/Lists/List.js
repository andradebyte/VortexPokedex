import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

const DATA = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
];

export default function List() {
  return (
    <View style={styles.listContainer}>
      {DATA.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => console.log("Press:", item.id)}
          style={({ pressed }) => [
            styles.item,
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
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
    backgroundColor: "#eeeeee",
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});
