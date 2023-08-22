
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList ,Button, TextInput} from "react-native";
import { useRoute } from "@react-navigation/native";

const BooksScreen = () => {
  const route = useRoute();
  const { author } = route.params;
  const[editedbooks, seteditedbooks]= useState(false);


  const handleInputChange = () => {
          seteditedbooks(true)
          
    }
  
    const updateBookName=(text,id)=>{
          console.log(text,id)
    }

  return (
    <View style={styles.container}>
      <View  style={{flexDirection:"row"}}>
      <Text style={styles.title}>Books for Author: {author.name}</Text> 
      { editedbooks==false ?
       <Button title="EDIT"  onPress={()=>handleInputChange()} style={{marginLeft: 60, alignItem: "right"}}/>
      : <Button title="Save"  onPress={()=>seteditedbooks(false)} style={{marginLeft: 60, alignItem: "right"}}/>
      }
    </View>
      <FlatList
        data={author.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
{editedbooks == true ? (
            <TextInput
            style={styles.editInput}
            defaultValue={item.name}
            
            onChangeText={(text) => updateBookName( text,item.id)}
          />
          ):(
           <Text style={styles.bookName}>  {item.name}  </Text>
          )} }}
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
  editInput: {
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginBottom: 5,
  },
});

export default BooksScreen;
