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
  const {
    timerRunning,
    setTimerRunning,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    elapsedTime,
    setElapsedTime,
  } = useTimer();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [size] = useState(10); 
  const [hasMore, setHasMore] = useState(true); 
  const [isThrottled, setIsThrottled] = useState(false); 

  useEffect(() => {
    setSearchResult([]); 
    setPage(0); 
    setHasMore(true); 
  }, [searchTerm]);

  const handleSearch = async (reset = false) => {
    try {
      if (loading) return; 
      setLoading(true);
  
      const currentPage = reset ? 0 : page;
      const startTime = new Date();
  
      const response = await axios.get("http://172.30.1.99:8080/search", {
        params: { searchTerm, username, page: currentPage, size },
      });
  
      // 응답 시간 기록 및 시간 계산
      const endTime = new Date();
      const elapsedTime = endTime - startTime;
      console.log(`API 요청 응답까지 걸린 시간: ${elapsedTime}ms`);
  
      const data = response.data.content; 
      const isLastPage = response.data.last; 
  
      const newResults = reset
        ? data
        : [...searchResult, ...data].filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.contentId === item.contentId)
          );
  
      setSearchResult(newResults);
      setHasMore(!isLastPage); 
      setPage(reset ? 1 : currentPage + 1); 
    } catch (error) {
      console.error("Error searching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLoadMore = () => {
    if (hasMore && !loading && !isThrottled) {
      setIsThrottled(true); 
      handleSearch(false); 
      setTimeout(() => {
        setIsThrottled(false);
      }, 1000);
    }
  };

  const renderFooter = () => {
    if (!loading || !hasMore) return null; 
    return <ActivityIndicator size="large" color="#CCCCCC" />;
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
        <Text style={styles.cancerNametext}>{item.cancerName}</Text>
        <Text style={styles.categorytext}>{`[${item.category}]`}</Text>
      </View>
      <Text style={styles.contentText} numberOfLines={2}>
        {item.content}
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

  const formatElapsedTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, "0");
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, "0");
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title={timerRunning ? "테스크 완료" : "테스크 시작"} onPress={toggleTimer} />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.input}
          />
          <Button title="검색" onPress={() => handleSearch(true)} />
        </View>

        {loading && searchResult.length === 0 && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#CCCCCC" />
          </View>
        )}

        {searchResult.length > 0 && (
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item.contentId?.toString() || Math.random().toString()}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
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
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cancerNametext: {
    fontWeight: "bold",
    fontSize: 16,
  },
  categorytext: {
    fontSize: 14,
    marginLeft: 5,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default SearchScreen;
