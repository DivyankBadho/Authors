import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

const BooksScreen = () => {
  const route = useRoute();
  const { author } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books for Author: {author.name}</Text>
      <FlatList
        data={author.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.bookId}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookId: {
    fontSize: 14,
    color: "#666",
  },
});

export default BooksScreen;
