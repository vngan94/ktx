import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import AppBar from "../components/AppBar";
import FAQ from "../components/FAQ";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { Button } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import {
  createNewMessage,
  deleteMessage,
  updateMessage,
} from "../service/allService";
import moment from "moment/moment";

const ChatScreen = () => {
  const route = useRoute();
  const data = route.params;
  const idFrom = data.idFrom;
  const idTo = data.idTo;
  const groupId = data.groupId;

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection("Chat")
      .doc(idFrom + "_" + idTo)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((documentSnapshot) => {
        const allmessages = documentSnapshot.docs.map((item) => {
          return { ...item._data, createdAt:item._data.createdAt };
        });

        setMessages(allmessages);
      });
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    
    let newMessage2 = await createMessage(msg.text); // db
    
    const myMsg = {
      // giao diện
      ...msg,
      from: idFrom,
      to: idTo,
      createdAt: Date.parse(msg.createdAt),
      idDB: newMessage2.dataFrom.id,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );
    const myMsgTo = {
      // giao diện
      ...msg,
      from: idFrom,
      to: idTo,
      createdAt: Date.parse(msg.createdAt),
      idDB: newMessage2.dataTo.id,
    };

    firestore()
      .collection("Chat")
      .doc(idFrom + "_" + idTo)
      .collection("messages")
      .add(myMsg);
    firestore()
      .collection("Chat")
      .doc(idTo + "_" + idFrom)
      .collection("messages")
      .add(myMsgTo);
  }, []);
  let createMessage = async (message) => {
    try {
      let res = await createNewMessage({
        fromId: idFrom,
        toId: idTo,
        groupId: groupId,
        message: message,
      });
      res = res.data;
      if (res && res.errCode !== 0) {
        console.log(res.errMessage);
       
      } else {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  let deleteMessagee = async (id) => {
    try {
      let res = await deleteMessage(id);
      res = res.data;
      if (res && res.errCode !== 0) {
       
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={COLORS.primary}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
        }}
        textStyle={{
          right: {
            fontSize: 14,
            color: COLORS.white,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  const onLongPress = async (context, message) => {
    const id = message._id;

    const userId = message.user._id;
    const idDB = message.idDB;
    const options = ["Xóa", "Thu hồi", "Hủy"];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          
          case 0:
            // xóa firebase
            let collectionRef = firestore()
              .collection("Chat")
              .doc(idFrom + "_" + idTo)
              .collection("messages")
              .where("_id", "==", id);

            collectionRef.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });

            // xoa giao dien
            let temp = messages.filter((temp) => message._id !== temp._id);
            setMessages(temp);

            // xoa database
            let x = await updateMessage({
              id: idDB,
            });
            break;
          case 1:
            if (userId != idFrom) {
              Alert.alert("Bạn chỉ có thể thu hồi tin nhắn của mình đã gửi");
            } else {
              // xoa firebase
              let collectionRef = firestore() // từ người gửi
                .collection("Chat")
                .doc(idFrom + "_" + idTo)
                .collection("messages")
                .where("_id", "==", id);

              collectionRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.delete();
                });
              });

              collectionRef = firestore() // từ người nhận
                .collection("Chat")
                .doc(idTo + "_" + idFrom)
                .collection("messages")
                .where("_id", "==", id);

              collectionRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  doc.ref.delete();
                });
              });

              // xoa giao dien
              let temp = messages.filter((temp) => message._id !== temp._id);
              setMessages(temp);

              // xoa database

              deleteMessagee(idDB);
            }
            break;
          case 2:
            console.log("Cancel");
            break;
        }
      }
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: idFrom,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      onLongPress={onLongPress}
    />
  );
};
export default ChatScreen;
const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  box: {
    // backgroundColor: COLORS.secondary1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
