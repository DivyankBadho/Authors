
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList ,Button, TextInput} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useMutation,gql } from "@apollo/client";

const UPDATE_BOOK = gql`
mutation MyMutation($id: String!, $name: String!) {
  update_book_book(where: {id: {_eq: $id}}, _set: {name: $name}) {
    returning {
      author {
        books {
          name
          id
        }
      }
    }
  }
}
`
const BooksScreen = () => {
  const route = useRoute();
  const { author } = route.params;
  const[editedbooks, seteditedbooks]= useState(false);
  const[updatedbooks, setUpdatedBooks]= useState(author.books);

  const [updateBookMutation] = useMutation(UPDATE_BOOK);


  const handleInputChange = () => {
          seteditedbooks(true)
          
    }
  
    const updateBookName=(text,id)=>{
          // console.log(text,id)

          updateBookMutation({
            variables:{
              id, name:text
              
            },
          });
         
          const newBookData= updatedbooks.map((item)=>{
            if(item.id===id){
              // console.log(text)
              return {
                ...item,
                name: text
              }
            }
            else{
               return {
                ...item,
               }
            }
          
         })
        //  console.log(newBookData)
         setUpdatedBooks([...newBookData])
    }
    const onSubmit=()=>{
      const updatedBookNames = updatedbooks.map((book) => book.name);
      // console.log("Updated Book Names:", updatedBookNames);

      
    
    };

  return (
    <View style={styles.container}>
      <View  style={{flexDirection:"row"}}>
      <Text style={styles.title}>Books for Author: {author.name}</Text> 
      { editedbooks==false ?
       <Button title="EDIT"  onPress={()=>handleInputChange()} style={{marginLeft: 60, alignItem: "right"}}/>
      : <Button title="Save"  onPress={()=>{
       
         onSubmit() ;
         seteditedbooks(false);
      }} style={{marginLeft: 60, alignItem: "right"}}/>
      }
    </View >
   
      <FlatList
        data={author.books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
         
           return < >
           
            {editedbooks == true ? (
            <TextInput
            style={styles.editInput}
            defaultValue={item.item.name}
            onChangeText={(text) => updateBookName( text,item.item.id)}
          />
          ):(
           <Text style={styles.bookName}>  {item.item.name}  </Text>
           
          )}
          <Text style={styles.bookId}> ID: {item.item.id}</Text>

          
          </> 
          
          }}
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
