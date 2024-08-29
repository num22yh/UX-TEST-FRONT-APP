import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Button,StyleSheet
} from "react-native";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  
  
  //초기화 함수 - 처음 시작할 때 암 종류 고를 수 있게 만들기
  useEffect(() => {
    handleBotResponse('안녕');  
    handleBotResponse('암 종류');
  }, []);

  useEffect(() => {
    let interval;
    if (startTime && endTime) {
      const elapsedTime = endTime - startTime;
      setElapsedTime(elapsedTime);
      console.log("걸린 시간:", formatElapsedTime(elapsedTime));
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

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
        const saveTimeEndpoint = "http://192.168.0.12:8080/saveChatbotTime";
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

  const generateMessageId = () => {
    return Math.round(Math.random() * 1000000).toString();
  };

  const handleSend = newMessages => {
    const userMessage = {
      _id: generateMessageId(),
      text: newMessages[0].text,
      createdAt: new Date(),
      user: { _id: 1, name: 'User' },
    };

    handleQuickReply(newMessages[0].text);
  };

  const handleBotResponse = userMessage => {
    let botMessage;
    
    if (userMessage==='안녕') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: '안녕하세요! 저는 챗봇 나리에요.',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
      };
    } else if (userMessage==='암 종류') {
      botMessage = {
        _id: generateMessageId(),
        text: '알아보고 싶은 암 종류를 선택해주세요.',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '간암', value: '간암' },
            { title: '갑상선암', value: '갑상선암' },
            { title: '난소암', value: '난소암' },
            { title: '담낭담도암', value: '담낭담도암' },
            { title: '대장암', value: '대장암' },
            { title: '신장암', value: '신장암' },
            { title: '위암', value: '위암' },
            { title: '유방암', value: '유방암' },
            { title: '자궁경부암', value: '자궁경부암' },
            { title: '전립선암', value: '전립선암' },
            { title: '췌장암', value: '췌장암' },
            { title: '폐암', value: '폐암' },
          ],
        },
      };
    }else if (userMessage==='암 종류 다시 선택') {
      botMessage = {
        _id: generateMessageId(),
        text: '알아보고 싶은 암 종류를 선택해주세요.',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '간암', value: '간암' },
            { title: '갑상선암', value: '갑상선암' },
            { title: '난소암', value: '난소암' },
            { title: '담낭담도암', value: '담낭담도암' },
            { title: '대장암', value: '대장암' },
            { title: '신장암', value: '신장암' },
            { title: '위암', value: '위암' },
            { title: '유방암', value: '유방암' },
            { title: '자궁경부암', value: '자궁경부암' },
            { title: '전립선암', value: '전립선암' },
            { title: '췌장암', value: '췌장암' },
            { title: '폐암', value: '폐암' },
          ],
        },
      };
    }  else if (userMessage==='간암') {
      botMessage = {
        _id: generateMessageId(),
        text: '간암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '간암의 정의' },
            { title: '위험요인', value: '간암의 위험요인' },
            { title: '진단방법', value: '간암의 진단방법' },
            { title: '치료방법', value: '간암의 치료방법' },
            { title: '예방방법', value: '간암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } else if (userMessage==='간암의 정의') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "간암의 정의는 다음과 같습니다.\n\n흔히 간암이라 함은 성인의 원발성 간암 중 발생빈도가 가장 높은 간세포암종을 의미한다.\n\n병리학적으로 간세포암종, 담관상피암종, 간모세포종, 혈관육정 등 다양한 종류의 원발성 간암이 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }else if (userMessage==='간암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "다음은 간암의 위험요인입니다.\n\n관련 질환\n- B형간염바이러스\n- C형간염바이러스\n- 만성 간질환\n\n기타\n- 아플라톡신B1(발암물질 섭취)\n- 음주, 흡연\n- 비만",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암의 예방방법') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "다음은 간암을 예방하는 방법입니다.\n\n(1) B형간염 예방백신 접종\n우리나라 간암의 대다수가 B형간염에 의한 것이므로 예방백신을 맞아 방어항체를 만들어 놓는 것이 가장 중요하다.\n\n(2) 간염바이러스의 감염 경로에 노출되지 않도록 주의\nB형 및 C형간염바이러스는 체액 내에 존재하는데, 이러한 체액이 손상된 점막 등을 통해 들어오는 경우 감염이 될 수 있다.\n\n(3) 절주\n만성 간염환자가 술을 절제하지 않으면 간암 발생의 위험이 높아지므로 술은 절제해야하며, 알코올성 간염이나 간경변증이 있는 경우 금주는 절대적으로 필요하다.\n\n(4) 만성 간질환이 있는 환자의 철저한 간질환 관리와 주기적인 검진\n우리나라는 국가암검진사업을 통해 40세 이상 남녀 중 간경변증이나 B형간염, C형간염 보유자인 경우 6개월마다 간초음파검사와 혈청알파태아단백검사를 통하여 정기적인 검진을 권고하고 있다.\n\n(5) 금연\n담배 연기 속에 각종 발암물질이 다량 들어 있으며, 흡연은 간암을 유발하는 발암원 중 하나이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    
    else if (userMessage==='간암의 진단방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "간암을 진단하는 방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '내시경적 역행성 담췌관조영술 (ERCP)', value: '간암 진단방법 : 내시경적 역행성 담췌관조영술 (ERCP)' },
            { title: '경피경간담관조영술', value:'간암 진단방법 : 경피경간담관조영술' },
            { title: '자기공명영상 (MRI)', value: '간암 진단방법 : 자기공명영상 (MRI)' },
            { title: '복부초음파 검사', value: '간암 진단방법 : 복부초음파 검사' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
            
          ],
        },
      };
    }else if (userMessage==='간암 진단방법 : 내시경적 역행성 담췌관조영술 (ERCP)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경적 역행성 담췌관조영술은 내시경을 식도와 위를 지나서 십이지장까지 삽입해 조영제를 주입하는 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 진단방법 보기', value: '간암의 진단방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 진단방법 : 경피경간담관조영술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "피부를 통해 담도로 가느다란 바늘을 넣고 담관을 직접 보는 방법으로 담관의 협착과 폐쇄, 담관 침윤범위 등을 확인하고, 담관의 영상을 얻어 정확한 진단을 내리는데 유용한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 진단방법 보기', value: '간암의 진단방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 진단방법 : 자기공명영상 (MRI)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "CT로 진단이 애매한 경우 추가적인 도움을 줄 수 있으며, 간 전이를 잘 발견할 수 있는 장점이 있다. 최근 시행하고 있는 MRI-MRCP(자기공명 담췌관촬영술)은 담관의 침윤 범위를 결정 할 수 있어서 담관암을 진단하는데 더욱 유용하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 진단방법 보기', value: '간암의 진단방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 진단방법 : 복부초음파 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "복부통증이 있거나 황달이 있는 환자들에게서 일차적으로 시행하는 검사입니다. 암이 진행 된 경우 종괴가 발견되기도 하나 대부분은 폐쇄 부위 상부의 담도 확장 소견을 나타내게 된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 진단방법 보기', value: '간암의 진단방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    
    else if (userMessage==='간암의 치료방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "간암을 치료하는 방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '간절제술', value: '간암 치료방법 : 간절제술' },
            { title: '간이식술', value:'간암 치료방법 : 간이식술' },
            { title: '국소치료술', value: '간암 치료방법 : 국소치료술' },
            { title: '경동맥화학색전술(TACE)', value: '간암 치료방법 : 경동맥화학색전술(TACE)' },
            { title: '방사선치료', value: '간암 치료방법 : 방사선치료' },
            { title: '항암화학요법', value: '간암 치료방법 : 항암화학요법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
            
          ],
        },
      };
    }
    else if (userMessage==='간암 치료방법 : 간절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암이 절제가 가능하면서 간경변증이 없거나 그 정도가 심하지 않아 간기능이 충분하다고 판단될 경우 우선적으로 고려하게 되는 치료법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 치료방법 : 간이식술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "간암뿐 아니라 간암의 원인을 제공하는 간을 완전히 제거하고 새로운 간을 이식하기 때문에 가장 이상적인 치료법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 치료방법 : 국소치료술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "초음파와 같은 영상검사를 하면서 종양의 위치를 파악하여 바늘로 찌른 후 전류를 흘려보내서 열을 가해 종양을 괴사시키는 고주파열치료와 전류 대신 에탄올을 넣어 치료하는 에탄올주입술이 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='간암 치료방법 : 경동맥화학색전술(TACE)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "수술 혹은 국소치료술이 우선적으로 고려될 수 없는 여러 개의 종양 혹은 혈관을 침범한 진행된 종양이 있거나 간기능이 저하되어 있는 경우 가장 흔히 사용되는 치료법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='간암 치료방법 : 방사선치료') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "수술적 절제가 불가능하거나 국소치료술, 경동맥화학색전술 등으로 근치적 치료가 되지 않는 환자에게서 시행되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='간암 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "림프절 전이, 간 이외의 부위 전이 등의 다른 치료법에도 불구하고 계속 진행되는 경우에 항암화학요법을 고려할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 간암의 다른 치료방법 보기', value: '간암의 치료방법' },
            { title: '← 간암에 대한 다른 정보', value: '간암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    //갑상선암//
    else if (userMessage==='갑상선암') {
      botMessage = {
        _id: generateMessageId(),
        text: '갑상선암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '갑상선암의 정의' },
            { title: '위험요인', value: '갑상선암의 위험요인' },
            { title: '진단방법', value: '갑상선암의 진단방법' },
            { title: '치료방법', value: '갑상선암의 치료방법' },
            { title: '예방방법', value: '갑상선암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage==='갑상선암의 정의') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선암의 정의는 다음과 같습니다.\n\n갑상선에 생긴 혹을 갑상선 결절이라고 하는데, 크게 양성과 악성으로 나뉩니다.\n이 중 악성 결절들을 갑상선암이라고 합니다.\n또한, 갑상선암을 치료하지 않고 방치하면 암이 커져 주변조직을 침범하거나 림프절전이, 원격전이를 일으켜 심한 경우 생명을 잃을 수도 있습니다. 갑상선에 생기는 결절의 5~10%정도가 갑상선암으로 진단된다고 합니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선암의 위험요인에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '방사선', value: '갑상선암의 위험요인 : 방사선' },
            { title: '유전적 요인', value: '갑상선암의 위험요인 : 유전적 요인' },
            { title: '관련 질환', value: '갑상선암의 위험요인 : 관련 질환' },
            { title: '비만', value: '갑상선암의 위험요인 : 비만' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 위험요인 : 방사선') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선암의 위험인자 가운데 현재까지 가장 잘 입증된 것을 방사선 노출이다. 그리고 방사선으로 인한 갑상선암의 95% 이상이 유두암이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 위험요인', value: '갑상선암의 위험요인' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "부모에게 갑상선 유두암이나 여포암이 있을 때 자녀들의 갑상선암 발생 위험도는 아들이 7.8배, 딸은 2.8배 증가한다. 우리나라의 경우 분화갑상선암의 약 10%에서 가족력이 있는 것으로 보고되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 위험요인', value: '갑상선암의 위험요인' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 위험요인 : 관련 질환') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 유방암이나 양성 유방 질환들과 갑상선암의 연관성에 대해 많은 논란이 있다.\n- 갑상선종, 갑상선 결절, 만성 림프구성 갑상선염 등 갑상선 질환을 잃은 사람들에게 갑상선암이 많이 생기는지에 대해 논란이 많다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 위험요인', value: '갑상선암의 위험요인' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 위험요인 : 비만') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "최근 대규모 연구들에서는 과체중 및 비만의 경우 갑상선암의 빈도가 증가한다고 보고되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 위험요인', value: '갑상선암의 위험요인' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 진단방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '갑상선 초음파', value: '갑상선암의 진단방법 : 갑상선 초음파' },
            { title: '미세침흡인세포검사', value: '갑상선암의 진단방법 : 미세침흡인세포검사' },
            { title: '중심부바늘생검', value: '갑상선암의 진단방법 : 중심부바늘생검' },
            { title: '갑상선기능검사', value: '갑상선암의 진단방법 : 갑상선기능검사' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 진단방법 : 갑상선 초음파') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "초음파검사는 갑상선 결절의 모양을 확인하는 검사 중에서 가장 중요한 검사이다. 갑상선 초음파의 영상 소견에 따라서 갑상선암으로 진단되는 확률이 달라진다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 진단방법', value: '갑상선암의 진단방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 진단방법 : 미세침흡인세포검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선 결절이 악성, 즉 암으로 의심되는 경우에 시행한다. 근육주사를 놓거나 채혈을 할 때 쓰는 일반 주사기로 결절에서 세포를 빨아들여(흡인) 채취한 뒤 검사한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 진단방법', value: '갑상선암의 진단방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 진단방법 : 중심부바늘생검') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "미세침흡인세포검사로 진단이 잘 되지 않은 경우나 정확한 진단을 위해서 조직이 필요한 경우 중심부바늘생검을 시행할 수 있다. 중심부바늘생검은 미세침흡인세포검사보다 직경이 큰 조직검사용 바늘을 사용하여 조직을 얻는다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 진단방법', value: '갑상선암의 진단방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 진단방법 : 갑상선기능검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선에 결절이 갑상선호르몬을 만들어내는 기능성 결절인지 아닌지를 판별하는 주요 방법으로 갑상선 기능검사가 있다. 갑상선 기능검사는 혈액을 채취하여 갑상선과 관련되는 호르몬들의 농도를 확인하는 것으로, 가장 중요한 판별 요소는 뇌하수체에서 분비되는 갑상선자극호르몬(TSH)의 수치이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 진단방법', value: '갑상선암의 진단방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 치료방법') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선암의 치료방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '전절제술', value: '갑상선암의 치료방법 : 전절제술' },
            { title: '엽절제술', value: '갑상선암의 치료방법 : 엽절제술' },
            { title: '내시경 갑상선절제술', value: '갑상선암의 치료방법 : 내시경 갑상선절제술' },
            { title: '다빈치 로봇 수술', value: '갑상선암의 치료방법 : 다빈치 로봇 수술' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 치료방법 : 전절제술') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "갑상선 좌우 양엽과 그 사이의 협부 등 조직 전부를 제거하는 수술이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 치료방법', value: '갑상선암의 치료방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 치료방법 : 엽절제술') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "암이 침범한 쪽의 엽을 제거하는 수술로 진행이 많이 되지 않은 유두암이나 양성 종양일 경우 많이 시행한다. 암이 진행되어 림프절로 전이되었거나 전이가 의심되는 경우, 또는 전이예방 목적으로 갑상선 주위에 있는 경부 림프절을 같이 제거한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 치료방법', value: '갑상선암의 치료방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 치료방법 : 내시경 갑상선절제술') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "눈에 잘 띄지 않는 부분으로 내시경을 넣어 수술하기 때문에 목에 상처가 생기지 않는 미용상의 장점이 있다. 하지만 모든 환자에 적용시킬 수는 없어 크기가 작고 주변 조직이나 림프절로의 전이가 없는 경우에만 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 치료방법', value: '갑상선암의 치료방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 치료방법 : 다빈치 로봇 수술') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "내시경 수술과 같은 접근법을 사용하나 내시경기구 대신 로봇을 이용하는 수술 방법이다. 외부의 조종석에서 의사가 확대 영상을 보면서 로봇의 팔을 조종하여 수술을 하게 되며 수술 부위가 확대되어 상세히 보이므로 구조물들을 정확히 확인할 수 있으며, 손으로 직접 수술할 때 발생할 수 있는 의사의 손 떨림도 보정되기 때문에 정교한 수술이 가능하다. 미용적으로 우수하나 진행된 갑상선암의 경우에는 일반적으로 권장되지 않는다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암의 다른 치료방법', value: '갑상선암의 치료방법' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='갑상선암의 예방방법') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 요오드 섭취 및 적정 체중 유지\n요오드가 풍부한 음식을 섭취하는 것은 갑상선암 예방을 위한 좋은 방법이다. 해조류, 신선한 과일 및 채소를 충분히 드시고 균형 잡힌 식사를 하면 암 예방에 도움이 된다. 과체중, 비만인 경우에는 갑상선암 발생 위험이 높으니 식이조절 및 적절한 운동을 통해 적정 체중을 유지해야한다.\n\n(2) 어린이 방사선 노출 줄이기\n불필요하고 과도한 X-ray 검사 및 치료를 하지 않는 것을 권장하며, 전문의와의 충분한 상담 후 진료가 필요하다.\n\n(3) 가족력이 있는 경우 검사하기\n갑상선암의 가족력이 있는 경우, 유전적 소인이 있는지 검사해볼 필요가 있다. 가족력이 있는 경우에는 가계 구성원을 대상으로 RET 원종양유전자 돌연변이 검사를 받는 것도 중요하다. 갑상선암은 종양의 크기가 작은 경우 일반인들이 자가검진으로 암을 발견하기란 쉽지 않습니다. 정기적인 경부초음파 검사를 시행한다면 조기에 혹시 있을지 모를 암을 발견할 수 있으니, 꼭 주기적으로 검사를 받으시고 생활 속 암 예방 습관 실천해야한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    //난소암//
    else if (userMessage==='난소암') {
      botMessage = {
        _id: generateMessageId(),
        text: '난소암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '난소암의 정의' },
            { title: '위험요인', value: '난소암의 위험요인' },
            { title: '진단방법', value: '난소암의 진단방법' },
            { title: '치료방법', value: '난소암의 치료방법' },
            { title: '예방방법', value: '난소암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage==='난소암의 정의') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "난소암의 정의는 다음과 같습니다.\n\n난소에서 발생하는 암을 가리키며 발생하는 조직에 따라 크게 상피세포암, 배세포종양, 그리고 성삭 기질 종양으로 구분된다.\n난소 상피암은 난소 표면의 상피 세포에서 발생하는 상피성 난소암이며 난소암의 90% 이상이다. 난소 상피세포암은 세포형태에 따라 장액성 난소암, 점액성 난소암, 자궁내막양 난소암, 투명세포암 및 드물게 악성 브레너(Brenner) 종양으로 나누어지며, 그 외에 미분화세포암, 미분류 난소암도 포함된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "난소암의 위험요인에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '배란', value: '난소암의 위험요인 : 배란' },
            { title: '유전적 요인', value: '난소암의 위험요인 : 유전적 요인' },
            { title: '유방암', value: '난소암의 위험요인 : 유방암' },
            { title: '환경적 요인', value: '난소암의 위험요인 : 환경적 요인' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 위험요인 : 배란') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 가장 크게 생각하는 위험요인, 일생에서 배란기가 긴 경우는 그렇지 않은 경우에 비해 난소암의 발생 위험이 높음.\n- 미혼여성, 출산 경험이 없는 여성, 다산부에 비해 소산부가 발생 위험이 높음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 위험요인', value: '난소암의 위험요인' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- BRCA1 또는 BRCA2 유전자의 돌연변이 및 이상 변화\n- 대부분의 난소암은 유전적이지 않으며, 난소암의 5~10%만이 유전적 성격을 갖고 있음.\n- 모친이나 자매가 난소암에 걸린 경우는 그렇지 않은 경우에 비해 난소암에 걸릴 확률이 더 높아짐.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 위험요인', value: '난소암의 위험요인' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 위험요인 : 유방암') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 유방암, 자궁내막암 또는 대장암을 앓았던 적이 있는 여성에서 난소암의 위험도가 높음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 위험요인', value: '난소암의 위험요인' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 위험요인 : 환경적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 석면이나 활석 분말입자가 자궁, 난관을 통하여 복강 내에서 복막자극을 일으켜 난소암을 유발시키는 것으로 추정",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 위험요인', value: '난소암의 위험요인' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 진단방법') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "난소암의 진단방법은 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '골반내진', value: '난소암의 진단방법 : 골반내진' },
            { title: '경질 초음파', value: '난소암의 진단방법 : 경질 초음파' },
            { title: '조직검사', value: '난소암의 진단방법 : 조직검사' },
            { title: '경정맥 신우조영술(IVP)', value: '난소암의 진단방법 : 경정맥 신우조영술(IVP)' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 진단방법 : 골반내진') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "진찰대 위에서 환자의 질과 복부를 수진하여 난소의 종괴 유무와 크기 및 형태를 검사하게 된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 진단방법', value: '난소암의 진단방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 진단방법 : 경질 초음파') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "종양의 위치, 크기, 종양의 구성성상을 알아볼 수 있으며, 골반 깊숙이 위치한 난소의 이상 유무를 파악하기 위해서는 질을 통하여 초음파 탐지기를 삽입한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 진단방법', value: '난소암의 진단방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 진단방법 : 조직검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "경질초음파와 CA-125 종양표지자 혈액검사 등의 검사를 통해 난소에 생긴 종괴가 악성종양인지 양성종양인지를 완전히 진단해내는 것은 불가능하다. 따라서 최종적인 진단은 수술을 통해 난소 종괴를 적출하여 조직병리검사로 하게 된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 진단방법', value: '난소암의 진단방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 진단방법 : 경정맥 신우조영술(IVP)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "팔에 있는 정맥을 통해 조영제 주사를 놓고 신장, 자궁 그리고 방광 등의 장기에 암이 전이했는지를 X-선 사진 촬영을 통해 확인하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 진단방법', value: '난소암의 진단방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 치료방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "난소암의 치료방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '난소 및 자궁의 절제', value: '난소암의 치료방법 : 난소 및 자궁의 절제' },
            { title: '후복박림프절곽청술', value: '난소암의 치료방법 : 후복박림프절곽청술' },
            { title: '항암화학요법', value: '난소암의 치료방법 : 항암화학요법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 치료방법 : 난소 및 자궁의 절제') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "팔에 있는 정맥을 통해 조영제 주사를 놓고 신장, 자궁 그리고 방광 등의 장기에 암이 전이했는지를 X-선 사진 촬영을 통해 확인하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 치료방법', value: '난소암의 치료방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 치료방법 : 후복박림프절곽청술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "전이가 의심되는 림프절을 채취하여 검사한 후 전이가 확인되면 해당 림프절과 림프관을 절제하는 것을 림프절곽청이라고 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 치료방법', value: '난소암의 치료방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "난소 외부로 암세포의 확산이 의심되는 1개 말기 이상의 난소암의 경우에는 수술 후 대개 3~6차례의 항암화학요법을 실시하게 된다. 3기 및 4기의 난소암은 광범위하게 전이하기 때문에 수술 전의 검사에서 개복을 하더라도 암의 완전한 절제가 어려울 것이라고 예상되는 경우에는 우선적으로 항암화학요법을 실시하여 암을 작아지게 한 이후에 수술하기도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암의 다른 치료방법', value: '난소암의 치료방법' },
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='난소암의 예방방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 자궁경부암 검진\n자궁경부암의 예방에 있어서 무엇보다도 중요한 것은, 암이 되기 전 즉 전암성 병변을 일찍 발견하여 치료하는 것이다. 국가암검진권고안에 따라 30세 이상 여성은 2년에 한번씩 자궁경부암 검진을 무료로 받을 수 있다. 또한 여성들은 의사와 상의하여 나이, 위험 인자, 건강 상태 등을 고려하여 자신에게 적합한 정기 검진 방법을 선택할 수 있다.\n\n(2) 안전한 성생활\n인유두종바이러스는 성 접촉에 의해 감염되기 때문에 첫 성경험 나이를 늦추고, 성상대자수를 최소화하는 등의 안전한 성생활을 유지하는 것이 도움이 된다.\n\n(3) 금연하기\n담배를 피우면 자궁경부암이 발생할 위험이 높아지므로 자궁경부암 예방을 위해서는 담배를 피우지 않고, 흡연 여성은 담배를 끊는 것이 필요하다.\n\n(4) 인유두종바이러스 예방접종\nHPV백신은 인유두종바이러스의 감염을 예방하여 나아가 자궁경부 전암성 병변 및 자궁경부암을 예방하도록 고안되었다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 난소암에 대한 다른 정보', value: '난소암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    //담낭담도암 시작//
    else if (userMessage==='담낭담도암') {
      botMessage = {
        _id: generateMessageId(),
        text: '담낭담도암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '담낭담도암의 정의' },
            { title: '위험요인', value: '담낭담도암의 위험요인' },
            { title: '진단방법', value: '담낭담도암의 진단방법' },
            { title: '치료방법', value: '담낭담도암의 치료방법' },
            { title: '예방방법', value: '담낭담도암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage==='담낭담도암의 정의') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "담낭담도암의 정의는 다음과 같습니다.\n\n담낭암은 담낭 세포에서 발생하는 선암종이 대부분이어서, 담낭암이라고 하면 대개 담낭 선암종을 말한다. 선암 외에도 미분화암, 편평상피세포암, 선극세포종 등이 있고, 드물게 유암종, 림프종, 간질 종양, 과립세포종, 악성 흑색종 등이 발생할 수 있다.\n\n담도암도 담관 세포에서 발생하는 선암종이 대부분이어서, 일반적으로 담도암이라고 하면 담관 선암종을 가리킨다. 간외 담도암은 발생 부위에 따라 상부(근위부), 중부, 하부(원위부) 담도암으로 구분된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 위험요인') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "담낭담도암의 위험요인은 다음과 같습니다.\n\n담낭암\n- 담낭 점막의 만성적인 자극과 염증\n- 담낭 결석이 있는 경우 위험도 5~10배 증가\n\n담도암\n- 50~70대 연령층\n- 간흡층 간염",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [,
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' }
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 진단방법') {
      
      botMessage = {
        _id: generateMessageId(),
        text: "담낭담도암의 진단방법은 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '내시경적 역행성 담췌관조영술(ERCP)', value: '담낭담도암의 진단방법 : 내시경적 역행성 담췌관조영술(ERCP)' },
            { title: '경피경간 담도조영술(PTC)', value: '담낭담도암의 진단방법 : 경피경간 담도조영술(PTC)' },
            { title: '내시경초음파검사(EUS)', value: '담낭담도암의 진단방법 : 내시경초음파검사(EUS)' },
            { title: '자기공명영상(MRI)', value: '담낭담도암의 진단방법 : 자기공명영상(MRI)' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 진단방법 : 내시경적 역행성 담췌관조영술(ERCP)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경을 식도와 위를 지나 십이지장까지 삽입해 담도의 협착과 폐쇄 등을 직접 눈으로 확인하고, 담도의 영상을 얻어 정확한 진단을 내리는데 유용한 검사이며 담즙배액술 등의 치료를 동시에 할 수 있고, 정확도 또한 높다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 진단방법', value: '담낭담도암의 진단방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 진단방법 : 경피경간 담도조영술(PTC)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "팽대부 상부의 담도폐쇄가 의심되는데 내시경적 역행성 담췌관조영술로 담도조영에 실패하였든지 담도암의 근위부 침습 범위의 확인이 잘 안되면 경피경간 담도조영술를 해야 한다. 암에 의해 담즙의 흐름이 차단되어 확장된 상류의 담도에 직접 바늘을 꽂아 조영제를 주사하는 방법이다. 담도의 협착, 폐색 양상을 자세히 알 수 있어 종양의 존재부위와 확산 범위를 진단하는 데 유용하다.",
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 진단방법', value: '담낭담도암의 진단방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 진단방법 : 내시경초음파검사(EUS)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "담석과의 구별, 작은 종양의 진단, 암의 병기 결정 등을 위해서는 내시경초음파검사가 도움이 된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 진단방법', value: '담낭담도암의 진단방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 진단방법 : 자기공명영상(MRI)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "전산화단층촬영(CT)으로 진단이 애매할 경우 추가적인 도움을 줄 수 있으며, 간 전이를 잘 발견할 수 있는 장점이 있다. 최근에는 자기공명영상(MRI)를 이용하여 담췌관조영상(MRCP)을 얻을 수 있어 진단에 사용되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 진단방법', value: '담낭담도암의 진단방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "담낭담도암의 치료방법은 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '수술적 치료', value: '담낭담도암의 치료방법 : 수술적 치료' },
            { title: '경피적 경간 담즙 배액술(PTBD)', value: '담낭담도암의 치료방법 : 경피적 경간 담즙 배액술(PTBD)' },
            { title: '항암화학요법', value: '담낭담도암의 치료방법 : 항암화학요법' },
            { title: '방사선 치료', value: '담낭담도암의 치료방법 : 방사선 치료' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 치료방법 : 수술적 치료') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암세포가 담낭의 점막이나 근육층 내에 국한된 경우에는 담낭 절제술로 치료할 수 있다. 2기나 3기와 같이 암이 진행된 경우에는 간 부분 절제 및 주위 림프절을 포함한 광범위 절제술을 시행한다. 4기의 경우 간혹 간췌십이지장 절제술 및 간인대췌십이지장 절제술을 시도하지만 완치율은 높지 않다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 치료방법', value: '담낭담도암의 치료방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 치료방법 : 경피적 경간 담즙 배액술(PTBD)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "수술이 불가능한 환자 중 담도 폐쇄로 황달이 생긴 환자에게는 담도 스텐트 삽입술을 시행한다. 이것이 불가능한 경우는 담즙이 배액되도록 하는 경피적 경간 담즙 배액술을 시행하여 황달을 완화시킬 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 치료방법', value: '담낭담도암의 치료방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암이 전이되어 수술이 힘든 경우나 수술 후에 남아 있을 수 있는 암세포의 성장을 막기 위해 항암 화학 요법을 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 치료방법', value: '담낭담도암의 치료방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 치료방법 : 방사선 치료') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "수술로 암을 완전히 절제하기 어렵거나, 절제할 수 없지만 전이되지 않았으면 국소 재발을 방지하기 위해 방사선 치료를 시행할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암의 다른 치료방법', value: '담낭담도암의 치료방법' },
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='담낭담도암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "아직 담낭암이나 담도암 예방에 도움이 될 뚜렷한 수칙이나 권고되는 검진 기준은 없다. 특별히 권고되는 조기 검진법은 없으나, 위험요인으로 지적되는 것들을 일상생활에서 피하고, 정기적으로 건강검진을 받아서 암이 발생한 경우에는 일찍 발견하는 것이 중요하다. 복부 팽만감, 소화장애 같은 증상이 나타날 때는 병원 진료를 통해 소화기계 어느 부분의 이상인지를 감별하는 것이 필요하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 담낭담도암에 대한 다른 정보', value: '담낭담도암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    // 대장암 시작 //
    else if (userMessage==='대장암') {
      botMessage = {
        _id: generateMessageId(),
        text: '대장암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '대장암의 정의' },
            { title: '위험요인', value: '대장암의 위험요인' },
            { title: '진단방법', value: '대장암의 진단방법' },
            { title: '치료방법', value: '대장암의 치료방법' },
            { title: '예방방법', value: '대장암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 
    else if (userMessage==='대장암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "대장암의 정의는 다음과 같습니다.\n\n대장암은 잘룩창자(결장)와 곧창자(직장)에 생기는 악성종양을 말하며, 암이 발생하는 위치에 따라 결장에 생기는 암을 결장암, 직장에 생기는 암을 직장암이라고 하고, 이를 통칭하여 대장암 혹은 결장직장암이라고 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='대장암의 위험요인') {
      botMessage = {
        _id: generateMessageId(),
        text: "대장암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '유전적 요인', value: '대장암의 위험요인 : 유전적 요인' },
            { title: '경선종성 용종', value: '대장암의 위험요인 : 경선종성 용종' },
            { title: '염증성 장질환', value: '대장암의 위험요인 : 염증성 장질환' },
            { title: '기타', value: '대장암의 위험요인 : 기타' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='대장암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 전체 대장암의 약 5~15%는 유전적 소인과 관계가 있음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 위험요인', value: '대장암의 위험요인' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='대장암의 위험요인 : 경선종성 용종') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 조직검사에서 세포의 분화가 고등급 이형성증을 보일수록, 용종 같은 특성을 보일수록 발암성이 높음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 위험요인', value: '대장암의 위험요인' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='대장암의 위험요인 : 염증성 장질환') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 궤양성 대장염과 크론병과 같은 질환이 있는 경우 대장암 발병 위험이 4배에서 20배로 상승",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 위험요인', value: '대장암의 위험요인' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='대장암의 위험요인 : 기타') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 비만\n- 음주\n- 50세 이상의 연령\n- 동물성 지방 또는 포화성 지방 식이",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 위험요인', value: '대장암의 위험요인' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "대장암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '직장 수지 검사', value: '대장암의 진단방법 : 직장 수지 검사' },
            { title: '암태아성항원(CEA)검사', value: '대장암의 진단방법 : 암태아성항원(CEA)검사' },
            { title: '분변 잠혈 검사', value: '대장암의 진단방법 : 분변 잠혈 검사' },
            { title: '대장내시경검사', value: '대장암의 진단방법 : 대장내시경검사' },
            { title: '대장이중조영검사', value: '대장암의 진단방법 : 대장이중조영검사' },
            { title: '전산화단층촬영술(CT)', value: '대장암의 진단방법 : 전산화단층촬영술(CT)' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 직장 수지 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "의사가 윤활제를 바른 장갑 낀 손을 직장에 삽입하여 비정상적인 덩어리가 만져지는지를 보는 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 암태아성항원(CEA)검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "대장암의 수술 전 단계나 암 치료의 효과를 검사하기 위해서 또는 대장암과 다른 암의 재발 확인을 위한 검사에서 보조적으로 쓰인다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 분변 잠혈 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "대변을 이용하는 잠혈 검사는 위장관 출혈을 알아내기 위해서 또는 대장암의 조기 진단을 위해서 사용된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 대장내시경검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "불빛과 유연성 있는 튜브를 이용하여 대장을 직접 보는 검사 방법으로 대장 질환의 가장 정확한 진단 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 대장이중조영검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "항문을 통해 작은 튜브를 삽입하고 바륨이라는 조영제와 공기를 대장 내에 넣으면서 바륨을 대장점막에 도포하고, 공기로 대장 내강을 확장시킨 후 X-선 투시 장치를 이용하여 영상을 얻어 검사하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 진단방법 : 전산화단층촬영술(CT)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "주로 대장암 자체의 진단, 인접 장기 및 간, 림프절의 전이 여부 등을 규명하는 데 사용된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 진단방법', value: '대장암의 진단방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "대장암의 치료를 위한 수술은 암의 위치에 따라 절제하는 범위가 달라집니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '내시경적 절제술', value: '대장암의 치료방법 : 내시경적 절제술' },
            { title: '결장에 위치한 대장암', value: '대장암의 치료방법 : 결장에 위치한 대장암' },
            { title: '항암화학요법', value: '대장암의 치료방법 : 항암화학요법' },
            { title: '방사선 치료', value: '대장암의 치료방법 : 방사선 치료' },
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='대장암의 치료방법 : 내시경적 절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암세포의 분화도가 좋고, 암세포가 혈관이나 림프관을 침범하지 않았으며 암세포가 점막 또는 점막하 조직 일부에만 국한되어 있어야 한다는 조건을 모두 만족한 조기 대장암의 경우 시행이 가능하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 치료방법', value: '대장암의 치료방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 치료방법 : 결장에 위치한 대장암') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 맹장, 상행결장 및 횡행결장의 근위부에 위치한 대장암\n소장의 일부와 횡행결장의 일부까지 절제하는 우측결장젤제술이 시행되고, 절제 후에는 남은 소장과 횡행결장의 양쪽 끝을 이어주는 회장결장문합술을 시행한다.\n\n- 횡행결장의 중앙부에 위치한 대장암\n암을 포함한 횡행결장 전체를 절제하고 남은 결장끼리 연결하는 횡행결장절제술을 시행한다.\n\n- 횡행.결장의 말단부, 비만곡 부위 또는 하행결장에 위치한 대장암\n이 경우에는 좌측결장절제술을 시행한다. - 구불잘록창자(S상결장)에 위치한 결장암인 경우 결장에 혈액을 공급하거나 이 부위로부터 혈액이나 림프액이 배액되는 동맥, 정맥, 림프관 및 림프절이 같이 절제된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 치료방법', value: '대장암의 치료방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암을 완전히 절제한 경우, 재발률을 낮추기 위한 목적으로 항암화학요법을 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 치료방법', value: '대장암의 치료방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 치료방법 : 방사선 치료') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "경우에 따라서 매일 10~20분 정도, 주 5회 외래통원치료로 시행된다. 수술 전 또는 수술 후 보조치료로 방사선 치료를 하는 경우에는 대개 6주 전후의 치료기간이 소요되며, 수술을 시행하지 않은 1차치료일 경우나 재발암의 경우에는 7~8주의 기간이 필요하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암의 다른 치료방법', value: '대장암의 치료방법'},
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='대장암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 섭취 총칼로리 높지 않게 먹기\n음식의 종류와 상과없이 섭취 총칼로리가 높을수록 대장암의 위험도가 높아진다.\n\n(2) 섬유소 섭취하는 습관 가지기\n섬유소는 대장 내용물을 희석시키고 장 통과 시간을 단축시키며 대변 부피를 증가시키 작용을 한다.\n\n(3) 칼슘 섭취하기\n칼슘은 담즙산, 지방산과 결합하여 대장상피세포에 담즙산이나 지방산이 유해하게 작용하는 것을 막는 것으로 알려져 있다.\n\n(4) 적당한 육체적인 활동하는 생활습관 갖기\n하루 종일 앉아서 일하는 직업처럼 육체적인 활동이 적은 직업에 종사할수록 대장암의 위험도가 올라간다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 대장암에 대한 다른 정보', value: '대장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }
    //신장암 시작//

    else if (userMessage==='신장암') {
      botMessage = {
        _id: generateMessageId(),
        text: '신장암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '신장암의 정의' },
            { title: '위험요인', value: '신장암의 위험요인' },
            { title: '진단방법', value: '신장암의 진단방법' },
            { title: '치료방법', value: '신장암의 치료방법' },
            { title: '예방방법', value: '신장암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 
    else if (userMessage==='신장암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "신장암의 정의는 다음과 같습니다.\n\n신장에서 발생하는 종양은 발생하는 위치에 따라 신실질에서 발생하는 종양과 신우에서 발생하는 신우암으로 구분한다.\n신실질에서 발생하는 종양의 대부분은 원발성 종양으로 그 중에서 85~90% 이상은 악성종양인 신세포암이다.\n신우암은 신장에서 발생하는 암의 5~10%를 차지하고 있으며, 요로상피암이 주로 발생한다.\n그러므로 우리가 일반적으로 신장암이라고 하면 신실질에서 발생하는 원발성 악성종양인 신세포암을 말한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='신장암의 위험요인') {
      botMessage = {
        _id: generateMessageId(),
        text: "신장암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '유전적 요인', value: '신장암의 위험요인 : 유전적 요인' },
            { title: '기존 신질환', value: '신장암의 위험요인 : 기존 신질환' },
            { title: '환경적 요인 및 생활습관', value: '신장암의 위험요인 : 환경적 요인 및 생활습관' },
            { title: '기타', value: '신장암의 위험요인 : 기타' },
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='신장암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 가족력이 있으면 신장암 발생 위험도가 4~5배 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 위험요인', value: '신장암의 위험요인'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 위험요인 : 기존 신질환') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 장기간 혈액투석환자\n- 후천성 신낭종이 발생한 환자의 4~9%는 신세포암 발생하여 정상인에 비해 30~100배 위험도 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 위험요인', value: '신장암의 위험요인'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 위험요인 : 환경적 요인 및 생활습관') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 흡연, 비만, 고혈압\n- 페나세틴의 장기 복용\n- 과다한 동물성지방, 튀기거나 심하게 구워진 육류, 고 에너지음식 섭취",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 위험요인', value: '신장암의 위험요인'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 위험요인 : 기타') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 종양억제유전자이상(VHL 유전자 등)\n- 염색질조절유전자이상(PBRM1, BAP1, STED2 등)\n- 원바암 유전자발현(c-MET, c-myc 등)\n- 특정 성장인자 및 수용체 발현(TGF-α,β,EGFR 등)",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 위험요인', value: '신장암의 위험요인'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 진단방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "신장암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '신동맥 조영술', value: '신장암의 진단방법 : 신동맥 조영술' },
            { title: '초음파', value: '신장암의 진단방법 : 초음파' },
            { title: '전산화단층촬영술(CT)', value: '신장암의 진단방법 : 전산화단층촬영술(CT)' },
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='신장암의 진단방법 : 신동맥 조영술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "신보존술을 하기 전에 혈관분포를 파악하기 위해서 시행하지만 최근에는 전산화단층촬영을 이용한 혈관 조영술을 이용하며, 주로 수술이 불가능해 신동맥 색전술을 시술할 때 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 진단방법', value: '신장암의 진단방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='신장암의 진단방법 : 초음파') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "복부초음파촬영은 검사에 따른 위험이나 고통이 없고, 복부 내의 여러 장기를 함께 관찰할 수 있는 효율적인 검사로 단순낭종(물혹), 복합성 낭종, 고형종물(덩어리)의 감별에 매우 유용한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 진단방법', value: '신장암의 진단방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }
    else if (userMessage==='신장암의 진단방법 : 전산화단층촬영술(CT)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "신종물의 악성 여부 평가뿐만 아니라 신혈관 주위, 신장 주변, 신정맥, 하대정맥, 부신, 간, 국소 림프절 등 주위 장기로의 침범 및 전이 여부를 파악할 수 있어 신세포암의 병기를 결정하고 치료계획을 세우는데 가장 중요한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 진단방법', value: '신장암의 진단방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "신장암의 치료방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '근치적 신적출술', value: '신장암의 치료방법 : 근치적 신적출술' },
            { title: '부분 신절제술', value: '신장암의 치료방법 : 부분 신절제술' },
            { title: '저침습적 수술요법', value: '신장암의 치료방법 : 저침습적 수술요법' },
            { title: '신동맥색전술', value: '신장암의 치료방법 : 신동맥색전술' },
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='신장암의 치료방법 : 근치적 신적출술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "신장 이외의 기관에 전이가 없는 국한된 신세포암이라면 암을 포함하고 있는 신장과 신장을 둘러싸고 있는 지방층 및 신주위 근막, 그리고 신우 및 요관 일부까지를 모두 제거하는 수술이다.",
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 치료방법', value: '신장암의 치료방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 치료방법 : 부분 신절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "신장을 모두 적출하는 근치적 신적출술과 달리 암병변을 포함한 신장의 일부만을 제거하고 나머지 부분은 보존하는 수술방법으로 신원보존술이라고도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 치료방법', value: '신장암의 치료방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 치료방법 : 저침습적 수술요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "냉동요법은 조직을 영하 40oC까지 냉동시켜 신세포암 조직을 파괴시키는 치료이며 고주파 열치료술은 반대로 고주파를 이용하여 발생하는 열로 신세포암 조직을 응고, 괴사 시키는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 치료방법', value: '신장암의 치료방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 치료방법 : 신동맥색전술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "주위 장기로의 침윤이 심해 종양절제가 불가능하거나, 동반된 다른 질환이나 고령 등의 이유로 수술의 대상이 되지 않거나, 또는 수술을 기피하는 환자에서 차선의 방법으로 선택할 수 있다. 신세포암으로 인해 조절할 수 없는 통증이 있거나, 종양에서 심각한 출혈이 있거나, “부종양증후군” 등이 있을 때 시행하기도 하며, 드물게 수술 전이나 전신치료 전에 시행하기도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암의 다른 치료방법', value: '신장암의 치료방법'},
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='신장암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 건강한 식이습관 가지기\n과다한 동물성지방 섭취, 튀기거나 심하게 구워진 육류 섭취, 고 에너지 음식의 섭취 등이 신세포암 발생의 위험도를 높이며, 과일 및 채소류 섭취, 저칼로리 식이, 비만 방지 및 규칙적인 운동 등은 신세포암 발생의 위험도를 감소시킨다.\n\n(2) 혈압조절하기\n고혈압은 신세포암 발생의 위험인자이므로 적절한 혈압조절이 필요하다.\n\n(3) 금연하기\n흡연은 신세포암 발생의 가장 강력한 위험인자이므로 암 예방을 위해서 금연은 필수적이다.\n\n(4) 건강검진을 통한 주기적인 복부초음파\n신세포암의 대부분은 초기에 자각 증상이 없어 건강검진을 통한 주기적인 복부 초음파 검사 등을 하는 것이 좋다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 신장암에 대한 다른 정보', value: '신장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    //위암 시작//

    else if (userMessage==='위암') {
      botMessage = {
        _id: generateMessageId(),
        text:'위암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '위암의 정의' },
            { title: '위험요인', value: '위암의 위험요인' },
            { title: '진단방법', value: '위암의 진단방법' },
            { title: '치료방법', value: '위암의 치료방법' },
            { title: '예방방법', value: '위암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 
    else if (userMessage==='위암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "위암의 정의는 다음과 같습니다.\n\n조기위암(EGC)\n조기 위암은 대부분 증상이 없기 때문에 검사에서 우연히 발견되는 경우가 많다. 궤양을 동반한 조기 위암인 경우에는 속쓰림 증상 등이 있을 수 있지만, 환자가 느끼는 대부분의 소화기 증상은 비궤양성 소화불량 증상으로 조기 위암과 직접 관계가 없는 경우가 많다.\n\n진행성 위암(AGC)\n암이 진행함에 따라 동반되는 상복부 불쾌감, 팽만감, 동통, 소화불량, 식욕부진, 체중감소, 빈혈 등의 진행성 전신 증상이 있을 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='위암의 위험요인') {
      botMessage = {
        _id: generateMessageId(),
        text: "위암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '관련 질병', value: '위암의 위험요인 : 관련 질병' },
            { title: '식이', value: '위암의 위험요인 : 식이' },
            { title: '유전성', value: '위암의 위험요인 : 유전성' },
            { title: '기타', value: '위암의 위험요인 : 기타' },
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='위암의 위험요인 : 관련 질병') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 위수술의 과거력 : 2~6배 위험률\n- 만성 위축성 위염 : 저산증 유발\n- 악성 빈혈 : 약 10%에서 위암 발생\n- 헬리코박터 파이로리균 : 만성 위축성 위염 유발\n- 용종성 폴립",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 위험요인', value: '위암의 위험요인'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 위험요인 : 식이') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 질산염 화합물(가공된 햄, 소시지류) - 짠 음식, 저단백, 저비타민 식이",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 위험요인', value: '위암의 위험요인'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 위험요인 : 유전성') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 가족력이 있는 경우 : 위험도가 약 4배로 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 위험요인', value: '위암의 위험요인'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 위험요인 : 기타') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 남자가 여자보다 2배 정도 높게 발생\n- 50~60대에서 호발\n- 음주, 흡연",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 위험요인', value: '위암의 위험요인'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "위암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '위내시경 검사', value: '위암의 진단방법 : 위내시경 검사' },
            { title: '상부위장관조영술(USG)', value: '위암의 진단방법 : 상부위장관조영술(USG)' },
            { title: '전산화단층촬영술(CT)', value: '위암의 진단방법 : 전산화단층촬영술(CT)' },
            { title: '자기공명검사(MRI)', value: '위암의 진단방법 : 자기공명검사(MRI)' },
            { title: '내시경적 초음파검사', value: '위암의 진단방법 : 내시경적 초음파검사' },
            { title: '양전자방출단층촬영술(PET)', value: '위암의 진단방법 : 양전자방출단층촬영술(PET)' },
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 위내시경 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경을 통하여 위 내부를 직접 관찰하면서 위암의 모양, 크기, 위치를 평가하고 의심되는 부위에서 조직검사를 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 상부위장관조영술(USG)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "상부위장관조영술은 조영제를 경구 투여한 후 X-선 촬영을 하여 위 점막 표면의 병변을 관찰하는 검사방법으로 위암의 모양, 크기, 위치를 평가할 수 있어 암의 진단뿐 아니라 수술 시 절제 범위를 결정하는 데 유용한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 전산화단층촬영술(CT)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "인체에 X-선을 여러 각도로 투과시켜 복부의 단면 모습을 볼 수 있는 검사로 위암의 주위 조직 침범이나 림프절 전이를 파악하고, 간, 복막 등의 원격전이를 판단할 수 있어 수술 전 위암의 진행 상태를 파악하는 데 필요한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 자기공명검사(MRI)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "위암에서는 일반적으로 잘 시행하지 않으나 CT 촬영에서 간에 혹이 보일 때 간으로 전이 여부, 양성종양과의 감별을 위해 시행하는 경우가 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 내시경적 초음파검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경 끝에 초음파 진단장치를 붙여 위장 내부에서 직접 매스 위에 대고 초음파 검사를 하므로 깊이를 정확히 측정할 수 있으며 림프절 전이도 같이 볼 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 진단방법 : 양전자방출단층촬영술(PET)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "검사방법 중 민감도가 가장 높다고 알려져 있는 방법으로 진행이 많이 된 위암 환자에서 암 주변으로의 국소전이나 간, 폐, 복막 등으로의 전이 여부를 확인하기 위해 시행할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 진단방법', value: '위암의 진단방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "위암의 치료방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '내시경적 점막절제술(EMR)', value: '위암의 치료방법 : 내시경적 점막절제술(EMR)' },
            { title: '위아전절제술', value: '위암의 치료방법 : 위아전절제술' },
            { title: '위전절제술', value: '위암의 치료방법 : 위전절제술' },
            { title: '근위부 위아전절제술', value: '위암의 치료방법 : 근위부 위아전절제술'},
            { title: '복강경 위절제술', value: '위암의 치료방법 : 복강경 위절제술' },
            { title: '항암화학요법', value: '위암의 치료방법 : 항암화학요법' },
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 내시경적 점막절제술(EMR)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경적 점막절제술은 약 30분 정도 수면내시경을 하면서 치료하는데, 위암 바로 아래에 생리식염수를 주사하여 위점막을 부풀리고, 전기 올가미를 이용하여 잘라내는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 위아전절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "위아전절제술은 위의 중간 이하 아랫부분에 암이 발생한 경우 시행하는 수술방법이다. 위 상부의 일부를 남기고 남은 부분의 단면을 십이지장이나 빈창자 부위에 문합하는 것이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 위전절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "위의 상부에 암이 있는 경우에 위를 보존하지 못하고 식도와의 연결부위에서 위 전체를 절제하고 식도와 빈창자를 연결하는 수술방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 근위부 위아전절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "위의 상부에 암이 있을 경우 위 상부를 절제하고 아래쪽을 살리는 수술이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 복강경 위절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "복강경 수술은 몇 개의 관을 복강 내로 넣은 후 내시경(복강경)을 통해 내장을 모니터 화면으로 보면서 복강 내에 넣은 특수하게 만들어진 수술 기구를 조작하며 수술하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "위암에 있어서 항암화학요법은 여러 가지 역할을 하는데, 첫째는 보조적인 치료방법으로서 역할이며, 둘째는 수술을 전제로 하여 종양의 크기를 줄이기 위하여 시행하는 경우에 시행하고, 셋째는 수술적 치료가 불가능한 경우 고시적인 치료방법으로 이용되기도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암의 다른 치료방법', value: '위암의 치료방법'},
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='위암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "위암의 예방방법은 다음과 같습니다.\n\n(1) 금연, 그리고 간접흡연 피하기\n흡연하는 사람은 한 번도 담배를 피우지 않은 사람들에 비해 위암에 걸릴 위험이 1.6배 높다고 조사되었다. 따라서 금연은 가장 확실한 위암의 예방법이며, 간접흡연도 피하는 것이 좋다.\n\n(2) 과도한 염분 섭취 자제, 그리고 신선한 과일과 채소 섭취\n과도한 염분 섭취는 위점막을 손상시켜 발암 물질에 취약하게 하고, 지속적인 자극으로 위축성 위염을 일으켜 위암의 발생을 촉진한다. 신선한 과일이나 채소는 이러한 자극을 중화하는 것으로 보인다.\n\n(3) 음식물 냉장보관\n고농도의 질산염(nitrate)이 들어 있는 건조, 훈제, 염장 음식, 조미료, 방부제, 색소 등을 장기간 섭취하면 위암의 발생 위험이 높아진다고 밝혀져 있다.\n\n(4) 헬리코박터균 치료\n헬리코박터균은 만성 위염을 일으키고, 위 내 세균증식 기회를 높이는 등의 과정을 통해 위암 발생에 관여하는 것으로 보인다. 따라서, 위암의 가족력이 있거나 위암 고위험군에 해당하는 경우 의사와의 상담을 통해 헬리코박터균 치료 여부를 결정하는 것이 좋다.\n\n(5) 위내시경 검사\n보통은 30~40대부터 매 2년 간격으로 검사를 받는 것이 좋으며, 개인의 상태에 따라 검사 시기와 간격이 달라질 수 있다. 가족 중에 위암 환자가 있거나, 이전 검사에서 위축성 위염이나 장상피화생 등의 소견이 관찰되었다면 위암발생 고위험군에 해당할 수 있으므로 주치의의 판단에 따라 더 이른 나이부터 좀 더 자주 검사를 시행해야 할 수도 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 위암에 대한 다른 정보', value: '위암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    //폐암 시작//

    else if (userMessage==='폐암') {
      botMessage = {
        _id: generateMessageId(),
        text:'폐암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '폐암의 정의' },
            { title: '위험요인', value: '폐암의 위험요인' },
            { title: '진단방법', value: '폐암의 진단방법' },
            { title: '치료방법', value: '폐암의 치료방법' },
            { title: '예방방법', value: '폐암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 
    else if (userMessage==='폐암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "폐암의 정의는 다음과 같습니다.\n\n허파에 생긴 악성종양을 말하며, 크게 암세포가 기관지나 허파꽈리에서 처음 발생한 원발성 폐암과 암세포가 다른 기관에서 생겨나 혈관이나 림프관을 타고 허파로 이동해 증식하는 전이성 폐암으로 나눌 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='폐암의 위험요인') {
      botMessage = {
        _id: generateMessageId(),
        text: "폐암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '흡연', value: '폐암의 위험요인 : 흡연' },
            { title: '환경적 요인', value: '폐암의 위험요인 : 환경적 요인' },
            { title: '유전적 요인', value: '폐암의 위험요인 : 유전적 요인' },
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='폐암의 위험요인 : 흡연') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 폐암에 있어 가장 중요한 발병 요인임\n- 간접흡연은 흡연과 마찬가지로 폐암을 일으킬 수 있음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 위험요인', value: '폐암의 위험요인'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 위험요인 : 환경적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 석면 : 석면에 노출된 후 10~35년 정도의 잠복기를 거쳐 폐암이 발병됨\n- 방사선 : 모든 종류의 방사성 동위원소는 발암물질이 될 수 있음",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 위험요인', value: '폐암의 위험요인'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 가족력이 있는 경우 위험도가 2~3배 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 위험요인', value: '폐암의 위험요인'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "폐암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '흉부 X-선 검사', value: '폐암의 진단방법 : 흉부 X-선 검사' },
            { title: '흉부 전산화단층촬영술(CT)', value: '폐암의 진단방법 : 흉부 전산화단층촬영술(CT)' },
            { title: '객담 세포진 검사', value: '폐암의 진단방법 : 객담 세포진 검사' },
            { title: '기관지내시경검사', value: '폐암의 진단방법 : 기관지내시경검사' },
            { title: '경피적 미세침흡인세포검사', value: '폐암의 진단방법 : 경피적 미세침흡인세포검사' },
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법 : 흉부 X-선 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "가장 먼저 사용되는 검사법으로 간단하게 허파에 혹이 생겼는지 여부를 판단할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 진단방법', value: '폐암의 진단방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법 : 흉부 전산화단층촬영술(CT)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "보다 정교한 검사법으로 허파나 림프절 그리고 기관에 대한 해상도가 높기 때문에 암의 원발 부위 및 림프절 침범 등 병의 진행 정도 파악에 도움이 된다. 폐암의 발견 및 병기 판정에 필수적이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 진단방법', value: '폐암의 진단방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법 : 객담 세포진 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "가래에 섞인 세포 속에서 암세포를 발견해내는 검사법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 진단방법', value: '폐암의 진단방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법 : 기관지내시경검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "기관지 내 암조직의 침범 여부를 확인할 수 있으며, 떼어낸 조직을 검사하며 암을 확진할 수 있다. 암 진단뿐만 아니라 암의 기관지 침범 정도를 확인하여 수술 등 치료 계획을 세우는 데 도움을 준다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 진단방법', value: '폐암의 진단방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 진단방법 : 경피적 미세침흡인세포검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "국소마취를 한 후에 피부를 통해서 폐암에 바늘을 찔러 폐암의 조직이나 세포를 얻어서 실시하는 조직검사로 실제로 폐암유무를 판명해낼 수 있는 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 진단방법', value: '폐암의 진단방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "폐암의 치료방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '전폐 절제술', value: '폐암의 치료방법 : 전폐 절제술' },
            { title: '엽 절제술', value: '폐암의 치료방법 : 엽 절제술' },
            { title: '양엽 절제술', value: '폐암의 치료방법 : 양엽 절제술' },
            { title: '쐐기 절제술 및 분절 절제술', value: '폐암의 치료방법 : 쐐기 절제술 및 분절 절제술' },
            { title: '항암화학요법', value: '폐암의 치료방법 : 항암화학요법' },
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법 : 전폐 절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "한쪽 허파 전체를 절제해야 폐암을 전부 제거할 수 있을 때는 한쪽 허파 전부를 절제해 내는 전폐절제술을 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 치료방법', value: '폐암의 치료방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법 : 엽 절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "허파의 한 엽을 제거하는 수술 방법이다. 이 수술은 암종이 허파의 한 엽에 국한되어 있을 때 시행할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 치료방법', value: '폐암의 치료방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법 : 양엽 절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "엽 절제술의 일종이며 허파의 두 엽을 한 번에 제거하는 수술로 오른쪽 허파에서만 가능하다. 이 수술은 암종이 허파의 두 엽에 걸쳐 있거나 양엽으로 통하는 기관지나 혈관에 암이 있을 때 시행할 수 있는 수술방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 치료방법', value: '폐암의 치료방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법 : 쐐기 절제술 및 분절 절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암의 크기가 작고 허파기능이 좋지 않을 때 암종을 제거하는 수술법이다. 이러한 수술은 폐암이 아주 초기인 경우이거나, 아주 적은 부분에만 암이 있을 때 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 치료방법', value: '폐암의 치료방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 치료방법 : 항암화학요법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "소세포폐암의 경우는 항암화학요법이 주된 치료 원칙이며 제한성 병기에서는 방사선 치료를 병용한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암의 다른 치료방법', value: '폐암의 치료방법'},
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='폐암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "폐암의 예방방법은 다음과 같습니다.\n(1) 비흡연, 금연 그리고 간접흡연 피하기\n흡연은 가장 중요한 폐암의 위험인자이다. 궐련, 시가, 파이프 모두 폐암의 위험을 높인다고 알려져 있다. 모든 폐암의 약 90%가 흡연이 원인이라고 추정하고 있다.\n\n(2) 금주 또는 절주하기\n과음도 폐암과 관계가 있다는 연구결과들이 있다. 따라서 음주량을 줄이거나 금주하는 것도 폐암의 예방법 중 하나라고 할 수 있다. \n\n(3) 베타 카로틴과 흡연\n베타 카로틴을 복용했을 때 하루에 한 갑 이상 흡연하는 사람은 폐암의 발생 위험이 높아질 수 있습니다. 흡연자들은 베타 카로틴 보조제를 복용하지 않는 것이 좋습니다.\n\n(4) 석면, 비소, 라돈 피하기\n직업환경에서 주로 노출될 수 있는 석면, 비소 등은 폐암을 유발할 수 있다. 라돈 또한 폐암의 주요 유발요인 중 하나이다.\n\n(5) 충분한 과일, 야채의 섭취하기\n과일이나 야채를 충분히 섭취함으로써 폐암의 발생 위험을 낮출 수 있을 것이라는 몇몇 연구결과가 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 폐암에 대한 다른 정보', value: '폐암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    //췌장암 시작//

    else if (userMessage==='췌장암') {
      botMessage = {
        _id: generateMessageId(),
        text:'췌장암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '췌장암의 정의' },
            { title: '위험요인', value: '췌장암의 위험요인' },
            { title: '진단방법', value: '췌장암의 진단방법' },
            { title: '치료방법', value: '췌장암의 치료방법' },
            { title: '예방방법', value: '췌장암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 
    else if (userMessage==='췌장암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암의 정의는 다음과 같습니다.\n\n췌장암은 췌장에 생겨난 암세포이다. 췌장암에는 여러 종류가 있으나 90% 이상은 췌관의 외분비 세포에서 발생하기에, 일반적으로 췌장암이라고 하면 췌관 선암을 말한다. \n췌장암은 발생 위치에 따라 증상에 차이가 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 위험요인') {
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '흡연', value: '췌장암의 위험요인 : 흡연' },
            { title: '유전적 요인', value: '췌장암의 위험요인 : 유전적 요인' },
            { title: '당뇨', value: '췌장암의 위험요인 : 당뇨' },
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 위험요인 : 흡연') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 췌장암의 발생과 관계가 깊은 발암물질로 위험도가 2~5배로 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 위험요인', value: '췌장암의 위험요인'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- K-Rass(케이라스)라는 유전자의 이상\n- 췌장암의 90% 이상에서 위와 같은 유전자 이상",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 위험요인', value: '췌장암의 위험요인'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 위험요인 : 당뇨') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 원인이 되기도 하고 증상으로 나타나기도 함\n- 장기간 당뇨를 앓고 있거나 가족력이 없이 갑자기 당뇨가 발생했다면 검사가 필요",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 위험요인', value: '췌장암의 위험요인'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 진단방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암의 위험요인으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '혈청 종양표지자검사', value: '췌장암의 진단방법 : 혈청 종양표지자검사' },
            { title: '내시경적 역행성 담췌관조영술', value: '췌장암의 진단방법 : 내시경적 역행성 담췌관조영술' },
            { title: '내시경 초음파검사(EUS)', value: '췌장암의 진단방법 : 내시경 초음파검사(EUS)' },
            { title: '복부초음파검사', value: '췌장암의 진단방법 : 복부초음파검사' },
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 진단방법 : 혈청 종양표지자검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암과 관련하여 가장 흔히 쓰이는 종양표지자는 CA19-9인데, 특이도가 낮다는 문제점이 있다. 췌장암 외에 담도를 포함한 소화기계의 다른 암들에서도 수치가 상승할 수 있고, 악성 종양이 없는 담관염과 담도 폐색의 경우에도 마찬가지이다. 암 초기에는 흔히 정상으로 나오므로 조기 진단에는 활용할 수 없지만, 췌장암의 예후 판정과 치료 후 추적 검사에 지표로 쓸 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 진단방법', value: '췌장암의 진단방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 진단방법 : 내시경적 역행성 담췌관조영술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경을 식도와 위를 거쳐 십이지장까지 삽입하여 담관과 췌관의 협착이나 폐쇄 여부를 눈으로 확인하고 해당 영상을 얻을 수 있는 유용한 검사이다. 정확도가 높고, 담즙배액술 같은 치료를 동시에 할 수도 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 진단방법', value: '췌장암의 진단방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 진단방법 : 내시경 초음파검사(EUS)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "내시경 초음파검사는 췌장암 진단의 정확도가 매우 높습니다. 내시경에 초음파 기기를 부착해 위나 십이지장 안에 넣고 췌장 가까이에서 초음파를 보내어 관찰하는 것이다. 아울러 조직 검사도 가능하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 진단방법', value: '췌장암의 진단방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 진단방법 : 복부초음파검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "췌장에서 혹이 보이거나 주변 림프절이 커져 있는 것이 관찰되면 췌장암을 의심할 수 있다. 췌장 자체에서는 혹이 뚜렷이 관찰되지 않더라도 췌관이나 담관이 막혀 있음을 의미하는 소견, 즉 관이 비정상적으로 굵어진 것이 보이는 경우에는 췌장암을 의심할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 진단방법', value: '췌장암의 진단방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암의 치료방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '휘플씨 수술', value: '췌장암의 치료방법 : 휘플씨 수술' },
            { title: '유문부 보존 췌십이지장절제술', value: '췌장암의 치료방법 : 유문부 보존 췌십이지장절제술' },
            { title: '췌전절제술', value: '췌장암의 치료방법 : 췌전절제술' },
            { title: '원위부 췌장절제술', value: '췌장암의 치료방법 : 원위부 췌장절제술' },
            { title: '원위부 방사선치료', value: '췌장암의 치료방법 : 방사선치료' },
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법 : 휘플씨 수술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암이 췌장의 머리 부분에 생겼을 때의 수술법 중 하나로, 췌장의 머리와 십이지장, 소장 일부, 위의 하부, 총담관과 담낭을 절제한 뒤 남은 췌장?담관 및 위의 상부에 소장을 연결하는 것이다. 최근에는 위 부분절제를 피하는 유문부 보존 췌십이지장절제술이 널리 쓰인다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 치료방법', value: '췌장암의 치료방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법 : 유문부 보존 췌십이지장절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "휘플씨 수술과 비슷하나, 위를 보존한다는 점이 다르다. 위의 넓은 몸통 아래쪽, 십이지장으로 이어지는 부분인 유문부를 보존하여 치료법이 발전함에 따라 수술 사망률이 2-3%로 줄었고 5년 생존율도 높아져서, 절제가 가능한 췌장 두부암에 대한 최선의 치료법으로 쓰인다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 치료방법', value: '췌장암의 치료방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법 : 췌전절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "휘플씨 수술에서는 췌장의 일부를 남겨놓는 반면, 췌전절제술은 췌장을 전부 제거하는 수술로 암이 췌장 전체에 걸쳐 있을 때 시행한다",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 치료방법', value: '췌장암의 치료방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법 : 원위부 췌장절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암이 췌장의 몸통이나 꼬리에 발생했을 경우에는 종양을 포함하여 췌장의 몸통에서 꼬리까지 전부, 또는 꼬리부분만 제거하는 원위부 췌장절제술을 시행한다. 이때 췌장 꼬리 근처에 있는 비장도 같이 제거한다. 휘플씨 수술에 비해 시간이 덜 걸리고 난이도도 높지 않은 편이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 치료방법', value: '췌장암의 치료방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 치료방법 : 방사선치료') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암 환자 중 수술적 절제가 불가능하지만 전이는 없는 사람이 40% 정도 되는데, 이들에게는 방사선치료를 시행할 수 있다. 방사선치료와 함께 항암제를 투여하면 생존 기간이 연장되는 경우가 많다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암의 다른 치료방법', value: '췌장암의 치료방법'},
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='췌장암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "췌장암의 예방방법은 다음과 같은 것들이 있습니다.\n(1) 건강한 식생활과 적절한 운동하기\n알맞은 체중을 유지하는 것은 암뿐 아니라 모든 질환의 예방에 도움이 된다. 육류 중심의 고지방, 고칼로리 식이를 피하고 과일과 채소를 많이 먹는 쪽으로 식생활을 개선하는 것이 좋다. 단백질도 식물성의 것을 많이 섭취해야한다.\n\n(2) 관련 질환 검사 및 치료하기\n만성 췌장염도 췌장암 발생 위험도를 높이므로 적절한 치료를 받도록 해야 한다. 당뇨가 있으면 췌장암 발생 위험이 높아지니 당뇨 환자는 꾸준히 치료를 받고 식이요법을 철저히 지켜야 한다.\n\n(3) 직업상 췌장암 위험요인 관리하기\n석탄이나 타르 관련 작업자, 금속 제조나 알루미늄 제분 종사자, 기계를 수리하거나 자르거나 깎는 작업을 하면서 관련 유체에 많이 노출되는 사람들은 보호 장비를 착용하고 안전 수칙을 엄수하여 이러한 물질에의 노출을 가능한 한 줄여야 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 췌장암에 대한 다른 정보', value: '췌장암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' } 
          ],
        },
      };
    }

    //유방암//
    else if (userMessage.toLowerCase()==='유방암') {
      botMessage = {
        _id: generateMessageId(),
        text: '유방암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '유방암의 정의' },
            { title: '위험요인', value: '유방암의 위험요인' },
            { title: '진단방법', value: '유방암의 진단방법' },
            { title: '치료방법', value: '유방암의 치료방법' },
            { title: '예방방법', value: '유방암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage.toLowerCase()==='유방암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "유방암의 정의는 다음과 같습니다.\n\n유방에는 여러 종류의 세포가 있는데 어느 것이든 암세포로 변할 수 있기 때문에 발생 가능한 유방암의 종류는 꽤 많다고 보면 된다. \n\n그러나 대부분의 유방암이 유즙을 생성하는 \'소엽\'이라는 구조와 소엽과 유두를 연결하는 \'유관\'이라는 구조에서 기원하기 때문에, 일반적으로 유방암이라 하면 소엽과 유관에서 발생하는 암을 의미한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "유방암의 위험요인에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '유전적 요인', value: '유방암의 위험요인 : 유전적 요인' },
            { title: '호르몬 요인', value: '유방암의 위험요인 : 호르몬 요인' },
            { title: '연령 및 출산, 수유 요인', value: '유방암의 위험요인 : 연령 및 출산, 수유 요인' },
            { title: '기타', value: '유방암의 위험요인 : 기타' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 위험요인 : 유전적 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 전체 유방암의 5~10% 정도가 유전과 관련\n\n - 어머니나 자매 중 한쪽에 유방암 가족력이 있는 경우 : 위험도가 약 2~3배 증가\n\n - 어머니나 자매 모두 유방암 가족력이 있는 경우 : 위험도가 약 8~12배 증가",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 위험요인', value: '유방암의 위험요인' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 위험요인 : 호르몬 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 12세 이전의 이른 초경\n\n- 55세 이후 늦은 폐경\n\n- 폐경 후 장기적인 여성 호르몬을 투여한 경우",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 위험요인', value: '유방암의 위험요인' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 위험요인 : 연령 및 출산, 수유 요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 40세 이후의 여성에서 발견되며 연령이 많아지면서 빈도 증가\n\n- 출산 경험이 없는 경우\n\n- 30세 이후 첫 자녀를 늦게 둔 경우\n\n- 수유를 하지 않은 여성",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 위험요인', value: '유방암의 위험요인' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 위험요인 : 기타') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "- 비만, 동물성 지방 과잉섭취\n\n- X-선 치료를 받거나 핵폭탄에 노출된 경험\n\n- 지속적인 유방 문제",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 위험요인', value: '유방암의 위험요인' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 진단방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "유방암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '자가검진', value: '유방암의 진단방법 : 자가검진' },
            { title: '유방촬영술', value: '유방암의 진단방법 : 유방촬영술' },
            { title: '유방초음파', value: '유방암의 진단방법 : 유방초음파' },
            { title: '자기공명영상(MRI)', value: '유방암의 진단방법 : 자기공명영상(MRI)' },
            { title: '전산화단층촬영술(CT)', value: '유방암의 진단방법 : 전산화단층촬영술(CT)' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 진단방법 : 자가검진') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "자신의 유방을 스스로 만져보아 확인하는 방법으로 비용이 들지 않고 위험성이 없는 좋은 방법이며, 유방암 환자의 70% 이상이 자가검진으로 발견되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 진단방법', value: '유방암의 진단방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 진단방법 : 유방촬영술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "유방암 검사의 기본검사이며 유방초음파 등의 검사에서 발견이 어려운 미세석회화 등의 조기암 병변 발견, 5mm 정도 크기의 정도 발견이 가능하며 90~95%의 정확성을 보인다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 진단방법', value: '유방암의 진단방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage.toLowerCase()==='유방암의 진단방법 : 유방초음파') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "유방 낭종의 경우 90~99%의 확진을 내릴 수 있으며, 암진단을 확진하기 위해 조직검사를 실시할 경우 실시간으로 종괴를 관찰하면서 시행할 수 있기 때문에 작은 종괴의 조직검사에서 반드시 필요하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 진단방법', value: '유방암의 진단방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 진단방법 : 자기공명영상(MRI)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "방사선 노출이 없고, 양쪽 유방을 비교할 수 있으며 영상이 선명하다. 진단뿐만 아니라 유방암 수술 전 부위, 병기 결정, 전이 여부 확인, 수술 후 잔류 유방암 평가 및 재발 평가 등을 위해 사용할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 진단방법', value: '유방암의 진단방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 진단방법 : 전산화단층촬영술(CT)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "유방암이 확진된 후 병기 결정, 치료 후 재발 또는 전이 여부 확인에 유용하다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 진단방법', value: '유방암의 진단방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "유방암의 치료방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '종괴절제술', value: '유방암의 치료방법 : 종괴절제술' },
            { title: '변형근치절제술', value: '유방암의 치료방법 : 변형근치절제술' },
            { title: '유방절제술 후 재건술', value: '유방암의 치료방법 : 유방절제술 후 재건술' },
            { title: '항암화학요법', value: '유방암의 치료방법 : 항암화학요법' },
            { title: '방사선요법', value: '유방암의 치료방법 : 방사선요법' },
            { title: '항호르몬요법', value: '유방암의 치료방법 : 항호르몬요법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 종괴절제술') {
      botMessage = {
        _id: generateMessageId(),
        text: "종양의 크기가 4~5cm이하이고 단일종양이면서 심한 상피내암 성분이 없는 경우 종괴가 있는 부위의 유방조직 일부를 포함하여 종괴를 제거하고 액와부림프절곽청술을 시행하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 변형근치절제술') {
      botMessage = {
        _id: generateMessageId(),
        text: "유두와 피부를 포함하여 유방 조직 전부와 액와림프절을 일괄 절제하는 방법이다. 이 수술은 팔의 부종 발생이나 어깨 기능의 장애가 없으며 가슴의 대흉근을 보존함으로써 쇄골 아래의 함몰부위를 만들지 않는다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 유방절제술 후 재건술') {
      botMessage = {
        _id: generateMessageId(),
        text: "유방절제술 후 근육이나 인공 보조물을 삽입하여 유방을 재건하는 방법으로 시행한다. 암의 재발 가능성이 적을 경우에 주로 시행하고, 이 수술의 장점은 무엇보다 미용효과와 심리적 만족감이 크다는 것을 들 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 항암화학요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "수술로 완전제거 했다고 생각되는 경우에도 다른 곳에서 병이 재발할 가능성이 있으므로 수술 후에도 남아 있을 수 있는 미세한 암세포를 제어함으로써 재발을 감소시키고자 하는 것이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 방사선요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "국소재발을 방지하고 생명을 연정시키는 데 목적이 있다. 전체 유방 및 액와부 림프절을 포함하는 치료 범위로 방사선 치료를 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 치료방법 : 항호르몬요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "에스토로겐 수용체 양성 혹은 프로게스테론 수용체 양성인 환자의 유방암 재발 방지 및 재발 시 치료 목적으로 사용되고 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 유방암의 다른 치료방법', value: '유방암의 치료방법' },
            { title: '← 유방암에 대한 다른 정보', value: '유방암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='유방암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 여성 호르몬 치료와 유방암 발생률\n여성 호르몬치료가 유방암의 발생 위험을 높인다는 것은 이제 잘 알려진 사실이다. 여성 호르몬치료의 필요성과 유방암 발생의 위험성에 대해서는 의사와 상담하는 것이 좋다.\n\n(2) 방사선 노출 최소화하기\n유방의 방사선 노출도 유방암의 위험을 높인다고 알려져 있다. 대개 노출 10년 후부터 유방암 발생 위험이 높아지며 그 영향은 평생 지속된다.\n\n(3) 비만 예방과 적정 체중 유지하기\n비만은 호르몬 치료를 받지 않았던 폐경 이후 여성의 유방암 발생과 관련이 있다. 일반적으로 유방암 예방 위해서 적정 체중을 유지할 것을, 비만인 경우에는 체중 감량을 권장하고 있다.\n\n(3) 금주 또는 절주하기\n한 인구 집단을 장기간 추적 관찰하는 코호트연구 결과 매일 4잔의 음주군은 비음주군에 비해 유방암 발생 위험이 1.32배 높았다. 유방암을 예방하려면 음주를 시작하지 않거나, 음주량을 줄이거나, 완전한 절주를 하는 것이 좋다고 추론할 수 있다.\n\n(3) 유전적 요인\n특정 유전자의 돌연변이가 유방암의 발생 위험을 높일 수 있다. 대표적인 유방암 관련 유전자는 BRCA1과 BRCA2이다. 이 유전자를 가진 여성은 유방암의 발생 위험이 높으며, 더 어린 나이에 유방암이 생길 수 있다. 유방암 유전자를 가진 사람의 유방암 예방법에 대해서는 의사의 상담이 필요하다.\n\n(3) 적절한 운동하기\n적절한 운동으로 유방암의 발생 위험을 낮출 수 있습니다. 주당 4시간 이상 운동했을 때 유방암 예방 효과가 있었는데, 운동하지 않은 사람들에 비해 유방암 발생 위험이 30~40% 낮아졌습니다. 운동의 유방암 예방 효과는 정상체중의 폐경 전 여성에서 더 뚜렷했습니다. 부상을 입을 수 있는 격렬한 운동은 피하되, 적절한 운동을 하는 것이 유방암 예방에 도움이 될 것입니다.\n\n(4) 모유 수유\n모유 수유는 유방암 예방에 확실히 도움이 된다. 그 이유는 수유기간에 여성 호르몬인 에스트로겐 농도가 낮게 유지되기 때문일 것이다. 12개월 동안 모유 수유를 하였을 때 유방암 발생 위험이 4.5% 정도 낮아졌다고 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
            { title: '← 갑상선암에 대한 다른 정보', value: '갑상선암' },
          ],
        },
      };
    }

    //자궁경부암//
    else if (userMessage==='자궁경부암') {
      botMessage = {
        _id: generateMessageId(),
        text: '자궁경부암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '자궁경부암의 정의' },
            { title: '위험요인', value: '자궁경부암의 위험요인' },
            { title: '진단방법', value: '자궁경부암의 진단방법' },
            { title: '치료방법', value: '자궁경부암의 치료방법' },
            { title: '예방방법', value: '자궁경부암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage==='자궁경부암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부암의 정의는 다음과 같습니다.\n\n자궁경부암이란 자궁의 입구인 자궁경부에 발생하는 여성 생식기 암이다.\n\n자궁경부암 중 주로 발병하는 암세포는 크게 두 종류이다. 한 종류는 편평상피세포암으로 전체 자궁경부암의 약 80%를 차지하며, 다른 한 종류는 선암으로 10-20%를 차지한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "현재까지는 연구 결과에 의하면 자궁경부암의 발생은 인유두종바이러스(HPV)라고 하는 바이러스 감염이 가장 핵심적은 역할을 하는 것으로 알려져 있다.\n\n인유두종바이러스는 성관계를 통해 전염되는데, 자궁경부암이 있는 대부분의 여성에게 발견되며, 이것이 발견되면 자궁경부암의 발생 위험도가 10배 이상 증가한다고 알려져 있고, 상피내 종양의 90%는 이 바이러스에 의한 것으로 밝혀졌다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '자궁경부 세포진검사', value: '자궁경부암의 진단방법 : 자궁경부 세포진검사' },
            { title: '질확대경검사', value: '자궁경부암의 진단방법 : 질확대경검사' },
            { title: '조직검사', value: '자궁경부암의 진단방법 : 조직검사' },
            { title: '원추절제술', value: '자궁경부암의 진단방법 : 원추절제술' },
            { title: '방광경 및 S결장경검사', value: '자궁경부암의 진단방법 : 방광경 및 S결장경검사' },
            { title: '경정맥 신우조영술(IVP)', value: '자궁경부암의 진단방법 : 경정맥 신우조영술(IVP)' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 자궁경부 세포진검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "질경을 넣어 자궁경부를 보이게 한 다음 세포 채취용 솔로 자궁경부와 질세포를 채취하여 유리 슬라이드에 펴 발라서 현미경으로 검사하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 질확대경검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부 세포검사나 육안 관찰에서 이상이 있을 경우 자궁경부의 비정상 부위를 질확대경으로 확대하여 자세히 보는 검사방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 조직검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부에서 작은 조직을 떼어내어 염색한 수 현미경으로 조직을 관찰하는 것이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 원추절제술') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부암의 침윤 정도를 확인하는 진단뿐만 아니라 치료로도 이용할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 방광경 및 S결장경검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "각각의 장기 속을 들여다보는 내시경검사로 자궁경부암이 방광 및 직장의 점막을 침범했는가를 확인하여 병기를 정확히 설정하기 위하여 시행하는 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 진단방법 : 경정맥 신우조영술(IVP)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "아밍 요관, 방광, 요도 등의 장기에 침범해 있는지를 확인하기 위한 검사이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 진단방법', value: '자궁경부암의 진단방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부암의 치료방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '단순자궁적출술', value: '자궁경부암의 치료방법 : 단순자궁적출술' },
            { title: '광범위 자궁적출술', value: '자궁경부암의 치료방법 : 광범위 자궁적출술' },
            { title: '수술방사선복합요법(CORT)', value: '자궁경부암의 치료방법 : 수술방사선복합요법(CORT)' },
            { title: '국소파괴요법', value: '자궁경부암의 치료방법 : 국소파괴요법' },
            { title: '방사선 치료', value: '자궁경부암의 치료방법 : 방사선 치료' },
            { title: '항암화학요법', value: '자궁경부암의 치료방법 : 항암화학요법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 단순자궁적출술') {
      botMessage = {
        _id: generateMessageId(),
        text: "주로 전암성 병변인 상피내암이나 경부암 초기에 사용되는 방법이며, 암에 참범된 자궁을 적출하는 수술이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 광범위 자궁적출술') {
      botMessage = {
        _id: generateMessageId(),
        text: "자궁, 나팔관, 난소뿐만 아니라 자궁주위 조직, 질상부, 골반림프절까지 절제하는 수술이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 수술방사선복합요법(CORT)') {
      botMessage = {
        _id: generateMessageId(),
        text: "수술로 골반벽에 있는 종양조직을 제거한 후 남은 종양조직에 근접치료를 하기 위한 유도관을 이식하고 복강벽이나 대퇴부로부터 방사선 치료를 받지 않은 자가조직을 골반벽으로 이동하여 이식시킴으로써 복강 내의 장기들로부터 충분한 거리를 유지할 수 있도록 해주는 수술이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 국소파괴요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "자궁경부의 이상세포를 얼려서 죽이는 동결요법, 고주파를 이용해 고열로 암세포를 죽이는 고주파요법, 레이저 광선을 이용해 암세포를 죽이거나 잘라내는 방법인 레이저요법이 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 방사선 치료') {
      botMessage = {
        _id: generateMessageId(),
        text: "병기 2기 초까지는 일반적으로 수술적인 방법으로 치료를 하며, 수술이 불가능한 경우는 방사선 치료를 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 치료방법 : 항암화학요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "진행성 자궁경부암의 치료와 수술 후 재발 방지를 위한 보조요법으로 방사선 치료와 함께 사용된다. 또한 크기가 큰 종양이 있는 국소진행암 환자에서 수술이 불가능한 환자를 수술이 가능하게 하며, 림프절 전이율과 국소적 및 전이성 재발률을 낮추고 생존율을 높일 목적으로 선생항함화학요법을 제한적으로 사용하기도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암의 다른 치료방법', value: '자궁경부암의 치료방법' },
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='자궁경부암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 인간유두종바이러스(HPV) 감염의 회피와 백신 접종하기\n자궁경부암을 예방하려면 HPV에 감염되지 않도록 주의하는 것이 가장 중요하다.\n\n(2) 금연, 비흡연 유지, 그리고 간접흡연 피하기\n간접흡연을 포함하여 흡연을 하면 자궁경부암의 발생 위험이 높아집니다. 특히, HPV에 감염된 여성들 중에서도 현재 흡연을 하고 있거나 과거 흡연하였던 여성들은 그렇지 않은 여성들에 비해 고등급 자궁경부 상피내 종양(HSIL) 등 진행된 자궁경부암의 발생이 2~3배 많았다.\n\n(3) 자궁경부 세포진 검사\n자궁경부암의 선별검사 방법 중 대표적인 하나의 검사방법으로 검진을 통하여 자궁경부암을 예방할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 자궁경부암에 대한 다른 정보', value: '자궁경부암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    //전립선암//
    else if (userMessage==='전립선암') {
      botMessage = {
        _id: generateMessageId(),
        text: '전립선암에 대해 어떤 것이 궁금하시나요?',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '정의', value: '전립선암의 정의' },
            { title: '위험요인', value: '전립선암의 위험요인' },
            { title: '진단방법', value: '전립선암의 진단방법' },
            { title: '치료방법', value: '전립선암의 치료방법' },
            { title: '예방방법', value: '전립선암의 예방방법' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    } 

    else if (userMessage==='전립선암의 정의') {
      botMessage = {
        _id: generateMessageId(),
        text: "전립선암의 정의는 다음과 같습니다.\n전립선암 세포는 정상적인 통제에서 벗어나 계속 증식하면서 주변의 다른 조직으로 침윤하기도 하고, 혈관이나 림프관을 통해 멀리 떨어진 조직으로 전이하기도 한다.\n\n전립선에서 발생하는 암의 대부분은 샘 세포에서 발생하는 선암이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 위험요인') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "전립선암은 주로 노인들에게서 많이 발생하며 전립선암의 원인으로는 유전적 소인, 나이, 인종, 남성 호르몬의 영향, 음식 및 식이습관 등이 관련 있을 것으로 추측되며, 특히 지방 섭취의 증가, 즉 식생활의 서구화가 관련이 있을 것으로 인정된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "전립선암의 진단방법으로는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '직장 수지 검사', value: '전립선암의 진단방법 : 직장 수지 검사' },
            { title: '혈청 전립샘특이항원(PSA) 검사', value: '전립선암의 진단방법 : 혈청 전립샘특이항원(PSA) 검사' },
            { title: '경직장초음파검사(TRUS) 및 조직생검', value: '전립선암의 진단방법 : 경직장초음파검사(TRUS) 및 조직생검' },
            { title: '골스캔', value: '전립선암의 진단방법 : 골스캔' },
            { title: '복부전산화단층촬영술(CT)와 자기공명영상(MRI)', value: '전립선암의 진단방법 : 복부전산화단층촬영술(CT)와 자기공명영상(MRI)' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법 : 직장 수지 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "조기암이나 완치가 가능한 전립선암을 발견할 수 있는 뚜렷한 증상이 없으므로, 특별한 증상이 없는 경우에도 일률적으로 직장 수지 검사를 시행하여 전립샘을 만져보는 것에서부터 시작한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 진단방법', value: '전립선암의 진단방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법 : 혈청 전립샘특이항원(PSA) 검사') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "전립샘 상피세포에서 생성되며 칼리크레인과에 속하는 세린 단백질 분해효소로서 전립선암의 진단에 매우 중요한 종양표지자로 전립선암이 있는 경우에 혈줄 PSA치가 상승한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 진단방법', value: '전립선암의 진단방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법 : 경직장초음파검사(TRUS) 및 조직생검') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "촉진되지 않는 전립샘 병변을 발견하고 조직거마와 전립샘 용적의 계산을 위해 시행하며, 정낭 침범이나 전립샘 피막 침범 여부를 파악하여 국소적 병기를 결정하는 데도 이용된다. 전립선암의 진단을 위한 조직생검은 주로 TRUS를 이용한 초음파 유도하 침생검을 하게 된다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 진단방법', value: '전립선암의 진단방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법 : 골스캔') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "말기에 뼈로 전이되는 경우가 많은데 이와 같은 골 전이 여부를 판단하기 위해서 방사성 동위원소를 이용한 골스캔을 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 진단방법', value: '전립선암의 진단방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 진단방법 : 복부전산화단층촬영술(CT)와 자기공명영상(MRI)') {
      isLast=true;
      botMessage = {
        _id: generateMessageId(),
        text: "암을 포함한 전립샘의 크기를 측정하고 주위 조직으로의 암의 침습 정도, 골반강내 림프절의 전이 여부 등을 알기 위하여 시행한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 진단방법', value: '전립선암의 진단방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "전립선암의 치료방법에는 다음과 같은 것들이 있습니다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '대기관찰요법', value: '전립선암의 치료방법 : 대기관찰요법' },
            { title: '근치적 수술', value: '전립선암의 치료방법 : 근치적 수술' },
            { title: '방사선 치료', value: '전립선암의 치료방법 : 방사선 치료' },
            { title: '양성자 치료', value: '전립선암의 치료방법 : 양성자 치료' },
            { title: '냉동수술요법', value: '전립선암의 치료방법 : 냉동수술요법' },
            { title: '열 치료', value: '전립선암의 치료방법 : 열 치료' },
            { title: '호르몬 치료', value: '전립선암의 치료방법 : 호르몬 치료' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 대기관찰요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "병의 진행을 주기적인 검사로 면밀히 추적 관찰하는 것으로 검사결과에 따라 치료를 시작하게 된다. 또한 다른 중한 질환이 있는 환자에게도 사용할 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 근치적 수술') {
      botMessage = {
        _id: generateMessageId(),
        text: "전체 전립샘과 정낭, 정관과 같은 주변 조직과 골반 림프절을 함께 제거하는 수술로 전립샘에 국한된 전립선암에 대한 대표적인 치료방법이며 국소 전립선암의 완치를 기대할 수 있는 효과적인 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 방사선 치료') {
      botMessage = {
        _id: generateMessageId(),
        text: "직장이나 방광 등에는 손상을 주지 않고 전립샘 부위에만 방사선의 투여량을 증가시켜 치료 효과를 향상시키는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 양성자 치료') {
      botMessage = {
        _id: generateMessageId(),
        text: "방사선 치료의 하나로 수소 원자핵을 구성하는 소립자인 양성자를 가속해 암 치료에 사용하는 것이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 냉동수술요법') {
      botMessage = {
        _id: generateMessageId(),
        text: "최소침습치료 중의 하나로 수술받기 어려운 고령이나 건강상 문제가 있는 환자들에게 유용한 치료법이다. 6~8개의 금속 탐색자를 회음부를 통해 전립샘에 넣고 차가운 이르곤 가스를 순환시킴으로써 얼음덩어리를 생성시켜 암세포를 파괴하는 방법이다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 열 치료') {
      botMessage = {
        _id: generateMessageId(),
        text: "열을 이용해서 전립샘 조직을 괴사시키는 방법으로 전립샘비대증 치료에 주로 쓰이는데, 이 중 일부를 전립샘암에 적용하기도 한다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 치료방법 : 호르몬 치료') {
      botMessage = {
        _id: generateMessageId(),
        text: "남성 호르몬의 생성을 차단하거나 기능을 억제시키면 상당 기간 전립선암의 진행을 막거나 진행 속도를 늦출 수 있다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암의 다른 치료방법', value: '전립선암의 치료방법' },
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    else if (userMessage==='전립선암의 예방방법') {
      botMessage = {
        _id: generateMessageId(),
        text: "(1) 동물성 지방의 섭취를 줄이기\n식이요인 중 지금까지 알려진 전립선암의 유력한 위험인자는 동물성 과다섭취이다. 쇠고기, 돼지고기, 치킨, 피자와 버터, 생크림 등에 동물성 지방이 많이 함유되어 있다.\n\n(2) 금연하기\n흡연이 전립선암의 진행과 관계가 있으며 특히 악성도가 높은 전립선암과 관련이 있다.\n\n(3) 적정 체중 유지하기\n체질량지수(BMI)가 높을수록 악성도가 높은 전립선암과 관련이 있다.\n\n(4) 전립선암 선별검사- PSA(전립선특이항원)검사\n전립선암의 선별검사는 증상이 없는 남성에서 전립선암을 조기 발견하기 위한 검사를 말하며, 전립선특이항원 검사(PSA)와 직장수지검사가 주로 사용되는 검사법이다. 그러나 아직 전문가들 사이에 이견이 있으므로 담당 의사와 상의해 검사 방법을 결정하는 것이 좋다.",
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 전립선암에 대한 다른 정보', value: '전립선암' },
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }


    

    else {
      botMessage = {
        _id: generateMessageId(),
        text: '무슨 말인지 이해하지 못했습니다. 알아보고 싶은 암을 먼저 선택해주세요.',
        createdAt: new Date(),
        user: { _id: 2, name: 'ChatBot' },
        
        quickReplies: {
          type: 'radio',
          values: [
            { title: '← 암 종류 다시 선택', value: '암 종류 다시 선택' },
          ],
        },
      };
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    
  };

  const handleQuickReply = value => {
    const userMessage = {
      _id: generateMessageId(),
      text: value,
      createdAt: new Date(),
      user: { _id: 1, name: 'User' },
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, [userMessage]));

    handleBotResponse(value);

  };

  const renderBubble = props => {
    
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#2e64e5' },
          left: { backgroundColor: '#e0e0e0' },
        }}
      />
    );
  };

  const onQuickReply = replies => {
    const selectedValue = replies[0].value;
    handleQuickReply(selectedValue);
  };

  return (
  
    <View style={{flex: 1}}>
    <View style={styles.buttonContainer}>
      <Button
        title={timerRunning ? "테스크 완료" : "테스크 시작"}
        onPress={toggleTimer}
      />
    </View>
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: 1, name: 'User' }}
      renderBubble={renderBubble}
      onQuickReply={onQuickReply}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:5,
  },
});

export default ChatbotScreen;