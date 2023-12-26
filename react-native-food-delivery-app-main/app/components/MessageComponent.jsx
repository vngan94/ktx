import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

import { useState } from "react";
import { useEffect } from "react";

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/MessageStyles";
import { deleteAllMessage, seenMessage } from "../service/allService";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
const MessageComponent = ({ item, isSearch, userData }) => {
  const timeAgo = (prevDate) => {
    const diff = Number(new Date()) - prevDate;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case diff < minute:
        const seconds = Math.round(diff / 1000);
        return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
      case diff < hour:
        return Math.round(diff / minute) + " minutes ago";
      case diff < day:
        return Math.round(diff / hour) + " hours ago";
      case diff < month:
        return Math.round(diff / day) + " days ago";
      case diff < year:
        return Math.round(diff / month) + " months ago";
      case diff > year:
        return Math.round(diff / year) + " years ago";
      default:
        return "";
    }
  };
  const navigation = useNavigation();
  
  const userImg = require("../../assets/users/user-3.jpg");
  const isFocused = useIsFocused();
  const [loadAgain, setLoadAgain] = useState(false);
  useEffect(() => {}, [isFocused, loadAgain]);

  const handleOnPress = async () => {
    if (item.countNew > 0) {
      let res = await seenMessage(item.lastMessage.groupId);
    }

    navigation.navigate("Chat", {
      userName: item.fullName,
      idFrom: userData.id,
      idTo: item.id,

      groupId: item.haveConnection ? item.haveConnection.id : "",
    });
  };

  const handleOnLongPress = async () => {
    Alert.alert(
      "Xóa toàn bộ cuộc nói chuyện",
      "Bạn có chắc chắn muốn xóa toàn bộ cuộc nói chuyện?",
      [
        {
          text: "Hủy",
          onPress: () => {},
        },
        {
          text: "OK",

          onPress: async () => {
            // delete All
            let res = await deleteAllMessage(item.lastMessage.id);
            res = res.data;
            if (res && res.errCode == 0) {
              setLoadAgain(true);
            }

            // xoa firebase
            let collectionRef = firestore()
            .collection("Chat")
            .doc(userData.id + "_" + item.id)
            .collection("messages")
           

          collectionRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              doc.ref.delete();
            });
          });
          },
        },
      ]
    );
  };

  return (
    <>
      {item.haveConnection && item.lastMessage ? (
        <TouchableOpacity
          onPress={handleOnPress}
          onLongPress={handleOnLongPress}
        >
          <UserInfo>
            <UserImgWrapper>
              <UserImg source={userImg} />
            </UserImgWrapper>
            <TextSection>
              <UserInfoText>
                <Text style={styles.userName}>{item.fullName}</Text>

                <Text style={styles.time}>
                  {timeAgo(new Date(item.lastMessage.createdAt).getTime())}
                </Text>
              </UserInfoText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={
                    item.lastMessage.isRead == 0 ? styles.textNew : styles.text
                  }
                >
                  {" "}
                  {item.lastMessage.message.length < 35
                    ? `${item.lastMessage.message}`
                    : `${item.lastMessage.message.substring(0, 30)}...`}
                </Text>
                {item.countNew > 0 && (
                  <Text style={styles.box2}>{item.countNew}</Text>
                )}
              </View>
            </TextSection>
          </UserInfo>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleOnPress}>
          <UserInfo>
            <UserImgWrapper>
              <UserImg source={userImg} />
            </UserImgWrapper>
            <TextSection>
              <UserInfoText>
                <Text style={styles.userName}>{item.fullName}</Text>
              </UserInfoText>
            </TextSection>
          </UserInfo>
        </TouchableOpacity>
      )}
    </>
  );
};

export default MessageComponent;
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
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: COLORS.gray2,
    width: 30,
    height: 20,
    borderRadius: 7,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
  },
  text: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  textNew: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black,
  },
  time: {
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: "medium",
    color: COLORS.black,
  },
});
