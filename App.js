import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Authors from './Screens/Authors';
import Books from './Screens/Books';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import addAuthor from './Screens/addAuthor';

const client = new ApolloClient({
  uri: 'https://evolving-warthog-44.hasura.app/v1/graphql',
  headers:{
    'content-type': 'application/json',
    'Hasura-Client-Name' : 'hasura-console',
    'x-hasura-admin-secret': 't0Y9AsLGDMsXCrjCPPepcPvqNkZ1Yyxd22NA0VK7G941Kx9RvfNMgYcRAbjJ983B',
  },
  cache: new InMemoryCache()
});

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: "red"
      }}>
        <Tab.Screen name="Authors" component={Authors}/>
        <Tab.Screen name="Books" component={Books}/>
        {/* <Tab.Screen name="addAuthor" component={addAuthor}/> */}
        <Tab.Screen name="AddAuthor" component={addAuthor} options={{ title: "Add Author" }} />
      </Tab.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
