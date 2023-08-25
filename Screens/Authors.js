import React,{useEffect} from "react";
import { View,Text,StyleSheet, FlatList,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { useNavigationOptions } from "react-native-navigation-hooks";
import { useQuery, gql } from '@apollo/client';

const MY_QUERY=gql`
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
  
 
`

const Authors=()=>{

    const{data, loading,refetch} = useQuery(MY_QUERY)
    const navigation = useNavigation();

    useEffect(() => {
      // Refetch data whenever this component is focused
      const unsubscribe = navigation.addListener("focus", () => {
        refetch();
      });
  
      return unsubscribe;
    }, [navigation, refetch]);

    const navigateToBooks = (author) => {
        navigation.navigate("Books", {author});
       
        // console.log("🚀 ~ file: Authors.js:44 ~ navigateToBooks ~ author:", author)
    }
    
    return(
        
        <View style={styles.container}>
            <FlatList
            data={data?.author_author}
            renderItem={({item})=>(
     <TouchableOpacity onPress={() => navigateToBooks(item)}>
      <View style={styles.card}>
        <View style={styles.description}>
          <Text style={{ fontSize: 20, fontWeight: "bold" ,marginLeft:20}}>
            Author: {item.name}
          </Text>
          <View style={styles.roundBoundary}>
          <Text style={styles.roundText}>
            {item.books_aggregate.aggregate.count}
          </Text>
          </View>
        </View>
        <Text style={{ marginLeft: 70, fontSize: 15 }}> ID:{item.id}</Text>
      </View>
      </TouchableOpacity>
     )}
       />
        {/* <TouchableOpacity style={styles.addButton} onPress={navigateToaddAuthor}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity> */}
    </View>
    )
};


export default Authors;
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        // marginTop:20,
      },
   
   
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 100, // Half of the width and height to make an oval
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  roundBoundary: {
    backgroundColor: "ligtpink",
    width: 40,
    height: 40,
    borderRadius: 20, // Half of the width and height to make it round
    alignItems: "center",
    justifyContent: "center",
    
  },
  roundText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  addButton: {
    position: "absolute",
    // top: 20,
    right: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
})

