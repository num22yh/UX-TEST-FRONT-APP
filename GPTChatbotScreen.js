import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GPTChatbotScreen() {
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = useState(40); 
  const [chatHistory, setChatHistory] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null); 
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      
      return;
    }

  
    setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      { text: inputText, fromUser: true }
    ]);

    const requestData = {
      text: inputText,
      targetLanguage: "en",
      username: username 
    };

    setInputText(''); 

    
    setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      { loading: true }
    ]);

    try {
      
      const serverEndpoint = 'http://192.168.0.12:8080/translate'; 

      
      const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      
      const responseData = await response.text();
      
      
      setChatHistory(prevChatHistory => [
        ...prevChatHistory.slice(0, -1), 
        { text: responseData, fromUser: false, loading: false } 
      ]);
    } catch (error) {
      console.error('Error sending message to server:', error);
    }
  };

 
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollToBottom();
    });

    
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  
  const handleContentSizeChange = (event) => {
    setInputHeight(Math.min(120, Math.max(40, event.nativeEvent.contentSize.height))); 
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
    if (!timerRunning) {
      setStartTime(new Date());
      setEndTime(null);
    } else {
      setEndTime(new Date());
    }
  };

  useEffect(() => {
    if (endTime) {
      const elapsedTime = endTime - startTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      setElapsedTime(elapsedTime);
      try {
        console.log("쏘는 값1", formattedTime);
        const saveTimeEndpoint = "http://192.168.0.12:8080/saveGptTime";
        fetch(saveTimeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ elapsedTime: formattedTime, username: username }),
        })
        .then(() => {
          console.log("쏘는 값2", formattedTime);
        })
        .catch((error) => {
          console.error("Error saving time to server:", error);
        });
      } catch (error) {
        console.error("Error saving time to server:", error);
      }
    }
  }, [endTime]);

  const formatElapsedTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}시간${minutes}분${seconds}초`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
    >
      <View style={styles.buttonContainer}>
        <Button
          title={timerRunning ? "테스크 완료" : "테스크 시작"}
          onPress={toggleTimer}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false} 
      >
        {chatHistory.map((chat, index) => (
          <View key={index} style={chat.fromUser ? styles.userMessageContainer : styles.botMessageContainer}>
            <View style={styles.messageContent}>
              {chat.loading && ( 
                <ActivityIndicator size="small" color="#808080" />
              )}
              {chat.text && ( 
                <Text style={styles.messageText}>
                  {chat.text}
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.inputContainer, { height: inputHeight }]}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          placeholder="Message ChatGPT..."
          multiline={true} 
          textAlignVertical="center" 
          numberOfLines={1} 
          onContentSizeChange={handleContentSizeChange} 
        />
        <Button
          title="전송"
          onPress={sendMessage}
          disabled={inputText.trim() === ''} 
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 40,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    maxHeight: 120 
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#CCC',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%', 
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%', 
  },
  messageText: {
    fontSize: 18
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
