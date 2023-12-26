import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

import { FlatList } from "react-native";
import {
  Container,
} from "../styles/MessageStyles";
import pages from "./page.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import Button from "../components/Button";
import { getAllUserToText, seenMessage } from "../service/allService";
import MessageComponent from "../components/MessageComponent";


const Message = ({ navigation }) => {

  const [isSearch, setIsSearch] = useState(false);
  const [userData, setuserData] = useState(null);
  const [keyword, setkeyword] = useState("");
  const [people, setpeople] = useState(null);

  const [count, setCount] = useState(0);
  const getData = async () => {
    let data = await AsyncStorage.getItem("user");
    if (data !== null) {
      setuserData(JSON.parse(data));
    } else {
      setuserData(null);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
    fetchAllUser();
  }, [isFocused, userData]);

  let fetchAllUser = async () => {
    let res = await getAllUserToText({
      keyword: keyword,
      id: userData?.id,
    });
    res = res.data;

    if (res && res.errCode === 0) {
      setpeople(res.data);
      setCount(res.count);
    }
  };

  const handleClick = () => {
    navigation.navigate("MessageSearch", {
      userData: userData,
      people: people,
    });
  };

  

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          {userData ? (
            <>
              <View style={styles.overlay}>
                <View />

                <>
                  <Text style={styles.heading}>Tin nhắn</Text>
                  <TouchableOpacity style={styles.box} onPress={handleClick}>
                    <Feather name="search" size={22} color={COLORS.white} />
                  </TouchableOpacity>
                </>
              </View>
              <Container>
                {count != 0 && (
                  <FlatList
                    data={people}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <>
                         {item.haveConnection && item.lastMessage &&  <MessageComponent
                        item={item}
                        isSearch={isSearch}
                        userData={userData}
                          
                        
                      />}
                       
                      </>

                    )}
                  />
                
                )}
              </Container>
            </>
          ) : (
            //Login
            <View
              style={{
                width: "50%",
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Button
                title={"Đăng  nhập"}
                onPress={() => {
                  navigation.navigate("LoginPage");
                }}
                isValid={true}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Message;
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
