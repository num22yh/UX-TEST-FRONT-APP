import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTimer } from "./TimerContext"; // TimerContext에서 useTimer import 추가

const DocumentScreen = ({ route }) => {
  // Route 파라미터에서 documentId 추출
  const { documentId } = route.params;

  // 상태 변수 설정
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

  //타이머 관련 전역변수들
  const { timerRunning, setTimerRunning, startTime, setStartTime, endTime, setEndTime, elapsedTime, setElapsedTime } = useTimer(); 
  const { username } = useRoute().params;
  const navigation = useNavigation();

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

  // 문서 데이터 가져오기
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.12:8080/document/${documentId}`
        );
        setDocumentData(response.data);
      } catch (error) {
        console.error("문서 데이터를 불러오는 중 오류 발생:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentData();
  }, [documentId]);

  // 로딩 중일 때
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#CCCCCC" />
      </View>
    );
  }

  // 문서 데이터가 있을 때
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={timerRunning ? "테스크 완료" : "테스크 시작"}
          onPress={toggleTimer}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {documentData && (
          <View style={styles.textContainer}>
            <Text style={styles.cancerName}>{documentData.cancerName}</Text>
            <View style={styles.line} />
            <Text style={styles.category}>{documentData.category}</Text>
            <Text style={styles.content}>{documentData.content}</Text>
          </View>
        )}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cancerName: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 20,
  },
  category: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 20,
    marginBottom: 20,
    lineHeight: 24,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});


export default DocumentScreen;
