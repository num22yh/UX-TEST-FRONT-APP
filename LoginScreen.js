import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    
  }, []);

  const handleLogin = () => {
    if (username.trim() === "") {
      
      Alert.alert("이름을 입력하세요!", "이름을 입력해주세요.");
      return;
    }
  
    fetch("http://172.30.1.99:8080/userInfo/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("중복된 이름이 존재합니다.");
        }
        return response.json();
      })
      .then((data) => {
        
        setUsername(username);
        navigation.navigate("Home", { username });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        Alert.alert("오류", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>이름을 입력하세요:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="이름"
      />
      <Button title="확인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default LoginScreen;
