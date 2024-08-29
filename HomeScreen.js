import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation,route}) => {

  const { username } = route.params;
  return (
    <View style={styles.container}>

<Text style={styles.welcomeText}>환영합니다, {username} 님!</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFFFFF" }]}
        onPress={() => navigation.navigate("Search", { username: username })}
      >
        <Text style={styles.buttonText}>검색</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFFFFF" }]}
        onPress={() => navigation.navigate("Chatbot", { username: username })}
      >
        <Text style={styles.buttonText}>챗봇</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFFFFF" }]}
        onPress={() => navigation.navigate("GPTChatbot", { username: username })}
      >
        <Text style={styles.buttonText}>GPT 챗봇</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    borderRadius: 5,
    marginBottom: 20,
    padding: 30,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
  },
  welcomeText: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
