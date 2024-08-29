import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTimer } from "./TimerContext"; 

const SearchScreen = () => {
  const { username } = useRoute().params;
  const navigation = useNavigation();
  const { timerRunning, setTimerRunning, startTime, setStartTime, endTime, setEndTime, elapsedTime, setElapsedTime } = useTimer(); // 전역 변수들을 가져옴
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResult(null);
  }, [searchTerm]);

  useEffect(() => {
    let interval;
    if (startTime && endTime) {
      const elapsedTime = endTime - startTime;
      setElapsedTime(elapsedTime);
      console.log("걸린 시간:", formatElapsedTime(elapsedTime));
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.0.12:8080/search`, {
        params: { searchTerm, username },
      });
      setSearchResult(response.data);

      if (!response.data || response.data.length === 0) {
        alert("일치하는 검색결과가 없습니다.");
      }
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentPress = (documentId) => {
    navigation.navigate("Document", { documentId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleDocumentPress(item.contentId)}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cancerNametext}>{`${item.cancerName}`}</Text>
        <Text style={styles.categorytext}>{`[${item.category}]`}</Text>
      </View>
      <Text style={styles.contentText} numberOfLines={2}>
        {`${item.content}`}
      </Text>
    </TouchableOpacity>
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
        const saveTimeEndpoint = "http://192.168.0.12:8080/saveSearchTime";
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title={timerRunning ? "테스크 완료" : "테스크 시작"}
            onPress={toggleTimer}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.input}
          />
          <Button title="검색" onPress={handleSearch} />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#CCCCCC" />
          </View>
        )}

        {searchResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.title}>검색 결과:</Text>

            <FlatList
              data={searchResult}
              keyExtractor={(item) => item.contentId.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#E3E3E3",
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    paddingBottom: 100,
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cancerNametext: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  categorytext: {
    fontSize: 14,
    marginLeft: 4,
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default SearchScreen;
