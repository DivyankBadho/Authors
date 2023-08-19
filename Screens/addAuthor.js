import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from '@apollo/client';
import { useQuery, gql } from "@apollo/client";

const ADD_AUTHOR_MUTATION = gql`
mutation MyMutation($name: String!, $id: String!, $bookName: String!, $bookId: String!, $count: Int!) {
  insert_author_author_one(object: {
    name: $name,
    id: $id,
    books: {
      data: {
        name: $bookName,
        id: $bookId
      }
    }
  }) returning{
    name
    id
    books {
      name
      id
    }
    books_aggregate {
      aggregate {
        count(columns: books_id)
      }
    }
  }
  update_author_author_by_pk(pk_columns: {id: $id}, _set: {books_aggregate: {count: $count}}) {
    name
    id
  }
}
`;

const MY_QUERY = gql`
query MyQuery{
  author_author {
    name
    id
    books {
      name
      id
    }
    books_aggregate {
      aggregate {
        count
      }
    }
  }
}
`;

const AddAuthorForm = () => {
  const [authorName, setAuthorName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [books, setBooks] = useState([{ name: "", id: "" }]);
  const [totalBooksCount, setTotalBooksCount] = useState("");

  const [addAuthor] = useMutation(ADD_AUTHOR_MUTATION);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const booksInput = books.map(({ name, id }) => ({ name, id }));

      await addAuthor({
        variables: { name: authorName, id: authorId, books: booksInput },
        refetchQueries: [{ query: MY_QUERY }],
      });

      setAuthorName("");
      setAuthorId("");
      setTotalBooksCount("");
      setBooks([{ name: "", id: "" }]);
      navigation.navigate("Authors"); 
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  const addBook = () => {
    setBooks([...books, { name: "", id: "" }]);
  };

  const updateBook = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Author</Text>
      <TextInput
        style={styles.input}
        placeholder="Author Name"
        value={authorName}
        onChangeText={(text) => setAuthorName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author ID"
        value={authorId}
        onChangeText={(text) => setAuthorId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Books Count"
        value={totalBooksCount}
        onChangeText={(text) => setTotalBooksCount(text)}
        keyboardType="numeric"
      />
      {books.map((book, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            placeholder={`Book Name ${index + 1}`}
            value={book.name}
            onChangeText={(text) => updateBook(index, "name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder={`Book ID ${index + 1}`}
            value={book.id}
            onChangeText={(text) => updateBook(index, "id", text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addBook}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAuthorForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    addButton: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
      alignSelf: "flex-start",
      marginBottom: 10,
    },
    addButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: "#28A745",
      padding: 10,
      borderRadius: 5,
      alignSelf: "flex-start",
    },
    submitButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });