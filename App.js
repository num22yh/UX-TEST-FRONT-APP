import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchScreen from "./SearchScreen";
import ChatbotScreen from "./ChatbotScreen";
import HomeScreen from "./HomeScreen";
import GPTChatbotScreen from "./GPTChatbotScreen";
import DocumentScreen from "./DocumentScreen";
import LoginScreen from "./LoginScreen"; 
import { TimerProvider } from "./TimerContext"; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <TimerProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="Chatbot"
          component={ChatbotScreen}
          options={{
            headerTitle: "Chatbot 나리", 
          }}
        />
        <Stack.Screen name="GPTChatbot" component={GPTChatbotScreen} />
        <Stack.Screen
          name="Document"
          component={DocumentScreen}
          options={{
            headerTitle: " ", 
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: " ", 
          }}
        />
      </Stack.Navigator>
      </TimerProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
