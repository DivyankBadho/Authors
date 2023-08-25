
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList ,Button, TextInput} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useMutation,gql, useQuery } from "@apollo/client";
import { object } from "prop-types";



const GET_AUTHOR_BOOKS =gql`
query MyQuery($id: String!) {
  book_book(where: {author: {id: {_eq: $id}}}) {
    name
    id
  }
}

`

const UPDATE_BOOK = gql`
mutation MyMutation($objects: [book_book_insert_input!]!) {
  insert_book_book(objects: $objects, on_conflict: {constraint: book_pkey, update_columns: name}) {
    returning {
      id
      name
      authorId
    }
  }
}
`
const BooksScreen = () => {
  const route = useRoute();
  const { author } = route.params;
  const[editedbooks, seteditedbooks]= useState(false);
  const[updatedbooks, setUpdatedBooks]= useState(null);
  
  const {data,error,loading}= useQuery(GET_AUTHOR_BOOKS ,{
    variables: { id: author?.id },
    onCompleted: ((data) => {
      setUpdatedBooks(data?.book_book)
    }),
  });

  const [updateBookMutation] = useMutation(UPDATE_BOOK);
    
        // console.log(data)
  //  useEffect(()=>{
  //       console.log(updatedbooks)
  //  })
      //  console.log(updatedbooks)
        

  const handleInputChange = () => {
          seteditedbooks(true)
    }
  

    const updateBookName = (text, id) => {
      
        const newBookData = updatedbooks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: text
            };
          }
          return item;
        });
        setUpdatedBooks(newBookData);
      
    }

    
    // console.log(updatedbooks)
    // const updateBookName=(text,id)=>{
    //       // console.log(text,id)

    //       updateBookMutation({
    //         variables:{
    //            objects:[
    //             {
    //               id,
    //               name:text,
    //               authorId: author.id
    //             }
    //            ]
    //       //     id, name:text
              
    //         },
    //       });
    //     //  console.log(updatedbooks)
    //     //   const newBookData= updatedbooks.map((item)=>{
    //     //     if(item.id===id){
    //     //       // console.log(text)
    //     //       return {
    //     //         ...item,
    //     //         name: text
    //     //       };
    //     //     }
          
    //     //  })
    //     //  console.log(newBookData)
    //     //  setUpdatedBooks([...newBookData])
    //  }

    const onSubmit=()=>{
      // const updatedBookNames = updatedbooks.map((book) => book.name);
      const updatedBookData = updatedbooks.map(book => ({
        id: book.id,
        name: book.name,
        authorId: author.id
      }));
    
      updateBookMutation({
        variables: {
          objects: updatedBookData
        }
      })
      console.log("Updated Book Names:", updatedbooks);

    
    };

   
  return (
    <View style={styles.container}>
      <View  style={{flexDirection:"row"}}>
      <Text style={styles.title}>Books for Author: {author.name}</Text> 
      { editedbooks==false ?
      <View style={{marginLeft: 100,borderWidth: 1,borderColor:"black"}}>
       <Button title="EDIT"  onPress={()=>handleInputChange()} />
       </View>
       
      : 
      <View style={{marginLeft: 100,borderWidth: 1,borderColor:"black"}}>
      <Button title="Save"  onPress={()=>{
       
         onSubmit() ;
         seteditedbooks(false);
      }} style={{marginLeft: 60, alignItem: "right"}}/>
      </View>
      }
    </View >
   
      <FlatList
        data={data?.book_book}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
         
           return < >
           
            {editedbooks == true ? (
            <TextInput
            style={styles.editInput}
            defaultValue={item.item.name}
            onChangeText={(text) => updateBookName( text,item.item.id)}
          />
          ):
       
          (
            <View style={styles.bookContainer}>
           <Text style={styles.bookName}>  {item.item.name}  </Text>
           {/* <Text style={styles.bookId}> ID: {item.item.id}</Text> */}
           </View>
           
          )}
         

          
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
    marginTop:10,
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
    marginTop:10,
  },
});

export default BooksScreen;
